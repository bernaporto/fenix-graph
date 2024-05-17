import { getUnitStore } from '@/units/utils';
import { Port } from '@/units/Port';
import { Registry } from '@/tools/Registry';
import { StorePath } from '@/store';
import type { TPortController, TPortSchema } from '@/units/Port/types';
import { uuidV4 } from '@/tools/uuid';
import type {
  TNodeConfig,
  TNodeController,
  TNodeSnapshot,
  TNodeState,
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
}: TCreateNodeConfig): TNodeController => {
  const _store = getUnitStore<TNodeState>(store, [
    {
      parameter: 'payload',
      basePath: StorePath.nodes(id),
    },
    {
      parameter: 'position',
      basePath: StorePath.nodes(id),
    },
  ]);

  const portRegistry = Registry.create({
    initialItems: ports,
    process: (schema: TPortSchema) =>
      Port.create({
        schema,
        store,
        nodeId: id,
      }),
  });

  return Object.freeze({
    id,
    ports: {
      get: portRegistry.get,
      list: portRegistry.list,
    },
    schema: Object.freeze(structuredClone(schema)),
    store: _store,
    dispose: () => {},
  });
};

const create = ({ store, schema }: TNodeConfig): TNodeController => {
  const id = uuidV4();

  const ports = schema.ports.map((port) =>
    Port.create({ store, nodeId: id, schema: port }),
  );

  return factory({
    id,
    ports,
    schema,
    store,
  });
};

const fromSnapshot = (
  config: Omit<TNodeConfig, 'schema'> & { snapshot: TNodeSnapshot },
): TNodeController => {
  const { snapshot, store } = config;
  const { id, schema, state } = snapshot;

  store.on(StorePath.nodes(id, 'payload')).set(state.payload);
  store.on(StorePath.nodes(id, 'position')).set(state.position);

  const ports = state.ports.map((port) =>
    Port.fromSnapshot({ store, nodeId: id, snapshot: port }),
  );

  return factory({
    id,
    ports,
    schema,
    store,
  });
};

const toSnapshot = (controller: TNodeController): TNodeSnapshot => {
  const { id, schema, store } = controller;

  return {
    id,
    schema,
    state: {
      payload: store.payload.get(),
      position: store.position.get(),
      ports: controller.ports.list().map(Port.toSnapshot),
    },
  };
};

export const Node = {
  create,
  fromSnapshot,
  toSnapshot,
};
