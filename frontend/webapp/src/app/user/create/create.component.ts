import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

import { AppUser } from '~_shared/models';
import { fromUser, fromRoot } from '~/core/store';


@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class UserCreateComponent implements OnInit {
  user: AppUser = new AppUser();
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
      if (!this.status.loading || user.status.creating) return;

      this.status.loading = false;
      this.status.errorMessage = null;

      if (user.status.createError) {
        const error = user.status.createError.error.error;
        this.snackbar.open('Error: ' + error.message, 'OK');
      }
    });
  }

  onCreate(newUser: AppUser) {
    this.status.loading = true;
    this.store.dispatch(new fromUser.CreateAction(newUser));
  }

}
