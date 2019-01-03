import { Injectable } from '@angular/core';

import { PushReceiver } from '~_shared/models';
import { BackendService } from '~/core/store/backend.service';

@Injectable()
export class PushService {

  constructor(
    private backend: BackendService,
  ) { }

  register$(data: PushReceiver) {
    return this.backend.post<any>(
      `Push/register`,
      data,
    );
  }

}
