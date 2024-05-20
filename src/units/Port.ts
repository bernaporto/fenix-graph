import { StorePath } from '@/graph/store';
import type {
  TFromSnapshotConfig,
  TPortSchema,
  TPortSnapshot,
  TPortState,
  TUnitConfig,
} from './types';
import { Unit } from './Unit';

export type TPortConfig = TUnitConfig<TPortSchema, TPortState> & {
  nodeId: string;
};

export class Port extends Unit<TPortSchema, TPortState> {
  constructor({
    nodeId,
    schema,
    store,
    initialState = {
      connected: false,
      links: [],
      offset: { x: 0, y: 0 },
    },
  }: TPortConfig) {
    super({
      initialState,
      schema,
      id: schema.id,
      store: {
        connected: store.on(StorePath.ports(nodeId, schema.id, 'connected')),
        links: store.on(StorePath.ports(nodeId, schema.id, 'links')),
        offset: store.on(StorePath.ports(nodeId, schema.id, 'offset')),
      },
    });
  }

  /* STATIC */
  static fromSnapshot(
    config: TFromSnapshotConfig<TPortSnapshot> & { nodeId: string },
  ): Port {
    const { nodeId, snapshot, store } = config;
    const { state, schema } = snapshot;

    return new Port({
      nodeId,
      schema,
      store,
      initialState: state,
    });
  }
}
