import type { TFenixStore } from '@bernaporto/fenix-store';
import type { TVirtualTree } from '@/tools/VirtualTree';
import type { TLinkSnapshot, TLinkController, TLinkSchema } from '@/units/Link';
import type { TNodeSnapshot, TNodeController, TNodeSchema } from '@/units/Node';
import type { TUnitList } from '@/units/types';

export type TGraphState = Record<string, unknown>;
export type TGraphStore = TFenixStore<TGraphState>;

export type TGraphSnapshot = {
  links: TLinkSnapshot[];
  nodes: TNodeSnapshot[];
};

export type TGraphController = {
  dispose: VoidFunction;
  links: TUnitList<TLinkSchema, TLinkController>;
  nodes: TUnitList<TNodeSchema, TNodeController>;
} & {
  tree: (rootId: string) => TVirtualTree<TNodeSnapshot> | null;
  snapshot: () => TGraphSnapshot;
};
