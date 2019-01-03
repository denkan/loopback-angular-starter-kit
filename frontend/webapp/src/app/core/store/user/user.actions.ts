import { Action } from '@ngrx/store';

import { type } from '../utils';
import { AppUserToken, UserLogin, AppUser } from '~_shared/models';


export const ActionTypes = {
    CREATE:              type('USER.CREATE'),
    CREATE_SUCCESS:      type('USER.CREATE_SUCCESS'),
    CREATE_FAILURE:      type('USER.CREATE_FAILURE'),

    LOGIN:               type('USER.LOGIN'),
    LOGIN_SUCCESS:       type('USER.LOGIN_SUCCESS'),
    LOGIN_FAILURE:       type('USER.LOGIN_FAILURE'),

    LOGOUT:              type('USER.LOGOUT'),
    LOGOUT_SUCCESS:      type('USER.LOGOUT_SUCCESS'),
    LOGOUT_FAILURE:      type('USER.LOGOUT_FAILURE'),

    FETCH_ONE:           type('USER.FETCH_ONE'),
    FETCH_ONE_SUCCESS:   type('USER.FETCH_ONE_SUCCESS'),
    FETCH_ONE_FAILURE:   type('USER.FETCH_ONE_FAILURE'),
};


export class CreateAction implements Action {
  readonly type = ActionTypes.CREATE;
  constructor(public payload: AppUser) { }
}
export class CreateSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_SUCCESS;
  constructor(public payload: AppUser) { }
}
export class CreateFailureAction implements Action {
  readonly type = ActionTypes.CREATE_FAILURE;
  constructor(public payload: Error) { }
}


export class LoginAction implements Action {
    readonly type = ActionTypes.LOGIN;
    constructor(public payload: UserLogin) { }
}
export class LoginSuccessAction implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;
    constructor(public payload: AppUserToken) { }
}
export class LoginFailureAction implements Action {
    readonly type = ActionTypes.LOGIN_FAILURE;
    constructor(public payload: Error) { }
}


export class LogoutAction implements Action {
    readonly type = ActionTypes.LOGOUT;
    constructor() { }
}
export class LogoutSuccessAction implements Action {
    readonly type = ActionTypes.LOGOUT_SUCCESS;
    constructor() { }
}
export class LogoutFailureAction implements Action {
    readonly type = ActionTypes.LOGOUT_FAILURE;
    constructor(public payload: Error) { }
}


export class FetchOneAction implements Action {
    readonly type = ActionTypes.FETCH_ONE;
    constructor(public payload: string) { }
}
export class FetchOneSuccessAction implements Action {
    readonly type = ActionTypes.FETCH_ONE_SUCCESS;
    constructor(public payload: AppUser) { }
}
export class FetchOneFailureAction implements Action {
    readonly type = ActionTypes.FETCH_ONE_FAILURE;
    constructor(public payload: Error) { }
}


export type Actions
    = CreateAction | CreateSuccessAction | CreateFailureAction
    | LoginAction | LoginSuccessAction | LoginFailureAction
    | LogoutAction | LogoutSuccessAction | LogoutFailureAction
    | FetchOneAction | FetchOneSuccessAction | FetchOneFailureAction
    ;

