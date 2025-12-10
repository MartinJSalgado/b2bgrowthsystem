import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CheckCircle2, Zap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface PillarContent {
  pillar: string;
  title: string;
  gptName: string;
  gptUrl: string; // Will be configured later
  nextSteps: string[];
}

// Master GPT URL - same for all pillars
const MASTER_GPT_URL = "https://chatgpt.com/g/g-6938cc85fb648191b3e7addd15bb43d8-the-ultimate-growth-architect";
const MASTER_GPT_NAME = "The Ultimate Growth Architect";

const pillarContent: Record<string, PillarContent> = {
  foundation: {
    pillar: "Foundation",
    title: "ICP Clarity Sprint",
    gptName: MASTER_GPT_NAME,
    gptUrl: MASTER_GPT_URL,
    nextSteps: [
      "Tell The Ultimate Growth Architect you want to fix your Foundation constraint",
      "Complete the guided clarity sprint",
      "Define your ICP with precision",
      "Build your unique POV and positioning",
      "Get your documented clarity and next steps"
    ]
  },
  architecture: {
    pillar: "Architecture",
    title: "Buyer Journey Sprint",
    gptName: MASTER_GPT_NAME,
    gptUrl: MASTER_GPT_URL,
    nextSteps: [
      "Tell The Ultimate Growth Architect you want to fix your Architecture constraint",
      "Complete the guided clarity sprint",
      "Map your complete buyer journey",
      "Align demand pathways across channels",
      "Get your documented clarity and next steps"
    ]
  },
  build: {
    pillar: "Build",
    title: "Funnel Blueprint Sprint",
    gptName: MASTER_GPT_NAME,
    gptUrl: MASTER_GPT_URL,
    nextSteps: [
      "Tell The Ultimate Growth Architect you want to fix your Build constraint",
      "Complete the guided clarity sprint",
      "Document your core GTM workflows",
      "Systematize content production",
      "Get your documented clarity and next steps"
    ]
  },
  release: {
    pillar: "Release",
    title: "Demand Activation Sprint",
    gptName: MASTER_GPT_NAME,
    gptUrl: MASTER_GPT_URL,
    nextSteps: [
      "Tell The Ultimate Growth Architect you want to fix your Release constraint",
      "Complete the guided clarity sprint",
      "Build systematic activation process",
      "Create repeatable campaign frameworks",
      "Get your documented clarity and next steps"
    ]
  },
  improve: {
    pillar: "Improve",
    title: "KPI Flow Sprint",
    gptName: MASTER_GPT_NAME,
    gptUrl: MASTER_GPT_URL,
    nextSteps: [
      "Tell The Ultimate Growth Architect you want to fix your Improve constraint",
      "Complete the guided clarity sprint",
      "Establish optimization loops",
      "Define decision-driving KPIs",
      "Get your documented clarity and next steps"
    ]
  },
  compound: {
    pillar: "Compound",
    title: "Compounding System Sprint",
    gptName: MASTER_GPT_NAME,
    gptUrl: MASTER_GPT_URL,
    nextSteps: [
      "Tell The Ultimate Growth Architect you want to fix your Compound constraint",
      "Complete the guided clarity sprint",
      "Build owned media strategy",
      "Establish category POV",
      "Get your documented clarity and next steps"
    ]
  }
};

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pillar = searchParams.get('pillar') || 'foundation';
  const sessionId = searchParams.get('session_id');
  const [isVerified, setIsVerified] = useState(false);

  const content = pillarContent[pillar] || pillarContent.foundation;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // In production, verify the session_id with your backend
    // For now, we'll just set it to verified if session_id exists
    if (sessionId) {
      setIsVerified(true);
    } else {
      setIsVerified(true); // Allow direct access for now
    }
  }, [sessionId]);

  const handleAccessGPT = () => {
    // Open the GPT in a new tab
    window.open(content.gptUrl, '_blank');
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#07C1D8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black/60 font-medium">Verifying your purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-black/95 text-white">
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-center mb-12"
          >
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(34, 197, 94, 0.7)",
                  "0 0 0 20px rgba(34, 197, 94, 0)",
                  "0 0 0 0 rgba(34, 197, 94, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <CheckCircle2 size={80} className="text-white" />
            </motion.div>
            <motion.h1
              className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-green-400 via-[#07C1D8] to-green-400 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              You're In! 🎉
            </motion.h1>
            <p className="text-3xl text-white font-black mb-3">
              Your {content.title} Access is Ready
            </p>
            <p className="text-xl text-white/70 font-medium">
              Click below to launch The Ultimate Growth Architect
            </p>
          </motion.div>

          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 border-2 border-[#07C1D8] rounded-2xl p-8 md:p-12 mb-12 relative"
            style={{
              boxShadow: "0 0 40px rgba(7, 193, 216, 0.3)"
            }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#07C1D8] rounded-full mb-6">
                <Zap size={32} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Launch The Ultimate Growth Architect
              </h2>
              <p className="text-xl text-white/80 font-medium">
                Your AI-powered clarity sprint is ready to begin
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleAccessGPT}
                className="w-full bg-gradient-to-r from-[#07C1D8] to-[#06a8bd] text-white hover:from-[#06a8bd] hover:to-[#07C1D8] h-24 rounded-xl text-2xl font-black mb-6 shadow-2xl relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  🚀 Launch {content.gptName}
                  <ArrowRight size={32} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </motion.div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <p className="text-white/90 font-medium text-center leading-relaxed">
                This is not a chatbot. This is an AI Growth Architect that will guide you through<br />
                a structured clarity sprint to fix your {content.pillar} constraint.
              </p>
            </div>
          </motion.div>

          {/* What to Expect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 mb-12"
          >
            <h3 className="text-2xl font-black mb-6 text-center">What to Expect</h3>
            <div className="space-y-4">
              {content.nextSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#07C1D8] rounded-full flex items-center justify-center font-black text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-lg text-white/90 font-medium pt-1">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Important Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 mb-12"
          >
            <h3 className="text-xl font-black mb-4">Important:</h3>
            <ul className="space-y-3 text-white/80 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-[#07C1D8] mt-1">•</span>
                <span>Your GPT session is available immediately and indefinitely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#07C1D8] mt-1">•</span>
                <span>Block 10-15 uninterrupted minutes to complete the sprint</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#07C1D8] mt-1">•</span>
                <span>You'll receive a confirmation email with your access link</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#07C1D8] mt-1">•</span>
                <span>If you need support, email support@b2bgrowthsystem.com</span>
              </li>
            </ul>
          </motion.div>

          {/* After Clarity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center"
          >
            <h3 className="text-2xl font-black mb-4">After Your Clarity Sprint</h3>
            <p className="text-lg text-white/80 font-medium mb-6 leading-relaxed">
              The Ultimate Growth Architect will assess if you're ready for the full Architecture Roadmap<br />
              or if you need to address another constraint first.
            </p>
            <p className="text-white/60 font-medium">
              No pressure. No pitches. Just logical next steps.
            </p>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => navigate('/')}
              className="text-white/60 hover:text-white/80 font-medium underline transition-colors"
            >
              ← Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
