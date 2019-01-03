import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { RouterReducerState } from '@ngrx/router-store';

import * as fromPersistedData from './persisted-data';
import * as fromRouter from './router';
import * as fromUser from './user';


export interface State {
  persistedData: fromPersistedData.State;
  router: RouterReducerState<fromRouter.State>;
  user: fromUser.State;
}

export const rootReducers: ActionReducerMap<State> = {
  persistedData: fromPersistedData.reducer,
  router: fromRouter.reducer,
  user: fromUser.reducer,
};

export const selectState = (s: State) => s;


/**
 * Setup automatically persisted data by localStorage
 * @param reducer
 */
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['persistedData'],
    rehydrate: true,
  })(reducer);
}


export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
