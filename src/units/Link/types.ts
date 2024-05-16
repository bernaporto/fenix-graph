import type {
  TUnitConfig,
  TUnitController,
  TUnitSnapshot,
} from '@/units/types';

export type TConnectionSchema = {
  nodeId: string;
  portId: string;
};

export type TLinkSchema = {
  from: TConnectionSchema;
  to: TConnectionSchema;
};

export type TLinkSnapshot = TUnitSnapshot<TLinkSchema>;
export type TLinkConfig = TUnitConfig<TLinkSchema | TLinkSnapshot>;
export type TLinkController = TUnitController<TLinkSnapshot>;
