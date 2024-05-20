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

export type TGraph = {
  dispose: VoidFunction;
  links: Omit<TRegistry<TLinkSchema, Link>, 'clear'>;
  nodes: Omit<TRegistry<TNodeSchema, Node>, 'clear'>;
} & {
  onChange: (listener: VoidFunction) => VoidFunction;
  tree: (rootId: string) => TVirtualTree<TNodeSnapshot> | null;
};
