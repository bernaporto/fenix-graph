import { FenixStore } from '@bernaporto/fenix-store';
import type { TGraphState, TGraphStore } from './types';

export const Store = {
  create: (initialState?: TGraphState): TGraphStore =>
    FenixStore.create(initialState),
};
