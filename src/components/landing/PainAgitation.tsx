import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

export default function PainAgitation() {
  const pains = [
    "You're spending on marketing but can't track what's actually working",
    "Leads fall through cracks because your systems don't talk to each other",
    "Your messaging feels generic—you sound like everyone else",
    "Growth feels random, not repeatable",
    "You're building on duct tape and hoping it holds",
    "Every new campaign starts from zero—nothing compounds"
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full mb-6">
            <AlertTriangle size={18} />
            <span className="text-sm font-bold">DOES THIS SOUND FAMILIAR?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-black">
            Your growth system is leaking
          </h2>
          <p className="text-xl text-black/70 font-medium max-w-3xl mx-auto">
            You're working harder, spending more, but growth still feels unpredictable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {pains.map((pain, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-red-50 border-2 border-red-200 rounded-xl p-6"
            >
              <p className="text-lg font-bold text-red-900">{pain}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeInUp}
          className="mt-12 text-center"
        >
          <p className="text-2xl font-black text-black/90">
            The problem isn't effort. It's architecture.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
