import { AppUser as AppUserSdk, AppUserInterface as AppUserInterfaceSdk } from './sdk';

export interface AppUserInterface extends AppUserInterfaceSdk {

}

export class AppUser extends AppUserSdk {

  constructor(data?: any) {
    super(data);
  }

}
