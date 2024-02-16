///

import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';

import { take } from 'rxjs/operators';
import {AppState} from "@core/public-api";

export interface LoadState {
  isLoading: boolean;
}

export const selectLoadState = createFeatureSelector< LoadState>(
  'load'
);

export const selectLoad = createSelector(
  selectLoadState,
  (state: LoadState) => state
);

export const selectIsLoading = createSelector(
  selectLoadState,
  (state: LoadState) => state.isLoading
);

export function getCurrentIsLoading(store: Store<AppState>): boolean {
  let isLoading: boolean;
  store.pipe(select(selectIsLoading), take(1)).subscribe(
    val => isLoading = val
  );
  return isLoading;
}
