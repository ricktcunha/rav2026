import type { ArchetypeId } from '../data/archetypes';

export type Area = 'TXF' | 'PSA' | 'DTN' | 'HFV';

export const areaNames: Record<Area, string> = {
  TXF: 'Transformação',
  PSA: 'Pós-venda e Assistência',
  DTN: 'Distribuição',
  HFV: 'Hortifrutigranjeiros'
};

export interface Participant {
  id: string;
  name: string;
  area: Area;
  archetype: ArchetypeId;
  timestamp: number;
  photoUrl?: string;
}
