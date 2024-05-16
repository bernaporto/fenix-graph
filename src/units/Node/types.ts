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

export type TNodeSchema = {
  label: string;
  ports: TPortSchema[];
  type: string;
  [key: string]: unknown;
};

export type TNodeConfig = TUnitConfig<TNodeSchema | TNodeSnapshot>;
export type TNodeController = TUnitController<TNodeSnapshot>;
export type TNodeSnapshot = TUnitSnapshot<TNodeSchema>;
