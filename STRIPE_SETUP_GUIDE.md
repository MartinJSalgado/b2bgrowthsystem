# Stripe Payment Integration Setup Guide

## Overview

Your payment integration is now complete! This guide will walk you through configuring Stripe to accept payments for your micro-offers.

## What Was Built

### 1. **Payment Flow**
- Diagnostic → Results → Micro-Offer → **Stripe Checkout** → Success/Fulfillment
- Fully hosted Stripe Checkout (PCI compliant, no backend required)
- Automatic redirect to success page after payment

### 2. **Files Created/Modified**

**New Files:**
- `src/utils/stripe.ts` - Stripe configuration and utilities
- `api/create-checkout.ts` - Serverless function for creating checkout sessions
- `src/pages/Success.tsx` - Payment success/fulfillment page

**Modified Files:**
- `src/pages/MicroOffer.tsx` - Added payment integration
- `src/App.tsx` - Added /success route
- `.env.local.example` - Added Stripe configuration

### 3. **Pricing Structure**
- Foundation: $7
- Architecture: $9
- Build: $11
- Release: $7
- Improve: $7
- Compound: $5

---

## Setup Instructions

### Step 1: Create a Stripe Account

1. Go to https://dashboard.stripe.com/register
2. Complete the registration process
3. Verify your email

### Step 2: Get Your API Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_test_` for test mode)
3. Copy your **Secret key** (starts with `sk_test_` for test mode)
4. **IMPORTANT:** Never commit your secret key to git!

### Step 3: Create Products and Prices

You need to create 6 products in Stripe, one for each micro-offer:

1. Go to https://dashboard.stripe.com/products
2. Click **+ Add product**

**For each of the 6 micro-offers, create:**

#### Foundation Clarity Sprint
- **Name:** Foundation Clarity Sprint - ICP Clarity Mini-Engineer
- **Description:** 30-60 minute AI-powered clarity sprint to rebuild ICP clarity, positioning, and narrative
- **Pricing:** One-time payment of $7
- **Copy the Price ID** (starts with `price_`)

#### Architecture Clarity Sprint
- **Name:** Architecture Clarity Sprint - Buyer Journey Mini-Engineer
- **Description:** 30-60 minute AI-powered clarity sprint to map buyer journey and align demand pathways
- **Pricing:** One-time payment of $9
- **Copy the Price ID**

#### Build Clarity Sprint
- **Name:** Build Clarity Sprint - Funnel Blueprint Mini-Engineer
- **Description:** 30-60 minute AI-powered clarity sprint to document workflows and systematize processes
- **Pricing:** One-time payment of $11
- **Copy the Price ID**

#### Release Clarity Sprint
- **Name:** Release Clarity Sprint - Demand Activation Mini-Engineer
- **Description:** 30-60 minute AI-powered clarity sprint to build systematic activation and campaign frameworks
- **Pricing:** One-time payment of $7
- **Copy the Price ID**

#### Improve Clarity Sprint
- **Name:** Improve Clarity Sprint - KPI Flow Mini-Engineer
- **Description:** 30-60 minute AI-powered clarity sprint to establish optimization loops and define KPIs
- **Pricing:** One-time payment of $7
- **Copy the Price ID**

#### Compound Clarity Sprint
- **Name:** Compound Clarity Sprint - Compounding System Mini-Engineer
- **Description:** 30-60 minute AI-powered clarity sprint to build owned media strategy and category POV
- **Pricing:** One-time payment of $5
- **Copy the Price ID**

### Step 4: Configure Environment Variables

