import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppUserToken, AppUser } from '~_shared/models';
import * as uActions from './user.actions';


export const featureName = 'user';

export class UserStatusState {
  loggingIn: boolean;
  loginError: any;
  creating: boolean;
  createError: any;
}

export class State {
  auth: AppUserToken;
  user: AppUser;
  status: UserStatusState;
};

export const initialState: State = {
  auth: null,
  user: null,
  status: {
    loggingIn: false,
    loginError: null,
    creating: false,
    createError: null,
  }
};

export class SmartState extends State {
  isLoggedIn: boolean;
}


export function reducer(state = initialState, action: uActions.Actions): State {

  switch (action.type) {


    case uActions.ActionTypes.CREATE: {
      return {
        ...state,
        status: { ...state.status, creating: true, createError: null },
      };
    }
    case uActions.ActionTypes.CREATE_SUCCESS: {
      return {
        ...state,
        status: { ...state.status, creating: false, createError: null },
      };
    }
    case uActions.ActionTypes.CREATE_FAILURE: {
      const err = (<uActions.CreateFailureAction>action).payload;
      return {
        ...state,
        status: { ...state.status, creating: false, createError: err },
      };
    }

    case uActions.ActionTypes.LOGIN: {
      return {
        ...state,
        status: { ...state.status, loggingIn: true, loginError: null },
      };
    }
    case uActions.ActionTypes.LOGIN_SUCCESS: {
      const auth = (<uActions.LoginSuccessAction>action).payload;
      return {
        ...state,
        auth,
        status: { ...state.status, loggingIn: false, loginError: null },
      };
    }
    case uActions.ActionTypes.LOGIN_FAILURE: {
      const err = (<uActions.LoginFailureAction>action).payload;
      return {
        ...state,
        status: { ...state.status, loggingIn: false, loginError: err },
      };
    }

    case uActions.ActionTypes.LOGOUT_SUCCESS: {
      return initialState;
    }

    case uActions.ActionTypes.FETCH_ONE_SUCCESS: {
      const user = (<uActions.FetchOneSuccessAction>action).payload;
      return { ...state, user };
    }

    default: {
      return state;
    }
  }
}


export const selectState = createFeatureSelector<State>(featureName);

export const selectSmartState = createSelector(
  selectState,
  (s) => {
    const ss = <SmartState>{
      ...s,
      isLoggedIn: !!(s.auth && s.auth.userId && s.user && s.user.id),
    };
    return ss;
  })

export const selectAuth = createSelector(selectState, s => s.auth);
export const selectUser = createSelector(selectState, s => s.user);

export const selectStatus = createSelector(selectState, s => s.status);
export const selectStatusLoggingIn = createSelector(selectStatus, s => s.loggingIn);
export const selectStatusLoginError = createSelector(selectStatus, s => s.loginError);
