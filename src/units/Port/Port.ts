import { getUnitStore } from '@/units/utils';
import { StorePath } from '@/store';
import type {
  TPortConfig,
  TPortController,
  TPortSnapshot,
  TPortState,
} from './types';

const create = (config: TPortConfig): TPortController => {
  const { nodeId, store, schema } = config;
  const id = schema.id;

  const _store = getUnitStore<TPortState>(store, [
    {
      parameter: 'connected',
      basePath: StorePath.ports(nodeId, id),
    },
    {
      parameter: 'links',
      basePath: StorePath.ports(nodeId, id),
    },
    {
      parameter: 'offset',
      basePath: StorePath.ports(nodeId, id),
    },
  ]);

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
