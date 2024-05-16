import { StorePath } from '@/store';
import type { TPoint } from '@/types';
import type { TUnitStore } from '@/units/types';
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
    connected: store.on<boolean>(StorePath.ports(nodeId, id, 'connected')),
    links: store.on<string[]>(StorePath.ports(nodeId, id, 'links')),
    offset: store.on<TPoint>(StorePath.ports(nodeId, id, 'offset')),
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

  store.on(StorePath.ports(nodeId, id, 'connected')).set(state.connected);
  store.on(StorePath.ports(nodeId, id, 'links')).set(state.links);
  store.on(StorePath.ports(nodeId, id, 'offset')).set(state.offset);

  return create({ ...config, schema });
};

export const Port = {
  create,
  fromSnapshot,
};
