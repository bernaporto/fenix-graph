export type TUnknownObject = Record<string, unknown>;

export type TPoint = {
  x: number;
  y: number;
};

export type WithId<T extends TUnknownObject> = T & {
  id: string;
};
