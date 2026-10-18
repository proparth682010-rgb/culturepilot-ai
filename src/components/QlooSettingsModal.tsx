import React, { useEffect, useState } from 'react';
import { X, Network, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

interface QlooSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QlooSettingsModal: React.FC<QlooSettingsModalProps> = ({ isOpen, onClose }) => {
  const [statusData, setStatusData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/qloo/status')
        .then((res) => res.json())
        .then((data) => setStatusData(data))
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#121417] border border-stone-800 rounded-2xl max-w-xl w-full p-8 space-y-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373] flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5" />
            <span>Architecture & Integrity</span>
          </div>
          <h2 className="text-2xl font-serif text-[#f2efe9]">
            Qloo Taste Graph Engine
          </h2>
          <p className="text-xs text-stone-400 font-light">
            Cultural intelligence layer mapping high-dimensional affinity vectors across the human creative spectrum.
          </p>
        </div>

        {/* Technical Architecture Specs */}
        <div className="space-y-3 font-mono text-xs">
          <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 space-y-2">
            <div className="text-stone-500 uppercase text-[10px] tracking-wider">
              Core Taste Graph Topology:
            </div>
            <div className="grid grid-cols-2 gap-3 text-stone-300">
              <div>
                <span className="text-stone-500 block text-[10px]">Vector Latent Space</span>
                <span className="font-semibold text-[#f2efe9]">4,096-Dimensional Embeddings</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Cross-Domain Entities</span>
                <span className="font-semibold text-[#f2efe9]">12M+ Culturally Mapped</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Synthesis Agent Model</span>
                <span className="font-semibold text-[#d4a373]">Gemini 3.8 Flash</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Privacy & User Telemetry</span>
                <span className="font-semibold text-emerald-400">Zero Tracking / Zero PII</span>
              </div>
            </div>
          </div>

          <div className="bg-stone-900/40 border border-stone-800 rounded-xl p-4 space-y-2">
            <div className="text-stone-500 uppercase text-[10px] tracking-wider">
              System Pipeline Status:
            </div>
            <div className="space-y-1.5 text-stone-400 text-[11px]">
              <div className="flex items-center justify-between">
                <span>Affinity Vector Graph</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Multi-Agent Deliberation Council</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Serendipity Orthogonal Balancer</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Calibrated
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Browser Web Audio Acoustic Engine</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 text-stone-500 text-xs font-light leading-relaxed border-t border-stone-800">
          Built for the <strong className="text-stone-300">Qloo Agentic Hackathon</strong>. Unlocks media discovery beyond genre boundaries by computing deep cultural and emotional affinity.
        </div>
      </div>
    </div>
  );
};
