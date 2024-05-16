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
    schema: Object.freeze(structuredClone(schema)),
    store: _store,
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

const toSnapshot = (controller: TPortController): TPortSnapshot => {
  const { id, schema, store } = controller;

  return {
    id,
    schema,
    state: {
      connected: store.connected.get(),
      links: store.links.get() as string[],
      offset: store.offset.get(),
    },
  };
};

export const Port = {
  create,
  fromSnapshot,
  toSnapshot,
};
