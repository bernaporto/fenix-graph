import {
  Connection,
  type TConnectionController,
  type TConnectionSchema,
} from '@/units/Connection';
import { getUnitStore } from '@/units/utils';
import { Registry } from '@/tools/Registry';
import { StorePath } from '@/store';
import { uuidV4 } from '@/tools/uuid';
import type {
  TLinkConfig,
  TLinkController,
  TLinkSnapshot,
  TLinkState,
} from './types';

type TLinkFactoryConfig = TLinkConfig & {
  connections: TConnectionController[];
  id: string;
};

const factory = ({
  connections,
  id,
  schema,
  store,
}: TLinkFactoryConfig): TLinkController => {
  const _store = getUnitStore<TLinkState>(store, [
    {
      parameter: 'payload',
      basePath: StorePath.links(id),
    },
  ]);

  const connRegistry = Registry.create({
    initialItems: connections,
    process: (schema: TConnectionSchema) =>
      Connection.create({
        schema,
        store,
        linkId: id,
      }),
  });

  return Object.freeze({
    id,
    connections: {
      get: connRegistry.get,
      list: connRegistry.list,
    },
    schema: Object.freeze(structuredClone(schema)),
    store: _store,
    dispose: () => {
      connRegistry.list().forEach((connection) => connection.dispose());
      connRegistry.clear();
    },
  });
};

const create = ({ store, schema }: TLinkConfig): TLinkController => {
  const id = uuidV4();

  const connections = [schema.from, schema.to].map((port) =>
    Connection.create({ store, linkId: id, schema: port }),
  );

  return factory({
    connections,
    id,
    schema,
    store,
  });
};

const fromSnapshot = (
  config: Omit<TLinkConfig, 'schema'> & { snapshot: TLinkSnapshot },
): TLinkController => {
  const { snapshot, store } = config;
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
      connections: controller.connections.list().map(Connection.toSnapshot),
    },
  };
};

export const Link = {
  create,
  fromSnapshot,
  toSnapshot,
};
