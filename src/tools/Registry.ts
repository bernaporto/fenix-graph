import type { TUnknownObject } from '@/types';
import { uuidV4 } from './uuid';

type TRegistryItem = {
  id: string;
};

export type TRegistry<T, U extends TRegistryItem> = {
  size: number;
} & {
  add: (config: T) => U;
  clear: () => void;
  get: (id: string) => U | null;
  keys: () => string[];
  remove: (id: string) => void;
  list: () => U[];
};

type TRegistryConfig<T, U extends TRegistryItem> = {
  onCreate?: (item: U) => void;
  onRemove?: (item: U) => void;
  process?: (config: T) => U;
} & {
  initialItems?: U[];
};

const create = <
  T extends TUnknownObject,
  U extends TRegistryItem = T & TRegistryItem,
>(
  config?: TRegistryConfig<T, U>,
): TRegistry<T, U> => {
  const {
    onCreate,
    onRemove,
    initialItems = [],
    process = (config: T) => ({ ...config, id: uuidV4() }) as unknown as U,
  } = config ?? {};
  const items = new Map<string, U>(initialItems.map((item) => [item.id, item]));

  return {
    get size() {
      return items.size;
    },

    add: (config: T) => {
      const item = process(config);
      items.set(item.id, item);

      onCreate?.(item);

      return item;
    },

    clear: () => items.clear(),

    get: (id: string) => items.get(id) ?? null,

    keys: () => [...items.keys()],

    list: () => [...items.values()],

    remove: (id: string) => {
      const item = items.get(id);

      if (item) {
        onRemove?.(item);
        items.delete(id);
      }
    },
  };
};

export const Registry = {
  create,
};
