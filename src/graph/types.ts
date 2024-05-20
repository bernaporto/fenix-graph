import type { TStoreObservable } from '@bernaporto/fenix-store';
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

type TGraphUnitStore = {
  linkIds: Pick<TStoreObservable<string[]>, 'get' | 'subscribe'>;
  nodeIds: Pick<TStoreObservable<string[]>, 'get' | 'subscribe'>;
};

export type TGraph = {
  dispose: VoidFunction;
  store: TGraphUnitStore;
  links: Omit<TRegistry<TLinkSchema, Link>, 'clear'>;
  nodes: Omit<TRegistry<TNodeSchema, Node>, 'clear'>;
} & {
  onChange: (listener: VoidFunction) => VoidFunction;
  tree: (rootId: string) => TVirtualTree<TNodeSnapshot> | null;
};
