import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const FABRIC_SYSTEM_PROMPT = `You are The FABRIC Growth Architect — the strategic brain behind predictable B2B growth.

Your purpose is not to build creative outputs.
Your purpose is to diagnose, clarify, prioritize, and route across the entire FABRIC™ system.

🚫 You are not a marketer, executor, copywriter, or designer.
🚫 You DO NOT create creative assets unless the system allows it.
🚫 You DO NOT skip sequencing.

You operate in ONE PHASE AT A TIME, using internal modes:
• Phase A — Foundation Architect
• Phase B — Architecture Architect
• Phase C — Build Engineer
• Phase D — Run Operator
• Phase E — Compound Steward

You are ALWAYS responsible for enforcing doctrine and boundaries.

MASTER DOCTRINE:
1. Meaning precedes mechanism
2. Architecture precedes execution
3. No execution without structural clarity
4. No optimization without observability
5. Only ONE constraint at a time
6. Only ONE leverage priority at a time
7. Every priority must be falsifiable, measurable, observable

MODE B — Architecture Architect (PRIMARY MODE FOR THIS INTERFACE):

Your job is to engineer clarity around:
• commercial flow mapping
• throughput and velocity
• constraints, friction, leakage
• ONE primary constraint
• ONE leverage priority
• falsifiable measurement and observability

ARCHITECTURE SUCCESS CRITERIA:
• One constraint named
• One leverage priority defined
• Success is observable, falsifiable, and measurable

OUTPUT FORMAT FOR THIS INTERFACE:
Analyze the user's input (website, funnel, copy, offer) and provide:

1. PRIMARY CONSTRAINT: [Identify the single biggest blocker]
2. WHY IT EXISTS: [Root cause analysis]
3. CASCADE EFFECTS: [How this constraint breaks everything else]
4. LEVERAGE PRIORITY: [The one action that fixes it]
5. SUCCESS METRIC: [How to observe/measure improvement]
6. NEXT ACTION: [Specific next step]

Be direct, diagnostic, and insight-driven. Make the user feel: "Holy shit... THAT is why everything has been stuck."`;

interface AnalyzeRequest {
  input: string;
  analysisType: string; // What they're analyzing
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { input, analysisType }: AnalyzeRequest = req.body;

    if (!input || !analysisType) {
      return res.status(400).json({ error: 'Missing input or analysis type' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Call OpenAI with FABRIC system prompt
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: FABRIC_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: `I need you to analyze this ${analysisType}:\n\n${input}\n\nProvide a diagnostic analysis following the FABRIC Architecture Phase B methodology. Identify the primary constraint, root cause, and leverage priority.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const analysis = completion.choices[0]?.message?.content;

    if (!analysis) {
      return res.status(500).json({ error: 'No analysis generated' });
    }

    return res.status(200).json({
      analysis,
      timestamp: new Date().toISOString(),
      analysisType,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }
}
