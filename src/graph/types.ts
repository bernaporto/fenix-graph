import type { TVirtualTree } from '@/tools/VirtualTree';
import type { TLinkSnapshot, TLinkController, TLinkSchema } from '@/units/Link';
import type { TNodeSnapshot, TNodeController, TNodeSchema } from '@/units/Node';
import type { TUnitList } from '@/units/types';

export type TGraphController = {
  dispose: VoidFunction;
  links: TUnitList<TLinkSchema | TLinkSnapshot, TLinkController>;
  nodes: TUnitList<TNodeSchema | TNodeSnapshot, TNodeController>;
} & {
  tree: (rootId: string) => TVirtualTree<TNodeSnapshot> | null;
};

export type TGraphState = {
  links: TLinkSnapshot[];
  nodes: TNodeSnapshot[];
};
