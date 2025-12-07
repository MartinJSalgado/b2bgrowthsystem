import type { VercelRequest, VercelResponse } from '@vercel/node';

const API_KEY = process.env.ONEPATH_API_KEY;
const LOCATION_ID = process.env.ONEPATH_LOCATION_ID;
const API_BASE_URL = 'https://services.leadconnectorhq.com';

interface DiagnosticCustomFields {
  diagnosticScore?: number;
  diagnosticAnswers?: string;
  diagnosticTimestamp?: string;
}

type CustomFieldValue = string | number | boolean | DiagnosticCustomFields;

interface GoHighLevelCustomField {
  key: string;
  field_value: string | number | boolean;
}

interface GoHighLevelContactPayload {
  email: string;
  locationId: string;
  tags: string[];
  firstName?: string;
  lastName?: string;
  phone?: string;
  companyName?: string;
  source?: string;
  customFields?: GoHighLevelCustomField[];
}

interface Pipeline {
  id: string;
  name: string;
  stages?: Stage[];
}

interface Stage {
  id: string;
  name: string;
}

interface PipelinesResponse {
  pipelines: Pipeline[];
}

interface GoHighLevelContactResponse {
  contact: {
    id: string;
    [key: string]: unknown;
  };
}

interface PipelineCache {
  data: { pipelineId: string; stageId: string } | null;
  timestamp: number;
}

let pipelineCache: PipelineCache | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface ContactData {
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  companyName?: string;
  tags?: string[];
  customFields?: Record<string, CustomFieldValue>;
  source?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { contactData, formSource } = req.body;

    if (!contactData || !formSource) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!API_KEY || !LOCATION_ID) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const contact = await createContact(contactData, formSource);

    if (!contact || !contact.id) {
      throw new Error('Failed to create contact');
    }

    if (contact.id) {
      await createOpportunity(contact.id, formSource);
    }

    return res.status(200).json({ success: true, contactId: contact.id });
  } catch (error: any) {
    console.error('One Path submission error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}

async function createContact(data: ContactData, formSource: string) {
  const tags = getTagsForForm(formSource, data.tags);

  let firstName = data.firstName || '';
  let lastName = data.lastName || '';

  if (data.name && !firstName && !lastName) {
    const nameParts = data.name.trim().split(' ');
    firstName = nameParts[0] || '';
    lastName = nameParts.slice(1).join(' ') || '';
  }

  const contactPayload: GoHighLevelContactPayload = {
    email: data.email,
    locationId: LOCATION_ID as string,
    tags
  };

  if (firstName) contactPayload.firstName = firstName;
  if (lastName) contactPayload.lastName = lastName;
  if (data.phone) contactPayload.phone = data.phone;
  if (data.companyName) contactPayload.companyName = data.companyName;
  if (data.source || formSource) contactPayload.source = data.source || formSource;

  if (data.customFields && Object.keys(data.customFields).length > 0) {
    const customFieldMapping: Record<string, string> = {
      'diagnosticScore': 'diagnostic_score',
      'diagnosticAnswers': 'diagnostic_answers',
      'diagnosticTimestamp': 'diagnostic_timestamp'
    };

    const customFieldsArray = Object.entries(data.customFields).map(([key, value]) => {
      const mappedKey = customFieldMapping[key] || key;
      return {
        key: mappedKey,
        field_value: value
      };
    });

    if (customFieldsArray.length > 0) {
      contactPayload.customFields = customFieldsArray;
    }
  }

  const response = await fetch(`${API_BASE_URL}/contacts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify(contactPayload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create contact: ${response.statusText}`);
  }

  const result = await response.json() as GoHighLevelContactResponse;
  return result.contact;
}

async function createOpportunity(contactId: string, formSource: string) {
  const pipelineData = await getPipelineData();

  if (!pipelineData) {
    console.warn('Pipeline not found, skipping opportunity creation');
    return null;
  }

  const opportunityPayload = {
    locationId: LOCATION_ID,
    name: `${formSource} - Lead`,
    pipelineId: pipelineData.pipelineId,
    pipelineStageId: pipelineData.stageId,
    status: 'open',
    contactId,
    monetaryValue: 0
  };

  const response = await fetch(`${API_BASE_URL}/opportunities/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify(opportunityPayload)
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result.opportunity;
}

async function getPipelineData() {
  const now = Date.now();
  if (pipelineCache && (now - pipelineCache.timestamp) < CACHE_TTL) {
    return pipelineCache.data;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/pipelines?locationId=${LOCATION_ID}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Version': '2021-07-28'
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json() as PipelinesResponse;
    const pipelines = data.pipelines || [];

    const pipeline = pipelines.find((p: Pipeline) =>
      p.name.toLowerCase().includes('growth system')
    );

    if (!pipeline) {
      return null;
    }

    const stage = pipeline.stages?.find((s: Stage) =>
      s.name.toLowerCase().includes('new lead')
    );

    if (!stage) {
      return null;
    }

    const result = {
      pipelineId: pipeline.id,
      stageId: stage.id
    };

    pipelineCache = {
      data: result,
      timestamp: now
    };

    return result;
  } catch (error) {
    console.error('Error fetching pipeline data:', error);
    return null;
  }
}

function getTagsForForm(formSource: string, additionalTags: string[] = []): string[] {
  const tagMap: Record<string, string[]> = {
    'growth-gap-diagnostic': ['Diagnostic Lead', 'High Intent', 'B2B Growth System']
  };

  const baseTags = tagMap[formSource.toLowerCase()] || ['Website Lead'];
  return [...baseTags, ...additionalTags];
}
