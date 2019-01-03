import { BackendService } from './backend.service';
import { PushService } from './push';
import { UserService } from './user';

import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from '~/core/store/router';

export const rootServices = [
  BackendService,
  PushService,
  UserService,
  { provide: RouterStateSerializer, useClass: CustomSerializer },
];
