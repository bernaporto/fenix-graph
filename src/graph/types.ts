import type { TFenixStore } from '@bernaporto/fenix-store';
import type { TList, TUnknownObject } from '@/types';
import type { TLinkSnapshot, TLinkController, TLinkSchema } from '@/units/Link';
import type { TNodeSnapshot, TNodeController, TNodeSchema } from '@/units/Node';
import type { TVirtualTree } from '@/tools/VirtualTree';

export type TGraphState = TUnknownObject;
export type TGraphStore = TFenixStore<TGraphState>;

export type TGraphSnapshot = {
  links: TLinkSnapshot[];
  nodes: TNodeSnapshot[];
};

export type TGraphController = {
  dispose: VoidFunction;
  links: TList<TLinkSchema, TLinkController>;
  nodes: TList<TNodeSchema, TNodeController>;
} & {
  tree: (rootId: string) => TVirtualTree<TNodeSnapshot> | null;
  snapshot: () => TGraphSnapshot;
};
