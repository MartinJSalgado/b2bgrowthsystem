import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { submitToOnePath } from "../utils/onepath";

interface Question {
  id: string;
  text: string;
  category: string;
  description?: string;
}

const questions: Question[] = [
  // Foundation (F)
  { id: "f1", text: "Our positioning is clear, specific, and differentiated (not generic)", category: "Foundation", description: "Can you explain exactly who you serve and what makes you different in one sentence?" },
  { id: "f2", text: "We have a compelling narrative that makes us memorable", category: "Foundation", description: "Do prospects remember your story, or does it sound like everyone else?" },
  { id: "f3", text: "Our ICP is narrowly defined with psychographic + firmographic clarity", category: "Foundation", description: "Can you describe your ideal customer beyond just company size and industry?" },
  { id: "f4", text: "We own a distinct category or point of view in our market", category: "Foundation", description: "Are you known for a specific perspective, or are you just another vendor?" },
  { id: "f5", text: "Our value proposition is instantly clear to our target buyer", category: "Foundation", description: "Within 10 seconds, can your prospect understand the value you deliver?" },

  // Architecture (A)
  { id: "a1", text: "We have a documented buyer journey with clear stages", category: "Architecture", description: "Do you know exactly what happens at each stage from awareness to customer?" },
  { id: "a2", text: "Our demand pathways are mapped and integrated across channels", category: "Architecture", description: "Can you trace how prospects move between channels and touchpoints?" },
  { id: "a3", text: "Our funnel and CRM are properly aligned and configured", category: "Architecture", description: "Does your tech stack match your actual sales process and buyer journey?" },
  { id: "a4", text: "We have clear lead qualification criteria and scoring", category: "Architecture", description: "Can you instantly tell if a lead is worth pursuing based on objective criteria?" },
  { id: "a5", text: "Our messaging is consistent across all touchpoints", category: "Architecture", description: "Does your brand voice and message stay consistent from ads to sales calls?" },

  // Build (B)
  { id: "b1", text: "We have documented workflows for our core GTM processes", category: "Build", description: "Can someone new follow your processes without needing to ask questions?" },
  { id: "b2", text: "We have consistent content production across key channels", category: "Build", description: "Is content creation systematic, or does it depend on individual heroics?" },
  { id: "b3", text: "Our conversion system works systematically (not just hustle)", category: "Build", description: "Do conversions happen through process, or through sheer willpower?" },
  { id: "b4", text: "Our automation and tech stack are properly integrated", category: "Build", description: "Do your tools work together seamlessly, or are they held together with duct tape?" },
  { id: "b5", text: "We can onboard new team members to our system easily", category: "Build", description: "Can new hires be productive quickly, or does ramp time take months?" },

  // Release (R)
  { id: "r1", text: "We have a systematic activation and launch process", category: "Release", description: "Do launches follow a proven playbook, or is each one built from scratch?" },
  { id: "r2", text: "Our demand generation runs on a predictable system", category: "Release", description: "Can you forecast pipeline creation, or is it unpredictable month-to-month?" },
  { id: "r3", text: "Content and distribution are tied to our narrative strategy", category: "Release", description: "Does every piece of content reinforce your positioning and POV?" },
  { id: "r4", text: "We have repeatable campaign frameworks we can deploy", category: "Release", description: "Can you quickly spin up new campaigns using proven templates?" },
  { id: "r5", text: "Our outbound and inbound strategies are coordinated", category: "Release", description: "Do your outbound and inbound efforts work together, or operate in silos?" },

  // Improve (I)
  { id: "i1", text: "We run weekly or bi-weekly optimization loops", category: "Improve", description: "Do you regularly review and improve your systems, or just react to problems?" },
  { id: "i2", text: "We have clear KPIs that actually drive decisions", category: "Improve", description: "Are your metrics actionable, or just vanity numbers on a dashboard?" },
  { id: "i3", text: "Our data flows cleanly from touch to close", category: "Improve", description: "Can you track a lead from first touch through to closed deal?" },
  { id: "i4", text: "We have working attribution (we know what drives pipeline)", category: "Improve", description: "Can you confidently say which channels and campaigns generate revenue?" },
  { id: "i5", text: "We systematically test and iterate our approach", category: "Improve", description: "Do you run structured experiments, or just try random tactics?" },

  // Compound (C)
  { id: "c1", text: "We consistently build owned media assets (not just rented)", category: "Compound", description: "Are you building long-term equity, or paying rent on platforms you don't control?" },
  { id: "c2", text: "We have a clear category POV that we're known for", category: "Compound", description: "When prospects think of your category, does your brand come to mind?" },
  { id: "c3", text: "Our thought leadership creates long-term demand", category: "Compound", description: "Does your content continue generating leads months after publishing?" },
  { id: "c4", text: "Our brand recognition is growing in our target market", category: "Compound", description: "Are more prospects finding you already familiar with your brand?" },
  { id: "c5", text: "Our content and reputation compound over time", category: "Compound", description: "Does each piece of content make the next one more effective?" },
];

