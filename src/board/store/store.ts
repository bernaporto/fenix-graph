import { FenixStore, type TFenixStore } from '@bernaporto/fenix-store';
import type { TBoardState } from '@/board/types';

type TStoreConfig = { debug?: boolean };

const BOARD_SIZE = {
  width: 4000,
  height: 4000,
};

export const Store = {
  create: (config: TStoreConfig): TFenixStore<TBoardState> =>
    FenixStore.create(
      {
        selected: {},
        view: {
          scale: 1,
          size: { ...BOARD_SIZE },
          position: {
            x: (BOARD_SIZE.width - window.innerWidth) / 2,
            y: (BOARD_SIZE.height - window.innerHeight) / 2,
          },
        },
      },
      {
        ...config,
        debugKey: 'Board',
      },
    ),
};
