import { setup } from '@/units/utils';
import type {
  TNodeSchema,
  TNodeConfig,
  TNodeController,
  TNodeSnapshot,
} from './types';

const create = (config: TNodeConfig): TNodeController => {
  const { onDispose, ...schemaOrSnapshot } = config;
  const { id, schema } = setup<TNodeSchema, TNodeSnapshot>(schemaOrSnapshot);

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

export const Node = {
  create,
};
