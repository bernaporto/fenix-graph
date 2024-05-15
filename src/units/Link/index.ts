import { uuid } from '@/tools/uuid';
import type { TLink, TLinkController, TLinkSchema } from './types';

const create = (schema: TLinkSchema): TLinkController => {
  const id = uuid();

  return {
    schema,

    get id() {
      return id;
    },

    dispose: () => {
      // TODO: Dispose link
    },
  };
};

export type { TLink, TLinkController, TLinkSchema };
export const Link = {
  create,
};
