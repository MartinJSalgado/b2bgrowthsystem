import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does it take?",
      answer: "5–10 minutes. You'll answer 30 questions across 6 categories (Foundation, Architecture, Build, Release, Improve, Compound). No essay questions—just sliding scales."
    },
    {
      question: "Will I get pitched or put into a sales funnel?",
      answer: "No. This is pure diagnostic. You'll get your score, your bottlenecks, and a roadmap. If you want help fixing it, there's a next step. If you don't, you walk away with clarity. That's it."
    },
    {
      question: "What do I get at the end?",
      answer: "Your Growth Architecture Score (0–100), a breakdown of your 3 biggest bottlenecks, a 30-Day Growth System Roadmap (PDF), and a recommended next step based on your score."
    },
    {
      question: "Is this for early-stage companies or established ones?",
      answer: "Both. If you're doing $500K+ in revenue and have some form of go-to-market motion, this diagnostic will show you where it's breaking. If you're earlier, it'll show you what NOT to skip."
    },
    {
      question: "What if my score is low?",
      answer: "Good. That means you're about to stop wasting money on tactics that can't work until you fix your architecture. Low scores get the clearest roadmaps."
    },
    {
      question: "Do I need to know marketing terms or have a technical background?",
      answer: "No. The questions are written in plain English about your growth system. If you run marketing, sales, or growth, you'll be able to answer them."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-black">
            Questions?
          </h2>
          <p className="text-xl text-black/70 font-medium">
            Everything you need to know before starting
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-black/[0.02] border border-black/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-black/[0.02] transition-colors"
              >
                <span className="text-lg font-bold text-black pr-4">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 transition-transform ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5">
                  <p className="text-black/70 font-medium leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
