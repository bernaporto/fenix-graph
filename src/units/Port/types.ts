import type {
  TPoint,
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

export type TPortConfig = Omit<TUnitConfig<TPortSchema>, 'onDispose'> & {
  nodeId: string;
};
export type TPortController = TUnitController<TPortSnapshot, TPortState>;
export type TPortSnapshot = TUnitSnapshot<TPortSchema, TPortState>;
