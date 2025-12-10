import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

// Price IDs for each micro-offer
// All products now unified under 'ultimate' at $7
const STRIPE_PRICES: Record<string, string> = {
  foundation: process.env.STRIPE_PRICE_ULTIMATE || process.env.STRIPE_PRICE_FOUNDATION || '',
  architecture: process.env.STRIPE_PRICE_ULTIMATE || process.env.STRIPE_PRICE_ARCHITECTURE || '',
  build: process.env.STRIPE_PRICE_ULTIMATE || process.env.STRIPE_PRICE_BUILD || '',
  release: process.env.STRIPE_PRICE_ULTIMATE || process.env.STRIPE_PRICE_RELEASE || '',
  improve: process.env.STRIPE_PRICE_ULTIMATE || process.env.STRIPE_PRICE_IMPROVE || '',
  compound: process.env.STRIPE_PRICE_ULTIMATE || process.env.STRIPE_PRICE_COMPOUND || '',
  ultimate: process.env.STRIPE_PRICE_ULTIMATE || '', // Unified product
};

interface CheckoutRequest {
  pillar: string;
  customerEmail?: string;
  customerName?: string;
  diagnosticScore?: number;
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
    const { pillar, customerEmail, customerName, diagnosticScore }: CheckoutRequest = req.body;

    if (!pillar) {
      return res.status(400).json({ error: 'Missing pillar parameter' });
    }

    const priceId = STRIPE_PRICES[pillar.toLowerCase()];

    if (!priceId) {
      return res.status(400).json({ error: `Invalid pillar: ${pillar}` });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: 'Stripe not configured' });
    }

    // Get the origin for success/cancel URLs
    const origin = req.headers.origin || req.headers.referer || 'http://localhost:5173';
    const baseUrl = origin.replace(/\/$/, ''); // Remove trailing slash

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `https://go.lloydgtm.com/login?purchased=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/ultimate-growth-architect?pillar=${pillar}`,
      customer_email: customerEmail,
      metadata: {
        pillar,
        customerName: customerName || '',
        diagnosticScore: diagnosticScore?.toString() || '',
      },
      allow_promotion_codes: true,
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }
}
