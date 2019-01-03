import { Model } from '@mean-expert/model';
import { Response } from '../response';
/**
 * @module PushNotification
 * @description
 * Write a useful PushNotification Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    triggerActualPush: { name: 'after save', type: 'operation' }
  },
  remotes: {

  }
})

class PushNotification {
  constructor(public model: any) {}


  /**
   * After save, trigger push service based on receiver provider (e.g. OneSignal)
   * @param ctx
   * @param next
   */
  triggerActualPush(ctx: any, next: Function): void {
    if(!ctx.isNewInstance) return next();

    const M = this.model.app.models;
    const pushNot = ctx.instance;

    M.PushReceiver.findById(pushNot.pushReceiverId, (err, receiver) => {
      if(err || !receiver) return Response.error(err, 'Receiver not found');

      switch((receiver.providerType+'').toLowerCase()) {
        case 'onesignal':
          M.PushProviderOnesignal.send(pushNot, receiver);
          break;

        default:
          console.warn('[PushNotification.triggerActualPush] Push provider not found: ' + receiver.providerType);
      }
    });

    next();
  }

}

module.exports = PushNotification;
