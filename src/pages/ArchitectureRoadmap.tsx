import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { submitToOnePath } from "../utils/onepath";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

export default function ArchitectureRoadmap() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    revenue: "",
    message: ""
  });

  const deliverables = [
    "Complete system architecture blueprint",
    "Buyer journey mapping & optimization",
    "Narrative architecture & messaging system",
    "ICP segmentation & targeting framework",
    "Demand pathway design",
    "Revenue modeling & forecasting",
    "Content & conversion blueprint",
    "Infrastructure recommendations",
    "Attribution & scoring logic",
    "GTM activation plan"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitToOnePath({
      name: formData.name,
      email: formData.email,
      companyName: formData.company,
      tags: ['Architecture Roadmap Application', 'Score 70-90', 'High Value'],
      customFields: {
        revenue: formData.revenue,
        message: formData.message,
        offer: 'Full Growth Architecture Roadmap ($47K)'
      }
    }, 'architecture-roadmap-application');

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      alert('There was an issue submitting your application. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-24 px-6 bg-gradient-to-b from-black to-black/95">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#07C1D8] text-black px-4 py-2 rounded-full mb-6">
              <Zap size={18} />
              <span className="text-sm font-bold">SCORE: 70–90</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Full Growth<br />Architecture Roadmap
            </h1>
            <p className="text-2xl text-white/80 font-medium mb-4">
              Complete systemic alignment. No more guessing.
            </p>
            <div className="flex items-center justify-center gap-8 text-white/60">
              <span className="font-bold">$47,000</span>
              <span>•</span>
              <span className="font-bold">One-time investment</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6">What you get</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-black/[0.02] border border-black/10 rounded-lg p-6">
                  <CheckCircle2 size={24} className="text-[#07C1D8] flex-shrink-0 mt-1" />
                  <p className="text-base font-bold text-black">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Why this works</h2>
            <div className="bg-black/[0.02] border border-black/10 rounded-xl p-8">
              <p className="text-lg text-black/80 font-medium leading-relaxed mb-4">
                When your score is 70+, you're ready for complete systemic alignment.
              </p>
              <p className="text-lg text-black/80 font-medium leading-relaxed mb-4">
                You don't need more consultants. You need complete architecture.
              </p>
              <p className="text-lg text-black/80 font-medium leading-relaxed">
                This is a one-time architectural investment—not a retainer, not an agency relationship.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6">What happens after</h2>
            <div className="bg-gradient-to-br from-[#07C1D8]/10 to-[#07C1D8]/5 border border-[#07C1D8]/30 rounded-xl p-8">
              <p className="text-lg text-black/80 font-medium leading-relaxed mb-4">
                <strong>Roadmap complete → Architecture complete.</strong>
              </p>
              <p className="text-lg text-black/80 font-medium leading-relaxed mb-4">
                The natural next question: "How do we build this without duct tape?"
              </p>
              <p className="text-lg text-black/80 font-medium leading-relaxed">
                Answer = <strong>One Path</strong> (infrastructure) + <strong>Lloyd</strong> (intelligence layer).
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <div className="bg-gradient-to-br from-[#07C1D8]/10 to-[#07C1D8]/5 border-2 border-[#07C1D8] rounded-xl p-8 md:p-12">
              {!submitted ? (
                <>
                  <h3 className="text-3xl font-black mb-4 text-center">Apply for Architecture Roadmap</h3>
                  <p className="text-lg text-black/70 font-medium mb-8 text-center">
                    This is a significant investment. Tell us about your business and we'll review your diagnostic.
                  </p>

                  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-12 px-4 rounded-lg border border-black/20 focus:outline-none focus:border-[#07C1D8] focus:ring-2 focus:ring-[#07C1D8]/20"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-12 px-4 rounded-lg border border-black/20 focus:outline-none focus:border-[#07C1D8] focus:ring-2 focus:ring-[#07C1D8]/20"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">Company *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full h-12 px-4 rounded-lg border border-black/20 focus:outline-none focus:border-[#07C1D8] focus:ring-2 focus:ring-[#07C1D8]/20"
                        placeholder="Acme Inc"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">Annual Revenue *</label>
                      <select
                        required
                        value={formData.revenue}
                        onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                        className="w-full h-12 px-4 rounded-lg border border-black/20 focus:outline-none focus:border-[#07C1D8] focus:ring-2 focus:ring-[#07C1D8]/20"
                      >
                        <option value="">Select range</option>
                        <option value="$500K-$1M">$500K - $1M</option>
                        <option value="$1M-$3M">$1M - $3M</option>
                        <option value="$3M-$10M">$3M - $10M</option>
                        <option value="$10M+">$10M+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">Why now? What changed? (Optional)</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full h-32 px-4 py-3 rounded-lg border border-black/20 focus:outline-none focus:border-[#07C1D8] focus:ring-2 focus:ring-[#07C1D8]/20 resize-none"
                        placeholder="Help us understand your timing..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-14 rounded-lg text-lg font-bold disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                      {!loading && <ArrowRight size={20} className="ml-2" />}
                    </Button>

                    <p className="text-xs text-black/50 text-center">
                      No pitch. No pressure. We'll review your diagnostic and reach out if it's a fit.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 size={64} className="text-[#07C1D8] mx-auto mb-6" />
                  <h3 className="text-3xl font-black mb-4">Application Received</h3>
                  <p className="text-lg text-black/70 font-medium mb-8">
                    We'll review your diagnostic results and business details. Expect to hear from us within 24-48 hours.
                  </p>
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="h-12 px-8 rounded-lg font-bold"
                  >
                    Back to Home
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
