import type {
  TPoint,
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
  points: TPoint[];
};

export type TLinkConfig = TUnitConfig<TLinkSchema>;
export type TLinkSnapshot = TUnitSnapshot<TLinkSchema>;
export type TLinkController = TUnitController<TLinkSnapshot, TLinkState>;
export type TLinkStore = TUnitStore<TLinkState>;
