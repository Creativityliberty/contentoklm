export type ContentType = 'Image' | 'Reel' | 'Carousel';
export type PostStatus = 'empty' | 'draft';
export type View = 'posts' | 'connections' | 'analytics' | 'users' | 'apiKeys' | 'apiDocs';
// FIX: Updated aspect ratio to supported values. '4:5' is not supported by the API, '3:4' and '4:3' are.
export type AspectRatio = '1:1' | '3:4' | '4:3' | '16:9' | '9:16';

export interface Pillar {
  id: number;
  name: string;
  emoji: string;
  color: string; // e.g., 'bg-sky-200'
}

export interface GroundingCitation {
    uri: string;
    title: string;
}

export interface Post {
  id: number;
  topic: string;
  caption: string;
  imageUrl: string | null;
  videoUrl: string | null;
  status: PostStatus;
  contentType: ContentType;
  pillarId?: number;
  campaignId?: string;
  groundingCitations?: GroundingCitation[];
}

export interface BrandVoice {
  formality: number; // -1 (Casual) to 1 (Formal)
  humor: number; // -1 (Serious) to 1 (Humorous)
  tone: number; // -1 (Direct) to 1 (Poetic)
}

export interface BrandVoiceAnalysis extends BrandVoice {
  summary: string;
}

export interface BrandDiscoveryResult {
    niche: string;
    pillars: Omit<Pillar, 'id'>[];
    voiceAnalysis: BrandVoiceAnalysis;
}

export interface VisualHarmonyAnalysis {
    score: 'Excellente' | 'Moyenne' | 'Faible';
    feedback: string;
}

export interface VoiceConsistencyAnalysis {
    score: 'Constante' | 'Variable';
    feedback: string;
}

export interface PerformancePrediction {
  performanceScore: number;
  feedback: string[];
}
