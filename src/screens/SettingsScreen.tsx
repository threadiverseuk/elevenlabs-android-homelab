import { Link } from 'react-router-dom';

export function SettingsScreen() {
  return (
    <main className="min-h-screen bg-rotom-bg p-4 text-slate-100">
      <Link className="text-sky-200 underline" to="/">
        ← Back Home
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">Settings</h1>
      <p className="mt-3 text-slate-300">Use the Home drawer for in-context settings. This route is reserved for future expansion.</p>
    </main>
  );
}
