import { Link, Node } from '@/units';
import { Registry } from '@/tools/Registry';
import { Store } from '@/store';
import { VirtualTree } from '@/tools/VirtualTree';
import type { TLinkSchema, TNodeSchema } from '@/units';
import type { TGraph, TGraphSnapshot } from './types';

/* Implementation */
type TGraphConfig = {
  debug?: boolean;
  onDispose?: VoidFunction;
};

type TGraphFactoryConfig = TGraphConfig & {
  initialLinks?: Link[];
  initialNodes?: Node[];
};

const factory = ({
  debug,
  onDispose,
  initialNodes = [],
  initialLinks = [],
}: TGraphFactoryConfig): TGraph => {
  const store = Store.create({ debug });
  const listeners = new Set<() => void>();

  const emitChanged = () => {
    listeners.forEach((listener) => listener());
  };

  const nodes = Registry.create<TNodeSchema, Node>({
    initialItems: initialNodes,
    onRemove: (node) => {
      node.dispose();
      emitChanged();
    },
    process: (schema) => {
      const node = new Node({ schema, store });
      emitChanged();
      return node;
    },
  });

  const links = Registry.create<TLinkSchema, Link>({
    initialItems: initialLinks,
    onRemove: (link) => {
      link.dispose();
      emitChanged();
    },
    process: (schema) => new Link({ schema, store }),
  });

  return {
    links,
    nodes,

    dispose: () => {
      listeners.clear();
      store.clear();

      // TODO: handle direct unit disposal
      links.list().forEach((link) => link.dispose());
      links.clear();

      nodes.list().forEach((node) => node.dispose());
      nodes.clear();

      onDispose?.();
    },

    onChange: (listener) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },

    tree: (rootId) => {
      const root = nodes.get(rootId);

      if (!root) {
        return null;
      }

      // TODO: Implement proper tree configuration
      return VirtualTree.create(root.toSnapshot(), () => []);
    },
  };
};

/* Interfaces */
const create = (config?: TGraphConfig) => factory({ ...config });

const fromSnapshot = (snapshot: TGraphSnapshot): TGraph => {
  const store = Store.create();

  const initialNodes = snapshot.nodes.map((node) =>
    Node.fromSnapshot({ store, snapshot: node }),
  );

  const initialLinks = snapshot.links.map((link) =>
    Link.fromSnapshot({ store, snapshot: link }),
  );

  return factory({ initialLinks, initialNodes });
};

const toSnapshot = (controller: TGraph): TGraphSnapshot => {
  const { nodes, links } = controller;

  return {
    links: links.list().map((link) => link.toSnapshot()),
    nodes: nodes.list().map((node) => node.toSnapshot()),
  };
};

export const Graph = {
  create,
  fromSnapshot,
  toSnapshot,
};
