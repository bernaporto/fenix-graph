export type TUnknownObject = Record<string, unknown>;

export type TPoint = {
  x: number;
  y: number;
};

export type WithId<T extends TUnknownObject> = T & {
  id: string;
};

export type TList<T, U> = {
  add: (config: T) => U;
  remove: (id: string) => void;
  list: () => U[];
};
