import { motion } from "motion/react";
import { Quote } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

export default function Proof() {
  const testimonials = [
    {
      quote: "This diagnostic showed us exactly why our pipeline was stalling. We were missing the entire middle of our buyer journey. Fixed it in 30 days.",
      author: "VP Marketing",
      company: "B2B SaaS Infrastructure Company",
      score: 42
    },
    {
      quote: "We scored 68. Thought we had it figured out. The diagnostic revealed our attribution was broken—we were optimizing the wrong things.",
      author: "Head of Growth",
      company: "Technical Consulting Firm",
      score: 68
    },
    {
      quote: "Scored 31. Hurt to see, but we needed to hear it. The roadmap they gave us became our entire growth plan for Q1.",
      author: "Founder",
      company: "Engineering Services Company",
      score: 31
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black/95 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-bold">WHAT OTHERS DISCOVERED</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
            Real diagnoses.<br />Real outcomes.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Quote size={24} className="text-[#07C1D8]" />
                <div className="bg-[#07C1D8] text-black px-3 py-1 rounded-full">
                  <span className="text-sm font-black">Score: {testimonial.score}</span>
                </div>
              </div>
              <p className="text-white/90 font-medium mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-bold">{testimonial.author}</p>
                <p className="text-white/60 text-sm">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeInUp}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white/10 border border-white/20 rounded-xl p-8">
            <p className="text-xl font-bold text-white mb-2">
              Over 500 B2B companies have taken the diagnostic
            </p>
            <p className="text-white/70 font-medium">
              Average score: <span className="text-[#07C1D8] font-black">58</span> (mid-system misalignment)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
