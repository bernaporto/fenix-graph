import type { TStoreObservable } from '@bernaporto/fenix-store';
import type { TGraph } from '@/graph';
import type { TPoint, TSize, TUnitStore } from '@/types';

export type TBoardState = {
  selected: Record<string, boolean>;
  view: {
    position: TPoint;
    scale: number;
    size: TSize;
  };
};

type TBoardStore = TUnitStore<TBoardState['view']>;

type TBoardSelectedTools = {
  clear: VoidFunction;
} & {
  set: (id: string, value: boolean) => void;
  watch: (id: string) => Pick<TStoreObservable<boolean>, 'get' | 'subscribe'>;
};

export type TBoard = {
  graph: TGraph;
  selected: TBoardSelectedTools;
  store: TBoardStore;
} & {
  mount: (target: HTMLElement | string) => void;
};