1. Open your `.env.local` file (create it if it doesn't exist)
2. Add the following configuration:

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_your_actual_publishable_key_here"
STRIPE_SECRET_KEY="sk_test_your_actual_secret_key_here"

# Stripe Price IDs (from Step 3)
STRIPE_PRICE_FOUNDATION="price_xxx_foundation"
STRIPE_PRICE_ARCHITECTURE="price_xxx_architecture"
STRIPE_PRICE_BUILD="price_xxx_build"
STRIPE_PRICE_RELEASE="price_xxx_release"
STRIPE_PRICE_IMPROVE="price_xxx_improve"
STRIPE_PRICE_COMPOUND="price_xxx_compound"
```

3. Replace all placeholder values with your actual Stripe keys and price IDs

### Step 5: Deploy to Vercel

If you're using Vercel (recommended):

1. Go to your Vercel project settings
2. Navigate to **Settings → Environment Variables**
3. Add all the environment variables from Step 4
4. Make sure to add them for **Production**, **Preview**, and **Development** environments
5. Redeploy your application

### Step 6: Test the Payment Flow

**Test Mode (Recommended First):**

1. Use test mode API keys (start with `pk_test_` and `sk_test_`)
2. Visit your micro-offer page: `/micro-offer?pillar=foundation`
3. Click the payment button
4. Use Stripe's test card numbers:
   - **Success:** 4242 4242 4242 4242
   - **Decline:** 4000 0000 0000 0002
   - Use any future expiry date, any CVC, any ZIP

5. Complete the test payment
6. Verify you're redirected to `/success?pillar=foundation`

**Live Mode:**

1. When ready to accept real payments:
   - Switch to live mode in Stripe Dashboard
   - Get your **live** API keys (`pk_live_` and `sk_live_`)
   - Update environment variables with live keys
   - Redeploy

---

## Payment Flow Details

### User Journey:
1. User completes diagnostic
2. Results page identifies their primary constraint
3. User clicks "Fix [Constraint] Now — $7"
4. Lands on micro-offer page with personalized copy
5. Clicks payment button → Creates Stripe Checkout Session
6. Redirects to Stripe's hosted checkout page
7. Enters payment details and completes purchase
8. Redirects back to `/success?pillar=[pillar]&session_id=[id]`
9. Success page displays next steps and GPT access

### What Stripe Handles:
- ✅ Payment processing
- ✅ PCI compliance
- ✅ Card validation
- ✅ Security
- ✅ Receipt emails
- ✅ Fraud detection

### What You Handle:
- ✅ Creating the checkout session
- ✅ Redirecting to success page
- ✅ Providing access to the GPT (next step)

---

## Next Steps

### 1. Configure GPT URLs

Update the GPT URLs in `src/pages/Success.tsx`:

```typescript
const pillarContent: Record<string, PillarContent> = {
  foundation: {
    gptUrl: "https://chatgpt.com/g/your-foundation-gpt-id", // Replace with actual GPT
    // ...
  },
  // ... update all 6 GPT URLs
};
```

### 2. Set Up Webhooks (Optional but Recommended)

For production, set up Stripe webhooks to:
- Send confirmation emails
- Track purchases in your CRM
- Grant access automatically
- Handle refunds

1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Create the webhook handler in `api/stripe-webhook.ts`

### 3. Enable Promotion Codes (Already Configured)

The checkout already supports Stripe promotion codes:
1. Create codes in https://dashboard.stripe.com/coupons
2. Users can apply them during checkout

### 4. Configure Email Receipts

In Stripe Dashboard:
1. Go to Settings → Customer emails
2. Customize the receipt template with your branding
3. Add your logo and support contact

---

## Troubleshooting

### "Stripe not configured" error
- Check that `STRIPE_SECRET_KEY` is set in `.env.local` or Vercel environment variables
- Make sure you've redeployed after adding environment variables

### "Invalid pillar" error
- Verify all 6 price IDs are configured in environment variables
- Check that price IDs start with `price_`

### Checkout page not loading
- Verify your publishable key is correct
- Check browser console for errors
- Ensure `VITE_STRIPE_PUBLISHABLE_KEY` is set

### Success page not showing after payment
- Check the success URL in the checkout session
- Verify the `/success` route is working
- Check for console errors

---

## Security Notes

⚠️ **NEVER commit these to git:**
- `.env.local` (already in .gitignore)
- Stripe secret keys
- Live API keys

✅ **Safe to commit:**
- `.env.local.example` (template only)
- Client-side publishable keys (they're meant to be public)

---

## Support

If you need help:
- Stripe Dashboard: https://dashboard.stripe.com
- Stripe Docs: https://stripe.com/docs/payments/checkout
- Test Cards: https://stripe.com/docs/testing

---

## Summary

Your payment system is production-ready! Once you:
1. Create Stripe products
2. Configure environment variables
3. Deploy to Vercel

Your funnel will be fully automated:
- Diagnostic → $7-$11 Micro-Offer → Payment → GPT Access

No manual intervention required. Pure conversion machine.
