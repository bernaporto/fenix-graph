export type TNodeId = string | number | symbol;

export type TNodeValue = {
  id: TNodeId;
};

export type TNode<T extends TNodeValue> = {
  id: TNodeId;
  children: TNode<T>[];
  parent: TNode<T> | null;
  value: T;
};

export type TNodeTree<T extends TNodeValue> = {
  root: TNode<T>;
  get: (id: TNodeId) => TNode<T> | null;
  find: (predicate: (node: T) => boolean) => T | null;
  traverse: (callback: (node: T) => void) => void;
};
