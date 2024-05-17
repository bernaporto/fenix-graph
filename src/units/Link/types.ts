import type {
  TConnectionController,
  TConnectionSchema,
  TConnectionSnapshot,
} from '@/units/Connection';
import type { TUnknownObject } from '@/types';
import type {
  TUnitConfig,
  TUnitController,
  TUnitSnapshot,
} from '@/units/types';

export type TLinkSchema = {
  from: TConnectionSchema;
  to: TConnectionSchema;
};

export type TLinkState = {
  payload: TUnknownObject;
};

type TLinkSnapshotState = TLinkState & { connections: TConnectionSnapshot[] };

export type TLinkConfig = TUnitConfig<TLinkSchema>;
export type TLinkSnapshot = TUnitSnapshot<TLinkSchema, TLinkSnapshotState>;
export type TLinkController = TUnitController<TLinkSchema, TLinkState> & {
  connections: TConnectionController[];
};
