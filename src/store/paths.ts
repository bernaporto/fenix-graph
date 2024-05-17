const BasePath = {
  CONNECTIONS: 'connections',
  NODES: 'nodes',
  LINKS: 'links',
  PORTS: 'ports',
};

const join = (...parts: string[]) => parts.join('.');

export const StorePath = {
  join,

  connections: (linkId: string, connId: string, ...addPath: string[]) =>
    join(BasePath.LINKS, linkId, BasePath.CONNECTIONS, connId, ...addPath),

  links: (id: string, ...addPath: string[]) =>
    join(BasePath.LINKS, id, ...addPath),

  nodes: (id: string, ...addPath: string[]) =>
    join(BasePath.NODES, id, ...addPath),

  ports: (nodeId: string, portId: string, ...addPath: string[]) =>
    join(BasePath.NODES, nodeId, BasePath.PORTS, portId, ...addPath),
};
