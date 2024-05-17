import { uuidV4 } from '@/tools/uuid';
import type {
  TConnectionConfig,
  TConnectionController,
  TConnectionSnapshot,
  TConnectionState,
} from './types';
import { getUnitStore } from '../utils';
import { StorePath } from '@/store';

const create = ({
  linkId,
  schema,
  store,
}: TConnectionConfig): TConnectionController => {
  const id = uuidV4();

  const _store = getUnitStore<TConnectionState>(store, [
    {
      parameter: 'position',
      basePath: StorePath.connections(linkId, id),
    },
  ]);

  return Object.freeze({
    id,
    schema,
    store: _store,
    dispose: () => {},
  });
};

const fromSnapshot = (
  config: Omit<TConnectionConfig, 'schema'> & { snapshot: TConnectionSnapshot },
): TConnectionController => {
  const { linkId, snapshot, store } = config;
  const { id, state, schema } = snapshot;

  store.on(StorePath.connections(linkId, id, 'position')).set(state.position);

  return create({ ...config, schema });
};

const toSnapshot = (controller: TConnectionController): TConnectionSnapshot => {
  const { id, schema, store } = controller;

  return {
    id,
    schema,
    state: {
      position: store.position.get(),
    },
  };
};

export const Connection = {
  create,
  fromSnapshot,
  toSnapshot,
};
