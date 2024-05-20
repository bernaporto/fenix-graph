import type { TUnknownObject } from '@/types';
import { Registry, type TRegistry } from '@/tools/Registry';
import { uuidV4 } from '@/tools/uuid';
import { StorePath } from '@/store';
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
    initialState,
    schema,
    store,
    connections = [],
    id = uuidV4(),
  }: TLinkConfig) {
    super({
      id,
      initialState,
      schema,
      store: {
        payload: store.on<TUnknownObject>(StorePath.links(id, 'payload')),
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

    this.connections = Object.freeze({
      get: this.connRegistry.get,
      list: this.connRegistry.list,
    });
  }

  public dispose(): void {
    this.connRegistry.clear();
  }

  public toSnapshot(): TLinkSnapshot {
    return {
      id: this.id,
      schema: this.schema,
      state: {
        payload: this.store.payload.get(),
        connections: this.connections.list().map((conn) => conn.toSnapshot()),
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
