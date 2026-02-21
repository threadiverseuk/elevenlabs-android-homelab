import { useEffect, useMemo, useRef, useState } from 'react';
import { Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { faceCatalog } from '@/assets/faces/catalog';
import type { AssistantStatus } from '@/types';

interface Props {
  faceId: string;
  state: AssistantStatus;
}

const modeByState: Record<AssistantStatus, number> = {
  idle: 0,
  listening: 1,
  thinking: 2,
  speaking: 3,
  error: 4,
};

export function AssistantFace({ faceId, state }: Props) {
  const [loadError, setLoadError] = useState<string | null>(null);
  const activeFace = useMemo(() => faceCatalog.find((face) => face.id === faceId) ?? faceCatalog[0], [faceId]);

  const { rive, RiveComponent } = useRive(
    {
      src: activeFace.riveFilePath,
      stateMachines: activeFace.stateMachineName,
      artboard: activeFace.artboardName,
      autoplay: true,
      layout: new Layout({ fit: Fit.Contain }),
      onLoad: () => setLoadError(null),
      onLoadError: () => {
        setLoadError(`Unable to load ${activeFace.name} animation.`);
      },
    },
    { useOffscreenRenderer: false }
  );

  const modeInput = useStateMachineInput(rive, activeFace.stateMachineName, activeFace.inputs.mode);
  const lastMode = useRef<number | null>(null);

  useEffect(() => {
    if (!modeInput) return;
    const nextMode = modeByState[state] ?? 0;
    if (lastMode.current === nextMode) return;
    lastMode.current = nextMode;
    modeInput.value = nextMode;
  }, [modeInput, state]);

  return (
    <div className="relative mx-auto flex h-[56vh] w-full max-w-2xl items-center justify-center overflow-hidden rounded-3xl border border-sky-400/30 bg-rotom-panel/75 p-2 shadow-glow">
      {!rive && !loadError && <p className="text-sm text-sky-100">Loading face animation…</p>}
      {loadError ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl bg-black/20 p-4 text-center">
          <img alt={activeFace.name} className="max-h-[60%] w-full rounded-2xl object-contain opacity-85" src={activeFace.previewImagePath} />
          <p className="text-xs text-amber-200">{loadError}</p>
        </div>
      ) : (
        <RiveComponent className="h-full w-full" />
      )}
      <div className="absolute bottom-4 rounded-full bg-black/45 px-4 py-1 text-sm text-sky-100">
        {activeFace.name} · {state}
      </div>
    </div>
  );
}
