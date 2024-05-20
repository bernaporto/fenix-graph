import type { TFenixStore } from '@bernaporto/fenix-store';
import type { TUnknownObject } from '@/types';

export type TGraphState = {
  nodes: TUnknownObject;
  links: TUnknownObject;
};
export type TGraphStore = TFenixStore<TGraphState>;
