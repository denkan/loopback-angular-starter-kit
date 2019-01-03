import { Injectable } from '@angular/core';

import { WindowRefService } from '~/core/services/window-ref.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import { fromRoot, fromUser, fromPush } from '~/core/store';
import { MatSnackBar } from '@angular/material';
import { PushReceiver } from '~_shared/models';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NativeAppTalkerService {
  talker: any;

  private _nativePlatform = new BehaviorSubject<any>(null);

  get nativePlatform$() {
    return this._nativePlatform.asObservable();
  }

  constructor(
    private winRef: WindowRefService,
    private stateStore: Store<fromRoot.State>,
    private pushService: fromPush.PushService,
  ) { }

  init() {
    // Docs:
    // https://www.npmjs.com/package/nativescript-webview-interface

    const window = this.winRef.nativeWindow;
    this.talker = window.nsWebViewInterface;

    if (!this.talker) {
      console.error('[NativeAppTalker] No native talker detected: `window.nsWebViewInterface` = ', this.talker);
      return;
    }

    // this.unsubscribeAll();

    // listen for calls from native
    this.talker.on('helloFromNative', (info: any) => {
      this._nativePlatform.next(info.platform);
    });
    this.talker.on('pushInfoOnesignalFromNative', (receiverInfo: PushReceiver) => {
      console.log('[pushInfoOnesignalFromNative] web got it: ' + JSON.stringify(receiverInfo));


      this.pushService.register$(receiverInfo).pipe(
        first()
      ).subscribe(addedReceiver => {
        console.log('Push Receiver added! ');
        console.log(JSON.stringify(addedReceiver));
      })
    });

    // talk to native
    this.sayHello();
    this.sayUserInfo();
  }

  sayHello() {
    this.talker.emit('helloFromWeb');
  }

  sayUserInfo() {
    const userInfo$ = this.stateStore.select(fromUser.selectSmartState);
    userInfo$.subscribe(userInfo => {
      this.talker.emit('userInfoFromWeb', userInfo);
    });
    // do we need to unsubscribe anytime?
    // dont think so, actually...
  }
}

