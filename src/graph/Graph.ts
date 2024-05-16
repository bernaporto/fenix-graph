import { Link, type TLinkController } from '@/units/Link';
import { Node, type TNodeController } from '@/units/Node';
import { Store, type TGraphStore } from '@/store';
import { VirtualTree } from '@/tools/VirtualTree';
import type { TGraphController, TGraphSnapshot } from './types';

/* Implementation */
type TGraphFactoryConfig = {
  links: Map<string, TLinkController>;
  nodes: Map<string, TNodeController>;
  store: TGraphStore;
};

const factory = ({
  nodes,
  links,
  store,
}: TGraphFactoryConfig): TGraphController => ({
  dispose: () => {
    links.forEach((link) => link.dispose());
    links.clear();

    nodes.forEach((node) => node.dispose());
    nodes.clear();
  },

  snapshot: () => ({
    nodes: Array.from(nodes.values()).map((node) => node.snapshot()),
    links: Array.from(links.values()).map((link) => link.snapshot()),
  }),

  tree: (rootId) => {
    const root = nodes.get(rootId);

    if (!root) {
      return null;
    }

    return VirtualTree.create(root.snapshot(), () => []);
  },

  links: {
    add: (schema) => {
      const link = Link.create({
        schema,
        store,
        onDispose: () => links.delete(link.id),
      });
      links.set(link.id, link);

      return link;
    },

    list: () => Array.from(links.values()),

    remove: (id) => {
      const link = links.get(id);

      if (link) {
        link.dispose();
        links.delete(id);
      }
    },
  },

  nodes: {
    add: (schema) => {
      const node = Node.create({
        schema,
        store,
        onDispose: () => nodes.delete(node.id),
      });
      nodes.set(node.id, node);

      return node;
    },

    list: () => Array.from(nodes.values()),

    remove: (id) => {
      const node = nodes.get(id);

      if (node) {
        node.dispose();
        nodes.delete(id);
      }
    },
  },
});

/* Interfaces */
const create = (): TGraphController => {
  const links = new Map<string, TLinkController>();
  const nodes = new Map<string, TNodeController>();
  const store = Store.create();

  return factory({ links, nodes, store });
};

const fromSnapshot = (snapshot: TGraphSnapshot): TGraphController => {
  const links = new Map<string, TLinkController>();
  const nodes = new Map<string, TNodeController>();
  const store = Store.create();

  snapshot.nodes.forEach((node) => {
    const controller = Node.fromSnapshot({
      store,
      onDispose: () => nodes.delete(controller.id),
      snapshot: node,
    });
    nodes.set(controller.id, controller);
  });

  snapshot.links.forEach((link) => {
    const controller = Link.fromSnapshot({
      store,
      onDispose: () => links.delete(controller.id),
      snapshot: link,
    });
    links.set(controller.id, controller);
  });

  return factory({ links, nodes, store });
};

export const Graph = {
  create,
  fromSnapshot,
};
