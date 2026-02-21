import type { ElevenLabsConfig } from '@/types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const elevenLabsService = {
  async testConnection(config: ElevenLabsConfig): Promise<boolean> {
    await wait(300);
    return Boolean(config.apiKey && config.agentId && config.voiceId);
  },

  async transcribeAudio(_blob: Blob, _config: ElevenLabsConfig): Promise<{ text: string }> {
    // TODO: wire real ElevenLabs speech-to-text endpoint.
    await wait(650);
    return { text: 'Mocked transcription from your audio input.' };
  },

  async sendToAgent(text: string, _config: ElevenLabsConfig): Promise<{ replyText: string }> {
    // TODO: wire real ElevenLabs conversational agent endpoint.
    await wait(900);
    return { replyText: `Echo from mock agent: ${text}` };
  },

  async generateSpeech(
    text: string,
    _config: ElevenLabsConfig
  ): Promise<{ audioUrlOrBlob: Blob | string }> {
    // TODO: wire real ElevenLabs text-to-speech endpoint.
    await wait(900);
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    return { audioUrlOrBlob: 'speechSynthesis:fallback' };
  },
};
