import type { TNode, TNodeValue } from './types';

export const find = <T extends TNodeValue>(
  nodes: TNode<T>[],
  predicate: (node: T) => boolean,
): T | null =>
  Array.from(nodes).find(({ value }) => predicate(value))?.value ?? null;
