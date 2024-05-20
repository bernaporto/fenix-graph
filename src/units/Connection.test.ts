import { Store } from '@/store';
import { Connection } from './Connection';
import type { TConnectionSchema } from './types';

const store = Store.create();
const linkId = 'link-id';
const schema: TConnectionSchema = {
  nodeId: 'node-id',
  portId: 'port-id',
};

describe('Connection', () => {
  beforeEach(() => {
    store.clear();
  });

  it('should be able to create a connection', () => {
    const connection = new Connection({
      linkId,
      schema,
      store,
      initialState: {
        position: { x: 0, y: 0 },
      },
    });

    expect(connection).toBeDefined();
  });

  describe('getId', () => {
    it('should return connection id', () => {
      const id = Connection.getId(schema);

      expect(id).toBe('node-id:port-id');
    });
  });

  describe('fromSnapshot', () => {
    it('should create a connection from snapshot', () => {
      const connection = new Connection({
        linkId,
        schema,
        store,
        initialState: {
          position: { x: 0, y: 0 },
        },
      });

      const snapshot = connection.toSnapshot();
      const newConnection = Connection.fromSnapshot({
        linkId,
        snapshot,
        store,
      });

      expect(newConnection).toBeDefined();
    });
  });

  describe('toSnapshot', () => {
    it('should create a snapshot from connection', () => {
      const connection = new Connection({
        linkId,
        schema,
        store,
        initialState: {
          position: { x: 0, y: 0 },
        },
      });

      const snapshot = connection.toSnapshot();

      expect(snapshot).toBeDefined();
    });
  });
});
