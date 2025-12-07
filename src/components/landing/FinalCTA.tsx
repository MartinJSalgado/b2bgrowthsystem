import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

export default function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black via-black to-black/95">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
            Stop guessing.<br />Start architecting.
          </h2>

          <p className="text-xl md:text-2xl text-white/80 mb-12 font-medium">
            Take the diagnostic. Get your score. Fix what's broken.
          </p>

          <div className="flex flex-col items-center gap-6 mb-12">
            <Button
              onClick={() => navigate('/diagnostic')}
              className="bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-16 px-12 rounded-lg text-xl font-bold shadow-lg"
            >
              Start Your Diagnostic Now
              <ArrowRight size={24} className="ml-3" />
            </Button>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-white/60 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#07C1D8]" />
                <span>5–10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#07C1D8]" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#07C1D8]" />
                <span>Instant results</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12">
            <p className="text-white/40 text-sm font-medium">
              A project by Influential · The Growth Architecture Firm for B2B Companies
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
