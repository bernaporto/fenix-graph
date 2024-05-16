import { find } from './find';
import { traverse } from './traverse';
import type {
  TVirtualNode,
  TVirtualNodeId,
  TVirtualTree,
  TBaseNodeValue,
} from './types';

export const create = <T extends TBaseNodeValue>(
  rootValue: T,
  getChildren: (node: T) => T[],
): TVirtualTree<T> => {
  const nodes = new Map<TVirtualNodeId, TVirtualNode<T>>();

  const createNode = (value: T, parent: TVirtualNode<T> | null) => {
    const node: TVirtualNode<T> = {
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
