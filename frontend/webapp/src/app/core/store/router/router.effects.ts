import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom, tap } from 'rxjs/operators';

import * as fromRootStore from '../root-store.reducers';
import * as rActions from './router.actions';



@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<fromRootStore.State>,
    private location: Location,
    private router: Router,
  ) { }

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType<rActions.NavigateAction>(rActions.ActionTypes.NAVIGATE),
    map(action => action.payload),
    tap(({ path, query, extras }) =>
      this.router.navigate(path, { queryParams: query, ...extras })
    ),
  )

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(rActions.ActionTypes.BACK),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(rActions.ActionTypes.FORWARD),
    tap(() => this.location.forward())
  );
}
