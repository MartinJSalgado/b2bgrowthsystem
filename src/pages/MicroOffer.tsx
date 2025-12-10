import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight, CheckCircle2, Zap, Clock, Target } from "lucide-react";
import { motion } from "motion/react";
import { createCheckoutSession } from "../utils/stripe";

interface OfferContent {
  pillar: string;
  title: string;
  price: string;
  headline: string;
  subheadline: string;
  outcome: string;
  deliverables: string[];
  benefits: string[];
  transformation: string;
  painPoints: string[];
}

const offerContent: Record<string, OfferContent> = {
  foundation: {
    pillar: "Foundation",
    title: "Fix ICP Clarity Now",
    price: "$7",
    headline: "Eliminate Your Foundation Constraint in 10-15 Minutes",
    subheadline: "Stop messaging that confuses. Start with crystal-clear ICP definition, positioning that cuts through noise, and a value narrative people actually remember. 15 minutes. $7. Done.",
    outcome: "Go from scattered messaging to instant positioning clarity",
    deliverables: [
      "ICP clarity with psychographic + firmographic precision",
      "Unique category POV that differentiates you",
      "Value narrative that makes you memorable",
      "10-second clarity line for instant positioning",
      "Positioning test framework"
    ],
    benefits: [
      "No meetings",
      "No calls",
      "No consulting",
      "No homework",
      "No guessing"
    ],
    transformation: "15 minutes replaces 6 months of positioning confusion.",
    painPoints: [
      "Your messaging fluctuates and feels inconsistent",
      "Your funnel requires constant force and hustle",
      "Every tactic feels random and disconnected",
      "Results come in waves instead of predictable flow"
    ]
  },
  architecture: {
    pillar: "Architecture",
    title: "Fix Buyer Journey Flow",
    price: "$9",
    headline: "Eliminate Your Architecture Constraint in 10-15 Minutes",
    subheadline: "Stop losing prospects in the cracks. Build a mapped buyer journey that turns strangers into customers systematically, not randomly. Know exactly what message hits at what stage. 15 minutes. $9. Done.",
    outcome: "Go from leaky funnel to systematic buyer progression",
    deliverables: [
      "Complete buyer journey with clear stages",
      "Demand pathways mapped across all channels",
      "Stage-specific messaging alignment",
      "Lead qualification criteria and scoring",
      "Funnel and CRM integration blueprint"
    ],
    benefits: [
      "No meetings",
      "No calls",
      "No consulting",
      "No homework",
      "No guessing"
    ],
    transformation: "15 minutes replaces 6 months of buyer journey confusion.",
    painPoints: [
      "Prospects fall through the cracks constantly",
      "Your sales process feels inconsistent",
      "Campaigns don't connect to revenue",
      "You can't predict pipeline accurately"
    ]
  },
  build: {
    pillar: "Build",
    title: "Fix Funnel Blueprint",
    price: "$11",
    headline: "Eliminate Your Build Constraint in 10-15 Minutes",
    subheadline: "Stop rebuilding from scratch every time. Get documented workflows, systematized content production, and a funnel that runs without you. Stop hustling. Start systematizing. 15 minutes. $11. Done.",
    outcome: "Go from individual dependency to repeatable system",
    deliverables: [
      "Documented core GTM workflows",
      "Systematized content production process",
      "Conversion system logic and architecture",
      "Automation and tech stack integration map",
      "Team onboarding playbook foundation"
    ],
    benefits: [
      "No meetings",
      "No calls",
      "No consulting",
      "No homework",
      "No guessing"
    ],
    transformation: "15 minutes replaces 6 months of process chaos.",
    painPoints: [
      "Growth depends on specific individuals",
      "Onboarding new team members takes months",
      "Campaigns feel like starting from scratch each time",
      "Execution never matches the plan"
    ]
  },
  release: {
    pillar: "Release",
    title: "Fix Demand Activation",
    price: "$7",
    headline: "Eliminate Your Release Constraint in 10-15 Minutes",
    subheadline: "Stop gambling on every launch. Get a repeatable activation playbook that turns campaigns into predictable pipeline, not random bursts. Know what works before you push. 15 minutes. $7. Done.",
    outcome: "Go from launch chaos to predictable demand generation",
    deliverables: [
      "Systematic launch and activation process",
      "Repeatable campaign frameworks you can deploy",
      "Distribution tied to narrative strategy",
      "Coordinated inbound and outbound efforts",
      "Channel activation playbook"
    ],
    benefits: [
      "No meetings",
      "No calls",
      "No consulting",
      "No homework",
      "No guessing"
    ],
    transformation: "15 minutes replaces 6 months of activation chaos.",
    painPoints: [
      "Launches feel like gambling every time",
      "Demand comes in unpredictable bursts",
      "Channels consistently underperform",
      "Activation requires constant hustle"
    ]
  },
  improve: {
    pillar: "Improve",
    title: "Fix KPI Flow",
    price: "$7",
    headline: "Eliminate Your Improve Constraint in 10-15 Minutes",
    subheadline: "Stop flying blind. Get KPIs that actually drive decisions, not vanity metrics. Know what's working, what's broken, and what to fix next. Data becomes clarity. 15 minutes. $7. Done.",
    outcome: "Go from guessing to data-driven optimization",
    deliverables: [
      "Weekly or bi-weekly optimization loop framework",
      "KPIs that actually drive decisions (not vanity metrics)",
      "Clean data flow from touch to close",
      "Working attribution system blueprint",
      "Systematic testing and iteration process"
    ],
    benefits: [
      "No meetings",
      "No calls",
      "No consulting",
      "No homework",
      "No guessing"
    ],
    transformation: "15 minutes replaces 6 months of data blindness.",
    painPoints: [
      "You can't diagnose what's actually broken",
      "Decisions feel like guesses, not data-driven",
      "You repeat the same mistakes over and over",
      "Optimization never actually happens"
    ]
  },
  compound: {
    pillar: "Compound",
    title: "Fix Compounding System",
    price: "$5",
    headline: "Eliminate Your Compound Constraint in 10-15 Minutes",
    subheadline: "Stop starting from zero every month. Build owned assets that grow in value over time. Your content works for you while you sleep. Effort compounds, not resets. 15 minutes. $5. Done.",
    outcome: "Go from rented attention to owned equity",
    deliverables: [
      "Owned media asset strategy (not rented channels)",
      "Category POV and distinctive voice",
      "Thought leadership system design",
      "Content that compounds over time",
      "Brand equity building framework"
    ],
    benefits: [
      "No meetings",
      "No calls",
      "No consulting",
      "No homework",
      "No guessing"
    ],
    transformation: "15 minutes replaces 6 months of starting from zero.",
    painPoints: [
      "Every month you start at zero",
      "Your content doesn't build long-term equity",
      "Competitors with less effort outpace you",
      "Growth plateaus despite more input"
    ]
  }
};