const categories = ["Foundation", "Architecture", "Build", "Release", "Improve", "Compound"];

export default function Diagnostic() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const autostart = searchParams.get('autostart') === 'true';
  const [stage, setStage] = useState<"intro" | "assessment" | "gate" | "results">(autostart ? "assessment" : "intro");
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const categoryQuestions = questions.filter(q => q.category === categories[currentCategory]);
  const totalCategories = categories.length;
  const progress = ((currentCategory + 1) / totalCategories) * 100;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const canProceed = categoryQuestions.every(q => answers[q.id] !== undefined);

  const nextCategory = () => {
    if (currentCategory < totalCategories - 1) {
      setCurrentCategory(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setStage("gate");
      window.scrollTo(0, 0);
    }
  };

  const prevCategory = () => {
    if (currentCategory > 0) {
      setCurrentCategory(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const calculateScores = () => {
    const categoryScores: Record<string, number> = {};

    categories.forEach(category => {
      const catQuestions = questions.filter(q => q.category === category);
      const total = catQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      const maxScore = catQuestions.length * 5;
      categoryScores[category] = Math.round((total / maxScore) * 100);
    });

    const overallScore = Math.round(
      Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / categories.length
    );

    return { categoryScores, overallScore };
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
      e.preventDefault();
      if (email) {
        const { overallScore: calculatedScore } = calculateScores();

        const result = await submitToOnePath({
          name: name,
          email: email,
          companyName: company,
          customFields: {
            diagnosticScore: calculatedScore,
            diagnosticAnswers: JSON.stringify(answers),
            diagnosticTimestamp: new Date().toISOString()
          }
        }, 'growth-gap-diagnostic');

        // Always show results and send email, regardless of OnePath submission status
        setStage("results");
        sendDiagnosticPDF();

        if (!result.success) {
          console.warn('OnePath submission failed, but continuing with diagnostic results');
        }
      }
    };

  const { categoryScores, overallScore } = stage === "results" ? calculateScores() : { categoryScores: {}, overallScore: 0 };

  const radarData = categories.map(cat => ({
    category: cat,
    score: categoryScores[cat] || 0
  }));

  const barData = categories.map(cat => ({
    name: cat.charAt(0),
    score: categoryScores[cat] || 0,
    fullName: cat
  }));

  const getBottlenecks = () => {
    const sorted = Object.entries(categoryScores).sort((a, b) => a[1] - b[1]);
    return sorted.slice(0, 3).map(([cat, score]) => ({ category: cat, score }));
  };

  const getPrimaryConstraint = () => {
    const sorted = Object.entries(categoryScores).sort((a, b) => a[1] - b[1]);
    return { category: sorted[0][0], score: sorted[0][1] };
  };

    const sendDiagnosticPDF = async () => {
      const { categoryScores: scores, overallScore: score } = calculateScores();
      const bottlenecks = getBottlenecks();
      const primaryConstraint = getPrimaryConstraint();
      const diagnosis = getDiagnosis();

      try {
        await fetch('/api/send-diagnostic-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            company,
            overallScore: score,
            categoryScores: scores,
            bottlenecks,
            primaryConstraint,
            diagnosis
          })
        });
        console.log('✅ Diagnostic PDF sent successfully');
      } catch (error) {
        console.error('Failed to send diagnostic PDF:', error);
        // Don't block the user experience if email fails
      }
    };

  const getEmotionalMirror = (category: string) => {
    const mirrors: Record<string, { why: string; truth: string }> = {
      "Foundation": {
        why: "This explains why your messaging fluctuates…\nwhy your funnel requires force…\nwhy every tactic feels random…\nwhy results come in waves instead of flow.",
        truth: "This is not a skill issue.\nThis is architectural misalignment."
      },
      "Architecture": {
        why: "This explains why prospects fall through the cracks…\nwhy your sales process feels inconsistent…\nwhy campaigns don't connect to revenue…\nwhy you can't predict pipeline.",
        truth: "This is not a marketing issue.\nThis is structural fragmentation."
      },
      "Build": {
        why: "This explains why growth depends on individuals…\nwhy onboarding takes months…\nwhy campaigns feel like starting from scratch…\nwhy execution never matches the plan.",
        truth: "This is not a people issue.\nThis is system absence."
      },
      "Release": {
        why: "This explains why launches feel like gambling…\nwhy demand comes in unpredictable bursts…\nwhy channels underperform…\nwhy activation requires constant hustle.",
        truth: "This is not a channel issue.\nThis is activation chaos."
      },
      "Improve": {
        why: "This explains why you can't diagnose what's broken…\nwhy decisions feel like guesses…\nwhy you repeat the same mistakes…\nwhy optimization never happens.",
        truth: "This is not a data issue.\nThis is measurement blindness."
      },
      "Compound": {
        why: "This explains why every month starts at zero…\nwhy your content doesn't build equity…\nwhy competitors with less effort outpace you…\nwhy growth plateaus despite more input.",
        truth: "This is not an effort issue.\nThis is leverage absence."
      }
    };
    return mirrors[category] || { why: "", truth: "" };
  };

  const getMicroOffer = (category: string) => {
    const offers: Record<string, { title: string; price: string; outcome: string; bullets: string[] }> = {
      "Foundation": {
        title: "Fix ICP Clarity Now",
        price: "$7",
        outcome: "Rebuild ICP clarity, segment personas, write POV, define value narrative, and test positioning",
        bullets: [
          "Clarify your exact ICP with psychographic + firmographic precision",
          "Define your unique category POV",
          "Build a value narrative that makes you memorable",
          "Create your 10-second clarity line",
          "No meetings. No calls. Pure clarity."
        ]
      },
      "Architecture": {
        title: "Fix Buyer Journey Flow",
        price: "$7",
        outcome: "Map your buyer journey, align demand pathways, and design stage-specific messaging",
        bullets: [
          "Document your complete buyer journey with clear stages",
          "Map demand pathways across all channels",
          "Align messaging to each journey stage",
          "Define qualification criteria and scoring",
          "No meetings. No calls. Pure clarity."
        ]
      },
      "Build": {
        title: "Fix Funnel Blueprint",
        price: "$7",
        outcome: "Document core workflows, systematize content production, and build repeatable processes",
        bullets: [
          "Document your core GTM workflows",
          "Systematize content production process",
          "Design conversion system logic",
          "Map automation and integration needs",
          "No meetings. No calls. Pure clarity."
        ]
      },
      "Release": {
        title: "Fix Demand Activation",
        price: "$7",
        outcome: "Build systematic activation process, create repeatable campaign frameworks, and coordinate channels",
        bullets: [
          "Design systematic launch and activation process",
          "Create repeatable campaign frameworks",
          "Tie distribution to narrative strategy",
          "Coordinate inbound and outbound efforts",
          "No meetings. No calls. Pure clarity."
        ]
      },
      "Improve": {
        title: "Fix KPI Flow",
        price: "$7",
        outcome: "Establish optimization loops, define decision-driving KPIs, and build attribution clarity",
        bullets: [
          "Set up weekly or bi-weekly optimization loops",
          "Define KPIs that actually drive decisions",
          "Map clean data flow from touch to close",
          "Build working attribution system",
          "No meetings. No calls. Pure clarity."
        ]
      },
      "Compound": {
        title: "Fix Compounding System",
        price: "$7",
        outcome: "Build owned media strategy, establish category POV, and create long-term demand assets",
        bullets: [
          "Build owned media asset strategy (not rented)",
          "Establish your category POV and voice",
          "Design thought leadership system",
          "Create content that compounds over time",
          "No meetings. No calls. Pure clarity."
        ]
      }
    };
    return offers[category] || offers["Foundation"];
  };

  const getCategoryDescription = (category: string) => {
    const descriptions: Record<string, string> = {
      "Foundation": "Your market positioning, narrative, and ICP definition need strengthening. Without a solid foundation, everything else becomes harder.",
      "Architecture": "Your buyer journey, demand pathways, and funnel systems aren't properly aligned. This creates friction and lost opportunities.",
      "Build": "Your core processes lack documentation and systematization. You're relying too much on individual effort vs. repeatable systems.",
      "Release": "Your demand generation and campaign execution aren't running on predictable systems. Growth feels inconsistent.",
      "Improve": "You're missing optimization loops and clear KPIs. Without data-driven iteration, you can't improve systematically.",
      "Compound": "You're not building long-term assets. Your marketing effort isn't compounding—each month you start from zero."
    };
    return descriptions[category] || "";
  };

  const getDiagnosis = () => {
    if (overallScore < 45) {
      return {
        title: "Broken Foundation",
        description: "Your growth system needs architectural clarity at the foundation level. The fastest path forward is removing the single biggest constraint blocking everything else.",
        offer: "Architectural Clarity Lab",
        price: "$3,000 - $7,500",
        duration: "3-5 days",
        nextStep: "clarity-lab",
        ctaText: "Book Clarity Sprint",
        ctaDescription: "Get clarity on your #1 constraint"
      };
    } else if (overallScore < 70) {
      return {
        title: "Mid-System Misalignment",
        description: "You have structural issues across multiple systems. You need multi-constraint clarity + architectural direction to align your growth engine.",
        offer: "System Design Intensive",
        price: "$7,500 - $15,000",
        duration: "5-7 days",
        nextStep: "system-intensive",
        ctaText: "Purchase Sprint",
        ctaDescription: "Get architecture without full commitment"
      };
    } else if (overallScore < 90) {
      return {
        title: "Structural Readiness",
        description: "You're ready for systemic alignment. Let us design the complete architecture so you can stop guessing and start executing with confidence.",
        offer: "Full Growth Architecture Roadmap",
        price: "$47,000",
        duration: "One-time architectural investment",
        nextStep: "architecture-roadmap",
        ctaText: "Apply for Architecture",
        ctaDescription: "Complete your growth system architecture"
      };
    } else {
      return {
        title: "Compounding System",
        description: "Your architecture is strong. Now add infrastructure (One Path) + intelligence (Lloyd) to automate, scale, and compound without losing the human touch.",
        offer: "Complete Growth System",
        price: "Custom",
        duration: "Ongoing",
        nextStep: "complete-system",
        ctaText: "Activate Full System",
        ctaDescription: "Infrastructure + Automation + Intelligence"
      };
    }
  };

  const diagnosis = stage === "results" ? getDiagnosis() : null;
  const bottlenecks = stage === "results" ? getBottlenecks() : [];
  const primaryConstraint = stage === "results" ? getPrimaryConstraint() : null;
  const emotionalMirror = primaryConstraint ? getEmotionalMirror(primaryConstraint.category) : null;
  const microOffer = primaryConstraint ? getMicroOffer(primaryConstraint.category) : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage]);

  return (
    <div className="min-h-screen bg-white">
      {/* NO HEADER */}
      <div className="pt-0">
        <AnimatePresence mode="wait">
          {/* INTRO STAGE */}
          {stage === "intro" && (
            <motion.section
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-black via-black to-black/95 text-white"
            >
              <div className="max-w-4xl mx-auto text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-6xl mb-8 tracking-[-0.02em] leading-[0.95] font-black"
                >
                  The Growth Gap<br />Diagnostic
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed font-medium"
                >
                  Answer 30 questions and get your Growth Architecture Score<br />
                  + a custom 30-day roadmap.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Button
                    onClick={() => setStage("assessment")}
                    className="bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-14 md:h-16 px-6 md:px-12 rounded-lg text-base md:text-xl font-bold shadow-lg"
                  >
                    Start Diagnostic
                    <ArrowRight size={22} className="ml-3" />
                  </Button>
                  <p className="text-sm text-white/50 mt-6 font-medium">Takes 5–10 minutes · No credit card required</p>
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* ASSESSMENT STAGE */}
          {stage === "assessment" && (
            <motion.section
              key="assessment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen px-6 py-12"
            >
              <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-black/60 font-medium">
                      Section {currentCategory + 1} of {totalCategories}
                    </p>
                    <p className="text-sm text-black/60 font-medium">
                      {Math.round(progress)}% Complete
                    </p>
                  </div>
                  <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#07C1D8]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Category Title */}
                <motion.div
                  key={currentCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-12"
                >
                  <h2 className="text-4xl md:text-5xl font-black mb-4">
                    {categories[currentCategory]}
                  </h2>
                  <p className="text-lg text-black/60 font-medium">
                    Rate each statement from 0 (not at all) to 5 (absolutely true)
                  </p>
                </motion.div>

                {/* Questions */}
                <div className="space-y-10 mb-12">
                  {categoryQuestions.map((question, idx) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-black/[0.02] border border-black/10 rounded-xl p-8"
                    >
                      <p className="text-lg font-bold mb-2 text-black/90">
                        {question.text}
                      </p>
                      {question.description && (
                        <p className="text-sm text-black/60 mb-6 italic">
                          {question.description}
                        </p>
                      )}

                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="1"
                          value={answers[question.id] ?? 2.5}
                          onChange={(e) => handleAnswer(question.id, Number(e.target.value))}
                          className="w-full h-3 bg-black/10 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #07C1D8 0%, #07C1D8 ${((answers[question.id] ?? 2.5) / 5) * 100}%, rgb(0 0 0 / 0.1) ${((answers[question.id] ?? 2.5) / 5) * 100}%, rgb(0 0 0 / 0.1) 100%)`
                          }}
                        />

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-black/40 font-medium">Not at all</span>
                          <span className="text-2xl font-black text-[#07C1D8]">
                            {answers[question.id] ?? "—"}
                          </span>
                          <span className="text-black/40 font-medium">Absolutely</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4">
                  <Button
                    onClick={prevCategory}
                    variant="outline"
                    disabled={currentCategory === 0}
                    className="h-14 px-8 rounded-lg font-bold disabled:opacity-30"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={nextCategory}
                    disabled={!canProceed}
                    className="bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-14 px-8 rounded-lg font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {currentCategory === totalCategories - 1 ? "View Results" : "Next Section"}
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </motion.section>
          )}

          {/* GATE STAGE */}
          {stage === "gate" && (
            <motion.section
              key="gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-black via-black to-black/95 text-white"
            >
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <CheckCircle2 size={64} className="text-[#07C1D8] mx-auto mb-6" />
                  <h2 className="text-5xl md:text-6xl font-black mb-6">
                    Your Growth Architecture<br />Score is Ready
                  </h2>
                  <p className="text-xl text-white/80 font-medium">
                    Enter your details to see your complete analysis + 30-day roadmap
                  </p>
                </motion.div>

                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  onSubmit={handleSubmitEmail}
                  className="bg-white/10 border border-white/20 rounded-xl p-6 md:p-10"
                >
                  <div className="space-y-6 mb-8">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-white/90">Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-14 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-medium focus:outline-none focus:border-[#07C1D8] focus:bg-white/15 transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-white/90">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-14 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-medium focus:outline-none focus:border-[#07C1D8] focus:bg-white/15 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-white/90">Company (Optional)</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full h-14 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-medium focus:outline-none focus:border-[#07C1D8] focus:bg-white/15 transition-all"
                        placeholder="Acme Inc"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-14 md:h-16 rounded-lg text-lg md:text-xl font-bold"
                  >
                    Show My Score
                    <ArrowRight size={22} className="ml-3" />
                  </Button>

                  <p className="text-xs text-white/40 text-center mt-6">
                    We'll email you a PDF of your complete analysis. No spam, ever.
                  </p>
                </motion.form>
              </div>
            </motion.section>
          )}

          {/* RESULTS STAGE */}
          {stage === "results" && diagnosis && (
            <motion.section
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen px-6 py-20"
            >
              <div className="max-w-6xl mx-auto">
                {/* Score Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <p className="text-sm font-black tracking-widest text-black/40 mb-4">YOUR GROWTH ARCHITECTURE SCORE</p>
                  <div className="inline-block">
                    <div className="text-8xl font-black text-[#07C1D8] mb-2">{overallScore}</div>
                    <div className="text-xl font-bold text-black/60">out of 100</div>
                  </div>
                </motion.div>

                {/* Visualizations */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  {/* Radar Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-black/[0.02] border border-black/10 rounded-xl p-8"
                  >
                    <h3 className="text-xl font-black mb-6 text-center">Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#000" strokeOpacity={0.1} />
                        <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fontWeight: 600 }} />
                        <Radar dataKey="score" stroke="#07C1D8" fill="#07C1D8" fillOpacity={0.3} strokeWidth={2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Bar Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-black/[0.02] border border-black/10 rounded-xl p-8"
                  >
                    <h3 className="text-xl font-black mb-6 text-center">FABRIC Scores</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.1} />
                        <XAxis dataKey="name" tick={{ fontSize: 14, fontWeight: 700 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload[0]) {
                              return (
                                <div className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold">
                                  {payload[0].payload.fullName}: {payload[0].value}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="score" fill="#07C1D8" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>

                {/* Bottlenecks */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-red-50 border-2 border-red-200 rounded-xl p-6 md:p-10 mb-16"
                >
                  <h3 className="text-2xl font-black mb-6 text-red-900">Your 3 Biggest Bottlenecks</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {bottlenecks.map((bottleneck, idx) => (
                      <div key={idx} className="bg-white border border-red-200 rounded-lg p-6">
                        <div className="text-4xl font-black text-red-600 mb-2">{bottleneck.score}</div>
                        <div className="font-bold text-black/80 mb-3">{bottleneck.category}</div>
                        <p className="text-sm text-black/60 leading-relaxed">
                          {getCategoryDescription(bottleneck.category)}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Diagnosis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-black text-white rounded-xl p-6 md:p-12 mb-12"
                >
                  <div className="mb-6">
                    <span className="inline-block bg-[#07C1D8] text-black px-4 py-2 rounded-full text-sm font-black mb-4">
                      DIAGNOSIS
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black mb-4">{diagnosis.title}</h3>
                  </div>
                  <p className="text-xl text-white/80 font-medium leading-relaxed mb-8">{diagnosis.description}</p>

                  <div className="bg-white/10 border border-white/20 rounded-lg p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-white/60 mb-1">RECOMMENDED NEXT STEP</p>
                        <p className="text-2xl font-black">{diagnosis.offer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-[#07C1D8]">{diagnosis.price}</p>
                        <p className="text-sm text-white/60">{diagnosis.duration}</p>
                      </div>
                    </div>
                    <p className="text-white/70 font-medium mb-6">{diagnosis.ctaDescription}</p>
                    <Button
                      onClick={() => navigate(`/${diagnosis.nextStep}`)}
                      className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-14 rounded-lg text-lg font-bold"
                    >
                      {diagnosis.ctaText}
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>

                {/* Quick Win Option - Micro-Offer */}
                {primaryConstraint && microOffer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gradient-to-br from-[#07C1D8]/10 to-[#07C1D8]/5 border-2 border-[#07C1D8]/30 rounded-xl p-6 md:p-10 mb-16"
                  >
                    <div className="text-center mb-8">
                      <p className="text-sm font-black tracking-widest text-black/40 mb-2">NOT READY FOR FULL ARCHITECTURE?</p>
                      <h3 className="text-3xl md:text-4xl font-black mb-4 text-black">
                        Start with a Quick Win
                      </h3>
                      <p className="text-lg text-black/70 font-medium leading-relaxed">
                        Fix your biggest constraint ({primaryConstraint.category}) in 10-15 minutes for {microOffer.price}
                      </p>
                    </div>

                    <div className="bg-white border border-[#07C1D8]/30 rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-xs text-black/60 mb-1 font-bold tracking-wider">THE ULTIMATE GROWTH ARCHITECT</p>
                          <h4 className="text-xl md:text-2xl font-black text-black">{microOffer.title}</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-4xl font-black text-[#07C1D8]">{microOffer.price}</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 mb-6">
                        {microOffer.bullets.slice(0, 4).map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-[#07C1D8] flex-shrink-0 mt-1" />
                            <p className="text-sm text-black/80 font-medium">{bullet}</p>
                          </div>
                        ))}
                      </div>

                      <Button
                        onClick={() => navigate(`/ultimate-growth-architect?pillar=${primaryConstraint.category.toLowerCase()}`)}
                        className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-14 rounded-lg text-lg font-bold"
                      >
                        Get Quick Win — $7
                        <ArrowRight size={20} className="ml-2" />
                      </Button>

                      <p className="text-center text-black/50 text-xs mt-4 font-medium">
                        10-15 minutes · No meetings · Instant clarity
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Back to Home */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center"
                >
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="h-12 px-8 rounded-lg font-bold"
                  >
                    Back to Home
                  </Button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      {/* NO FOOTER */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #07C1D8;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #07C1D8;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
