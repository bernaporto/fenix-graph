import { Link, type TLinkController, type TLinkSchema } from '@/units/Link';
import { Node, type TNodeController, type TNodeSchema } from '@/units/Node';
import { Registry } from '@/tools/Registry';
import { Store } from '@/store';
import { VirtualTree } from '@/tools/VirtualTree';
import type { TGraphController, TGraphSnapshot } from './types';

/* Implementation */
type TGraphFactoryConfig = {
  initialLinks: TLinkController[];
  initialNodes: TNodeController[];
};

const factory = ({
  initialNodes,
  initialLinks,
}: TGraphFactoryConfig): TGraphController => {
  const store = Store.create();

  const nodes = Registry.create<TNodeSchema, TNodeController>({
    initialItems: initialNodes,
    onRemove: (node) => node.dispose(),
    process: (schema) => Node.create({ schema, store }),
  });

  const links = Registry.create<TLinkSchema, TLinkController>({
    initialItems: initialLinks,
    onRemove: (link) => link.dispose(),
    process: (schema) => Link.create({ schema, store }),
  });

  return {
    links,
    nodes,

    dispose: () => {
      links.list().forEach((link) => link.dispose());
      links.clear();

      nodes.list().forEach((node) => node.dispose());
      nodes.clear();
    },

    tree: (rootId) => {
      const root = nodes.get(rootId);

      if (!root) {
        return null;
      }

      // TODO: Implement proper tree configuration
      return VirtualTree.create(Node.toSnapshot(root), () => []);
    },
  };
};

/* Interfaces */
const create = () => factory({ initialLinks: [], initialNodes: [] });

const fromSnapshot = (snapshot: TGraphSnapshot): TGraphController => {
  const store = Store.create();

  const initialNodes = snapshot.nodes.map((node) =>
    Node.fromSnapshot({ store, snapshot: node }),
  );

  const initialLinks = snapshot.links.map((link) =>
    Link.fromSnapshot({ store, snapshot: link }),
  );

  return factory({ initialLinks, initialNodes });
};

const toSnapshot = (controller: TGraphController): TGraphSnapshot => {
  const { nodes, links } = controller;

  return {
    links: links.list().map(Link.toSnapshot),
    nodes: nodes.list().map(Node.toSnapshot),
  };
};

export const Graph = {
  create,
  fromSnapshot,
  toSnapshot,
};
