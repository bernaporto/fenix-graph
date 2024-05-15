import type { TNode, TNodeValue } from './types';

export const traverse = <T extends TNodeValue>(
  root: TNode<T>,
  callback: (value: T) => void,
): void => {
  const traverseNode = (node: TNode<T>) => {
    callback(node.value);

    node.children.forEach(traverseNode);
  };

  traverseNode(root);
};
