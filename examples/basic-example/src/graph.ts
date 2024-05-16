import { Graph, type TNodeSchema } from '@bernaporto/fenix-graph';

const schemas: Record<string, TNodeSchema> = {
  ADD: {
    type: 'add',
    label: 'Add',
    ports: [
      {
        direction: 'in',
        id: 'add-in-1',
        label: 'In',
        type: 'number',
      },
      {
        direction: 'in',
        id: 'add-in-2',
        label: 'In',
        type: 'number',
      },
      {
        direction: 'out',
        id: 'add-out',
        label: 'Out',
        type: 'number',
      },
    ],
  },
  FLOAT: {
    type: 'float',
    label: 'Float',
    ports: [
      {
        direction: 'out',
        id: 'float-out',
        label: 'Out',
        type: 'number',
      },
    ],
  },
  OUTPUT: {
    type: 'output',
    label: 'Output',
    ports: [
      {
        direction: 'in',
        id: 'output-in',
        label: 'In',
        type: 'number',
      },
    ],
  },
};

export const initGraph = () => {
  const graph = Graph.create();

  const output = graph.nodes.add(schemas.OUTPUT);
  const add = graph.nodes.add(schemas.ADD);
  const float1 = graph.nodes.add(schemas.FLOAT);
  const float2 = graph.nodes.add(schemas.FLOAT);

  graph.links.add({
    from: {
      nodeId: add.id,
      portId: 'add-in-1',
    },
    to: {
      nodeId: float1.id,
      portId: 'float-out',
    },
  });

  graph.links.add({
    from: {
      nodeId: add.id,
      portId: 'add-in-2',
    },
    to: {
      nodeId: float2.id,
      portId: 'float-out',
    },
  });

  graph.links.add({
    from: {
      nodeId: add.id,
      portId: 'add-out',
    },
    to: {
      nodeId: output.id,
      portId: 'output-in',
    },
  });

  const state = Graph.toState(graph);
  console.log('Graph.toState', state);

  const newGraph = Graph.fromState(state);
  console.log('Graph.fromState', newGraph);

  // console.log(graph.tree(output.id));
};
