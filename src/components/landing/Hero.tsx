import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-black via-black to-black/95">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl mb-6 tracking-[-0.02em] leading-[0.95] font-black text-white"
        >
          Is your growth<br />misaligned?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed font-medium"
        >
          Take the 10-minute Growth Gap Diagnostic and see<br />
          exactly where your system is breaking.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-white/60 mb-12 font-medium"
        >
          No pitch. No pressure. Just clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            onClick={() => navigate('/diagnostic?autostart=true')}
            className="bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-16 px-12 rounded-lg text-xl font-bold shadow-lg"
          >
            Start Diagnostic
            <ArrowRight size={24} className="ml-3" />
          </Button>
          <p className="text-sm text-white/40 mt-6 font-medium">
            Takes 5–10 minutes · No credit card · No sales call
          </p>
        </motion.div>
      </div>
    </section>
  );
}
