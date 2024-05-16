import { setup } from '@/units/utils';
import type {
  TLinkSchema,
  TLinkConfig,
  TLinkController,
  TLinkSnapshot,
} from './types';

const create = (config: TLinkConfig): TLinkController => {
  const { onDispose, ...schemaOrSnapshot } = config;
  const { id, schema } = setup<TLinkSchema, TLinkSnapshot>(schemaOrSnapshot);

  return Object.freeze({
    id,

    snapshot: () => {
      return Object.freeze({
        id,
        schema,
      });
    },

    dispose: () => {
      onDispose?.();
    },
  });
};

export const Link = {
  create,
};
