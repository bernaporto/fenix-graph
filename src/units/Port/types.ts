import type { TPoint } from '@/types';
import type {
  TUnitConfig,
  TUnitController,
  TUnitSnapshot,
} from '@/units/types';

export type TPortDirection = 'in' | 'out';

export type TPortSchema = {
  direction: TPortDirection;
  id: string;
  label: string;
  type: string;
};

export type TPortState = {
  connected: boolean;
  links: string[];
  offset: TPoint;
};

export type TPortConfig = TUnitConfig<TPortSchema> & { nodeId: string };
export type TPortController = TUnitController<TPortSchema, TPortState>;
export type TPortSnapshot = TUnitSnapshot<TPortSchema, TPortState>;
