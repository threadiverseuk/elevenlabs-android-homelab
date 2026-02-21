import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { faceCatalog } from '@/assets/faces/catalog';
import { useAppStore } from '@/store/useAppStore';

export function SettingsDrawer() {
  const { profiles, activeProfileId, ui, setDrawerOpen, setActiveProfileId, saveProfile, testConnectionForProfile } =
    useAppStore();

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) ?? profiles[0],
    [profiles, activeProfileId]
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!activeProfile) return null;

  const activeFace = faceCatalog.find((face) => face.id === activeProfile.faceId);

  const updateField = async (field: 'apiKey' | 'agentId' | 'voiceId' | 'baseUrl', value: string) => {
    await saveProfile({ ...activeProfile, config: { ...activeProfile.config, [field]: value } });
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!activeProfile.config.apiKey.trim()) nextErrors.apiKey = 'API key is required.';
    if (!activeProfile.config.agentId.trim()) nextErrors.agentId = 'Agent ID is required.';
    if (!activeProfile.config.voiceId.trim()) nextErrors.voiceId = 'Voice ID is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition ${ui.drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        className={`fixed left-0 top-0 z-30 h-full w-[320px] bg-[#0f1732] p-4 transition-transform ${ui.drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="text-xl font-semibold text-sky-100">Settings</h2>

        <section className="mt-6 space-y-3 rounded-lg border border-sky-300/20 bg-white/5 p-3">
          <h3 className="font-medium">Active Profile</h3>
          <select
            className="w-full rounded border border-sky-300/30 bg-rotom-bg p-2"
            onChange={(event) => void setActiveProfileId(event.target.value)}
            value={activeProfileId ?? ''}
          >
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
          <div className="rounded border border-sky-300/20 bg-rotom-bg/60 p-2 text-sm">
            <p className="text-slate-300">Selected face</p>
            <p className="font-medium text-sky-100">{activeFace?.name ?? activeProfile.faceId}</p>
            <Link className="text-xs text-sky-200 underline" onClick={() => setDrawerOpen(false)} to="/profiles">
              Change in Profiles
            </Link>
          </div>
          <Link className="inline-block text-sm text-sky-200 underline" onClick={() => setDrawerOpen(false)} to="/profiles">
            Manage Profiles
          </Link>
        </section>

        <section className="mt-4 space-y-3 rounded-lg border border-sky-300/20 bg-white/5 p-3">
          <h3 className="font-medium">ElevenLabs Config</h3>
          <p className="text-xs text-amber-300">Store API keys only on this device. No cloud sync is implemented.</p>
          {[
            ['apiKey', 'API Key'],
            ['agentId', 'Agent ID'],
            ['voiceId', 'Voice ID'],
            ['baseUrl', 'Base URL (Optional)'],
          ].map(([field, label]) => (
            <label className="block text-sm" key={field}>
              {label}
              <input
                className="mt-1 w-full rounded border border-sky-300/30 bg-rotom-bg p-2"
                onBlur={validate}
                onChange={(event) => void updateField(field as never, event.target.value)}
                type={field === 'apiKey' ? 'password' : 'text'}
                value={activeProfile.config[field as keyof typeof activeProfile.config] ?? ''}
              />
              {errors[field] && <span className="text-xs text-red-300">{errors[field]}</span>}
            </label>
          ))}

          <button
            className="rounded bg-sky-500 px-3 py-2 text-sm font-medium"
            onClick={() => {
              if (!validate()) return;
              void testConnectionForProfile(activeProfile.id);
            }}
            type="button"
          >
            Test Connection
          </button>
        </section>
      </aside>
    </>
  );
}
