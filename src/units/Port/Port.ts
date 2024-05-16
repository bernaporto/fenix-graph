import type { TPoint, TUnitStore } from '../types';
import type {
  TPortConfig,
  TPortController,
  TPortSnapshot,
  TPortState,
} from './types';

const create = (config: TPortConfig): TPortController => {
  const { nodeId, store, schema } = config;
  const id = schema.id;

  const _store: TUnitStore<TPortState> = Object.freeze({
    connected: store.on<boolean>(
      `nodes.${nodeId}.ports.${schema.id}.connected`,
    ),
    links: store.on<string[]>(`nodes.${nodeId}.ports.${schema.id}.links`),
    offset: store.on<TPoint>(`nodes.${nodeId}.ports.${schema.id}.offset`),
  });

  return Object.freeze({
    id,

    store: _store,

    snapshot: () => {
      return Object.freeze({
        id,
        schema,
        state: {
          connected: _store.connected.get(),
          links: _store.links.get() as string[],
          offset: _store.offset.get(),
        },
      });
    },

    dispose: () => {},
  });
};

const fromSnapshot = (
  snapshot: TPortSnapshot,
  config: Omit<TPortConfig, 'schema'>,
): TPortController => {
  const { nodeId, store } = config;
  const { id, state, schema } = snapshot;

  store.on(`nodes.${nodeId}.ports.${id}.connected`).set(state.connected);
  store.on(`nodes.${nodeId}.ports.${id}.links`).set(state.links);
  store.on(`nodes.${nodeId}.ports.${id}.offset`).set(state.offset);

  return create({ ...config, schema });
};

export const Port = {
  create,
  fromSnapshot,
};
