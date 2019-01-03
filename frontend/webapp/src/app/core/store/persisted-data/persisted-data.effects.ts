import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { EmptyObservable } from 'rxjs/Observable/EmptyObservable';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromRootStore from '../root-store.reducers';
import * as pdActions from './persisted-data.actions';
import * as uActions from '../user/user.actions';
import { } from '~_shared/models';



@Injectable()
export class PersistedDataEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromRootStore.State>
  ) { }


  @Effect()
  $saveAuth: Observable<Action> = this.actions$.pipe(
    ofType(
      uActions.ActionTypes.LOGIN_SUCCESS,
      uActions.ActionTypes.LOGOUT_SUCCESS,
    ),
    map(action => {
      const auth = (<any>action).payload ||  null;
      return new pdActions.SaveAuthAction(auth);
    }),
  );

  @Effect()
  $restoreAuth: Observable<Action> = this.actions$.pipe(
    ofType<pdActions.RestoreAuthAction>(pdActions.ActionTypes.RESTORE_AUTH),
    map(action => action.payload),
    switchMap(auth => {
      if (!auth) return new EmptyObservable();
      return of(new uActions.LoginSuccessAction(auth));
    }),
  );


  @Effect()
  $restoreAll: Observable<Action> = this.actions$.pipe(
    ofType<pdActions.RestoreAllAction>(pdActions.ActionTypes.RESTORE_ALL),
    map(action => action.payload),
    switchMap(s => [
      new pdActions.RestoreAuthAction(s.auth),
    ]),
  );


}
