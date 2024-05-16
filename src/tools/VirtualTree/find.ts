import type { TVirtualNode, TBaseNodeValue } from './types';

export const find = <T extends TBaseNodeValue>(
  nodes: TVirtualNode<T>[],
  predicate: (node: T) => boolean,
): T | null =>
  Array.from(nodes).find(({ value }) => predicate(value))?.value ?? null;
