import { Port } from '@/units/Port';
import type { TPoint } from '@/units/types';
import type { TPortController } from '@/units/Port/types';
import { uuidV4 } from '@/tools/uuid';
import type {
  TNodeConfig,
  TNodeController,
  TNodeSnapshot,
  TNodeStore,
} from './types';

type TCreateNodeConfig = TNodeConfig & {
  id: string;
  ports: TPortController[];
};

const factory = ({
  id,
  ports,
  schema,
  store,
  onDispose,
}: TCreateNodeConfig): TNodeController => {
  const _store: TNodeStore = Object.freeze({
    payload: store.on<Record<string, unknown>>(`nodes.${id}.payload`),
    position: store.on<TPoint>(`nodes.${id}.position`),
  });

  return Object.freeze({
    id,
    ports,
    store: _store,
    snapshot: () => {
      return Object.freeze({
        id,
        schema,
        state: {
          payload: _store.payload.get(),
          position: _store.position.get(),
          ports: [],
        },
      });
    },
    dispose: () => {
      onDispose?.();
    },
  });
};

const create = ({ onDispose, store, schema }: TNodeConfig): TNodeController => {
  const id = uuidV4();

  const ports = schema.ports.map((port) =>
    Port.create({ store, nodeId: id, schema: port }),
  );

  return factory({
    id,
    ports,
    schema,
    store,
    onDispose,
  });
};

const fromSnapshot = (
  config: Omit<TNodeConfig, 'schema'> & { snapshot: TNodeSnapshot },
): TNodeController => {
  const { onDispose, snapshot, store } = config;
  const { id, schema, state } = snapshot;

  store.on(`nodes.${id}.payload`).set(state.payload);
  store.on(`nodes.${id}.position`).set(state.position);

  const ports = state.ports.map((port) =>
    Port.fromSnapshot(port, { store, nodeId: id }),
  );

  return factory({
    id,
    ports,
    schema,
    store,
    onDispose,
  });
};

export const Node = {
  create,
  fromSnapshot,
};
