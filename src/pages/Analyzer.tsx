import { useState } from "react";
import { Button } from "../components/ui/button";
import { ArrowRight, Loader2, TrendingUp, CheckCircle2, Download, FileText } from "lucide-react";
import { motion } from "motion/react";

interface Blueprint {
  blueprint: string;
  timestamp: string;
  input: string;
}

export default function Analyzer() {
  const [input, setInput] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [currentBlueprint, setCurrentBlueprint] = useState<Blueprint | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuildArchitecture = async () => {
    if (!input.trim()) {
      setError("Please provide your clarity docs, notes, or strategic context");
      return;
    }

    setIsBuilding(true);
    setError(null);
    setCurrentBlueprint(null);

    try {
      const response = await fetch('/api/build-architecture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: input.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Architecture build failed');
      }

      const data = await response.json();
      const newBlueprint: Blueprint = {
        blueprint: data.blueprint,
        timestamp: data.timestamp,
        input: input.trim(),
      };

      setCurrentBlueprint(newBlueprint);
    } catch (err: any) {
      setError(err.message || 'Failed to build architecture. Please try again.');
    } finally {
      setIsBuilding(false);
    }
  };

  const handleExport = (format: 'markdown' | 'text') => {
    if (!currentBlueprint) return;

    const content = `# FABRIC Growth Architecture Blueprint\n\nGenerated: ${new Date(currentBlueprint.timestamp).toLocaleString()}\n\n---\n\n${currentBlueprint.blueprint}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fabric-blueprint-${Date.now()}.${format === 'markdown' ? 'md' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      {/* Nav */}
      <nav className="bg-white border-b-2 border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#07C1D8] rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-black text-black">The Ultimate Growth Architect™</h1>
              <p className="text-xs text-black/50 font-medium">Strategic System Design Tool</p>
            </div>
          </div>
          <p className="text-sm text-black/60 font-medium">Martin Salgado</p>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Architecture Workspace */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black text-black mb-3">FABRIC Architecture Studio</h2>
          <p className="text-black/60 font-medium max-w-2xl mx-auto">
            Transform clarity into a complete, executable growth architecture. Paste your strategic context,
            and receive a comprehensive FABRIC blueprint.
          </p>
        </div>

        <div className="bg-white rounded-xl border-2 border-black/10 p-8 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-bold mb-3 text-black">
              Paste Your Strategic Context
            </label>
            <p className="text-xs text-black/50 font-medium mb-3">
              Include: clarity docs, diagnostic insights, funnel strategy, offer details, ICP info, assets, notes, priorities, or any strategic context.
            </p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: Our ICP is B2B SaaS companies with $1-10M ARR. Current constraint: low demo show rate (32%). We have clarity on our offer (growth acceleration program) but no structured nurture sequence. Our main channels are LinkedIn ads and outbound. Looking to architect the complete FABRIC system..."
              className="w-full h-96 px-4 py-3 rounded-lg border-2 border-black/10 focus:outline-none focus:border-[#07C1D8] focus:ring-2 focus:ring-[#07C1D8]/20 resize-none text-sm leading-relaxed transition-all"
            />
          </div>

          <Button
            onClick={handleBuildArchitecture}
            disabled={isBuilding || !input.trim()}
            className="w-full bg-[#07C1D8] text-white hover:bg-[#06a8bd] h-16 rounded-lg text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
          >
            {isBuilding ? (
              <>
                <Loader2 size={22} className="mr-3 animate-spin" />
                Building Your FABRIC Architecture...
              </>
            ) : (
              <>
                Build My Growth Architecture
                <ArrowRight size={22} className="ml-3" />
              </>
            )}
          </Button>

          {error && (
            <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Blueprint Output */}
        {currentBlueprint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl border-2 border-[#07C1D8]/30 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#07C1D8] rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-black">Your FABRIC Blueprint</h2>
                  <p className="text-sm text-black/60 font-medium">
                    Generated {new Date(currentBlueprint.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleExport('markdown')}
                  className="bg-black/5 text-black hover:bg-black/10 h-10 px-4 rounded-lg font-bold border-2 border-black/10"
                >
                  <Download size={16} className="mr-2" />
                  Markdown
                </Button>
                <Button
                  onClick={() => handleExport('text')}
                  className="bg-black/5 text-black hover:bg-black/10 h-10 px-4 rounded-lg font-bold border-2 border-black/10"
                >
                  <FileText size={16} className="mr-2" />
                  Text
                </Button>
              </div>
            </div>

            <div className="bg-black/[0.02] rounded-xl p-8 border-2 border-black/10">
              <div className="whitespace-pre-wrap font-medium text-black/90 leading-relaxed text-[15px]">
                {currentBlueprint.blueprint}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-black/10">
              <p className="text-sm text-black/60 font-medium">
                This blueprint contains your complete FABRIC architecture. Use it to align your team, brief execution partners, and eliminate growth chaos.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-black/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-black/40 font-medium">
            Powered by FABRIC™ Methodology · Built by Influential
          </p>
        </div>
      </footer>
    </div>
  );
}
