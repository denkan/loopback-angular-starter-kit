import { Model, } from '@mean-expert/model';
import { kebabCase, truncate, random } from 'lodash';

/**
 * @module PushReceiver
 * @description
 * Info about registered push subscription, such as
 * device type (IOS/Android), which provider
 * (e.g. Onesignal), tokens etc
 **/
@Model({
  hooks: {
    hookSetCustomId: { name: 'before save', type: 'operation' },
  },
  remotes: { }
})

class PushReceiver {
  constructor(public model: any) {}


  /**
   * Include provider and device type names in ID for easier identification
   * @param ctx
   * @param next
   */
  hookSetCustomId(ctx: any, next: Function) {
    if (!ctx.isNewInstance) return next();

    const theModel = (ctx || {}).instance || {};
    const provider = kebabCase(truncate(theModel.providerType)) || '';
    const device = kebabCase(truncate(theModel.deviceType)) || '';
    const originalId = theModel.id || random(999999,999999999);
    const newId = `${provider}--${device}--${originalId}`;

    theModel.id = newId;

    next();
  }
}

module.exports = PushReceiver;
