import { Link, type TLinkController } from '@/units/Link';
import { Node, type TNodeController } from '@/units/Node';
import { VirtualTree } from '@/tools/VirtualTree';
import type { TGraphController, TGraphState } from './types';

const create = (): TGraphController => {
  const nodes = new Map<string, TNodeController>();
  const links = new Map<string, TLinkController>();

  return {
    dispose: () => {
      links.forEach((link) => link.dispose());
      links.clear();

      nodes.forEach((node) => node.dispose());
      nodes.clear();
    },

    tree: (rootId) => {
      const root = nodes.get(rootId);

      if (!root) {
        return null;
      }

      return VirtualTree.create(root.snapshot(), () => []);
    },

    links: {
      add: (config) => {
        const link = Link.create({
          ...config,
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
      add: (config) => {
        const node = Node.create({
          ...config,
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
  };
};

const fromState = (state: TGraphState): TGraphController => {
  const graph = Graph.create();

  const { nodes, links } = state;

  nodes.forEach((node) => graph.nodes.add(node));
  links.forEach((link) => graph.links.add(link));

  return graph;
};

const toState = (graph: TGraphController): TGraphState => ({
  nodes: graph.nodes.list().map((node) => node.snapshot()),
  links: graph.links.list().map((link) => link.snapshot()),
});

export const Graph = {
  create,
  fromState,
  toState,
};
