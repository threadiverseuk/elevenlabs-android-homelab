interface Props {
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function MicButton({ isActive, onClick, disabled }: Props) {
  return (
    <button
      className="h-24 w-24 rounded-full border-2 border-sky-300 bg-rotom-accent text-4xl text-rotom-bg shadow-glow transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {isActive ? '■' : '🎙'}
    </button>
  );
}
