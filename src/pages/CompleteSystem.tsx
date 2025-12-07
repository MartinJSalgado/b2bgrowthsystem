import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
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

export default function CompleteSystem() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const layers = [
    {
      title: "Architecture (Complete)",
      description: "Your growth system blueprint is solid. Everything is mapped."
    },
    {
      title: "Infrastructure (One Path)",
      description: "Unified GTM platform. Funnels, CRM, comms, dashboards, workflows—all connected."
    },
    {
      title: "Intelligence (Lloyd)",
      description: "AI GTM engineer. Orchestration, routing, scoring, sequencing, behavioral triggers."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitToOnePath({
      name: formData.name,
      email: formData.email,
      companyName: formData.company,
      tags: ['Complete System Interest', 'Score 90+', 'Premium'],
      customFields: {
        message: formData.message,
        offer: 'Complete Growth System (Custom)'
      }
    }, 'complete-system-application');

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      alert('There was an issue submitting your request. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-24 px-6 bg-gradient-to-b from-black to-black/95">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#07C1D8] text-black px-4 py-2 rounded-full mb-6">
              <TrendingUp size={18} />
              <span className="text-sm font-bold">SCORE: 90+</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Complete<br />Growth System
            </h1>
            <p className="text-2xl text-white/80 font-medium mb-4">
              Architecture + Infrastructure + Intelligence
            </p>
            <div className="text-white/60 font-bold">
              Custom pricing based on scale
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6">The three layers</h2>
            <div className="space-y-6">
              {layers.map((layer, idx) => (
                <div key={idx} className="bg-black/[0.02] border border-black/10 rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <CheckCircle2 size={24} className="text-[#07C1D8] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-black mb-2">{layer.title}</h3>
                      <p className="text-lg text-black/70 font-medium leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Why this matters</h2>
            <div className="bg-black/[0.02] border border-black/10 rounded-xl p-8">
              <p className="text-lg text-black/80 font-medium leading-relaxed mb-4">
                When your score is 90+, your architecture is strong.
              </p>
              <p className="text-lg text-black/80 font-medium leading-relaxed mb-4">
                But you're still running too much manually.
              </p>
              <p className="text-lg text-black/80 font-medium leading-relaxed">
                The complete system adds infrastructure + intelligence to automate and scale without losing the human touch.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <div className="bg-gradient-to-br from-[#07C1D8]/10 to-[#07C1D8]/5 border-2 border-[#07C1D8] rounded-xl p-8 md:p-12">
              {!submitted ? (
                <>
                  <h3 className="text-3xl font-black mb-4 text-center">Request Complete System</h3>
                  <p className="text-lg text-black/70 font-medium mb-8 text-center">
                    Let's discuss how to implement your full growth architecture with One Path + Lloyd.
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
                      <label className="block text-sm font-bold mb-2">What are you looking to automate? (Optional)</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full h-32 px-4 py-3 rounded-lg border border-black/20 focus:outline-none focus:border-[#07C1D8] focus:ring-2 focus:ring-[#07C1D8]/20 resize-none"
                        placeholder="Tell us about your automation goals..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-14 rounded-lg text-lg font-bold disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Request Discussion'}
                      {!loading && <ArrowRight size={20} className="ml-2" />}
                    </Button>

                    <p className="text-xs text-black/50 text-center">
                      No pitch. No pressure. We'll reach out to discuss your complete system needs.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 size={64} className="text-[#07C1D8] mx-auto mb-6" />
                  <h3 className="text-3xl font-black mb-4">Request Received</h3>
                  <p className="text-lg text-black/70 font-medium mb-8">
                    We'll be in touch within 24 hours to discuss your complete growth system.
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
