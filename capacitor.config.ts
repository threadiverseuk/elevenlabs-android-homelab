import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.elevenlabs.rotomassistant',
  appName: 'Rotom Assistant',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
  },
};

export default config;
