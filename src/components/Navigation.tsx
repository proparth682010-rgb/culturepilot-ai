import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, Settings2, Download, Volume2, VolumeX } from 'lucide-react';
import { ambientSound } from '../utils/ambientAudio';

interface NavigationProps {
  activeTab: 'curator' | 'graph' | 'collider' | 'capsule' | 'places' | 'debate';
  onSelectTab: (tab: 'curator' | 'graph' | 'collider' | 'capsule' | 'places' | 'debate') => void;
  onOpenSettings: () => void;
  onOpenCustomSeeds: () => void;
  onOpenExport: () => void;
  isSynthesizing: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  onOpenSettings,
  onOpenCustomSeeds,
  onOpenExport,
  isSynthesizing,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleSound = () => {
    if (isPlayingAudio) {
      ambientSound.stop();
      setIsPlayingAudio(false);
    } else {
      ambientSound.playPreset('noir_drone');
      setIsPlayingAudio(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d0e]/95 backdrop-blur-md border-b border-stone-800/80 px-6 py-4 flex items-center justify-between gap-8">
      {/* Zone 1: Single-element brand wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="/"
          className="text-xl font-serif tracking-wide text-[#f2efe9] hover:text-[#d4a373] transition-colors whitespace-nowrap shrink-0"
        >
          QLOO RESONANCE
        </a>
        <span className="hidden sm:inline text-xs uppercase tracking-widest text-stone-500 font-mono">
          · Cultural AI
        </span>
      </div>

      {/* Zone 2: Clean single-line nav links */}
      <nav className="hidden md:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-stone-400">
        <button
          onClick={() => onSelectTab('curator')}
          className={`hover:text-[#f2efe9] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'curator' ? 'text-[#d4a373] font-semibold border-b border-[#d4a373] pb-1' : ''
          }`}
        >
          Curator
        </button>
        <button
          onClick={() => onSelectTab('graph')}
          className={`hover:text-[#f2efe9] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'graph' ? 'text-[#d4a373] font-semibold border-b border-[#d4a373] pb-1' : ''
          }`}
        >
          Taste Graph
        </button>
        <button
          onClick={() => onSelectTab('collider')}
          className={`hover:text-[#f2efe9] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'collider' ? 'text-[#d4a373] font-semibold border-b border-[#d4a373] pb-1' : ''
          }`}
        >
          Collider
        </button>
        <button
          onClick={() => onSelectTab('capsule')}
          className={`hover:text-[#f2efe9] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'capsule' ? 'text-[#d4a373] font-semibold border-b border-[#d4a373] pb-1' : ''
          }`}
        >
          Evening Capsule
        </button>
        <button
          onClick={() => onSelectTab('places')}
          className={`hover:text-[#f2efe9] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'places' ? 'text-[#d4a373] font-semibold border-b border-[#d4a373] pb-1' : ''
          }`}
        >
          Sanctuaries
        </button>
        <button
          onClick={() => onSelectTab('debate')}
          className={`hover:text-[#f2efe9] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'debate' ? 'text-[#d4a373] font-semibold border-b border-[#d4a373] pb-1' : ''
          }`}
        >
          Agent Debate
        </button>
      </nav>

      {/* Zone 3: Actions & Audio Ambient Toggle */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Ambient Soundscape Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-lg border transition-all shrink-0 cursor-pointer ${
            isPlayingAudio
              ? 'bg-[#d4a373]/20 border-[#d4a373] text-[#d4a373]'
              : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
          }`}
          title={isPlayingAudio ? 'Mute ambient soundscape' : 'Play ambient audio soundscape'}
        >
          {isPlayingAudio ? (
            <Volume2 className="w-4 h-4 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* Export Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-black bg-[#d4a373] hover:bg-[#e0b488] active:scale-95 rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          title="Download PDF or JSON Curatorial Dossier"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Pillar Tune */}
        <button
          onClick={onOpenCustomSeeds}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-300 bg-stone-900 border border-stone-800 rounded-lg hover:border-stone-700 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          title="Customize Seed Pillars"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Tune</span>
        </button>

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          className="p-2 text-stone-400 hover:text-stone-200 border border-stone-800 rounded-lg hover:border-stone-700 transition-colors shrink-0 cursor-pointer"
          title="Qloo Taste Graph Configuration"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
