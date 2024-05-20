import { StorePath, type TGraphStore } from '@/graph/store';
import type { TUnknownObject } from '@/types';

export const hookStore = (store: TGraphStore) => {
  const linkIds = store.on<string[]>(StorePath.paths.LINK_IDS);
  const nodeIds = store.on<string[]>(StorePath.paths.NODE_IDS);

  store.on<TUnknownObject>(StorePath.paths.LINKS).subscribe((links) => {
    linkIds.set(Object.keys(links));
  });

  store.on<TUnknownObject>(StorePath.paths.NODES).subscribe((nodes) => {
    nodeIds.set(Object.keys(nodes));
  });

  return {
    linkIds,
    nodeIds,
  };
};
