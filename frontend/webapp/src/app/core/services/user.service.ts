import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { fromRoot, fromUser } from '~/core/store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
  ) { }

  get smartState$() {
    return this.store.select(fromUser.selectSmartState);
  }
  get user$() {
    return this.smartState$.pipe(map(ss => ss.user));
  }
  get auth$() {
    return this.smartState$.pipe(map(ss => ss.auth));
  }
  get isLoggedIn$() {
    return this.smartState$.pipe(map(ss => ss.isLoggedIn));
  }

  logout() {
    this.store.dispatch(new fromUser.LogoutAction());
    this.router.navigateByUrl('/');
  }

}
