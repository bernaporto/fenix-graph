import type { TUnit, TUnitController } from '@/units/types';

export type TLink = TUnit & {
  from: string;
  to: string;
};

export type TLinkController = TUnitController<TLink>;
