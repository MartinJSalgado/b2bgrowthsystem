import { useState } from "react";
import { Button } from "../components/ui/button";
import { ArrowRight, CheckCircle2, Clock, TrendingUp, Target, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { createCheckoutSession } from "../utils/stripe";

export default function UltimateGrowthArchitect() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await createCheckoutSession('ultimate');
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black via-black to-black/95 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-[#07C1D8]/10 border border-[#07C1D8]/30 px-6 py-2 rounded-lg mb-6"
            >
              <span className="text-[#07C1D8] text-sm font-bold tracking-wide">AI-POWERED GROWTH CLARITY</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              The Ultimate<br />Growth Architect
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl text-white/80 mb-4 font-medium"
            >
              Identify your growth constraint and get a 30-day fix plan
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-white/60 mb-12"
            >
              No meetings. No calls. Just documented clarity in 10 minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-16 px-12 rounded-lg text-xl font-bold shadow-xl"
              >
                {isLoading ? 'Loading...' : 'Get Clarity Now — $7'}
                {!isLoading && <ArrowRight size={24} className="ml-3" />}
              </Button>
              {error && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 w-full sm:w-auto">
                  <p className="text-red-200 text-sm font-medium">{error}</p>
                </div>
              )}
            </motion.div>

            <p className="text-white/40 text-sm mt-6">One-time payment · Instant access · 10-minute clarity sprint</p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y-2 border-black/10 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-black/60">
              <CheckCircle2 size={20} className="text-[#07C1D8]" />
              <span className="font-medium">500+ Companies</span>
            </div>
            <div className="flex items-center gap-2 text-black/60">
              <CheckCircle2 size={20} className="text-[#07C1D8]" />
              <span className="font-medium">10-Minute Sprint</span>
            </div>
            <div className="flex items-center gap-2 text-black/60">
              <CheckCircle2 size={20} className="text-[#07C1D8]" />
              <span className="font-medium">No Meetings Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get - Feature Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-black">What You'll Build</h2>
            <p className="text-xl text-black/60 max-w-3xl mx-auto">
              A complete growth clarity package delivered through an AI-powered sprint
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8 hover:border-[#07C1D8]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#07C1D8]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target size={24} className="text-[#07C1D8]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">Your Exact Constraint</h3>
                  <p className="text-black/60 leading-relaxed">
                    Not symptoms—the actual root cause blocking your growth across Foundation, Architecture, Build, Release, Improve, or Compound.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8 hover:border-[#07C1D8]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#07C1D8]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap size={24} className="text-[#07C1D8]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">Why It's Breaking Everything</h3>
                  <p className="text-black/60 leading-relaxed">
                    The cascading effects of this constraint and why fixing it unlocks everything else in your growth system.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8 hover:border-[#07C1D8]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#07C1D8]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={24} className="text-[#07C1D8]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">The Specific Fix</h3>
                  <p className="text-black/60 leading-relaxed">
                    Not vague advice—concrete actions mapped to your situation with clear next steps and implementation guidance.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8 hover:border-[#07C1D8]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#07C1D8]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-[#07C1D8]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">30-Day Action Plan</h3>
                  <p className="text-black/60 leading-relaxed">
                    A documented roadmap you can execute today—no guessing, no extra meetings, just clear milestones and tasks.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-black/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-black">How It Works</h2>
            <p className="text-xl text-black/60">Three steps to documented clarity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-[#07C1D8] rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Purchase & Access</h3>
              <p className="text-black/60 leading-relaxed">
                Click the button, complete checkout, and get instant access to The Ultimate Growth Architect.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-[#07C1D8] rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">10-Minute Sprint</h3>
              <p className="text-black/60 leading-relaxed">
                Complete a guided clarity sprint—structured questions, not random chatting—to diagnose your constraint.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-[#07C1D8] rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Get Your Plan</h3>
              <p className="text-black/60 leading-relaxed">
                Walk away with documented clarity, your 30-day roadmap, and immediate next steps to execute.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-black/10 rounded-xl p-8 md:p-12 shadow-lg"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-black">Growth Clarity Sprint</h2>
              <p className="text-xl text-black/60 mb-8">
                One payment. Instant access. Documented clarity.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="text-6xl md:text-7xl font-black text-[#07C1D8]">$7</div>
              <div className="text-left">
                <p className="text-sm text-black/60">one-time</p>
                <p className="text-sm text-black/60">payment</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
              {[
                "AI-powered constraint diagnosis",
                "Root cause analysis (not symptoms)",
                "Specific fix recommendations",
                "30-day implementation roadmap",
                "Documented next steps",
                "No meetings or calls required"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#07C1D8] flex-shrink-0" />
                  <span className="text-black/80 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-20 rounded-lg text-2xl font-bold shadow-xl mb-4"
            >
              {isLoading ? 'Loading...' : 'Get Clarity Now — $7'}
              {!isLoading && <ArrowRight size={28} className="ml-3" />}
            </Button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
                <p className="text-red-200 text-sm font-medium text-center">{error}</p>
              </div>
            )}

            <p className="text-center text-black/40 text-sm">
              Instant access · 10 minutes to clarity · No credit card surprises
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="py-20 px-6 bg-black/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-black">Why This Works</h2>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-3 text-black">Not Another Chatbot</h3>
              <p className="text-black/60 leading-relaxed text-lg">
                This is a structured diagnostic sprint—not random conversation. You'll answer targeted questions that map to the 6 pillars of B2B growth architecture (Foundation, Architecture, Build, Release, Improve, Compound).
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-3 text-black">Speed Without Sacrifice</h3>
              <p className="text-black/60 leading-relaxed text-lg">
                10 minutes replaces weeks of guessing. Most companies spend months diagnosing what's wrong. The Ultimate Growth Architect identifies your constraint in one focused sprint.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-3 text-black">Documented, Not Theoretical</h3>
              <p className="text-black/60 leading-relaxed text-lg">
                You don't get a PDF to file away. You get a living action plan with specific tasks, milestones, and next steps you can execute immediately.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-black">Trusted by B2B Growth Teams</h2>
            <p className="text-xl text-black/60">500+ companies have taken the diagnostic</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8"
            >
              <div className="mb-4">
                <div className="text-[#07C1D8] font-black text-lg mb-2">Score: 42</div>
              </div>
              <p className="text-black/80 leading-relaxed mb-6 italic">
                "This diagnostic showed us exactly why our pipeline was stalling. We were missing the entire middle of our buyer journey. Fixed it in 30 days."
              </p>
              <div className="border-t-2 border-black/10 pt-4">
                <p className="font-bold text-black">VP Marketing</p>
                <p className="text-sm text-black/60">B2B SaaS Infrastructure</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8"
            >
              <div className="mb-4">
                <div className="text-[#07C1D8] font-black text-lg mb-2">Score: 68</div>
              </div>
              <p className="text-black/80 leading-relaxed mb-6 italic">
                "We scored 68. Thought we had it figured out. The diagnostic revealed our attribution was broken—we were optimizing the wrong things."
              </p>
              <div className="border-t-2 border-black/10 pt-4">
                <p className="font-bold text-black">Head of Growth</p>
                <p className="text-sm text-black/60">Technical Consulting</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border-2 border-black/10 rounded-xl p-8"
            >
              <div className="mb-4">
                <div className="text-[#07C1D8] font-black text-lg mb-2">Score: 31</div>
              </div>
              <p className="text-black/80 leading-relaxed mb-6 italic">
                "Scored 31. Hurt to see, but we needed to hear it. The roadmap they gave us became our entire growth plan for Q1."
              </p>
              <div className="border-t-2 border-black/10 pt-4">
                <p className="font-bold text-black">Founder</p>
                <p className="text-sm text-black/60">Engineering Services</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-black via-black to-black/95 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Stop Guessing.<br />Start Building.
            </h2>
            <p className="text-2xl text-white/80 mb-12 font-medium">
              Get documented clarity on your growth constraint in 10 minutes
            </p>

            <div className="bg-white/10 border-2 border-white/20 rounded-xl p-8 md:p-12 mb-8">
              <div className="mb-8">
                <div className="text-7xl font-black text-[#07C1D8] mb-2">$7</div>
                <p className="text-white/60">One-time · Instant access · 10 minutes</p>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-20 rounded-lg text-2xl font-bold mb-6 shadow-xl"
              >
                {isLoading ? 'Loading...' : 'Get Clarity Now — $7'}
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
  );
}
