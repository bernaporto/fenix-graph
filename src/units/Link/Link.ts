import type { TPoint } from '@/types';
import { uuidV4 } from '@/tools/uuid';
import type {
  TLinkConfig,
  TLinkController,
  TLinkSnapshot,
  TLinkStore,
} from './types';

type TLinkFactoryConfig = TLinkConfig & { id: string };

const factory = ({
  id,
  schema,
  store,
  onDispose,
}: TLinkFactoryConfig): TLinkController => {
  const _store: TLinkStore = Object.freeze({
    points: store.on<TPoint[]>(`links.${id}.points`),
  });

  return Object.freeze({
    id,

    store: _store,

    snapshot: () => {
      return Object.freeze({
        id,
        schema,
        state: {},
      });
    },

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

  config.store.on(`links.${id}.points`).set(state.points);

  return factory({
    id,
    onDispose,
    schema,
    store,
  });
};

export const Link = {
  create,
  fromSnapshot,
};
