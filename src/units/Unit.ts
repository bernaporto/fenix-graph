import type {
  TUnitConfig,
  TUnitSchema,
  TUnitSnapshot,
  TUnitState,
  TUnitStore,
} from './types';

type TConfig<Sc extends TUnitSchema, St extends TUnitState> = Omit<
  TUnitConfig<Sc, St>,
  'id' | 'store'
> & {
  id: string;
  store: TUnitStore<St>;
};

export class Unit<Sc extends TUnitSchema, St extends TUnitState> {
  public readonly id: string;
  public readonly schema: Sc;
  public readonly store: TUnitStore<St>;

  constructor({ id, initialState, schema, store }: TConfig<Sc, St>) {
    this.id = id;
    this.schema = schema;
    this.store = Object.freeze(store);

    if (initialState) {
      Object.keys(initialState).forEach((key: keyof St) => {
        const value = initialState[key];
        this.store[key].set(value);
      });
    }
  }

  toSnapshot(): TUnitSnapshot<Sc, St> {
    return {
      id: this.id,
      schema: this.schema,
      state: Object.values(this.store).reduce(
        (acc, store) => ({ ...acc, [store.key]: store.get() }),
        Object.create(null),
      ),
    };
  }
}
