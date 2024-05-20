import { Graph, type TGraph } from '@/graph';
import BoardComponent from './components/Board.svelte';
import { Store, StorePath } from './store';
import type { TBoard } from './types';

type TBoardConfig = {
  debug?: boolean;
  graph?: TGraph;
};

const create = ({
  debug,
  graph = Graph.create({ debug }),
}: TBoardConfig): TBoard => {
  const store = Store.create({
    debug,
  });

  const board: TBoard = {
    graph,

    mount: (target: HTMLElement | string) => {
      const component =
        typeof target === 'string' ? document.querySelector(target) : target;

      if (component === null) {
        throw new Error(`[Board] Could not find element: ${target}`);
      }

      new BoardComponent({
        target: component,
        props: {
          board,
          graph,
        },
      });
    },

    selected: {
      clear: () => store.on(StorePath.paths.SELECTED).set({}),
      set: (id, value) => store.on(StorePath.selected(id)).set(value),
      watch: (id) => store.on(StorePath.selected(id)),
    },

    store: {
      position: store.on(StorePath.paths.VIEW_POSITION),
      scale: store.on(StorePath.paths.VIEW_SCALE),
      size: store.on(StorePath.paths.VIEW_SIZE),
    },
  };

  return board;
};

export const Board = {
  create,
};
