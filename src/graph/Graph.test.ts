import type { Link, Node } from '@/units';
import type { TGraph } from './types';
import { Graph } from './Graph';

describe('Graph', () => {
  it('should be able to add a node', () => {
    const graph = Graph.create();

    const node = addSingleNode(graph);
    expect(node).toBeDefined();

    const nodes = graph.nodes.list();
    expect(nodes.length).toBe(1);
  });

  it('should be able to remove a node', () => {
    const graph = Graph.create();
    const node = graph.nodes.add({
      label: 'Node',
      ports: [],
      type: 'test-node',
    });

    graph.nodes.remove(node.id);

    const nodes = graph.nodes.list();
    expect(nodes.length).toBe(0);
  });

  it('should be able to add a link', () => {
    const graph = Graph.create();
    const [link] = addNodesAndConnect(graph);

    expect(link).toBeDefined();

    const links = graph.links.list();
    expect(links.length).toBe(1);
  });

  it('should be able to remove a link', () => {
    const graph = Graph.create();
    const [link] = addNodesAndConnect(graph);

    graph.links.remove(link.id);

    const links = graph.links.list();
    expect(links.length).toBe(0);
  });

  it('should be able to dispose a graph', () => {
    const graph = Graph.create();
    addNodesAndConnect(graph);

    expect(graph.links.list().length).toBe(1);
    expect(graph.nodes.list().length).toBe(2);

    graph.dispose();

    expect(graph.links.list().length).toBe(0);
    expect(graph.nodes.list().length).toBe(0);
  });

  it('should be able to generate a virtual tree & gracefully return null if root is not found', () => {
    const graph = Graph.create();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, node1] = addNodesAndConnect(graph);

    const tree = graph.tree(node1.id);

    expect(tree).toBeDefined();
    expect(tree?.root.id).toBe(node1.id);

    const nullTree = graph.tree('non-existent-id');
    expect(nullTree).toBeNull();
  });

  it('should be able to listen to changes', () => {
    const graph = Graph.create();
    const listener = jest.fn();
    const unsubscribe = graph.onChange(listener);

    addSingleNode(graph);

    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();

    addSingleNode(graph);

    expect(listener).toHaveBeenCalledTimes(1);
  });

  describe('create', () => {
    it('should create a graph', () => {
      const graph = Graph.create();

      expect(graph).toBeDefined();
    });
  });

  describe('fromSnapshot', () => {
    it('should create a graph from snapshot', () => {
      const graph = Graph.create();
      addNodesAndConnect(graph);

      const snapshot = Graph.toSnapshot(graph);
      const newGraph = Graph.fromSnapshot(snapshot);

      expect(newGraph).toBeDefined();
    });
  });

  describe('toSnapshot', () => {
    it('should create a snapshot from graph', () => {
      const graph = Graph.create();
      addNodesAndConnect(graph);

      const snapshot = Graph.toSnapshot(graph);

      expect(snapshot).toBeDefined();
    });
  });
});

const addSingleNode = (graph: TGraph): Node => {
  return graph.nodes.add({
    label: 'Node',
    ports: [],
    type: 'test-node',
  });
};

const addNodesAndConnect = (graph: TGraph): [Link, Node, Node] => {
  const node1 = graph.nodes.add({
    label: 'Node 1',
    ports: [
      {
        direction: 'in',
        id: 'port-1',
        label: 'Port 1',
        type: 'test-port',
      },
    ],
    type: 'test-node-1',
  });
  const node2 = graph.nodes.add({
    label: 'Node 2',
    ports: [
      {
        direction: 'out',
        id: 'port-2',
        label: 'Port 2',
        type: 'test-port',
      },
    ],
    type: 'test-node-2',
  });

  const link = graph.links.add({
    from: {
      nodeId: node1.id,
      portId: 'test-port',
    },
    to: {
      nodeId: node2.id,
      portId: 'test-port',
    },
  });

  return [link, node1, node2];
};
