import type { TUnknownObject } from '@/types';
import type {
  TUnitConfig,
  TUnitController,
  TUnitSnapshot,
  TUnitStore,
} from '@/units/types';

export type TConnectionSchema = {
  nodeId: string;
  portId: string;
};

export type TLinkSchema = {
  from: TConnectionSchema;
  to: TConnectionSchema;
};

export type TLinkState = {
  payload: TUnknownObject;
};

export type TLinkConfig = TUnitConfig<TLinkSchema>;
export type TLinkSnapshot = TUnitSnapshot<TLinkSchema>;
export type TLinkController = TUnitController<TLinkSchema, TLinkState>;
export type TLinkStore = TUnitStore<TLinkState>;
