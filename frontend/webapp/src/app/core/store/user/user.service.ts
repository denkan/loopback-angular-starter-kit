import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { BackendService } from '~/core/store/backend.service';
import { AppUserToken, UserLogin, AppUser } from '~_shared/models';

@Injectable()
export class UserService {

  constructor(
    private backend: BackendService,
  ) { }

  create$(user: AppUser) {
    return this.backend.post<AppUser>(
      `AppUsers`,
      user,
    );
  }

  login$(credentials: UserLogin) {
    return this.backend.post<AppUserToken>(
      `AppUsers/login`,
      credentials,
    );
  }

  logout$() {
    return this.backend.post(
      `AppUsers/logout`,
      {}
    );
  }

  fetchOne$(id: string) {
    return this.backend.get<AppUser>(
      `AppUsers/${id}`
    );
  }

  changePassword$(oldPassword: string, newPassword: string) {
    return this.backend.post<any>(
      `AppUsers/change-password`,
      { oldPassword, newPassword }
    );
  }


}
