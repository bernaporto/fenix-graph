import type { TStoreObservable } from '@bernaporto/fenix-store';
import type { TGraphStore } from '@/store';
import type { TUnknownObject, WithId } from '@/types';

export type TUnitStore<T extends TUnknownObject = TUnknownObject> = {
  [key in keyof T]: TStoreObservable<T[key]>;
};

export type TUnitSchema = TUnknownObject;
type TUnitState = TUnknownObject;

export type TUnitSnapshot<
  T extends TUnitSchema = TUnitSchema,
  U extends TUnknownObject = TUnknownObject,
> = WithId<{
  schema: T;
  state: U;
}>;

export type TUnitConfig<T extends TUnitSchema = TUnitSchema> = {
  onDispose: VoidFunction;
  schema: T;
  store: TGraphStore;
};

export type TUnitController<
  T extends TUnitSchema = TUnitSchema,
  U extends TUnitState = TUnitState,
> = WithId<{
  dispose: VoidFunction;
  schema: T;
  store: TUnitStore<U>;
}>;
