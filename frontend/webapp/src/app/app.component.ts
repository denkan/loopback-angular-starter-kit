import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { fromRoot, fromPersistedData } from '~/core/store';
import { NativeAppTalkerService } from '~/core/services/native-app-talker.service';

@Component({
  selector: 'app-root',
  template: `
    <app-base-shell>
      <router-outlet></router-outlet>
    </app-base-shell>
    <router-outlet name="o"></router-outlet>
  `,
  styleUrls: []
})
export class AppComponent {

  constructor(
    private store: Store<fromRoot.State>,
    private nativeAppTalker: NativeAppTalkerService,
  ) {

    // on first load, run restore job from persisted data
    store.pipe(
      select(fromPersistedData.selectState),
      first(),
    ).subscribe(data =>
      store.dispatch(new fromPersistedData.RestoreAllAction(data))
    );

    // enable global methods (which native webview app may reach)
    nativeAppTalker.init();
  }

}
