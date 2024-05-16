const BasePath = {
  NODES: 'nodes',
  LINKS: 'links',
  PORTS: 'ports',
};

const join = (...parts: string[]) => parts.join('.');

export const StorePath = {
  join,

  nodes: (id: string, ...addPath: string[]) =>
    join(BasePath.NODES, id, ...addPath),

  links: (id: string, ...addPath: string[]) =>
    join(BasePath.LINKS, id, ...addPath),

  ports: (nodeId: string, portId: string, ...addPath: string[]) =>
    join(BasePath.NODES, nodeId, BasePath.PORTS, portId, ...addPath),
};
