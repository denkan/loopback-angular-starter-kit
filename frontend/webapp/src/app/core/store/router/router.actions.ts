import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

import { type } from '../utils';


export const ActionTypes = {
    NAVIGATE:              type('ROUTER.NAVIGATE'),
    BACK:                  type('ROUTER.BACK'),
    FORWARD:               type('ROUTER.FORWARD'),
};


export class NavigateAction implements Action {
    readonly type = ActionTypes.NAVIGATE;
    constructor(public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }) {}
}
export class BackAction implements Action {
  readonly type = ActionTypes.BACK;
}

export class ForwardAction implements Action {
  readonly type = ActionTypes.FORWARD;
}


export type Actions
    = NavigateAction | BackAction | ForwardAction
    ;

