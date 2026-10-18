/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AgentPipelineTracker } from './components/AgentPipelineTracker';
import { MediaRecommendationGrid } from './components/MediaRecommendationGrid';
import { InteractiveTasteGraph } from './components/InteractiveTasteGraph';
import { CulturalCollider } from './components/CulturalCollider';
import { EveningCapsuleView } from './components/EveningCapsuleView';
import { PlacesScoutView } from './components/PlacesScoutView';
import { AgentDebateChat } from './components/AgentDebateChat';
import { SeedInputDrawer } from './components/SeedInputDrawer';
import { QlooSettingsModal } from './components/QlooSettingsModal';
import { ExportDossierModal } from './components/ExportDossierModal';
import { CULTURAL_ARCHETYPES } from './data/archetypes';
import { CulturalArchetype, TasteSynthesisResponse } from './types';
import { Compass, Sparkles, Network } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'curator' | 'graph' | 'collider' | 'capsule' | 'places' | 'debate'>('curator');
  const [selectedArchetype, setSelectedArchetype] = useState<CulturalArchetype>(CULTURAL_ARCHETYPES[0]);
  const [customSeeds, setCustomSeeds] = useState(CULTURAL_ARCHETYPES[0].seeds);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [synthesisData, setSynthesisData] = useState<TasteSynthesisResponse | null>(null);

  // Run initial synthesis on mount
  useEffect(() => {
    runSynthesis(CULTURAL_ARCHETYPES[0].seeds, CULTURAL_ARCHETYPES[0].name);
  }, []);

  const runSynthesis = async (seedsToUse = customSeeds, archetypeName = selectedArchetype.name) => {
    setIsSynthesizing(true);
    try {
      const res = await fetch('/api/taste/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seeds: seedsToUse,
          archetype: archetypeName,
        }),
      });
      const data: TasteSynthesisResponse = await res.json();
      setSynthesisData(data);
    } catch (err) {
      console.error('Synthesis failed', err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleSelectArchetype = (arch: CulturalArchetype) => {
    setSelectedArchetype(arch);
    setCustomSeeds(arch.seeds);
    runSynthesis(arch.seeds, arch.name);
  };

  const handleSaveSeeds = (newSeeds: typeof customSeeds) => {
    setCustomSeeds(newSeeds);
    runSynthesis(newSeeds, `${selectedArchetype.name} (Tuned)`);
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d0e] text-[#f2efe9] flex flex-col font-sans selection:bg-[#d4a373] selection:text-black">
      {/* Subtle Ambient Radial Lighting */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(212,163,115,0.07)_0%,transparent_60%)]" />

      {/* Strict 3-Zone Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenCustomSeeds={() => setIsDrawerOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        isSynthesizing={isSynthesizing}
      />

      {/* Museum-Grade Hero with Archetype Selector */}
      <HeroSection
        selectedArchetypeId={selectedArchetype.id}
        onSelectArchetype={handleSelectArchetype}
        isSynthesizing={isSynthesizing}
        onRunSynthesis={() => runSynthesis()}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Workspace */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 py-10 space-y-10">
        {/* Loading Banner when Synthesizing */}
        {isSynthesizing && (
          <div className="bg-[#101214] border border-[#d4a373]/40 rounded-xl p-5 flex items-center justify-between text-xs font-mono text-[#d4a373] animate-pulse shadow-lg">
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 animate-spin text-[#d4a373]" />
              <span>
                Traversing Qloo 4,096-Dimensional Affinity Latent Space & Multi-Agent Deliberation...
              </span>
            </div>
            <span className="hidden sm:inline text-stone-500">Gemini 3.8 Flash Agentic Council</span>
          </div>
        )}

        {/* Tab 1: Curator Dossier */}
        {activeTab === 'curator' && synthesisData && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Multi-Agent Council Deliberation Tracker */}
            <AgentPipelineTracker
              insights={synthesisData.agentInsights}
              archetype={synthesisData.archetype}
              culturalTemperament={synthesisData.culturalTemperament}
              dominantAesthetics={synthesisData.dominantAesthetics}
            />

            {/* Curatorial Recommendations Grid */}
            <MediaRecommendationGrid
              recommendations={synthesisData.recommendations}
              onOpenCapsule={() => setActiveTab('capsule')}
              onOpenExport={() => setIsExportOpen(true)}
            />
          </div>
        )}

        {/* Tab 2: Interactive Taste Graph */}
        {activeTab === 'graph' && synthesisData && (
          <div className="animate-in fade-in duration-200">
            <InteractiveTasteGraph
              nodes={synthesisData.graphNodes}
              links={synthesisData.graphLinks}
              recommendations={synthesisData.recommendations}
            />
          </div>
        )}

        {/* Tab 3: Cultural Hadron Collider */}
        {activeTab === 'collider' && (
          <div className="animate-in fade-in duration-200">
            <CulturalCollider />
          </div>
        )}

        {/* Tab 4: Evening Immersion Capsule */}
        {activeTab === 'capsule' && synthesisData && (
          <div className="animate-in fade-in duration-200">
            <EveningCapsuleView capsule={synthesisData.eveningCapsule} />
          </div>
        )}

        {/* Tab 5: Spatial Cultural Sanctuaries */}
        {activeTab === 'places' && synthesisData && (
          <div className="animate-in fade-in duration-200">
            <PlacesScoutView
              currentAestheticVibe={synthesisData.dominantAesthetics.join(', ')}
            />
          </div>
        )}

        {/* Tab 6: Agent Debate & Interrogation */}
        {activeTab === 'debate' && synthesisData && (
          <div className="animate-in fade-in duration-200">
            <AgentDebateChat
              userContext={{
                archetype: synthesisData.archetype,
                dominantAesthetics: synthesisData.dominantAesthetics,
                recommendations: synthesisData.recommendations.map((r) => r.name),
              }}
            />
          </div>
        )}
      </main>

      {/* Seed Tuning Drawer */}
      <SeedInputDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        seeds={customSeeds}
        onSaveSeeds={handleSaveSeeds}
        isSynthesizing={isSynthesizing}
      />

      {/* Qloo Settings & Topology Modal */}
      <QlooSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Archival Dossier Export Modal (PDF / JSON) */}
      {synthesisData && (
        <ExportDossierModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          data={synthesisData}
        />
      )}

      {/* Refined Curatorial Footer */}
      <footer className="border-t border-stone-800/80 bg-[#0a0b0d] py-10 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="text-[#f2efe9] font-serif text-sm">QLOO RESONANCE</span>
            <span aria-hidden="true">·</span>
            <span>Agentic Cultural Affinity & Cross-Domain Media Engine</span>
          </div>

          <div className="flex items-center gap-6 text-stone-400">
            <span>Powered by Qloo Taste Graph</span>
            <span aria-hidden="true">·</span>
            <span>Gemini 3.8 Flash</span>
            <span aria-hidden="true">·</span>
            <span>Web Audio Acoustic Layer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
