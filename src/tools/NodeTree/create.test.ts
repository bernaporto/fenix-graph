import { create } from './create';

type TTestType = {
  id: number;
  links: number[];
};

const list: TTestType[] = [
  {
    id: 1,
    links: [2, 3],
  },
  {
    id: 2,
    links: [4, 5],
  },
  {
    id: 3,
    links: [],
  },
  {
    id: 4,
    links: [],
  },
  {
    id: 5,
    links: [],
  },
];

const getChildren = (node: TTestType) =>
  list.filter(({ id }) => node.links.includes(id));

export const makeTestTree = () => create(list[0], getChildren);

describe('NodeTree.create', () => {
  it('should create a node tree', () => {
    const tree = makeTestTree();

    expect(tree).toBeDefined();
    expect(tree.root).toBeDefined();
    expect(tree.root.value.id).toBe(1);
    expect(tree.root.children).toHaveLength(2);

    const [node2, node3] = tree.root.children;

    expect(node2).toBeDefined();
    expect(node2.value.id).toBe(2);
    expect(node2.children).toHaveLength(2);

    expect(node3).toBeDefined();
    expect(node3.value.id).toBe(3);
    expect(node3.children).toHaveLength(0);

    const [node4, node5] = node2.children;

    expect(node4).toBeDefined();
    expect(node4.value.id).toBe(4);
    expect(node4.children).toHaveLength(0);

    expect(node5).toBeDefined();
    expect(node5.value.id).toBe(5);
    expect(node5.children).toHaveLength(0);
  });
});

describe('TNodeTree.get', () => {
  it('should return a node by id', () => {
    const tree = makeTestTree();

    const node = tree.get(4);

    expect(node).toBeDefined();
    expect(node?.id).toBe(4);
  });

  it('should return null if a node is not found', () => {
    const tree = makeTestTree();

    const node = tree.get(6);

    expect(node).toBeNull();
  });
});
