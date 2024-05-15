import { uuid } from '@/tools/uuid';
import type { TNode, TNodeController, TNodeSchema } from './types';

const create = (schema: TNodeSchema): TNodeController => {
  const id = uuid();
  const payload: Record<string, unknown> = {};

  return {
    payload,
    schema,

    get id() {
      return id;
    },

    dispose: () => {
      // TODO: Dispose node
    },
  };
};

export type { TNode, TNodeController, TNodeSchema };
export const Node = {
  create,
};
