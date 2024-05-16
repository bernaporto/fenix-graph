import { StorePath, type TGraphStore } from '@/store';
import type { TUnknownObject } from '@/types';
import type { TUnitStore } from './types';

type TStoreItemConfig<T extends TUnknownObject> = {
  parameter: keyof T;
  basePath: string;
};

export const getUnitStore = <T extends TUnknownObject>(
  store: TGraphStore,
  items: TStoreItemConfig<T>[],
): TUnitStore<T> => {
  return items.reduce((acc, { parameter, basePath }) => {
    acc[parameter] = store.on(StorePath.join(basePath, parameter as string));

    return acc;
  }, Object.create(null));
};
