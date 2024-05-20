import { Store } from '@/graph/store';
import { Link } from './Link';
import type { TLinkSchema } from './types';

const store = Store.create();
const schema: TLinkSchema = {
  from: {
    nodeId: 'node-id-1',
    portId: 'port-id',
  },
  to: {
    nodeId: 'node-id-2',
    portId: 'port-id',
  },
};

describe('Link', () => {
  beforeEach(() => {
    store.clear();
  });

  it('should create a link', () => {
    const link = new Link({ schema, store });

    expect(link).toBeDefined();
  });

  describe('fromSnapshot', () => {
    it('should create a link from snapshot', () => {
      const link = new Link({ schema, store });

      const snapshot = link.toSnapshot();
      const newLink = Link.fromSnapshot({ snapshot, store });

      expect(newLink).toBeDefined();
    });
  });

  describe('toSnapshot', () => {
    it('should create a snapshot from link', () => {
      const link = new Link({ schema, store });
      const snapshot = link.toSnapshot();

      expect(snapshot).toBeDefined();
    });
  });

  describe('dispose', () => {
    it('should dispose a link', () => {
      const link = new Link({ schema, store });
      link.dispose();

      expect(link.connections.list()).toHaveLength(0);
    });
  });

  describe('connections', () => {
    it('should return a list of connections', () => {
      const link = new Link({ schema, store });

      expect(link.connections.list()).toHaveLength(2);
    });

    it('should return a connection by id', () => {
      const link = new Link({ schema, store });
      const connection = link.connections.get('node-id-1:port-id');

      expect(connection).toBeDefined();
    });
  });
});
