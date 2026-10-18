import React, { useState } from 'react';
import { GraphNode, GraphLink, CulturalEntity } from '../types';
import { Network, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';

interface InteractiveTasteGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
  recommendations: CulturalEntity[];
  onSelectEntity?: (entity: CulturalEntity) => void;
}

export const InteractiveTasteGraph: React.FC<InteractiveTasteGraphProps> = ({
  nodes,
  links,
  recommendations,
  onSelectEntity,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  // Position nodes in radial concentric orbits
  const width = 800;
  const height = 540;
  const centerX = width / 2;
  const centerY = height / 2;

  // Classify nodes
  const coreNode = nodes.find((n) => n.group === 'core') || { id: 'core', label: 'User Taste Core', group: 'core', domain: 'all' };
  const bridgeNodes = nodes.filter((n) => n.group === 'bridge');
  const mediaNodes = nodes.filter((n) => n.group === 'media');

  // Compute node coordinates
  const nodePositions: Record<string, { x: number; y: number; node: GraphNode }> = {};

  // Core at center
  nodePositions[coreNode.id] = { x: centerX, y: centerY, node: coreNode };

  // Bridges in inner circle
  const bridgeRadius = 140;
  bridgeNodes.forEach((bNode, idx) => {
    const angle = (idx / Math.max(1, bridgeNodes.length)) * 2 * Math.PI - Math.PI / 2;
    nodePositions[bNode.id] = {
      x: centerX + Math.cos(angle) * bridgeRadius,
      y: centerY + Math.sin(angle) * bridgeRadius,
      node: bNode,
    };
  });

  // Media in outer circle
  const mediaRadius = 245;
  mediaNodes.forEach((mNode, idx) => {
    const angle = (idx / Math.max(1, mediaNodes.length)) * 2 * Math.PI - Math.PI / 2;
    nodePositions[mNode.id] = {
      x: centerX + Math.cos(angle) * mediaRadius,
      y: centerY + Math.sin(angle) * mediaRadius,
      node: mNode,
    };
  });

  // Find selected node details
  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null;
  const selectedEntity = selectedNode ? recommendations.find((r) => r.id === selectedNode.id || r.name.toLowerCase() === selectedNode.label.toLowerCase()) : null;

  // Determine active links
  const activeLinks = selectedNodeId
    ? links.filter((l) => l.source === selectedNodeId || l.target === selectedNodeId)
    : links;

  const getNodeColor = (node: GraphNode) => {
    if (node.group === 'core') return '#d4a373';
    if (node.group === 'bridge') return '#a8a29e';
    switch (node.domain) {
      case 'cinema':
        return '#fbbf24';
      case 'music':
        return '#38bdf8';
      case 'literature':
        return '#34d399';
      case 'architecture':
        return '#fb7185';
      default:
        return '#e2e8f0';
    }
  };

  return (
    <div className="bg-[#101214] border border-stone-800 rounded-2xl p-6 space-y-6">
      {/* Header and Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373]">
            High-Dimensional Topology
          </div>
          <h2 className="text-2xl font-serif text-[#f2efe9] mt-0.5">
            Cross-Domain Taste Affinity Graph
          </h2>
          <p className="text-xs text-stone-400 font-light mt-1">
            Visualizing the latent bridges connecting your core profile with cross-domain media nodes.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400 bg-stone-900/60 px-4 py-2 rounded-lg border border-stone-800 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4a373]" />
            <span>Core</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a8a29e]" />
            <span>Latent Bridge</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
            <span>Cinema</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
            <span>Music</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
            <span>Literature</span>
          </div>
        </div>
      </div>

      {/* Main SVG Graph Container */}
      <div className="relative border border-stone-800/80 rounded-xl bg-[#0b0c0e] overflow-hidden">
        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-stone-900/80 border border-stone-800 rounded-lg p-1 text-stone-400">
          <button
            onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
            className="p-1.5 hover:text-white transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}
            className="p-1.5 hover:text-white transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setSelectedNodeId(null);
            }}
            className="p-1.5 hover:text-white transition-colors cursor-pointer"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* SVG Canvas */}
        <div className="w-full overflow-x-auto flex justify-center py-4">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full max-w-[850px] h-auto select-none"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
          >
            {/* Ambient Orbit Rings */}
            <circle
              cx={centerX}
              cy={centerY}
              r={bridgeRadius}
              fill="none"
              stroke="#262626"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={mediaRadius}
              fill="none"
              stroke="#1f1f1f"
              strokeWidth="1"
            />

            {/* Links / Vectors */}
            {links.map((link, idx) => {
              const sourcePos = nodePositions[link.source];
              const targetPos = nodePositions[link.target];
              if (!sourcePos || !targetPos) return null;

              const isHighlighted =
                selectedNodeId === link.source || selectedNodeId === link.target;
              const isDimmed = selectedNodeId && !isHighlighted;

              return (
                <line
                  key={`${link.source}-${link.target}-${idx}`}
                  x1={sourcePos.x}
                  y1={sourcePos.y}
                  x2={targetPos.x}
                  y2={targetPos.y}
                  stroke={isHighlighted ? '#d4a373' : '#333333'}
                  strokeWidth={isHighlighted ? 2.2 : 1}
                  strokeOpacity={isDimmed ? 0.15 : isHighlighted ? 0.9 : 0.4}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Nodes */}
            {Object.values(nodePositions).map(({ x, y, node }) => {
              const isSelected = selectedNodeId === node.id;
              const isConnected = selectedNodeId
                ? activeLinks.some((l) => l.source === node.id || l.target === node.id)
                : false;
              const isDimmed = selectedNodeId && !isSelected && !isConnected;
              const color = getNodeColor(node);
              const radius = node.group === 'core' ? 14 : node.group === 'bridge' ? 9 : 7;

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNodeId(isSelected ? null : node.id)}
                  className="cursor-pointer transition-transform duration-200"
                  style={{ opacity: isDimmed ? 0.3 : 1 }}
                >
                  {/* Subtle focus glow */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r={radius + 8}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeOpacity="0.4"
                    />
                  )}

                  {/* Core Node Circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={radius}
                    fill={color}
                    stroke="#0e0f11"
                    strokeWidth="2.5"
                    className="hover:scale-125 transition-transform"
                  />

                  {/* Node Label */}
                  <text
                    x={x}
                    y={y + radius + 13}
                    textAnchor="middle"
                    className={`text-[10px] font-sans tracking-tight fill-stone-300 transition-colors pointer-events-none ${
                      isSelected ? 'font-bold fill-[#f2efe9]' : ''
                    }`}
                  >
                    {node.label.length > 22 ? `${node.label.substring(0, 20)}…` : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Node Inspector Drawer */}
      {selectedNode && (
        <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373] flex items-center gap-2">
              <Info className="w-3.5 h-3.5" />
              <span>Node Inspector · {selectedNode.group.toUpperCase()}</span>
            </div>
            <h3 className="text-lg font-serif text-[#f2efe9]">
              {selectedNode.label}
            </h3>
            {selectedEntity ? (
              <p className="text-xs text-stone-300 font-light max-w-2xl leading-relaxed">
                {selectedEntity.whyItFits}
              </p>
            ) : (
              <p className="text-xs text-stone-400 font-light max-w-2xl">
                Latent cultural bridge harmonizing thematic, sonic, and architectural affinities across domains.
              </p>
            )}
          </div>

          {selectedEntity && (
            <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
              <div>
                <span className="text-stone-500 uppercase block text-[10px]">Affinity</span>
                <span className="text-base font-serif text-[#d4a373] tabular-nums font-semibold">
                  {selectedEntity.affinityScore}%
                </span>
              </div>
              <div>
                <span className="text-stone-500 uppercase block text-[10px]">Serendipity</span>
                <span className="text-base font-serif text-emerald-400 tabular-nums font-semibold">
                  {selectedEntity.serendipityIndex}%
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
