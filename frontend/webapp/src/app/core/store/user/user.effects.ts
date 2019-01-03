import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';

import * as uActions from './user.actions';
import * as fromRootStore from '../root-store.reducers';
import { UserService } from './user.service';
import { AppUser } from '~_shared/models';



@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromRootStore.State>,
    private userService: UserService
  ) { }


  @Effect()
  create$: Observable<Action> = this.actions$.pipe(
    ofType<uActions.CreateAction>(uActions.ActionTypes.CREATE),
    map(action => action.payload),
    switchMap(user => {
      return this.userService.create$(user)
        .pipe(
          map(newUser => new uActions.CreateSuccessAction({ ...user, ...newUser })),
          catchError(err => of(new uActions.CreateFailureAction(err)))
        );
    })
  );

  @Effect()
  loginWhenCreated$: Observable<Action> = this.actions$.pipe(
    ofType<uActions.CreateSuccessAction>(uActions.ActionTypes.CREATE_SUCCESS),
    map(action => action.payload),
    map(newUser => new uActions.LoginAction(newUser))
  );


  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<uActions.LoginAction>(uActions.ActionTypes.LOGIN),
    map(action => action.payload),
    switchMap(login => {
      return this.userService.login$(login)
        .pipe(
          map(auth => new uActions.LoginSuccessAction(auth)),
          catchError(err => of(new uActions.LoginFailureAction(err)))
        );
    })
  );

  @Effect()
  fetchUserWhenLoggedIn$: Observable<Action> = this.actions$.pipe(
    ofType<uActions.LoginSuccessAction>(uActions.ActionTypes.LOGIN_SUCCESS),
    map(action => action.payload),
    map(auth => new uActions.FetchOneAction(auth.userId))
  );


  @Effect()
  fetchOne$: Observable<Action> = this.actions$.pipe(
    ofType<uActions.FetchOneAction>(uActions.ActionTypes.FETCH_ONE),
    map(action => action.payload),
    switchMap(id => {
      return this.userService.fetchOne$(id)
        .pipe(
          switchMap(user => [
            new uActions.FetchOneSuccessAction(user),
          ]),
          catchError(err => of(new uActions.FetchOneFailureAction(err)))
        );
    })
  );


  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType<uActions.LogoutAction>(uActions.ActionTypes.LOGOUT),
    switchMap(() => {
      return this.userService.logout$()
        .pipe(
          map(auth => new uActions.LogoutSuccessAction()),
          catchError(err => of(new uActions.LogoutFailureAction(err)))
        );
    })
  );



}
