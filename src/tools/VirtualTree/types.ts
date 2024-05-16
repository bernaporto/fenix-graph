export type TVirtualNodeId = string | number | symbol;

export type TBaseNodeValue = {
  id: TVirtualNodeId;
};

export type TVirtualNode<T extends TBaseNodeValue> = {
  id: TVirtualNodeId;
  children: TVirtualNode<T>[];
  parent: TVirtualNode<T> | null;
  value: T;
};

export type TVirtualTree<T extends TBaseNodeValue> = {
  root: TVirtualNode<T>;
  get: (id: TVirtualNodeId) => TVirtualNode<T> | null;
  find: (predicate: (node: T) => boolean) => T | null;
  traverse: (callback: (node: T) => void) => void;
};
