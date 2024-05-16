type TWithID<T extends Record<string, unknown>> = T & {
  id: string;
};

export type TUnitSchema = Record<string, unknown>;

export type TUnitSnapshot<T extends TUnitSchema = TUnitSchema> = TWithID<{
  schema: T;
}>;

export type TUnitConfig<T extends TUnitSchema = TUnitSchema> = T & {
  onDispose: VoidFunction;
};

export type TUnitController<T extends TUnitSnapshot = TUnitSnapshot> = TWithID<
  {
    dispose: VoidFunction;
  } & {
    snapshot: () => T;
  }
>;

export type TUnitList<T, U> = {
  add: (config: T) => U;
  remove: (id: string) => void;
  list: () => U[];
};
