import { Model } from '@mean-expert/model';
import * as OneSignal from 'onesignal-node';
import { pick } from 'lodash';

/**
 * @module PushProviderOnesignal
 * @description
 * Write a useful PushProviderOnesignal Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {},
  remotes: {
    getSdkClient: {},
    send: {
      accepts: [
        { arg: 'pushNotificationEntity', type: 'object' },
        { arg: 'pushReceiverEntity', type: 'object' },
      ],
      returns: { root: true, type: 'object' },
    },
  }
})

class PushProviderOnesignal {
  constructor(public model: any) { }

  /**
   * Send by Onesignal REST API
   * @param pushNotificationEntity
   * @param pushReceiverEntity
   * @param next
   */
  send(noti, receiver, next: Function): void {
    const self = this;
    const M = this.model.app.models;
    const CONFIG = this.model.app.settings;

    const osNotification = new OneSignal.Notification({
      ...noti.notificationData,
      include_player_ids: [receiver.providerToken],
      external_id: noti.trackId,
    });

    _getSdkClient().sendNotification(osNotification, (err, response) => {
      const isOK = !err && response.statusCode === 200;
      const responseData = pick(response || {}, ['statusCode', 'body']);
      const props = {
        sentResponseStatus: isOK ? 'OK' : 'ERROR',
        sentResponse: isOK ? responseData : err || responseData,
      };
      // update response
      _updateNotiEntity(props);
    });

    // flag that we did trigger send
    _updateNotiEntity({ sentAt: Date.now() });


    // --- helpers

    function _updateNotiEntity(props: any, next?: Function) {
      Object.assign(props, { id: noti.id });
      M.PushNotification.upsert(props, next);
    }

    function _getSdkClient() {
      if (!self.model.sdkClient) {
        self.model.sdkClient = new OneSignal.Client({
          app: {
            appId: CONFIG.ONESIGNAL_APP_ID,
            appAuthKey: CONFIG.ONESIGNAL_APP_AUTH_KEY
          }
        });
      }

      return self.model.sdkClient;
    }

  }
}

module.exports = PushProviderOnesignal;
