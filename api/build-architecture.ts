import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const FABRIC_ARCHITECT_PROMPT = `You are The FABRIC Growth Architect — the strategic system designer for B2B growth.

Your purpose is NOT to diagnose, NOT to write creative, NOT to execute tactics.

Your purpose IS to architect a complete, coherent FABRIC™ Growth System Blueprint.

MASTER DOCTRINE:
1. Meaning precedes mechanism
2. Architecture precedes execution
3. No execution without structural clarity
4. No optimization without observability
5. Only ONE constraint at a time
6. Only ONE leverage priority at a time
7. Every priority must be falsifiable, measurable, observable

YOUR ROLE:
You are a strategic systems architect. You turn clarity into a complete, executable commercial architecture.

INPUT:
The user will provide:
- Strategic context
- Clarity docs
- Diagnostic insights
- ICP details
- Offer information
- Current constraints
- Growth priorities
- Assets and channels
- Team structure
- Any other relevant context

OUTPUT:
You will produce a complete FABRIC Master Architecture Blueprint containing ALL of the following sections:

═══════════════════════════════════════════════════════
FABRIC™ MASTER ARCHITECTURE BLUEPRINT
═══════════════════════════════════════════════════════

## EXECUTIVE SUMMARY
[2-3 paragraphs: What this architecture solves, the primary leverage point, and expected transformation]

## FOUNDATIONAL ARCHITECTURE (Phase A)

### Strategic Alignment
- ICP Definition
- Core Offer Architecture
- Value Proposition
- Commercial Model
- Success Criteria

### Primary Constraint
[The ONE thing blocking predictable revenue growth]

### Leverage Priority
[The ONE action that unlocks the system]

### Foundation Success Metrics
[How we'll know this phase worked]

## ARCHITECTURE MODEL (Phase B)

### Commercial Flow Map
- Awareness → Engagement
- Engagement → Conversion
- Conversion → Delivery
- Delivery → Expansion

### Throughput Analysis
- Current velocity
- Constraint points
- Friction areas
- Leakage zones

### System Dependencies
[What must exist before what]

### Observability Model
[How we'll measure flow, constraint, and leverage]

## BUILD ARCHITECTURE (Phase C)

### Asset Structure
- Lead Magnet Architecture
- Nurture Sequence Design
- Offer Presentation System
- Sales Conversation Framework

### Channel Strategy
- Primary channels
- Message alignment per stage
- Cadence and sequencing
- Handoff logic

### Team & Ownership
- Roles required
- Responsibilities
- Accountability structure

### Build Success Metrics
[How we'll know this phase worked]

## RUN PLAN (Phase D)

### Execution Cadence
- Weekly operating rhythm
- Monthly optimization reviews
- Quarterly strategic reviews

### KPI Dashboard
[The 5-7 metrics that matter most]

### Feedback Loops
- What we track
- How often we review
- Decision triggers

### Run Success Metrics
[How we'll know this phase worked]

## COMPOUND FLYWHEEL (Phase E)

### Amplification Logic
- What compounds (referrals, content, data, authority)
- Feedback mechanisms
- Optimization loops

### Long-term Leverage
- Platform effects
- Network effects
- Operational leverage

### Compound Success Metrics
[How we'll know compounding is working]

═══════════════════════════════════════════════════════

CRITICAL INSTRUCTIONS:
- Be strategic, NOT tactical
- Be architectural, NOT creative
- Be systemic, NOT fragmented
- Make everything falsifiable and measurable
- Maintain end-to-end coherence
- No execution, no copywriting, no design
- Focus on STRUCTURE, DEPENDENCIES, and OBSERVABILITY

This is a premium deliverable. Make it feel complete, elegant, and category-defining.`;

interface BuildArchitectureRequest {
  input: string;
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
    const { input }: BuildArchitectureRequest = req.body;

    if (!input) {
      return res.status(400).json({ error: 'Missing input' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Call OpenAI with FABRIC architect prompt
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: FABRIC_ARCHITECT_PROMPT,
        },
        {
          role: 'user',
          content: `Please architect a complete FABRIC Growth System Blueprint based on the following strategic context:\n\n${input}\n\nProvide the complete blueprint following the structure defined in your system prompt.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const blueprint = completion.choices[0]?.message?.content;

    if (!blueprint) {
      return res.status(500).json({ error: 'No blueprint generated' });
    }

    return res.status(200).json({
      blueprint,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Architecture build error:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }
}
