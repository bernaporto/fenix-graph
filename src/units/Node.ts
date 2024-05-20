import { Registry, type TRegistry } from '@/tools/Registry';
import { StorePath } from '@/store';
import type { TPoint, TUnknownObject } from '@/types';
import { uuidV4 } from '@/tools/uuid';
import { Port } from './Port';
import type {
  TNodeSchema,
  TNodeState,
  TNodeSnapshot,
  TPortSchema,
  TUnitConfig,
  TFromSnapshotConfig,
} from './types';
import { Unit } from './Unit';

type TNodeConfig = TUnitConfig<TNodeSchema, TNodeState> & {
  id?: string;
  ports?: Port[];
};

type TPortRegistry = TRegistry<TPortSchema, Port>;

export class Node extends Unit<TNodeSchema, TNodeState> {
  public readonly ports: Pick<TPortRegistry, 'get' | 'list'>;
  private portRegistry: TPortRegistry;

  constructor({
    schema,
    store,
    initialState,
    id = uuidV4(),
    ports = [],
  }: TNodeConfig) {
    super({
      id,
      initialState,
      schema,
      store: {
        payload: store.on<TUnknownObject>(StorePath.nodes(id, 'payload')),
        position: store.on<TPoint>(StorePath.nodes(id, 'position')),
      },
    });

    // Create ports
    this.portRegistry = Registry.create({
      initialItems: ports,
      process: (schema: TPortSchema) =>
        new Port({
          schema,
          store,
          nodeId: this.id,
        }),
    });

    this.ports = {
      get: this.portRegistry.get,
      list: this.portRegistry.list,
    };
  }

  public dispose(): void {
    this.portRegistry.clear();
  }

  override toSnapshot(): TNodeSnapshot {
    return {
      id: this.id,
      schema: this.schema,
      state: {
        payload: this.store.payload.get(),
        position: this.store.position.get(),
        ports: this.ports.list().map((port) => port.toSnapshot()),
      },
    };
  }

  /* STATIC */
  static fromSnapshot(config: TFromSnapshotConfig<TNodeSnapshot>): Node {
    const { snapshot, store } = config;
    const { id, state, schema } = snapshot;

    const ports = config.snapshot.state.ports.map((port) =>
      Port.fromSnapshot({
        store,
        nodeId: id,
        snapshot: port,
      }),
    );

    return new Node({
      id,
      schema,
      store,
      ports,
      initialState: state,
    });
  }
}
