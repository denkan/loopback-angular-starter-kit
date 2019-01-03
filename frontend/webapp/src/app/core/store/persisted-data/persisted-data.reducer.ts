import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as pdActions from './persisted-data.actions';
import { AppUserToken } from '~_shared/models';


export const featureName = 'persistedData';

export class State {
    auth: AppUserToken;
}

export const initialState: State = {
    auth: null,
};

export function reducer(state = initialState, action: pdActions.Actions): State {

    switch (action.type) {

        case pdActions.ActionTypes.SAVE_AUTH: {
            const auth = (<pdActions.SaveAuthAction>action).payload;
            return { ...state, auth };
        }

        default: {
            return state;
        }
    }
}


export const selectState = createFeatureSelector<State>(featureName);
export const selectAuth = createSelector(selectState, s => s.auth);
