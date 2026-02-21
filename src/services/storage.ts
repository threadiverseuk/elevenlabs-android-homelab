import { get, set } from 'idb-keyval';
import type { Profile } from '@/types';

const PROFILES_KEY = 'profiles';
const ACTIVE_PROFILE_KEY = 'activeProfileId';

export interface PersistedAppData {
  profiles: Profile[];
  activeProfileId: string | null;
}

export const storageService = {
  async loadAppData(): Promise<PersistedAppData> {
    const [profiles, activeProfileId] = await Promise.all([
      get<Profile[]>(PROFILES_KEY),
      get<string | null>(ACTIVE_PROFILE_KEY),
    ]);

    return {
      profiles: profiles ?? [],
      activeProfileId: activeProfileId ?? null,
    };
  },
  async saveProfiles(profiles: Profile[]): Promise<void> {
    await set(PROFILES_KEY, profiles);
  },
  async saveActiveProfileId(profileId: string | null): Promise<void> {
    await set(ACTIVE_PROFILE_KEY, profileId);
  },
};
