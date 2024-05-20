import type { TUnknownObject } from '@/types';
import { Registry, type TRegistry } from '@/tools/Registry';
import { StorePath } from '@/graph/store';
import { uuidV4 } from '@/tools/uuid';
import { Connection } from './Connection';
import type {
  TConnectionSchema,
  TLinkSchema,
  TLinkState,
  TLinkSnapshot,
  TUnitConfig,
  TFromSnapshotConfig,
} from './types';
import { Unit } from './Unit';

type TLinkConfig = TUnitConfig<TLinkSchema, TLinkState> & {
  connections?: Connection[];
  id?: string;
};

type TConnectionRegistry = TRegistry<TConnectionSchema, Connection>;

export class Link extends Unit<TLinkSchema, TLinkState> {
  public readonly connections: Pick<TConnectionRegistry, 'get' | 'list'>;
  private connRegistry: TConnectionRegistry;

  constructor({
    schema,
    store,
    connections = [],
    id = uuidV4(),
    initialState = {
      payload: Object.create(null),
      temp: false,
    },
  }: TLinkConfig) {
    super({
      id,
      initialState,
      schema,
      store: {
        payload: store.on<TUnknownObject>(StorePath.links(id, 'payload')),
        temp: store.on<boolean>(StorePath.links(id, 'temp')),
      },
    });

    // Create connections
    this.connRegistry = Registry.create({
      initialItems: connections,
      process: (schema: TConnectionSchema) =>
        new Connection({
          schema,
          store,
          linkId: id,
        }),
    });

    if (this.connRegistry.size === 0) {
      [schema.from, schema.to].map(this.connRegistry.add);
    }

    this.connections = Object.freeze({
      get: this.connRegistry.get,
      list: this.connRegistry.list,
    });
  }

  public dispose(): void {
    this.connRegistry.clear();
  }

  public override toSnapshot(): TLinkSnapshot {
    return {
      id: this.id,
      schema: this.schema,
      state: {
        connections: this.connections.list().map((conn) => conn.toSnapshot()),
        payload: this.store.payload.get(),
        temp: this.store.temp.get(),
      },
    };
  }

  /* STATIC */
  static fromSnapshot(config: TFromSnapshotConfig<TLinkSnapshot>): Link {
    const { snapshot, store } = config;
    const { id, schema, state } = snapshot;

    const connections = state.connections.map((connection) =>
      Connection.fromSnapshot({
        store,
        linkId: id,
        snapshot: connection,
      }),
    );

    return new Link({
      connections,
      id,
      schema,
      store,
      initialState: state,
    });
  }
}
