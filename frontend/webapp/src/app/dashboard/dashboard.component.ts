import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { fromRoot, fromUser } from '~/core/store';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user$: Observable<fromUser.SmartState>;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(fromUser.selectSmartState));
  }

  onLogout() {
    this.store.dispatch(new fromUser.LogoutAction());
  }

}
