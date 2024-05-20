import type { TFenixStore } from '@bernaporto/fenix-store';
import type { TUnknownObject } from '@/types';

type TGraphState = {
  links: TUnknownObject;
  linkIds: string[];
  nodes: TUnknownObject;
  nodeIds: string[];
};
export type TGraphStore = TFenixStore<TGraphState>;
