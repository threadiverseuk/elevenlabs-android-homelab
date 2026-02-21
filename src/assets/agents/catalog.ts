export interface AgentOption {
  id: string;
  name: string;
  faceId: string;
  defaultAgentId: string;
}

export const agentCatalog: AgentOption[] = [
  {
    id: 'rotom',
    name: 'Rotom',
    faceId: 'rotom',
    defaultAgentId: 'agent_4501khzkbj89e5cacc0yk7r89hk4',
  },
  {
    id: 'morgan',
    name: 'Morgan',
    faceId: 'morgan',
    defaultAgentId: '',
  },
];
