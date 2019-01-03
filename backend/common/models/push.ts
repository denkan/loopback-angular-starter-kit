import { Model } from '@mean-expert/model';
import { pick } from 'lodash';
import { Response } from '../response';
import { NotificationData, NotificationDataInterface } from '../../../_shared/models';

/**
 * @module Push
 * @description
 * Handler for all public push methods/routes
 **/
@Model({
  hooks: {},
  remotes: {
    register: {
      accepts: [
        { arg: 'data', type: 'object', http: { source: 'body' } },
        { arg: 'ctx', type: 'object', http: { source: 'context' } },
      ],
      returns: { root: true, type: 'object' },
      http: { path: '/register', verb: 'post' }
    },
    sendToAppUser: {
      accepts: [
        { arg: 'notificationData', type: 'object', http: { source: 'body' } },
        { arg: 'appUserId', type: 'string' },
      ],
      returns: { root: true, type: 'array' },
      http: { path: '/send/user/:appUserId', verb: 'post' }
    },
  }
})

class Push {
  constructor(public model: any) { }


  /**
   * Create/Patch new installation
   * @param data Installation info/properties
   * @param next Callback
   */
  async register(data: any, ctx: any, next: Function) {
    const M = this.model.app.models;

    data = data || {};

    const validProps = [
      'appId',
      'deviceType',
      'deviceToken',
      'providerType',
      'providerToken',
    ];
    const validData = pick(data, validProps);

    validData['appUserId'] = await new Promise((resolve, reject) => {
      M.AppUser.userIdByContext(ctx, (err, uid) => resolve(uid));
    });

    validData.appUserId = validData.appUserId || null; // update to null if unit e.g logout

    const upsertByWhere = validData.providerToken ?
      pick(validData, ['providerToken']) :
      pick(validData, ['deviceToken']);

    M.PushReceiver.upsertWithWhere(
      upsertByWhere,
      validData,
      next
    );
  }


  sendToAppUser(notificationData: NotificationDataInterface, appUserId: string, next: Function) {
    const M = this.model.app.models;
    notificationData = new NotificationData(notificationData);

    // 1. Find all registered push-receivers for appUser
    M.PushReceiver.find({ where: { appUserId } }, (err, receivers) => {
      if (err || !receivers) return Response.error(err);

      // 2. Create PushNotification for each receiver
      const createPromises = receivers.map(r => new Promise((resolve, reject) => {
        // FYI: the 'create' hook on PushNotification
        // will trigger the actual push (by OneSignal)
        M.PushNotification.create({
          notificationData,
          pushReceiverId: r.id,
        }, (err, createdPushNot) => {
          if (err || !createdPushNot) return reject(err || new Error('Created PushNotification invalid:' + createdPushNot));
          return resolve(createdPushNot);
        });
      }));

      Promise.all(createPromises)
        .then(createdPushNots => next(null, createdPushNots))
        .catch(err => next(err));
    });
  }
}

module.exports = Push;
