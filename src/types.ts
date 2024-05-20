import type { TStoreObservable } from '@bernaporto/fenix-store';

export type TUnknownObject = Record<string, unknown>;

export type TSize = {
  height: number;
  width: number;
};

export type TPoint = {
  x: number;
  y: number;
};

export type WithId<T extends TUnknownObject> = T & {
  id: string;
};

type TAnyState = TUnknownObject;

export type TUnitStore<T extends TAnyState = TAnyState> = Readonly<{
  [key in keyof T]: TStoreObservable<T[key]>;
}>;
