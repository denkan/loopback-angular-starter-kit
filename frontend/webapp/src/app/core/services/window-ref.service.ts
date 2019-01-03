import { Injectable } from '@angular/core';


@Injectable()
export class WindowRefService {

  get nativeWindow(): any {
    return _browserWindow();
  }

}

function _browserWindow() {
  return window;
}
