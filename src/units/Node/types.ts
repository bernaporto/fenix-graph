import type {
  TPoint,
  TUnitConfig,
  TUnitController,
  TUnitSnapshot,
  TUnitStore,
} from '@/units/types';
import type { TPortSchema, TPortSnapshot } from '@/units/Port';

export type TNodeSchema = {
  label: string;
  ports: TPortSchema[];
  type: string;
  [key: string]: unknown;
};

export type TNodeState = {
  payload: Record<string, unknown>;
  position: TPoint;
};

type TNodeSnapshotState = TNodeState & { ports: TPortSnapshot[] };

export type TNodeConfig = TUnitConfig<TNodeSchema>;
export type TNodeSnapshot = TUnitSnapshot<TNodeSchema, TNodeSnapshotState>;
export type TNodeController = TUnitController<TNodeSnapshot, TNodeState>;
export type TNodeStore = TUnitStore<TNodeState>;
