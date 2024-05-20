import { FenixStore } from '@bernaporto/fenix-store';
import type { TGraphStore } from './types';

type TStoreConfig = { debug?: boolean };

export const Store = {
  create: (config?: TStoreConfig): TGraphStore =>
    FenixStore.create(
      {
        nodes: {},
        links: {},
      },
      { ...config, debugKey: 'FenixGraph' },
    ),
};
