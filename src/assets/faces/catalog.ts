import rotomClassicRive from '@/assets/faces/rive/rotom-classic.riv';
import rotomSparkRive from '@/assets/faces/rive/rotom-spark.riv';
import type { FaceCatalogItem } from '@/types';

export const faceCatalog: FaceCatalogItem[] = [
  {
    id: 'rotom-classic',
    name: 'Rotom Classic',
    previewImagePath: '/src/assets/placeholders/face-rotom-classic.svg',
    description: 'Balanced expression and subtle glow.',
    riveFilePath: rotomClassicRive,
    artboardName: 'RotomClassic',
    stateMachineName: 'AssistantFaceMachine',
    inputs: {
      mode: 'mode',
      talkLevel: 'talkLevel',
    },
  },
  {
    id: 'rotom-spark',
    name: 'Rotom Spark',
    previewImagePath: '/src/assets/placeholders/face-rotom-spark.svg',
    description: 'High-energy style with a bright accent ring.',
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
