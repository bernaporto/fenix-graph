import { getUnitStore } from '@/units/utils';
import { StorePath } from '@/store';
import { uuidV4 } from '@/tools/uuid';
import type {
  TLinkConfig,
  TLinkController,
  TLinkSnapshot,
  TLinkState,
} from './types';
import { Connection, type TConnectionController } from '../Connection';

type TLinkFactoryConfig = TLinkConfig & {
  connections: TConnectionController[];
  id: string;
};

const factory = ({
  connections,
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
    connections,
    schema: Object.freeze(structuredClone(schema)),
    store: _store,
    dispose: () => {
      onDispose?.();
    },
  });
};

const create = ({ onDispose, store, schema }: TLinkConfig): TLinkController => {
  const id = uuidV4();

  const connections = [schema.from, schema.to].map((port) =>
    Connection.create({ store, linkId: id, schema: port }),
  );

  return factory({
    connections,
    id,
    onDispose,
    schema,
    store,
  });
};

const fromSnapshot = (
  config: Omit<TLinkConfig, 'schema'> & { snapshot: TLinkSnapshot },
): TLinkController => {
  const { onDispose, snapshot, store } = config;
  const { id, state, schema } = snapshot;

  config.store.on(StorePath.links(id, 'payload')).set(state.payload);

  const connections = state.connections.map((connection) =>
    Connection.fromSnapshot({
      store,
      linkId: id,
      snapshot: connection,
    }),
  );

  return factory({
    connections,
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
      connections: controller.connections.map(Connection.toSnapshot),
    },
  };
};

export const Link = {
  create,
  fromSnapshot,
  toSnapshot,
};
