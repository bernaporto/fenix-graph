import { makeTestTree } from './create.test';

describe('TNodeTree.traverse', () => {
  it('should traverse a node tree', () => {
    const tree = makeTestTree();

    const values: number[] = [];

    tree.traverse((value) => {
      values.push(value.id);
    });

    expect(values).toEqual([1, 2, 4, 5, 3]);
  });
});
