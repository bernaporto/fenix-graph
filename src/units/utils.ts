import { uuidV4 } from '@/tools/uuid';
import type { TUnitSchema, TUnitSnapshot } from './types';

export const setup = <T extends TUnitSchema, U extends TUnitSnapshot<T>>(
  schemaOrSnapshot: T | U,
): {
  id: string;
  schema: T;
} => {
  if (isSnapshot(schemaOrSnapshot)) {
    return {
      id: schemaOrSnapshot.id,
      schema: schemaOrSnapshot.schema,
    };
  }

  return {
    id: uuidV4(),
    schema: schemaOrSnapshot,
  };
};

const isSnapshot = <T extends TUnitSchema, U extends TUnitSnapshot>(
  value: T | U,
): value is U => 'schema' in value;
