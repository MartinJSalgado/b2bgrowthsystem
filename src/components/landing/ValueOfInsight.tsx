import { motion } from "motion/react";
import { Target, TrendingUp, Zap } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

export default function ValueOfInsight() {
  const insights = [
    {
      icon: Target,
      title: "Stop Guessing",
      description: "You'll know exactly which constraint to remove first—no more random tactics."
    },
    {
      icon: TrendingUp,
      title: "Stop Wasting Budget",
      description: "See which parts of your system are broken before you spend another dollar."
    },
    {
      icon: Zap,
      title: "Stop Starting from Zero",
      description: "Get a roadmap to fix your architecture once—then everything compounds."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-block bg-[#07C1D8]/10 text-[#07C1D8] px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-bold">THE VALUE OF CLARITY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-black">
            Why this diagnostic matters
          </h2>
          <p className="text-xl text-black/70 font-medium max-w-3xl mx-auto">
            Most B2B companies are building growth on broken architecture.<br />
            They don't have a tactics problem. They have a <span className="text-[#07C1D8] font-black">system problem</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-gradient-to-b from-black to-black/95 text-white rounded-xl p-8 border border-white/10"
              >
                <div className="bg-[#07C1D8] w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Icon size={28} className="text-black" />
                </div>
                <h3 className="text-2xl font-black mb-4">{insight.title}</h3>
                <p className="text-white/80 font-medium leading-relaxed">{insight.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          {...fadeInUp}
          className="mt-16 bg-black/5 border-2 border-black/10 rounded-xl p-8 md:p-12 text-center"
        >
          <p className="text-2xl md:text-3xl font-black text-black mb-4">
            If you're spending $10K+ a month on marketing...
          </p>
          <p className="text-xl text-black/70 font-medium">
            ...and don't know your Growth Architecture Score, you're flying blind.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
