# B2B Growth System - Diagnostic Funnel

A direct-response landing page and Growth Gap Diagnostic tool for b2bgrowthsystem.com

## 🎯 Purpose

This is NOT a homepage. It's a single-focus diagnostic funnel with one job: **get diagnostic completions**.

## 🏗️ Structure

### Landing Page
- Hero - "Is your growth misaligned?"
- Micro Pain Agitation
- Promise
- Value of Insight
- Proof
- FAQ
- Final CTA

**Key Design Principles:**
- ❌ NO header menu
- ❌ NO footer navigation
- ❌ NO competing CTAs
- ✅ ONE JOB: Get people to start the diagnostic

### Diagnostic Experience
30-question assessment across 6 FABRIC categories:
- Foundation
- Architecture
- Build
- Release
- Improve
- Compound

### Score Zones & Offers

| Score | Diagnosis | Offer | Price |
|-------|-----------|-------|-------|
| 0-45 | Broken Foundation | Architectural Clarity Lab | $3K-$7.5K |
| 45-70 | Mid-System Misalignment | System Design Intensive | $7.5K-$15K |
| 70-90 | Structural Readiness | Full Growth Architecture Roadmap | $47K |
| 90+ | Compounding System | Complete Growth System | Custom |

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your One Path (GoHighLevel) credentials:

```env
ONEPATH_API_KEY="your-api-key-here"
ONEPATH_LOCATION_ID="your-location-id-here"
```

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 4. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
b2bgrowthsystem/
├── src/
│   ├── components/
│   │   ├── landing/          # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── PainAgitation.tsx
│   │   │   ├── Promise.tsx
│   │   │   ├── ValueOfInsight.tsx
│   │   │   ├── Proof.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── FinalCTA.tsx
│   │   └── ui/               # Reusable UI components
│   │       ├── button.tsx
│   │       └── utils.ts
│   ├── pages/
│   │   ├── Landing.tsx       # Main landing page
│   │   ├── Diagnostic.tsx    # Diagnostic assessment
│   │   ├── ClarityLab.tsx    # $3K-$7.5K offer
│   │   ├── SystemIntensive.tsx  # $7.5K-$15K offer
│   │   ├── ArchitectureRoadmap.tsx  # $47K offer
│   │   └── CompleteSystem.tsx   # 90+ score offer
│   ├── utils/
│   │   └── onepath.ts        # API integration
│   ├── App.tsx               # Router
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── api/
│   └── submit-form.ts        # Serverless API endpoint
└── public/                   # Static assets
```

## 🔌 API Integration

The diagnostic uses GoHighLevel (One Path) for CRM integration:

- **Contact Creation**: Saves name, email, company
- **Custom Fields**: Stores diagnostic score and answers
- **Opportunity Creation**: Creates pipeline entry for sales follow-up
- **Tags**: Auto-tags based on score range

## 🎨 Customization

### Update Calendly/Purchase Links

Edit the offer pages to add your own booking/purchase links:

- `src/pages/ClarityLab.tsx` - Line 76
- `src/pages/SystemIntensive.tsx` - Lines 83-88
- `src/pages/ArchitectureRoadmap.tsx` - Lines 101-108

### Modify Score Zones

Edit `src/pages/Diagnostic.tsx`, function `getDiagnosis()` (lines 283-340)

## 📊 Performance

Build optimizations included:
- Route-based code splitting
- Manual chunk splitting for vendor libraries
- Lazy loading for all pages
- Optimized Tailwind CSS
- Minified production builds

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Or use Vercel CLI:

```bash
npx vercel
```

## 🔒 Security

- API keys are server-side only (never exposed to client)
- Serverless function handles all external API calls
- Environment variables required for production

## 📝 License

Proprietary - Influential B2B

## 🤝 Support

For questions or issues, contact [your-email@domain.com]
