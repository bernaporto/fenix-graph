export type TUnit = {
  id: string;
};

export type TUnitSchema = {
  type: string;
};

export type TUnitController<T extends TUnit> = {
  dispose: VoidFunction;
  value: T;
};
