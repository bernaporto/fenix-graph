import { Store } from '@/graph/store';
import { Node } from './Node';
import type { TNodeSchema } from './types';

const store = Store.create();
const schema: TNodeSchema = {
  id: 'node-id',
  label: 'Node',
  type: 'test-node',
  ports: [
    {
      direction: 'in',
      id: 'port-id',
      label: 'Port',
      type: 'test-port',
    },
  ],
};

describe('Node', () => {
  beforeEach(() => {
    store.clear();
  });

  it('should create a node', () => {
    const node = new Node({ schema, store });

    expect(node).toBeDefined();
  });

  describe('fromSnapshot', () => {
    it('should create a node from snapshot', () => {
      const node = new Node({ schema, store });

      const snapshot = node.toSnapshot();
      const newNode = Node.fromSnapshot({ snapshot, store });

      expect(newNode).toBeDefined();
    });
  });

  describe('toSnapshot', () => {
    it('should create a snapshot from node', () => {
      const node = new Node({ schema, store });
      const snapshot = node.toSnapshot();

      expect(snapshot).toBeDefined();
    });
  });

  describe('dispose', () => {
    it('should dispose a node', () => {
      const node = new Node({ schema, store });
      node.dispose();

      expect(node.ports.list().length).toBe(0);
    });
  });

  describe('ports', () => {
    it('should return a list of ports', () => {
      const node = new Node({ schema, store });

      expect(node.ports.list().length).toBe(1);
    });

    it('should return a port by id', () => {
      const node = new Node({ schema, store });
      const port = node.ports.get('port-id');

      expect(port).toBeDefined();
    });
  });
});
