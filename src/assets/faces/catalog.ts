import rotomClassicRive from '@/assets/faces/rive/rotom-classic.riv';
import rotomSparkRive from '@/assets/faces/rive/rotom-spark.riv';
import type { FaceCatalogItem } from '@/types';

export const faceCatalog: FaceCatalogItem[] = [
  {
    id: 'rotom',
    name: 'Rotom',
    previewImagePath: '/src/assets/placeholders/face-rotom-classic.svg',
    description: 'Default Rotom assistant face.',
    riveFilePath: rotomClassicRive,
    artboardName: 'RotomClassic',
    stateMachineName: 'AssistantFaceMachine',
    inputs: {
      mode: 'mode',
      talkLevel: 'talkLevel',
    },
  },
  {
    id: 'morgan',
    name: 'Morgan',
    previewImagePath: '/src/assets/placeholders/face-rotom-spark.svg',
    description: 'Secondary face option using the same placeholder animation for now.',
    riveFilePath: rotomSparkRive,
    artboardName: 'RotomSpark',
    stateMachineName: 'AssistantFaceMachine',
    inputs: {
      mode: 'mode',
      talkLevel: 'talkLevel',
    },
  },
  {
    id: 'rotom-calm',
    name: 'Rotom Calm',
    previewImagePath: '/src/assets/placeholders/face-rotom-calm.svg',
    description: 'Soft eyes and reduced visual intensity.',
    riveFilePath: rotomClassicRive,
    artboardName: 'RotomCalm',
    stateMachineName: 'AssistantFaceMachine',
    inputs: {
      mode: 'mode',
      talkLevel: 'talkLevel',
    },
  },
];
