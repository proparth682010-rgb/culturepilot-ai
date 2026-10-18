import React, { useState } from 'react';
import { CulturalEntity, CulturalDomain } from '../types';
import { Film, Disc3, BookOpen, Landmark, ArrowUpRight, Sparkles, X, Bookmark, BookmarkCheck, Download } from 'lucide-react';

interface MediaRecommendationGridProps {
  recommendations: CulturalEntity[];
  onOpenCapsule: () => void;
  onOpenExport?: () => void;
}

export const MediaRecommendationGrid: React.FC<MediaRecommendationGridProps> = ({
  recommendations,
  onOpenCapsule,
  onOpenExport,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<CulturalDomain | 'saved'>('all');
  const [activeModalEntity, setActiveModalEntity] = useState<CulturalEntity | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filtered = selectedDomain === 'saved'
    ? recommendations.filter((r) => bookmarkedIds.has(r.id))
    : selectedDomain === 'all'
    ? recommendations
    : recommendations.filter((r) => r.domain === selectedDomain);

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'cinema':
        return <Film className="w-3.5 h-3.5 text-amber-400" />;
      case 'music':
        return <Disc3 className="w-3.5 h-3.5 text-cyan-400" />;
      case 'literature':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
      case 'architecture':
        return <Landmark className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return null;
    }
  };

  const getDomainBorderColor = (domain: string) => {
    switch (domain) {
      case 'cinema':
        return 'group-hover:border-amber-500/50';
      case 'music':
        return 'group-hover:border-cyan-500/50';
      case 'literature':
        return 'group-hover:border-emerald-500/50';
      case 'architecture':
        return 'group-hover:border-rose-500/50';
      default:
        return 'group-hover:border-[#d4a373]/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls & Summary Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        {/* Domain Segmented Controls */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-lg">
          {(['all', 'cinema', 'music', 'literature', 'architecture'] as CulturalDomain[]).map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedDomain === dom
                  ? 'bg-stone-800 text-[#f2efe9] shadow-sm font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {dom === 'all' ? 'All Domains' : dom}
            </button>
          ))}
          <button
            onClick={() => setSelectedDomain('saved')}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedDomain === 'saved'
                ? 'bg-[#d4a373] text-black font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            <span>Saved ({bookmarkedIds.size})</span>
          </button>
        </div>

        {/* Quiet Count, Export Button, and Capsule Trigger */}
        <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
          <span>{filtered.length} Recommendations</span>
          <span aria-hidden="true">·</span>
          {onOpenExport && (
            <button
              onClick={onOpenExport}
              className="text-stone-300 hover:text-[#d4a373] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Export as PDF or JSON"
            >
              <Download className="w-3.5 h-3.5 text-[#d4a373]" />
              <span>Export Dossier</span>
            </button>
          )}
          <span aria-hidden="true">·</span>
          <button
            onClick={onOpenCapsule}
            className="text-[#d4a373] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evening Capsule</span>
          </button>
        </div>
      </div>

      {/* Grid of Curatorial Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isBookmarked = bookmarkedIds.has(item.id);
          const domainBorder = getDomainBorderColor(item.domain);

          return (
            <div
              key={item.id}
              onClick={() => setActiveModalEntity(item)}
              className={`group relative bg-[#121417]/95 border border-stone-800/80 rounded-xl p-6 flex flex-col justify-between space-y-5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-md backdrop-blur-sm ${domainBorder}`}
            >
              {/* Top: Unboxed Domain & Year Metadata + Bookmark Action */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                  <div className="flex items-center gap-2">
                    {getDomainIcon(item.domain)}
                    <span className="uppercase tracking-wider">{item.domain}</span>
                    <span aria-hidden="true" className="text-stone-600">·</span>
                    <span>{item.year}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-stone-300">
                      <span className="text-[10px] text-stone-500 uppercase">Affinity</span>
                      <span className="font-semibold text-[#d4a373] tabular-nums">{item.affinityScore}%</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(e, item.id)}
                      className={`p-1 rounded hover:bg-stone-800 transition-colors cursor-pointer ${
                        isBookmarked ? 'text-[#d4a373]' : 'text-stone-600 hover:text-stone-400'
                      }`}
                      title={isBookmarked ? 'Remove from saved' : 'Save to personal archive'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 fill-[#d4a373]/20" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Title & Creator */}
                <div>
                  <h3 className="text-xl font-serif font-medium text-[#f2efe9] group-hover:text-[#d4a373] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <div className="text-xs text-stone-400 font-sans mt-0.5">
                    by {item.creator}
                  </div>
                </div>

                {/* Curatorial Rationale */}
                <p className="text-xs text-stone-400 leading-relaxed font-light line-clamp-3">
                  {item.whyItFits}
                </p>
              </div>

              {/* Bottom: Cross-domain Bridge & Aesthetic Markers */}
              <div className="space-y-3 pt-3 border-t border-stone-800/70">
                {/* Unboxed Aesthetic Tag Text with Typographic Separator */}
                <div className="text-[11px] font-mono text-stone-500 truncate">
                  {item.aestheticTags.map((tag, idx) => (
                    <span key={tag}>
                      <span className="text-stone-400">{tag}</span>
                      {idx < item.aestheticTags.length - 1 && (
                        <span className="mx-1 text-stone-700" aria-hidden="true">/</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Bridge Footnote */}
                <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                  <span className="text-[11px] text-stone-500 font-mono">
                    Serendipity: <strong className="text-stone-300 font-medium tabular-nums">{item.serendipityIndex}%</strong>
                  </span>
                  <span className="text-xs text-stone-400 group-hover:text-stone-200 flex items-center gap-0.5">
                    Inspect Bridge
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#d4a373] transition-colors" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Entity Deep-Dive Modal */}
      {activeModalEntity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#121417] border border-stone-800 rounded-2xl max-w-2xl w-full p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setActiveModalEntity(null)}
              className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              aria-label="Close detail modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d4a373]">
                {getDomainIcon(activeModalEntity.domain)}
                <span>{activeModalEntity.domain}</span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span>{activeModalEntity.year}</span>
              </div>
              <h2 className="text-3xl font-serif font-medium text-[#f2efe9]">
                {activeModalEntity.name}
              </h2>
              <div className="text-sm text-stone-400 font-sans">
                Curated Creator: {activeModalEntity.creator}
              </div>
            </div>

            {/* Quote or Central Theme */}
            {activeModalEntity.quoteOrTheme && (
              <blockquote className="border-l border-[#d4a373]/40 pl-4 py-1 italic font-serif text-stone-300 text-base">
                “{activeModalEntity.quoteOrTheme}”
              </blockquote>
            )}

            {/* Detailed Sociological Rationale */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
                Qloo Cultural Vector Analysis:
              </div>
              <p className="text-sm text-stone-300 leading-relaxed font-light">
                {activeModalEntity.whyItFits}
              </p>
            </div>

            {/* Cross-Domain Affinity Bridge */}
            <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[#d4a373]">
                Cross-Domain Affinity Bridge:
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {activeModalEntity.crossDomainBridge}
              </p>
            </div>

            {/* Quantitative Affinity Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-stone-800 font-mono text-xs text-stone-400">
              <div>
                <span className="text-stone-500 uppercase block text-[10px]">Statistical Affinity</span>
                <span className="text-lg font-serif text-[#d4a373] tabular-nums font-semibold">
                  {activeModalEntity.affinityScore}%
                </span>
              </div>
              <div>
                <span className="text-stone-500 uppercase block text-[10px]">Serendipity Index</span>
                <span className="text-lg font-serif text-emerald-400 tabular-nums font-semibold">
                  {activeModalEntity.serendipityIndex}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
