// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Immutable<T> = T extends (...args: any[]) => any
  ? T
  : T extends Record<string, unknown>
    ? { readonly [K in keyof T]: Immutable<T[K]> }
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
