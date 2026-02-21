import { faceCatalog } from '@/assets/faces/catalog';

interface Props {
  faceId: string;
  status: string;
}

export function AssistantFace({ faceId, status }: Props) {
  const activeFace = faceCatalog.find((face) => face.id === faceId) ?? faceCatalog[0];

  return (
    <div className="relative mx-auto flex h-[56vh] w-full max-w-2xl items-center justify-center rounded-3xl border border-sky-400/30 bg-rotom-panel/75 p-6 shadow-glow">
      <img
        alt={activeFace.name}
        className="max-h-full w-full rounded-2xl object-contain opacity-90"
        src={activeFace.previewImagePath}
      />
      <div className="absolute bottom-4 rounded-full bg-black/45 px-4 py-1 text-sm text-sky-100">
        {activeFace.name} · {status}
      </div>
    </div>
  );
}
