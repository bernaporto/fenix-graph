import { StorePath } from '@/graph/store';
import type { TPoint } from '@/types';
import type {
  TConnectionSchema,
  TConnectionSnapshot,
  TConnectionState,
  TFromSnapshotConfig,
  TUnitConfig,
} from './types';
import { Unit } from './Unit';

type TConnectionConfig = TUnitConfig<TConnectionSchema, TConnectionState> & {
  linkId: string;
};

export class Connection extends Unit<TConnectionSchema, TConnectionState> {
  constructor({
    linkId,
    schema,
    store,
    initialState = {
      position: { x: 0, y: 0 },
    },
  }: TConnectionConfig) {
    super({
      id: Connection.getId(schema),
      initialState,
      schema,
      store: {
        position: store.on<TPoint>(
          StorePath.connections(linkId, Connection.getId(schema), 'position'),
        ),
      },
    });
  }

  /* STATIC */
  static getId(schema: TConnectionSchema): string {
    return [schema.nodeId, schema.portId].join(':');
  }

  static fromSnapshot(
    config: TFromSnapshotConfig<TConnectionSnapshot> & { linkId: string },
  ): Connection {
    const { linkId, snapshot, store } = config;
    const { state, schema } = snapshot;

    return new Connection({
      linkId,
      schema,
      store,
      initialState: state,
    });
  }
}
