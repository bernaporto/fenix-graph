import { Registry } from './Registry';

describe('Registry', () => {
  it('should be able to add an item', () => {
    const registry = Registry.create();
    const item = registry.add({ name: 'Item' });

    expect(item).toBeDefined();
    expect(registry.list().length).toBe(1);
  });

  it('should be able to remove an item', () => {
    const registry = Registry.create();
    const item = registry.add({ name: 'Item' });

    registry.remove(item.id);

    expect(registry.list().length).toBe(0);
  });

  it('should be able to clear the registry', () => {
    const registry = Registry.create();
    registry.add({ name: 'Item' });

    registry.clear();

    expect(registry.list().length).toBe(0);
  });

  it('should be able to get an item', () => {
    const registry = Registry.create();
    const item = registry.add({ name: 'Item' });

    const found = registry.get(item.id);

    expect(found).toBe(item);
  });
});
