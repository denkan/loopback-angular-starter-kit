import { Action } from '@ngrx/store';

import { type } from '../utils';
import { AppUserToken } from '~_shared/models';
import * as fromPersistedData from './persisted-data.reducer';


export const ActionTypes = {
    SAVE_AUTH:           type('PERSISTED_DATA.SAVE_AUTH'),
    RESTORE_AUTH:        type('PERSISTED_DATA.RESTORE_AUTH'),

    RESTORE_ALL:         type('PERSISTED_DATA.RESTORE_ALL'),
};


export class SaveAuthAction implements Action {
    readonly type = ActionTypes.SAVE_AUTH;
    constructor(public payload: AppUserToken) { }
}
export class RestoreAuthAction implements Action {
    readonly type = ActionTypes.RESTORE_AUTH;
    constructor(public payload: AppUserToken) { }
}

export class RestoreAllAction implements Action {
    readonly type = ActionTypes.RESTORE_ALL;
    constructor(public payload: fromPersistedData.State) { }
}

export type Actions
    = SaveAuthAction | RestoreAuthAction
    | RestoreAllAction
    ;

