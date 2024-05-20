import { Link, Node } from '@/units';
import { Registry } from '@/tools/Registry';
import { Store } from '@/store';
import { VirtualTree } from '@/tools/VirtualTree';
import type { TLinkSchema, TNodeSchema } from '@/units';
import type { TGraph, TGraphSnapshot } from './types';

/* Implementation */
type TGraphFactoryConfig = {
  initialLinks: Link[];
  initialNodes: Node[];
};

const factory = ({
  initialNodes,
  initialLinks,
}: TGraphFactoryConfig): TGraph => {
  const store = Store.create();

  const nodes = Registry.create<TNodeSchema, Node>({
    initialItems: initialNodes,
    onRemove: (node) => node.dispose(),
    process: (schema) => new Node({ schema, store }),
  });

  const links = Registry.create<TLinkSchema, Link>({
    initialItems: initialLinks,
    onRemove: (link) => link.dispose(),
    process: (schema) => new Link({ schema, store }),
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
      return VirtualTree.create(root.toSnapshot(), () => []);
    },
  };
};

/* Interfaces */
const create = () => factory({ initialLinks: [], initialNodes: [] });

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
