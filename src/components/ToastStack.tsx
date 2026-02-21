import { useAppStore } from '@/store/useAppStore';

export function ToastStack() {
  const toasts = useAppStore((state) => state.ui.toasts);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          className={`min-w-56 rounded px-3 py-2 text-sm shadow-lg ${
            toast.type === 'success'
              ? 'bg-emerald-500/90'
              : toast.type === 'error'
                ? 'bg-rose-500/90'
                : 'bg-slate-600/90'
          }`}
          key={toast.id}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
