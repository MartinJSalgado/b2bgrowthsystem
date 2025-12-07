import Hero from "../components/landing/Hero";
import PainAgitation from "../components/landing/PainAgitation";
import Promise from "../components/landing/Promise";
import ValueOfInsight from "../components/landing/ValueOfInsight";
import Proof from "../components/landing/Proof";
import FAQ from "../components/landing/FAQ";
import FinalCTA from "../components/landing/FinalCTA";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* NO HEADER - Single-focus landing page */}
      <Hero />
      <PainAgitation />
      <Promise />
      <ValueOfInsight />
      <Proof />
      <FAQ />
      <FinalCTA />
      {/* NO FOOTER - No competing CTAs */}
    </div>
  );
}
