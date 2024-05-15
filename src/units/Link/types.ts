import type { TUnit, TUnitController } from '@/units/types';

export type TLinkSchema = {
  from: string;
  to: string;
};

export type TLink = TUnit & {
  schema: TLinkSchema;
};

export type TLinkController = TUnitController<TLink>;
