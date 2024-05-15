import { makeTestTree } from './create.test';

describe('TNodeTree.find', () => {
  it('should find a node', () => {
    const tree = makeTestTree();

    const node = tree.find((value) => value.id === 4);

    expect(node?.id).toEqual(4);
  });

  it('should return null if a node is not found', () => {
    const tree = makeTestTree();

    const node = tree.find((value) => value.id === 6);

    expect(node).toBeNull();
  });
});
