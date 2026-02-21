import { create } from 'zustand';
import { faceCatalog } from '@/assets/faces/catalog';
import { voiceCatalog } from '@/assets/voices/catalog';
import { elevenLabsService } from '@/services/elevenLabsService';
import { storageService } from '@/services/storage';
import { createId } from '@/utils/id';
import type { AssistantStatus, Profile, Toast } from '@/types';

interface AppState {
  profiles: Profile[];
  activeProfileId: string | null;
  ui: { drawerOpen: boolean; toasts: Toast[] };
  assistant: { status: AssistantStatus };
  rehydrate: () => Promise<void>;
  setDrawerOpen: (open: boolean) => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  setAssistantStatus: (status: AssistantStatus) => void;
  setActiveProfileId: (id: string) => Promise<void>;
  saveProfile: (profile: Profile) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  testConnectionForProfile: (id: string) => Promise<boolean>;
}

const defaultProfile = (): Profile => ({
  id: createId(),
  name: 'Default Assistant',
  faceId: faceCatalog[0].id,
  voiceId: voiceCatalog[0].id,
  config: {
    apiKey: '',
    agentId: '',
    voiceId: voiceCatalog[0].id,
    baseUrl: import.meta.env.VITE_DEFAULT_API_BASE_URL ?? '',
  },
});

export const useAppStore = create<AppState>((set, get) => ({
  profiles: [],
  activeProfileId: null,
  ui: { drawerOpen: false, toasts: [] },
  assistant: { status: 'idle' },

  async rehydrate() {
    const data = await storageService.loadAppData();
    if (data.profiles.length === 0) {
      const starter = defaultProfile();
      set({ profiles: [starter], activeProfileId: starter.id });
      await storageService.saveProfiles([starter]);
      await storageService.saveActiveProfileId(starter.id);
      return;
    }
    set({ profiles: data.profiles, activeProfileId: data.activeProfileId ?? data.profiles[0]?.id ?? null });
  },

  setDrawerOpen(open) {
    set((state) => ({ ui: { ...state.ui, drawerOpen: open } }));
  },

  addToast(message, type = 'info') {
    const toast = { id: createId(), message, type };
    set((state) => ({ ui: { ...state.ui, toasts: [...state.ui.toasts, toast] } }));
    setTimeout(() => get().removeToast(toast.id), 2800);
  },

  removeToast(id) {
    set((state) => ({ ui: { ...state.ui, toasts: state.ui.toasts.filter((toast) => toast.id !== id) } }));
  },

  setAssistantStatus(status) {
    set((state) => ({ assistant: { ...state.assistant, status } }));
  },

  async setActiveProfileId(id) {
    set({ activeProfileId: id });
    await storageService.saveActiveProfileId(id);
  },

  async saveProfile(profile) {
    const profiles = get().profiles;
    const idx = profiles.findIndex((item) => item.id === profile.id);
    const next = idx >= 0 ? profiles.map((item) => (item.id === profile.id ? profile : item)) : [...profiles, profile];
    set({ profiles: next, activeProfileId: get().activeProfileId ?? profile.id });
    await storageService.saveProfiles(next);
  },

  async deleteProfile(id) {
    const next = get().profiles.filter((profile) => profile.id !== id);
    const activeProfileId = get().activeProfileId === id ? next[0]?.id ?? null : get().activeProfileId;
    set({ profiles: next, activeProfileId });
    await storageService.saveProfiles(next);
    await storageService.saveActiveProfileId(activeProfileId);
  },

  async testConnectionForProfile(id) {
    const profile = get().profiles.find((item) => item.id === id);
    if (!profile) return false;
    const ok = await elevenLabsService.testConnection(profile.config);
    get().addToast(ok ? 'Connection successful.' : 'Connection failed.', ok ? 'success' : 'error');
    return ok;
  },
}));
