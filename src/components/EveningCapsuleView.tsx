import React, { useState, useEffect } from 'react';
import { EveningCapsule } from '../types';
import { ambientSound } from '../utils/ambientAudio';
import { Volume2, VolumeX, Moon, Clock, Wine, Sparkles, Compass } from 'lucide-react';

interface EveningCapsuleViewProps {
  capsule: EveningCapsule;
}

export const EveningCapsuleView: React.FC<EveningCapsuleViewProps> = ({ capsule }) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [soundPreset, setSoundPreset] = useState<'noir_drone' | 'tape_warmth' | 'rain' | 'meditation'>('noir_drone');

  useEffect(() => {
    return () => {
      ambientSound.stop();
    };
  }, []);

  const toggleSound = (preset?: typeof soundPreset) => {
    const targetPreset = preset || soundPreset;
    if (isPlayingSound && targetPreset === soundPreset) {
      ambientSound.stop();
      setIsPlayingSound(false);
    } else {
      setSoundPreset(targetPreset);
      ambientSound.playPreset(targetPreset);
      setIsPlayingSound(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373]">
            Curator’s Multi-Sensory Protocol
          </div>
          <h2 className="text-3xl font-serif text-[#f2efe9] mt-1">
            {capsule.title}
          </h2>
          <p className="text-sm text-stone-400 font-light max-w-2xl mt-1 leading-relaxed">
            A sequenced evening immersion synthesizing sonic atmosphere, cinematic narrative, and midnight literature into a single emotional arc.
          </p>
        </div>

        {/* Ambient Soundscape Player Controls */}
        <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-xl p-2 shrink-0">
          <button
            onClick={() => toggleSound()}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              isPlayingSound
                ? 'bg-[#d4a373] text-black font-semibold'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            {isPlayingSound ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Ambient Soundscape Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Play Immersion Sound</span>
              </>
            )}
          </button>

          {/* Sound Presets */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-stone-400">
            {(['noir_drone', 'tape_warmth', 'rain', 'meditation'] as const).map((p) => (
              <button
                key={p}
                onClick={() => toggleSound(p)}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  soundPreset === p && isPlayingSound
                    ? 'text-[#d4a373] underline'
                    : 'hover:text-stone-200'
                }`}
              >
                {p === 'noir_drone' ? 'Drone' : p === 'tape_warmth' ? 'Tape' : p === 'rain' ? 'Rain' : 'Medit'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Atmospheric Still Life Photo */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 min-h-[380px] flex flex-col justify-end">
          <img
            src="/src/assets/images/curator_evening_capsule_1792302089816.jpg"
            alt="Curator Evening Immersion Setting"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          {/* Overlay Notes */}
          <div className="relative z-10 p-6 space-y-3 text-[#f2efe9]">
            <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373]">
              Sensory Atmosphere:
            </div>
            <p className="text-sm font-serif italic text-stone-200">
              “{capsule.sensoryNote}”
            </p>
            <div className="pt-2 border-t border-stone-800/80 text-xs text-stone-400 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>Optimal Listening Environment: 2200K Low Incandescence</span>
            </div>
          </div>
        </div>

        {/* Right: Chronological 3-Phase Progression */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          {/* Phase 1: Twilight Sound */}
          <div className="bg-[#121417] border border-stone-800 rounded-xl p-5 space-y-2 hover:border-stone-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase text-cyan-400 font-semibold">19:00 · Phase I: Twilight Sound</span>
              </div>
              <span className="text-stone-500">Audio Attunement</span>
            </div>
            <h4 className="text-xl font-serif text-[#f2efe9]">
              {capsule.twilightSound.title}
            </h4>
            <div className="text-xs text-stone-400 font-sans">
              by {capsule.twilightSound.artist}
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed pt-1">
              {capsule.twilightSound.rationale}
            </p>
          </div>

          {/* Phase 2: Feature Screening */}
          <div className="bg-[#121417] border border-stone-800 rounded-xl p-5 space-y-2 hover:border-stone-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase text-amber-400 font-semibold">21:00 · Phase II: Feature Screening</span>
              </div>
              <span className="text-stone-500">Cinematic Immersion</span>
            </div>
            <h4 className="text-xl font-serif text-[#f2efe9]">
              {capsule.featureScreening.title}
            </h4>
            <div className="text-xs text-stone-400 font-sans">
              directed by {capsule.featureScreening.director}
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed pt-1">
              {capsule.featureScreening.rationale}
            </p>
          </div>

          {/* Phase 3: Midnight Reading */}
          <div className="bg-[#121417] border border-stone-800 rounded-xl p-5 space-y-2 hover:border-stone-700 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <div className="flex items-center gap-2">
                <Moon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="uppercase text-emerald-400 font-semibold">23:30 · Phase III: Midnight Reading</span>
              </div>
              <span className="text-stone-500">Nocturnal Reflection</span>
            </div>
            <h4 className="text-xl font-serif text-[#f2efe9]">
              {capsule.midnightReading.title}
            </h4>
            <div className="text-xs text-stone-400 font-sans">
              by {capsule.midnightReading.author}
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed pt-1">
              {capsule.midnightReading.rationale}
            </p>
          </div>
        </div>
      </div>

      {/* Sensory Settings & Pairings Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#101214] border border-stone-800 rounded-xl p-5 font-mono text-xs text-stone-400">
        <div className="space-y-1">
          <span className="text-stone-500 uppercase tracking-wider block text-[10px] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#d4a373]" />
            Ambient & Lighting Formula:
          </span>
          <p className="text-stone-300 font-sans text-xs">
            {capsule.ambientSetting}
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-stone-500 uppercase tracking-wider block text-[10px] flex items-center gap-1.5">
            <Wine className="w-3 h-3 text-[#d4a373]" />
            Beverage / Gastronomy Pairing:
          </span>
          <p className="text-stone-300 font-sans text-xs">
            {capsule.beveragePairing}
          </p>
        </div>
      </div>
    </div>
  );
};
