export type TUnit = {
  id: string;
};

export type TUnitSchema = {
  type: string;
};

export type TUnitController<T extends TUnit = TUnit> = T & {
  dispose: VoidFunction;
};

export type TUnitList<T, U> = {
  add: (schema: T) => U;
  remove: (id: string) => void;
};
