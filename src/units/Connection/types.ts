import type { TPoint } from '@/types';
import type {
  TUnitConfig,
  TUnitController,
  TUnitSnapshot,
} from '@/units/types';

export type TConnectionSchema = {
  nodeId: string;
  portId: string;
};

export type TConnectionState = {
  position: TPoint;
};

export type TConnectionConfig = Omit<
  TUnitConfig<TConnectionSchema>,
  'onDispose'
> & {
  linkId: string;
};
export type TConnectionController = TUnitController<
  TConnectionSchema,
  TConnectionState
>;
export type TConnectionSnapshot = TUnitSnapshot<
  TConnectionSchema,
  TConnectionState
>;
