import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Target } from "lucide-react";
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

export default function ClarityLab() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const deliverables = [
    "Single constraint diagnosis",
    "Root cause analysis (not symptoms)",
    "Specific fix recommendations",
    "30-day implementation roadmap",
    "Immediate action steps"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitToOnePath({
      name: formData.name,
      email: formData.email,
      companyName: formData.company,
      tags: ['Clarity Lab Interest', 'Score 0-45'],
      customFields: {
        message: formData.message,
        offer: 'Clarity Lab ($3K-$7.5K)'
      }
    }, 'clarity-lab-application');

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
              <Target size={18} />
              <span className="text-sm font-bold">SCORE: 0–45</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Architectural<br />Clarity Lab
            </h1>
            <p className="text-2xl text-white/80 font-medium mb-4">
              The fastest way to remove your single biggest constraint
            </p>
            <div className="flex items-center justify-center gap-8 text-white/60">
              <span className="font-bold">$3,000 - $7,500</span>
              <span>•</span>
              <span className="font-bold">3-5 days</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6">What you get</h2>
            <div className="space-y-4">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-black/[0.02] border border-black/10 rounded-lg p-6">
                  <CheckCircle2 size={24} className="text-[#07C1D8] flex-shrink-0 mt-1" />
                  <p className="text-lg font-bold text-black">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Why this works</h2>
            <div className="bg-black/[0.02] border border-black/10 rounded-xl p-8">
              <p className="text-lg text-black/80 font-medium leading-relaxed mb-4">
                When your score is below 45, you don't have a "marketing problem."
              </p>
              <p className="text-lg text-black/80 font-medium leading-relaxed mb-4">
                You have one critical architectural flaw blocking everything else.
              </p>
              <p className="text-lg text-black/80 font-medium leading-relaxed">
                Fix that constraint, and the rest of your system starts working again.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <div className="bg-gradient-to-br from-[#07C1D8]/10 to-[#07C1D8]/5 border-2 border-[#07C1D8] rounded-xl p-8 md:p-12">
              {!submitted ? (
                <>
                  <h3 className="text-3xl font-black mb-4 text-center">Request Clarity Lab</h3>
                  <p className="text-lg text-black/70 font-medium mb-8 text-center">
                    Tell us about your situation. We'll review your diagnostic and get back to you within 24 hours.
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
                      <label className="block text-sm font-bold mb-2">What's your biggest constraint right now? (Optional)</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full h-32 px-4 py-3 rounded-lg border border-black/20 focus:outline-none focus:border-[#07C1D8] focus:ring-2 focus:ring-[#07C1D8]/20 resize-none"
                        placeholder="Tell us what's blocking your growth..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-14 rounded-lg text-lg font-bold disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Request Clarity Lab'}
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
                  <h3 className="text-3xl font-black mb-4">Request Received</h3>
                  <p className="text-lg text-black/70 font-medium mb-8">
                    We'll review your diagnostic results and get back to you within 24 hours.
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
