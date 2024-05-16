import { makeTestTree } from './create.test';

describe('TVirtualTree.traverse', () => {
  it('should traverse a virtual tree', () => {
    const tree = makeTestTree();

    const values: number[] = [];

    tree.traverse((value) => {
      values.push(value.id);
    });

    expect(values).toEqual([1, 2, 4, 5, 3]);
  });
});
