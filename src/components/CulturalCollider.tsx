import React, { useState } from 'react';
import { CulturalCollisionResult } from '../types';
import { Atom, Sparkles, ArrowRight, RefreshCw, Layers } from 'lucide-react';

interface CulturalColliderProps {
  onNotify?: (msg: string) => void;
}

const COLLISION_PRESETS = [
  { a: 'Taylor Swift', b: 'David Lynch', label: 'Pop Melodrama ✕ Subconscious Surrealism' },
  { a: 'Blade Runner 2049', b: 'Studio Ghibli', label: 'Cyberpunk Dystopia ✕ Animistic Nostalgia' },
  { a: 'Death Grips', b: 'Chet Baker', label: 'Industrial Noise ✕ Cool Velvet Melancholy' },
  { a: 'Dune', b: 'Wes Anderson', label: 'Monumental Planetary Sci-Fi ✕ Symmetrical Pastel Kitsch' },
  { a: 'K-Pop Aesthetics', b: 'Soviet Brutalism', label: 'Hyper-Commercial Polish ✕ Monumental Monolithic Concrete' },
];

export const CulturalCollider: React.FC<CulturalColliderProps> = () => {
  const [entityA, setEntityA] = useState('Taylor Swift');
  const [entityB, setEntityB] = useState('David Lynch');
  const [isColliding, setIsColliding] = useState(false);
  const [result, setResult] = useState<CulturalCollisionResult | null>(null);

  const handleCollide = async (aInput?: string, bInput?: string) => {
    const a = aInput || entityA;
    const b = bInput || entityB;
    setIsColliding(true);

    try {
      const res = await fetch('/api/taste/collide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityA: a, entityB: b }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Collision request failed', err);
    } finally {
      setIsColliding(false);
    }
  };

  const handleSelectPreset = (preset: typeof COLLISION_PRESETS[0]) => {
    setEntityA(preset.a);
    setEntityB(preset.b);
    handleCollide(preset.a, preset.b);
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373]">
            Cross-Domain Latent Synthesis
          </div>
          <h2 className="text-3xl font-serif text-[#f2efe9] mt-1">
            The Cultural Hadron Collider
          </h2>
          <p className="text-sm text-stone-400 font-light max-w-2xl mt-1 leading-relaxed">
            Collide two seemingly irreconcilable cultural tastes to uncover the latent wormhole bridging them into unexpected media harmony.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-stone-500 font-mono mr-1">Sample Collisions:</span>
          {COLLISION_PRESETS.slice(0, 3).map((p) => (
            <button
              key={p.label}
              onClick={() => handleSelectPreset(p)}
              disabled={isColliding}
              className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700 transition-colors whitespace-nowrap cursor-pointer text-[11px]"
            >
              {p.a} ✕ {p.b}
            </button>
          ))}
        </div>
      </div>

      {/* Collision Input Chamber */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#101214] border border-stone-800 rounded-2xl p-6 lg:p-8">
        {/* Entity A Input */}
        <div className="lg:col-span-5 space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block">
            Cultural Particle A:
          </label>
          <input
            type="text"
            value={entityA}
            onChange={(e) => setEntityA(e.target.value)}
            placeholder="e.g. Taylor Swift, Blade Runner, Bach..."
            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-[#f2efe9] focus:outline-none focus:border-[#d4a373] transition-colors font-medium"
          />
        </div>

        {/* Center Collider Trigger */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center pt-2 lg:pt-5">
          <button
            onClick={() => handleCollide()}
            disabled={isColliding || !entityA || !entityB}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#d4a373] hover:bg-[#e0b488] active:scale-95 text-black shadow-lg transition-all cursor-pointer disabled:opacity-50"
            title="Execute Collision"
          >
            {isColliding ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Atom className="w-5 h-5" />
            )}
          </button>
          <span className="text-[10px] font-mono text-stone-500 uppercase mt-2">Collide</span>
        </div>

        {/* Entity B Input */}
        <div className="lg:col-span-5 space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-stone-400 block">
            Cultural Particle B:
          </label>
          <input
            type="text"
            value={entityB}
            onChange={(e) => setEntityB(e.target.value)}
            placeholder="e.g. David Lynch, Studio Ghibli, Burial..."
            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-[#f2efe9] focus:outline-none focus:border-[#d4a373] transition-colors font-medium"
          />
        </div>
      </div>

      {/* Collision Output Stage */}
      {result ? (
        <div className="bg-[#121417] border border-stone-800 rounded-2xl overflow-hidden shadow-xl animate-in fade-in duration-300">
          {/* Top Banner with Artwork and Wormhole */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-stone-800">
            {/* Visual Thumbnail */}
            <div className="lg:col-span-4 relative min-h-[220px] bg-stone-900">
              <img
                src="/src/assets/images/taste_collider_visual_1792302090845.jpg"
                alt="Cultural Collision Synthesis"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-[#d4a373]">
                <span>Synthesized Resonance</span>
              </div>
            </div>

            {/* Synthesized Wormhole Rationale */}
            <div className="lg:col-span-8 p-6 lg:p-8 space-y-4 flex flex-col justify-center">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373]">
                  Synthesized Aesthetic Vector:
                </div>
                <h3 className="text-2xl font-serif text-[#f2efe9]">
                  {result.synthesizedAesthetic}
                </h3>
              </div>

              {/* The Latent Wormhole Callout */}
              <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 space-y-1">
                <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                  The Latent Cultural Wormhole:
                </div>
                <p className="text-sm font-serif italic text-stone-200 leading-relaxed">
                  “{result.latentWormhole}”
                </p>
              </div>

              {/* Curatorial Sociological Thesis */}
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                {result.curatorialThesis}
              </p>
            </div>
          </div>

          {/* Reconciling Media Recommendations */}
          <div className="p-6 lg:p-8 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>Curated Reconciling Media (Uniting Both Worlds):</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.hybridRecommendations.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-stone-900/50 border border-stone-800 rounded-xl p-5 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-stone-500 uppercase">
                      {item.domain} · {item.year}
                    </div>
                    <h4 className="text-base font-serif text-[#f2efe9] font-medium leading-snug">
                      {item.title}
                    </h4>
                    <div className="text-xs text-stone-400 font-sans">
                      by {item.creator}
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed pt-2 border-t border-stone-800/70">
                    {item.reconcilingElement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Empty State Prompt */
        <div className="text-center py-12 border border-dashed border-stone-800 rounded-2xl space-y-3 bg-stone-900/20">
          <Atom className="w-8 h-8 text-stone-600 mx-auto" />
          <div className="text-sm font-serif text-stone-300">
            Select or type two cultural icons above and press Collide.
          </div>
          <div className="text-xs text-stone-500 max-w-md mx-auto">
            Witness how Qloo’s multi-agent intelligence finds the latent wormhole between contrasting worlds.
          </div>
        </div>
      )}
    </div>
  );
};
