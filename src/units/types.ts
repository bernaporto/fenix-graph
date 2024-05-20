import type { TStoreObservable } from '@bernaporto/fenix-store';
import type { TGraphStore } from '@/store';
import type { TPoint, TUnknownObject, WithId } from '@/types';

/* UNIT */
export type TUnitSchema = TUnknownObject;
export type TUnitState = TUnknownObject;

export type TUnitConfig<Sc extends TUnitSchema, St extends TUnitState> = {
  schema: Sc;
  store: TGraphStore;
  initialState?: St;
};

export type TUnitStore<T extends TUnitState = TUnitState> = Readonly<{
  [key in keyof T]: TStoreObservable<T[key]>;
}>;

export type TUnitSnapshot<
  Sc extends TUnitSchema = TUnitSchema,
  St extends TUnitState = TUnitState,
> = WithId<{
  schema: Sc;
  state: St;
}>;

export type TFromSnapshotConfig<Sn extends TUnitSnapshot> = {
  snapshot: Sn;
  store: TGraphStore;
};

/* CONNECTION */
export type TConnectionSchema = {
  nodeId: string;
  portId: string;
};

export type TConnectionState = {
  position: TPoint;
};

export type TConnectionSnapshot = TUnitSnapshot<
  TConnectionSchema,
  TConnectionState
>;

/* LINK */
export type TLinkSchema = {
  from: TConnectionSchema;
  to: TConnectionSchema;
};

export type TLinkState = {
  payload: TUnknownObject;
};

type TLinkSnapshotState = TLinkState & { connections: TConnectionSnapshot[] };
export type TLinkSnapshot = TUnitSnapshot<TLinkSchema, TLinkSnapshotState>;

/* NODE */
export type TNodeSchema = {
  label: string;
  ports: TPortSchema[];
  type: string;
  [key: string]: unknown;
};

export type TNodeState = {
  payload: TUnknownObject;
  position: TPoint;
};

type TNodeSnapshotState = TNodeState & { ports: TPortSnapshot[] };
export type TNodeSnapshot = TUnitSnapshot<TNodeSchema, TNodeSnapshotState>;

/* PORT */
export type TPortSchema = {
  direction: 'in' | 'out';
  id: string;
  label: string;
  type: string;
};

export type TPortState = {
  connected: boolean;
  links: string[];
  offset: TPoint;
};

export type TPortSnapshot = TUnitSnapshot<TPortSchema, TPortState>;
