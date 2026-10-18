import React from 'react';
import { AgentInsight } from '../types';
import { Cpu, Network, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

interface AgentPipelineTrackerProps {
  insights: AgentInsight[];
  archetype: string;
  culturalTemperament: string;
  dominantAesthetics: string[];
}

export const AgentPipelineTracker: React.FC<AgentPipelineTrackerProps> = ({
  insights,
  archetype,
  culturalTemperament,
  dominantAesthetics,
}) => {
  const agentIcons: Record<string, React.ReactNode> = {
    'Affinity Decoder': <Cpu className="w-4 h-4 text-amber-400" />,
    'Qloo Correlation Engine': <Network className="w-4 h-4 text-cyan-400" />,
    'Serendipity Agent': <Compass className="w-4 h-4 text-emerald-400" />,
    'Capsule Architect': <Sparkles className="w-4 h-4 text-rose-400" />,
  };

  return (
    <div className="bg-[#101214] border border-stone-800 rounded-xl p-6 space-y-6">
      {/* Profile Overview Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373]">
            Active Cultural Profile
          </div>
          <h2 className="text-2xl font-serif text-[#f2efe9] mt-0.5">
            {archetype}
          </h2>
          <p className="text-sm text-stone-400 mt-1 max-w-3xl leading-relaxed font-light">
            {culturalTemperament}
          </p>
        </div>

        {/* Unboxed Aesthetic Markers */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300 font-mono bg-stone-900/60 px-4 py-2.5 rounded-lg border border-stone-800 shrink-0">
          <span className="text-stone-500 uppercase">Aesthetics:</span>
          {dominantAesthetics.map((tag, idx) => (
            <React.Fragment key={tag}>
              <span className="text-[#d4a373]">{tag}</span>
              {idx < dominantAesthetics.length - 1 && (
                <span className="text-stone-600" aria-hidden="true">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 4 Agent Council Insights */}
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3">
          Agentic Council Deliberation & Correlation Log:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((item, idx) => {
            const icon = agentIcons[item.agent] || <CheckCircle2 className="w-4 h-4 text-[#d4a373]" />;
            return (
              <div
                key={item.agent || idx}
                className="bg-stone-900/40 border border-stone-800/80 rounded-lg p-4 space-y-2 hover:border-stone-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-200">
                  {icon}
                  <span>{item.agent}</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  {item.insight}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
