import type { TStoreObservable } from '@bernaporto/fenix-store';
import type { TGraphStore } from '@/graph/types';

type TUnknownObject = Record<string, unknown>;

type TWithID<T extends TUnknownObject> = T & {
  id: string;
};

export type TUnitStore<T extends TUnknownObject = TUnknownObject> = {
  [key in keyof T]: TStoreObservable<T[key]>;
};

export type TUnitSchema = TUnknownObject;

export type TUnitSnapshot<
  T extends TUnitSchema = TUnitSchema,
  U extends TUnknownObject = TUnknownObject,
> = TWithID<{
  schema: T;
  state: U;
}>;

export type TUnitConfig<T extends TUnitSchema = TUnitSchema> = {
  onDispose: VoidFunction;
  schema: T;
  store: TGraphStore;
};

export type TUnitController<
  T extends TUnitSnapshot = TUnitSnapshot,
  U extends TUnknownObject = TUnknownObject,
> = TWithID<
  {
    dispose: VoidFunction;
    store: TUnitStore<U>;
  } & {
    snapshot: () => T;
  }
>;

export type TUnitList<T, U> = {
  add: (config: T) => U;
  remove: (id: string) => void;
  list: () => U[];
};

export type TPoint = {
  x: number;
  y: number;
};
