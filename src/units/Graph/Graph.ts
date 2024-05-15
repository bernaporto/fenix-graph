import { Link, type TLinkController } from '@/units/Link';
import { Node, type TNodeController } from '@/units/Node';
import { uuid } from '@/tools/uuid';
import type { TGraphController } from './types';

const create = (): TGraphController => {
  const id = uuid();
  const nodes = new Map<string, TNodeController>();
  const links = new Map<string, TLinkController>();

  return {
    get id() {
      return id;
    },

    dispose: () => {
      links.forEach((link) => link.dispose());
      links.clear();

      nodes.forEach((node) => node.dispose());
      nodes.clear();
    },

    links: {
      add: (schema) => {
        const link = Link.create(schema);
        links.set(link.id, link);

        return link;
      },

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
        const node = Node.create(schema);
        nodes.set(node.id, node);

        return node;
      },

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

export const Graph = {
  create,
};
