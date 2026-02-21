import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { faceCatalog } from '@/assets/faces/catalog';
import { voiceCatalog } from '@/assets/voices/catalog';
import { useAppStore } from '@/store/useAppStore';
import { createId } from '@/utils/id';
import type { Profile } from '@/types';

const emptyProfile = (): Profile => ({
  id: createId(),
  name: '',
  faceId: faceCatalog[0].id,
  voiceId: voiceCatalog[0].id,
  config: { apiKey: '', agentId: '', voiceId: voiceCatalog[0].id, baseUrl: '' },
});

export function ProfilesScreen() {
  const { profiles, saveProfile, deleteProfile, setActiveProfileId } = useAppStore();
  const [draft, setDraft] = useState<Profile>(emptyProfile());
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingProfile = useMemo(
    () => profiles.find((profile) => profile.id === editingId) ?? null,
    [profiles, editingId]
  );

  const submit = async () => {
    if (!draft.name.trim()) return;
    await saveProfile(draft);
    await setActiveProfileId(draft.id);
    setDraft(emptyProfile());
    setEditingId(null);
  };

  return (
    <main className="min-h-screen bg-rotom-bg p-4 text-slate-100">
      <Link className="text-sky-200 underline" to="/">
        ← Back Home
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">Manage Profiles</h1>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <section className="space-y-2 rounded-lg border border-sky-300/20 bg-white/5 p-3">
          <h2 className="text-lg">{editingProfile ? 'Edit Profile' : 'Create Profile'}</h2>
          <input
            className="w-full rounded bg-rotom-panel p-2"
            onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Profile name"
            value={draft.name}
          />
          <select
            className="w-full rounded bg-rotom-panel p-2"
            onChange={(event) => setDraft((prev) => ({ ...prev, faceId: event.target.value }))}
            value={draft.faceId}
          >
            {faceCatalog.map((face) => (
              <option key={face.id} value={face.id}>
                {face.name}
              </option>
            ))}
          </select>
          <select
            className="w-full rounded bg-rotom-panel p-2"
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, voiceId: event.target.value, config: { ...prev.config, voiceId: event.target.value } }))
            }
            value={draft.voiceId}
          >
            {voiceCatalog.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </select>

          <input
            className="w-full rounded bg-rotom-panel p-2"
            onChange={(event) => setDraft((prev) => ({ ...prev, config: { ...prev.config, apiKey: event.target.value } }))}
            placeholder="API Key"
            type="password"
            value={draft.config.apiKey}
          />
          <input
            className="w-full rounded bg-rotom-panel p-2"
            onChange={(event) => setDraft((prev) => ({ ...prev, config: { ...prev.config, agentId: event.target.value } }))}
            placeholder="Agent ID"
            value={draft.config.agentId}
          />
          <input
            className="w-full rounded bg-rotom-panel p-2"
            onChange={(event) => setDraft((prev) => ({ ...prev, config: { ...prev.config, baseUrl: event.target.value } }))}
            placeholder="Base URL override"
            value={draft.config.baseUrl}
          />

          <button className="rounded bg-sky-500 px-3 py-2" onClick={() => void submit()} type="button">
            {editingProfile ? 'Save Changes' : 'Create Profile'}
          </button>
        </section>

        <section className="space-y-3 rounded-lg border border-sky-300/20 bg-white/5 p-3">
          <h2 className="text-lg">Profile List</h2>
          {profiles.map((profile) => (
            <article className="rounded border border-sky-300/20 p-2" key={profile.id}>
              <p className="font-medium">{profile.name}</p>
              <p className="text-sm text-slate-300">
                Face: {faceCatalog.find((face) => face.id === profile.faceId)?.name ?? profile.faceId}
              </p>
              <p className="text-sm text-slate-300">
                Voice: {voiceCatalog.find((voice) => voice.id === profile.voiceId)?.name ?? profile.voiceId}
              </p>
              <div className="mt-2 flex gap-2 text-sm">
                <button
                  className="rounded bg-slate-700 px-2 py-1"
                  onClick={() => {
                    setDraft(profile);
                    setEditingId(profile.id);
                  }}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="rounded bg-rose-600 px-2 py-1"
                  onClick={() => void deleteProfile(profile.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
