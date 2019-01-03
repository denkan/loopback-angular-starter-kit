import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

import { UserLogin } from '~_shared/models';
import { fromUser, fromRoot } from '~/core/store';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class UserLoginComponent implements OnInit {
  login: UserLogin = new UserLogin();
  status = {
    loading: false,
    errorMessage: '',
  }
  user$: Observable<fromUser.State>;

  constructor(
    private store: Store<fromRoot.State>,
    private snackbar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(fromUser.selectState));

    this.user$.subscribe(user => {
      if (!this.status.loading) return;

      this.status.loading = false;
      this.status.errorMessage = null;

      if (user.status.loginError) {
        this.snackbar.open('Login failed', null, { duration: 1000 });
      }
    });
  }

  onLogin(credentials: UserLogin) {
    this.status.loading = true;

    const login = { ...credentials };

    if (login.username.indexOf('@') > 0) {
      login.email = login.username;
      delete login.username;
    }

    this.store.dispatch(new fromUser.LoginAction(login));
  }

}
