import { find } from './find';
import { traverse } from './traverse';
import type { TNode, TNodeId, TNodeTree, TNodeValue } from './types';

export const create = <T extends TNodeValue>(
  rootValue: T,
  getChildren: (node: T) => T[],
): TNodeTree<T> => {
  const nodes = new Map<TNodeId, TNode<T>>();

  const createNode = (value: T, parent: TNode<T> | null) => {
    const node: TNode<T> = {
      children: [],
      id: value.id,
      parent,
      value,
    };

    nodes.set(node.id, node);

    getChildren(value).forEach((childValue) => {
      const childNode = createNode(childValue, node);
      node.children.push(childNode);
    });

    return node;
  };

  const root = createNode(rootValue, null);
  const nodeList = Array.from(nodes.values());

  return {
    root,
    get: (id) => nodes.get(id) ?? null,
    find: (predicate) => find(nodeList, predicate),
    traverse: (callback) => traverse(root, callback),
  };
};
