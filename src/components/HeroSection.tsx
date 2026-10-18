import React from 'react';
import { CulturalArchetype } from '../types';
import { CULTURAL_ARCHETYPES } from '../data/archetypes';
import { Compass, Sparkles, Network, Download } from 'lucide-react';

interface HeroSectionProps {
  selectedArchetypeId: string;
  onSelectArchetype: (archetype: CulturalArchetype) => void;
  isSynthesizing: boolean;
  onRunSynthesis: () => void;
  onOpenExport?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedArchetypeId,
  onSelectArchetype,
  isSynthesizing,
  onRunSynthesis,
  onOpenExport,
}) => {
  return (
    <section className="relative border-b border-stone-800/80 bg-[#0e0f11] overflow-hidden">
      {/* Editorial Accession Utility Strip */}
      <div className="border-b border-stone-800/60 px-6 py-2.5 text-xs font-mono text-stone-500 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-stone-400">ACC. 2026.QLOO.HACKATHON</span>
          <span aria-hidden="true">·</span>
          <span>LATENT AFFINITY DIMENSIONS: 4,096</span>
          <span aria-hidden="true">·</span>
          <span className="hidden sm:inline">CROSS-DOMAIN CORRELATION ENGINE</span>
        </div>
        <div className="flex items-center gap-4 text-stone-400">
          <span>CINEMA</span>
          <span aria-hidden="true">/</span>
          <span>SOUND</span>
          <span aria-hidden="true">/</span>
          <span>LITERATURE</span>
          <span aria-hidden="true">/</span>
          <span>SPATIAL DESIGN</span>
        </div>
      </div>

      {/* Main Two-Column Curatorial Hero Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left Column: Curatorial Thesis & Archetype Selector */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="text-xs tracking-widest uppercase text-[#d4a373] font-medium">
              Autonomous Cultural Taste Intelligence
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-medium tracking-tight text-[#f2efe9] text-balance leading-tight">
              Where unspoken cultural affinity shapes media discovery.
            </h1>
            <p className="text-stone-400 text-base lg:text-lg leading-relaxed max-w-2xl font-light">
              Conventional algorithms recommend movies based solely on movies you’ve watched, trapping you in shallow genre echo chambers. Powered by Qloo’s cross-domain taste graph and Gemini agentic reasoning, Qloo Resonance calculates the underlying emotional, aesthetic, and architectural vectors that link your beloved cinema, vinyl, literature, and physical spaces.
            </p>
          </div>

          {/* Archetype Quick Selectors */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono uppercase tracking-wider">
              <span>Select Seed Archetype:</span>
              <span className="text-stone-500">6 Curated Profiles</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CULTURAL_ARCHETYPES.map((arch) => {
                const isSelected = arch.id === selectedArchetypeId;
                return (
                  <button
                    key={arch.id}
                    onClick={() => onSelectArchetype(arch)}
                    disabled={isSynthesizing}
                    className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#d4a373] bg-[#d4a373]/10 text-white shadow-sm'
                        : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <div className="text-xs font-semibold truncate text-[#f2efe9]">
                      {arch.name}
                    </div>
                    <div className="text-[11px] text-stone-400 truncate mt-0.5">
                      {arch.dominantVibe}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onRunSynthesis}
              disabled={isSynthesizing}
              className="flex items-center gap-2.5 px-6 py-3 text-xs tracking-wider uppercase font-semibold text-black bg-[#d4a373] hover:bg-[#e0b488] active:scale-98 rounded-lg transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSynthesizing ? (
                <>
                  <Compass className="w-4 h-4 animate-spin text-black" />
                  <span>Traversing Taste Graph...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Synthesize Cultural Blueprint</span>
                </>
              )}
            </button>
            {onOpenExport && (
              <button
                type="button"
                onClick={onOpenExport}
                className="flex items-center gap-2 px-4 py-3 text-xs tracking-wider uppercase font-medium text-stone-300 bg-stone-900 border border-stone-800 hover:border-stone-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Download Curatorial Dossier as PDF or JSON"
              >
                <Download className="w-3.5 h-3.5 text-[#d4a373]" />
                <span>Export Dossier</span>
              </button>
            )}
            <div className="text-xs text-stone-400 flex items-center gap-2 font-mono">
              <Network className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>Multi-Agent Qloo Vector Alignment</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Curatorial Visual with Measured Scrim */}
        <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-stone-800 bg-stone-900 min-h-[380px] flex flex-col justify-end">
          <img
            src="/src/assets/images/hero_cultural_affinity_1792302087854.jpg"
            alt="Qloo Cultural Taste Graph Salon"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-102"
            referrerPolicy="no-referrer"
          />
          {/* Measured gradient contrast scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* Curatorial Caption Overlay */}
          <div className="relative z-10 p-6 space-y-2 text-[#f2efe9]">
            <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373]">
              Curatorial Archive No. 01
            </div>
            <div className="text-lg font-serif italic text-stone-200">
              “Cinema is sound captured in space; literature is architecture built of memory.”
            </div>
            <div className="text-xs text-stone-400 font-mono pt-1">
              Cross-domain correlations calibrated across 12M global taste entities.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
