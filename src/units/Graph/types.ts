import type { TLink } from '@/units/Link';
import type { TNode } from '@/units/Node';
import type { TUnit, TUnitController } from '@/units/types';

export type TGraph = TUnit & {
  nodes: TNode[];
  links: TLink[];
};

export type TGraphController = TUnitController<TGraph>;
