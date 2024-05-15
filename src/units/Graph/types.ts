import type { TLinkController, TLinkSchema } from '@/units/Link';
import type { TNodeController, TNodeSchema } from '@/units/Node';
import type { TUnitController, TUnitList } from '@/units/types';

export type TGraphController = TUnitController & {
  nodes: TUnitList<TNodeSchema, TNodeController>;
  links: TUnitList<TLinkSchema, TLinkController>;
};
