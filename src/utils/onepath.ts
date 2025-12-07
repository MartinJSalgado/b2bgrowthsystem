// One Path (GoHighLevel) API Integration - Secure Client-Side

interface DiagnosticCustomFields {
  diagnosticScore?: number;
  diagnosticAnswers?: string;
  diagnosticTimestamp?: string;
}

type CustomFieldValue = string | number | boolean | DiagnosticCustomFields;

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

interface SubmitResponse {
  success: boolean;
  contactId?: string;
  error?: unknown;
}

export async function submitToOnePath(
  contactData: ContactData,
  formSource: string
): Promise<SubmitResponse> {
  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contactData,
        formSource
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit form');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('One Path submission error:', error);
    return { success: false, error };
  }
}
