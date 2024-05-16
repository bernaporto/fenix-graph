import { getUnitStore } from '@/units/utils';
import { StorePath } from '@/store';
import { uuidV4 } from '@/tools/uuid';
import type {
  TLinkConfig,
  TLinkController,
  TLinkSnapshot,
  TLinkState,
} from './types';

type TLinkFactoryConfig = TLinkConfig & { id: string };

const factory = ({
  id,
  schema,
  store,
  onDispose,
}: TLinkFactoryConfig): TLinkController => {
  const _store = getUnitStore<TLinkState>(store, [
    {
      parameter: 'payload',
      basePath: StorePath.links(id),
    },
  ]);

  return Object.freeze({
    id,
    schema: Object.freeze(structuredClone(schema)),
    store: _store,
    dispose: () => {
      onDispose?.();
    },
  });
};

const create = (config: TLinkConfig): TLinkController =>
  factory({
    id: uuidV4(),
    ...config,
  });

const fromSnapshot = (
  config: Omit<TLinkConfig, 'schema'> & { snapshot: TLinkSnapshot },
): TLinkController => {
  const { onDispose, snapshot, store } = config;
  const { id, state, schema } = snapshot;

  config.store.on(StorePath.links(id, 'points')).set(state.points);

  return factory({
    id,
    onDispose,
    schema,
    store,
  });
};

const toSnapshot = (controller: TLinkController): TLinkSnapshot => {
  const { id, schema, store } = controller;

  return {
    id,
    schema,
    state: {
      payload: store.payload.get(),
    },
  };
};

export const Link = {
  create,
  fromSnapshot,
  toSnapshot,
};
