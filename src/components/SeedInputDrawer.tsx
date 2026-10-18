import React, { useState } from 'react';
import { X, Sliders, Sparkles } from 'lucide-react';
import { AudioVoiceInput } from './AudioVoiceInput';

interface SeedInputDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  seeds: {
    cinema: string;
    music: string;
    literature: string;
    spaces: string;
  };
  onSaveSeeds: (newSeeds: { cinema: string; music: string; literature: string; spaces: string }) => void;
  isSynthesizing: boolean;
}

export const SeedInputDrawer: React.FC<SeedInputDrawerProps> = ({
  isOpen,
  onClose,
  seeds,
  onSaveSeeds,
  isSynthesizing,
}) => {
  const [cinema, setCinema] = useState(seeds.cinema);
  const [music, setMusic] = useState(seeds.music);
  const [literature, setLiterature] = useState(seeds.literature);
  const [spaces, setSpaces] = useState(seeds.spaces);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSeeds({ cinema, music, literature, spaces });
    onClose();
  };

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
            <Sliders className="w-3.5 h-3.5" />
            <span>Pillar Calibration</span>
          </div>
          <h2 className="text-2xl font-serif text-[#f2efe9]">
            Tune Cultural Seed Coordinates
          </h2>
          <p className="text-xs text-stone-400 font-light">
            Enter your beloved directors, musicians, authors, and architectural places to calibrate the latent taste graph.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-stone-400 block">
                Cinema / Visual Seeds:
              </label>
              <AudioVoiceInput
                onTranscribed={(txt) => setCinema((prev) => (prev ? `${prev}, ${txt}` : txt))}
                buttonLabel="Dictate"
              />
            </div>
            <input
              type="text"
              value={cinema}
              onChange={(e) => setCinema(e.target.value)}
              placeholder="e.g. Wong Kar-wai, Denis Villeneuve, Claire Denis"
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-[#f2efe9] focus:outline-none focus:border-[#d4a373]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-stone-400 block">
                Sound / Music Seeds:
              </label>
              <AudioVoiceInput
                onTranscribed={(txt) => setMusic((prev) => (prev ? `${prev}, ${txt}` : txt))}
                buttonLabel="Dictate"
              />
            </div>
            <input
              type="text"
              value={music}
              onChange={(e) => setMusic(e.target.value)}
              placeholder="e.g. Burial, Cocteau Twins, Nils Frahm, Portishead"
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-[#f2efe9] focus:outline-none focus:border-[#d4a373]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-stone-400 block">
                Literature / Thought Seeds:
              </label>
              <AudioVoiceInput
                onTranscribed={(txt) => setLiterature((prev) => (prev ? `${prev}, ${txt}` : txt))}
                buttonLabel="Dictate"
              />
            </div>
            <input
              type="text"
              value={literature}
              onChange={(e) => setLiterature(e.target.value)}
              placeholder="e.g. Haruki Murakami, Ocean Vuong, Mark Fisher, Borges"
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-[#f2efe9] focus:outline-none focus:border-[#d4a373]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-stone-400 block">
                Spaces / Architectural Aesthetics:
              </label>
              <AudioVoiceInput
                onTranscribed={(txt) => setSpaces((prev) => (prev ? `${prev}, ${txt}` : txt))}
                buttonLabel="Dictate"
              />
            </div>
            <input
              type="text"
              value={spaces}
              onChange={(e) => setSpaces(e.target.value)}
              placeholder="e.g. Brutalist Barbican, Kyoto Tea Houses, Rainy Shinjuku"
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-[#f2efe9] focus:outline-none focus:border-[#d4a373]"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSynthesizing}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-[#d4a373] hover:bg-[#e0b488] rounded-xl transition-all shadow cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Update & Recalibrate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
