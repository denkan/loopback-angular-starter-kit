import { Model } from '@mean-expert/model';
/**
 * @module AppUser
 * @description
 * Write a useful AppUser Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
  },
  remotes: {
    isInGame: {
      accepts: [
        { arg: 'gameId', type: 'string' },
        { arg: 'options', type: 'object', http: { source: 'body' } }
      ],
      returns: { type: 'array', root: true },
      http: { path: '/isInGame', verb: 'post' }
    },
    userIdByContext: {
      accepts: [{ arg: 'ctx', type: 'object' }],
      returns: { type: 'object', root: true },
      // http: { path: '/userIdByContext', verb: 'post' }
    }
  }
})

class AppUser {
  constructor(public model: any) {}

  isInGame(gameId: string, options: { appUserid?: string, ctx?: any }, next: Function) {
    const M = this.model.app.models;

    M.AppUser.userIdByContext(options.ctx, (err, uid) => {
      const appUserId = options.appUserid || uid;

      if(!appUserId) next(new Error('Invalid user id: ' + appUserId));

      M.GameUser.findOne({
        where: { appUserId, gameId }
      }, next);

    });
  }

  async userIdByContext(ctx: any, cb?: Function) {
    // Async/await doesnt work because Loopback is bad
    // and returns methods wrapped in shit...

    const appUserId = ((ctx.req || {}).accessToken || {}).userId;
    cb && cb(null, appUserId);
    return appUserId;
  }
}

module.exports = AppUser;
