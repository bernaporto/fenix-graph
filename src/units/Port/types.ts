import type { TUnit, TUnitController, TUnitSchema } from '@/units/types';

export type TPortDirection = 'in' | 'out';

export type TPortSchema = TUnit &
  TUnitSchema & {
    direction: TPortDirection;
    label: string;
    type: string;
  };

export type TPort = TUnit & {
  schema: TPortSchema;
};

export type TPortController = TUnitController<TPort>;
