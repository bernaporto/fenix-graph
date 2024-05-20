import { FenixStore, type TFenixStore } from '@bernaporto/fenix-store';
import type { TBoardState } from '@/board/types';

type TStoreConfig = { debug?: boolean };

export const Store = {
  create: (config: TStoreConfig): TFenixStore<TBoardState> =>
    FenixStore.create(
      {
        selected: {},
        view: {
          position: { x: 0, y: 0 },
          scale: 1,
          size: { height: 0, width: 0 },
        },
      },
      {
        ...config,
        debugKey: 'Board',
      },
    ),
};
