import type {
  Link,
  Node,
  TLinkSchema,
  TLinkSnapshot,
  TNodeSchema,
  TNodeSnapshot,
} from '@/units';
import type { TRegistry } from '@/tools/Registry';
import type { TVirtualTree } from '@/tools/VirtualTree';

export type TGraphSnapshot = {
  links: TLinkSnapshot[];
  nodes: TNodeSnapshot[];
};

export type TGraphController = {
  dispose: VoidFunction;
  links: TRegistry<TLinkSchema, Link>;
  nodes: TRegistry<TNodeSchema, Node>;
} & {
  tree: (rootId: string) => TVirtualTree<TNodeSnapshot> | null;
};
