import type { TPortSchema } from '@/units/Port';
import type { TUnit, TUnitController, TUnitSchema } from '@/units/types';

export type TNodeSchema = TUnitSchema & {
  ports: TPortSchema[];
  [key: string]: unknown;
};

export type TNode = TUnit & {
  payload: Record<string, unknown>;
  schema: TNodeSchema;
};

export type TNodeController = TUnitController<TNode>;
