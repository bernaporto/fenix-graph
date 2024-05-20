import type { TStoreObservable } from '@bernaporto/fenix-store';
import type { Link, Node, TLinkSnapshot, TNodeSnapshot } from '@/units';
import type { TRegistry } from '@/tools/Registry';
import type { TVirtualTree } from '@/tools/VirtualTree';
import type {
  TLinkSchema,
  TLinkState,
  TNodeSchema,
  TNodeState,
  TUnitSchema,
  TUnitState,
} from '@/units/types';

export type TGraphSnapshot = {
  links: TLinkSnapshot[];
  nodes: TNodeSnapshot[];
};

type TGraphUnitStore = {
  linkIds: Pick<TStoreObservable<string[]>, 'get' | 'subscribe'>;
  nodeIds: Pick<TStoreObservable<string[]>, 'get' | 'subscribe'>;
};

type TGraphRegistry<T, U extends { id: string }> = Omit<
  TRegistry<T, U>,
  'clear'
>;

type TGraphRegistryItemConfig<Sc extends TUnitSchema, St extends TUnitState> = {
  schema: Sc;
  state?: Partial<St>;
};

export type TLinkRegistryInput = TGraphRegistryItemConfig<
  TLinkSchema,
  TLinkState
>;
type TGraphLinkRegistry = TGraphRegistry<TLinkRegistryInput, Link>;

export type TNodeRegistryInput = TGraphRegistryItemConfig<
  TNodeSchema,
  TNodeState
>;
type TGraphNodeRegistry = TGraphRegistry<TNodeRegistryInput, Node>;

export type TGraph = {
  dispose: VoidFunction;
  store: TGraphUnitStore;
  links: TGraphLinkRegistry;
  nodes: TGraphNodeRegistry;
} & {
  onChange: (listener: VoidFunction) => VoidFunction;
  tree: (rootId: string) => TVirtualTree<TNodeSnapshot> | null;
};
