const BasePath = {
  NODES: 'nodes',
  LINKS: 'links',
  PORTS: 'ports',
};

const mergePath = (...parts: string[]) => parts.join('.');

export const StorePath = {
  nodes: (id: string, ...addPath: string[]) =>
    mergePath(BasePath.NODES, id, ...addPath),

  links: (id: string, ...addPath: string[]) =>
    mergePath(BasePath.LINKS, id, ...addPath),

  ports: (nodeId: string, portId: string, ...addPath: string[]) =>
    mergePath(BasePath.NODES, nodeId, BasePath.PORTS, portId, ...addPath),
};
