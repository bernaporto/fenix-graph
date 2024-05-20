import { StorePath } from './paths';

describe('StorePath', () => {
  it('should join paths', () => {
    expect(StorePath.join('a', 'b', 'c')).toBe('a.b.c');
  });

  it.each([
    [
      'connections',
      StorePath.connections('link-id', 'conn-id'),
      'links.link-id.connections.conn-id',
    ],
    ['links', StorePath.links('link-id'), 'links.link-id'],
    ['nodes', StorePath.nodes('node-id'), 'nodes.node-id'],
    [
      'ports',
      StorePath.ports('node-id', 'port-id'),
      'nodes.node-id.ports.port-id',
    ],
  ])('should create a %s path', (_, actual, expected) => {
    expect(actual).toBe(expected);
  });
});
