import type { TPoint, TUnknownObject } from '@/types';
import type { TPortController, TPortSchema, TPortSnapshot } from '@/units/Port';
import type {
  TSubUnitRegistry,
  TUnitConfig,
  TUnitController,
  TUnitSnapshot,
} from '@/units/types';

export type TNodeSchema = {
  label: string;
  ports: TPortSchema[];
  type: string;
  [key: string]: unknown;
};

export type TNodeState = {
  payload: TUnknownObject;
  position: TPoint;
};

type TNodeSnapshotState = TNodeState & { ports: TPortSnapshot[] };

export type TNodeConfig = TUnitConfig<TNodeSchema>;
export type TNodeSnapshot = TUnitSnapshot<TNodeSchema, TNodeSnapshotState>;
export type TNodeController = TUnitController<TNodeSchema, TNodeState> & {
  ports: TSubUnitRegistry<TPortSchema, TPortController>;
};
