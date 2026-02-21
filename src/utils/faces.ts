const LEGACY_FACE_ID_MAP: Record<string, string> = {
  'rotom-classic': 'rotom',
  'rotom-spark': 'morgan',
};

export const normalizeFaceId = (faceId: string): string => LEGACY_FACE_ID_MAP[faceId] ?? faceId;
