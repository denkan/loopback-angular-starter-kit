import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { fromRoot } from '~/core/store';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

}
