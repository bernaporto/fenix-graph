import type { TLinkSnapshot, TLinkController, TLinkSchema } from '@/units/Link';
import type { TNodeSnapshot, TNodeController, TNodeSchema } from '@/units/Node';
import type { TRegistry } from '@/tools/Registry';
import type { TVirtualTree } from '@/tools/VirtualTree';

export type TGraphSnapshot = {
  links: TLinkSnapshot[];
  nodes: TNodeSnapshot[];
};

export type TGraphController = {
  dispose: VoidFunction;
  links: TRegistry<TLinkSchema, TLinkController>;
  nodes: TRegistry<TNodeSchema, TNodeController>;
} & {
  tree: (rootId: string) => TVirtualTree<TNodeSnapshot> | null;
};
