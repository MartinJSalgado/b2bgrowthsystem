import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

export default function Promise() {
  const promises = [
    "Your exact Growth Architecture Score (0–100)",
    "The 3 biggest bottlenecks killing your growth",
    "Which system layer is breaking (Foundation, Architecture, Build, Release, Improve, or Compound)",
    "The single leverage point to focus on first",
    "A custom 30-Day Growth System Roadmap"
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black to-black/95">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
            In 10 minutes, you'll know<br />exactly what's broken
          </h2>
          <p className="text-xl text-white/80 font-medium max-w-3xl mx-auto">
            The Growth Gap Diagnostic gives you surgical clarity on where your system is failing.
          </p>
        </motion.div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {promises.map((promise, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <CheckCircle2 size={24} className="text-[#07C1D8] flex-shrink-0 mt-1" />
              <p className="text-lg font-bold text-white">{promise}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeInUp}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-[#07C1D8]/10 border-2 border-[#07C1D8] rounded-xl p-8">
            <p className="text-xl font-bold text-white mb-2">
              This isn't a generic marketing audit.
            </p>
            <p className="text-lg text-white/80 font-medium">
              It's a <span className="text-[#07C1D8] font-black">structural diagnosis</span> of your entire growth system.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
