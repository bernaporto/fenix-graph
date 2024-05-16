import type { TVirtualNode, TBaseNodeValue } from './types';

export const traverse = <T extends TBaseNodeValue>(
  root: TVirtualNode<T>,
  callback: (value: T) => void,
): void => {
  const traverseNode = (node: TVirtualNode<T>) => {
    callback(node.value);

    node.children.forEach(traverseNode);
  };

  traverseNode(root);
};
