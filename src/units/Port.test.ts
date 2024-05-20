import { Store } from '@/store';
import { Port } from './Port';
import type { TPortSchema } from './types';

const store = Store.create();
const nodeId = 'node-id';
const schema: TPortSchema = {
  direction: 'in',
  id: 'port-id',
  label: 'Port',
  type: 'test-port',
};

describe('Port', () => {
  beforeEach(() => {
    store.clear();
  });

  it('should create a port', () => {
    const port = new Port({ nodeId, schema, store });

    expect(port).toBeDefined();
  });

  describe('fromSnapshot', () => {
    it('should create a port from snapshot', () => {
      const port = new Port({ nodeId, schema, store });

      const snapshot = port.toSnapshot();
      const newPort = Port.fromSnapshot({
        nodeId,
        snapshot,
        store,
      });

      expect(newPort).toBeDefined();
    });
  });

  describe('toSnapshot', () => {
    it('should create a snapshot from port', () => {
      const port = new Port({ nodeId, schema, store });
      const snapshot = port.toSnapshot();

      expect(snapshot).toBeDefined();
    });
  });
});