export default function MicroOffer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pillar = searchParams.get('pillar') || 'foundation';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const content = offerContent[pillar] || offerContent.foundation;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pillar]);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await createCheckoutSession(pillar);
      // The function will redirect to Stripe Checkout
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-0">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-black via-black to-black/95 text-white">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <span className="inline-block bg-[#07C1D8] text-black px-6 py-2 rounded-full text-sm font-black tracking-wider">
                {content.pillar.toUpperCase()} CONSTRAINT DETECTED
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl mb-8 tracking-[-0.02em] leading-[0.95] font-black text-center"
            >
              {content.headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed font-medium text-center max-w-4xl mx-auto"
            >
              {content.subheadline}
            </motion.p>

            {/* Price + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm text-white/60 mb-2">THE ULTIMATE GROWTH ARCHITECT</p>
                  <h2 className="text-3xl md:text-4xl font-black">{content.title}</h2>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-black text-[#07C1D8]">{content.price}</div>
                  <p className="text-sm text-white/60 mt-1">one-time</p>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-20 rounded-xl text-2xl font-black mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : `${content.title} — ${content.price}`}
                {!isLoading && <ArrowRight size={28} className="ml-3" />}
              </Button>

              {error && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
                  <p className="text-red-200 text-sm font-medium text-center">{error}</p>
                </div>
              )}

              <p className="text-center text-white/50 text-sm">
                Instant access · No meetings · No calls · Pure clarity
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="px-6 py-20 bg-red-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-black">
              This explains why...
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.painPoints.map((pain, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white border-2 border-red-200 rounded-xl p-6"
                >
                  <p className="text-lg font-medium text-black/80 leading-relaxed">
                    {pain}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-black">
              What You'll Build in 60 Minutes
            </h2>
            <div className="space-y-6">
              {content.deliverables.map((deliverable, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex items-start gap-4 bg-black/[0.02] border border-black/10 rounded-xl p-6"
                >
                  <CheckCircle2 size={28} className="text-[#07C1D8] flex-shrink-0 mt-1" />
                  <p className="text-xl font-bold text-black/90">{deliverable}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-6 py-20 bg-black/[0.02]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-black">
              The Process
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#07C1D8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-black">1. Click & Access</h3>
                <p className="text-black/60 font-medium leading-relaxed">
                  Purchase and get instant access to The Ultimate Growth Architect
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#07C1D8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-black">2. Sprint Session</h3>
                <p className="text-black/60 font-medium leading-relaxed">
                  Complete a guided 30-60 minute clarity sprint (not chatting, building)
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#07C1D8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-black">3. Get Clarity</h3>
                <p className="text-black/60 font-medium leading-relaxed">
                  Walk away with documented clarity and your next step forward
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-black via-black to-black/95 text-white rounded-2xl p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
                This is NOT Consulting
              </h2>
              <div className="grid md:grid-cols-5 gap-6 mb-12">
                {content.benefits.map((benefit, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-lg font-black text-white/90">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/20 pt-12">
                <p className="text-3xl md:text-4xl font-black text-center text-[#07C1D8] mb-6">
                  {content.transformation}
                </p>
                <p className="text-xl text-white/80 font-medium text-center">
                  No wasted time. No empty calls. Just structured clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-6 py-20 bg-gradient-to-b from-black via-black to-black/95 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-black mb-8">
                Ready to eliminate your<br />{content.pillar} constraint?
              </h2>
              <p className="text-2xl text-white/80 mb-12 font-medium">
                {content.price} · 10-15 minutes · Instant clarity
              </p>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-8 mb-8">
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-20 rounded-xl text-2xl font-black mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loading...' : `${content.title} — ${content.price}`}
                  {!isLoading && <ArrowRight size={28} className="ml-3" />}
                </Button>

                {error && (
                  <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
                    <p className="text-red-200 text-sm font-medium text-center">{error}</p>
                  </div>
                )}

                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <p className="text-white/90 font-medium leading-relaxed">
                    If it doesn't produce clarity, don't escalate.<br />
                    <span className="font-black text-white">No pressure. No pitches. Just truth.</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/diagnostic')}
                className="text-white/60 hover:text-white/80 font-medium underline transition-colors"
              >
                ← Back to Diagnostic Results
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
