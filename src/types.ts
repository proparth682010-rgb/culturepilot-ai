export type CulturalDomain = 'cinema' | 'music' | 'literature' | 'architecture' | 'fashion' | 'all';

export interface CulturalEntity {
  id: string;
  name: string;
  domain: 'cinema' | 'music' | 'literature' | 'architecture';
  year: string;
  creator: string;
  aestheticTags: string[];
  affinityScore: number;
  serendipityIndex: number;
  whyItFits: string;
  crossDomainBridge: string;
  quoteOrTheme: string;
}

export interface AgentInsight {
  agent: string;
  insight: string;
}

export interface EveningCapsulePhase {
  title: string;
  artist?: string;
  director?: string;
  author?: string;
  rationale: string;
}

export interface EveningCapsule {
  title: string;
  twilightSound: EveningCapsulePhase;
  featureScreening: EveningCapsulePhase;
  midnightReading: EveningCapsulePhase;
  ambientSetting: string;
  beveragePairing: string;
  sensoryNote: string;
}

export interface GraphNode {
  id: string;
  label: string;
  group: 'core' | 'bridge' | 'media';
  domain: string;
}

export interface GraphLink {
  source: string;
  target: string;
  strength: number;
}

export interface TasteSynthesisResponse {
  archetype: string;
  dominantAesthetics: string[];
  culturalTemperament: string;
  latentVectorDescription: string;
  agentInsights: AgentInsight[];
  recommendations: CulturalEntity[];
  eveningCapsule: EveningCapsule;
  graphNodes: GraphNode[];
  graphLinks: GraphLink[];
}

export interface CollisionRecommendation {
  title: string;
  domain: string;
  creator: string;
  year: string;
  reconcilingElement: string;
}

export interface CulturalCollisionResult {
  entityA: string;
  entityB: string;
  latentWormhole: string;
  synthesizedAesthetic: string;
  curatorialThesis: string;
  hybridRecommendations: CollisionRecommendation[];
}

export interface CulturalArchetype {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  seeds: {
    cinema: string;
    music: string;
    literature: string;
    spaces: string;
  };
  dominantVibe: string;
}
