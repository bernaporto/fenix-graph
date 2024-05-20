import { Link, Node } from '@/units';
import { Registry } from '@/tools/Registry';
import { Store, StorePath } from '@/graph/store';
import { VirtualTree } from '@/tools/VirtualTree';
import type {
  TGraph,
  TGraphSnapshot,
  TLinkRegistryInput,
  TNodeRegistryInput,
} from './types';

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
  const linkIds = store.on<string[]>(StorePath.paths.LINK_IDS);
  const nodeIds = store.on<string[]>(StorePath.paths.NODE_IDS);

  const listeners = new Set<() => void>();
  const emitChanged = () => {
    listeners.forEach((listener) => listener());
  };

  const nodes = Registry.create<TNodeRegistryInput, Node>({
    initialItems: initialNodes,
    onCreate: () => {
      nodeIds.set(nodes.keys());
      emitChanged();
    },
    onRemove: (node) => {
      node.dispose();
      nodeIds.set(nodes.keys());
      emitChanged();
    },
    process: ({ schema, state }) =>
      new Node({
        schema,
        store,
        initialState: Object.assign(
          {
            position: { x: 0, y: 0 },
            payload: {},
          },
          state,
        ),
      }),
  });

  const links = Registry.create<TLinkRegistryInput, Link>({
    initialItems: initialLinks,
    onCreate: () => {
      linkIds.set(links.keys());
      emitChanged();
    },
    onRemove: (link) => {
      link.dispose();
      linkIds.set(links.keys());
      emitChanged();
    },
    process: ({ schema, state }) =>
      new Link({
        schema,
        store,
        initialState: Object.assign({ payload: {}, temp: false }, state),
      }),
  });

  return {
    links: {
      add: links.add,
      get: links.get,
      keys: links.keys,
      list: links.list,
      remove: links.remove,
      size: links.size,
    },

    nodes: {
      add: nodes.add,
      get: nodes.get,
      keys: nodes.keys,
      list: nodes.list,
      remove: nodes.remove,
      size: nodes.size,
    },

    store: {
      linkIds: {
        get: linkIds.get,
        subscribe: linkIds.subscribe,
      },
      nodeIds: {
        get: nodeIds.get,
        subscribe: nodeIds.subscribe,
      },
    },

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
