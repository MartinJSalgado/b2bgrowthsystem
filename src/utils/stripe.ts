import { loadStripe, Stripe } from '@stripe/stripe-js';

// Load Stripe instance
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    // VITE_ prefix exposes this to the browser - this is intentional and SAFE
    // Stripe publishable keys (pk_*) are designed to be public
    // They can only create checkout sessions, not charge cards
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error('Stripe publishable key not found. Please add VITE_STRIPE_PUBLISHABLE_KEY to your .env.local file');
      return null;
    }

    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Price amounts for display (in dollars)
// These are hardcoded here for the UI, but actual Stripe prices are configured server-side
// All products now unified at $7 with The Ultimate Growth Architect
export const PRICE_AMOUNTS: Record<string, number> = {
  foundation: 7,
  architecture: 7,
  build: 7,
  release: 7,
  improve: 7,
  compound: 7,
  ultimate: 7, // Unified product
};

// Create checkout session
export const createCheckoutSession = async (
  pillar: string,
  customerEmail?: string,
  customerName?: string,
  diagnosticScore?: number
) => {
  try {
    // Call the serverless function to create a Stripe Checkout Session
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pillar,
        customerEmail,
        customerName,
        diagnosticScore,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const { url, sessionId } = await response.json();

    if (!url) {
      throw new Error('No checkout URL returned');
    }

    // Redirect to Stripe Checkout
    window.location.href = url;

    return { sessionId, url };
  } catch (error: any) {
    console.error('Checkout error:', error);
    throw new Error(error.message || 'Failed to start checkout. Please try again.');
  }
};

// Helper to get success URL
export const getSuccessUrl = (pillar: string) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/success?pillar=${pillar}`;
};

// Helper to get cancel URL
export const getCancelUrl = () => {
  return window.location.href;
};
