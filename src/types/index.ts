export type AssistantStatus = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

export interface ElevenLabsConfig {
  apiKey: string;
  agentId: string;
  voiceId: string;
  baseUrl?: string;
}

export interface Profile {
  id: string;
  name: string;
  faceId: string;
  voiceId: string;
  config: ElevenLabsConfig;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface FaceCatalogItem {
  id: string;
  name: string;
  previewImagePath: string;
  description: string;
}

export interface VoiceCatalogItem {
  id: string;
  name: string;
  description: string;
}
