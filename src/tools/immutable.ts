type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
type ImmutableObject<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
};
export type Immutable<T> = T extends (infer U)[]
  ? ImmutableArray<U>
  : T extends object
    ? ImmutableObject<T>
    : Readonly<T>;

export const immutable = <T>(value: T): Immutable<T> => {
  if (typeof value !== 'object' || value === null) {
    return value as Immutable<T>;
  }

  if (Array.isArray(value)) {
    return Object.freeze(value.map(immutable)) as unknown as Immutable<T>;
  }

  const result = Object.entries(value).reduce((acc, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      acc[key] = immutable(value);
    } else {
      acc[key] = value;
    }

    return acc;
  }, Object.create(null));

  return Object.freeze(result) as Immutable<T>;
};
