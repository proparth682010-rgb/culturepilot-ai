import React, { useState } from 'react';
import { TasteSynthesisResponse } from '../types';
import { exportDossierAsJSON, exportDossierAsPDF } from '../utils/exportDossier';
import { Download, FileText, Code2, X, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

interface ExportDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TasteSynthesisResponse;
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [format, setFormat] = useState<'pdf' | 'json'>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);
    setDownloadSuccess(false);

    try {
      if (format === 'pdf') {
        exportDossierAsPDF(data);
      } else {
        exportDossierAsJSON(data);
      }
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#121417] border border-stone-800 rounded-2xl max-w-xl w-full p-8 space-y-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373] flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Archival Export Engine</span>
          </div>
          <h2 className="text-2xl font-serif text-[#f2efe9]">
            Export Curated Media Dossier
          </h2>
          <p className="text-xs text-stone-400 font-light">
            Download your personalized cultural blueprint, cross-domain recommendations, and evening immersion capsule for offline archiving.
          </p>
        </div>

        {/* Dossier Preview Summary Box */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-stone-500 uppercase text-[10px]">Archetype Title:</span>
            <span className="text-[#f2efe9] font-serif font-medium">{data.archetype}</span>
          </div>
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-stone-500 uppercase text-[10px]">Curated Entities:</span>
            <span className="text-[#d4a373]">{data.recommendations.length} Works Across 4 Domains</span>
          </div>
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-stone-500 uppercase text-[10px]">Evening Protocol:</span>
            <span className="text-stone-300">{data.eveningCapsule?.title || 'Included'}</span>
          </div>
        </div>

        {/* Format Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-stone-400 block">
            Select Export Format:
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormat('pdf')}
              className={`p-4 rounded-xl border text-left space-y-1.5 transition-all cursor-pointer ${
                format === 'pdf'
                  ? 'border-[#d4a373] bg-[#d4a373]/10 text-white shadow-sm'
                  : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs text-[#f2efe9]">
                <FileText className="w-4 h-4 text-[#d4a373]" />
                <span>Archival PDF Catalog</span>
              </div>
              <p className="text-[11px] text-stone-400 font-sans font-light">
                Beautifully formatted printable document with curatorial rationales and reading typography.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormat('json')}
              className={`p-4 rounded-xl border text-left space-y-1.5 transition-all cursor-pointer ${
                format === 'json'
                  ? 'border-[#d4a373] bg-[#d4a373]/10 text-white shadow-sm'
                  : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-xs text-[#f2efe9]">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Machine JSON Payload</span>
              </div>
              <p className="text-[11px] text-stone-400 font-sans font-light">
                Raw structured cultural data including high-dimensional affinity vectors, scores, and tags.
              </p>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {downloadSuccess && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-mono flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dossier successfully generated and downloaded to your device.</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-black bg-[#d4a373] hover:bg-[#e0b488] active:scale-95 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {format.toUpperCase()} Dossier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
