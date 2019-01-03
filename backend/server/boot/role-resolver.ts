import { BootScript } from '@mean-expert/boot-script';

@BootScript()
class RoleResolver {
  models: any;
  Role: any;

  constructor(app: any) {
    this.models = app.models;
    this.Role = app.models.Role;

    // setup roles
    this.$adminRole();
    // this.$storeUserRole();
    // this.$storeAdminRole();
  }


  $adminRole() {
    this.Role.registerResolver('$admin', (role, ctx, cb) => {
      var userId = ctx.accessToken.userId;
      if (!userId) return process.nextTick(() => cb(null, false));

      return cb(null, false); // disable role
      // this.models.StoreUser.findById(userId, (err, storeUser) => {
      //   storeUser = storeUser ||  {};
      //   // storeId below 0 = admin!
      //   const isAdmin = (storeUser.storeId + '').toUpperCase() === 'ADMIN';
      //   return cb(null, isAdmin);
      // })
    });
  }


  $storeUserRole() {
    this.Role.registerResolver('$storeUser', (role, ctx, cb) => {
      var userId = ctx.accessToken.userId;
      if (!userId) return process.nextTick(() => cb(null, false));

      this.models.StoreUser.findById(userId, (err, storeUser) =>
        cb(null, !!storeUser)
      );
    });
  }


  $storeAdminRole() {
    this.Role.registerResolver('$storeAdmin', (role, ctx, cb) => {

      const userId = (ctx.accessToken || {}).userId;
      if (!userId) return process.nextTick(() => cb(null, false));

      const findUserTask = new Promise<any>((resolve, reject) => {
        // console.log('find user...', userId);
        this.models.StoreUser.findById(userId, (err, storeUser) => resolve(storeUser))
      });
      const findModelTask = new Promise<any>((resolve, reject) => {
        if(!ctx.modelId) return resolve(null);
        console.log('find model...', ctx.modelName, ctx.modelId);
        ctx.model.findOne({
          where: { id: ctx.modelId },
          isDeleted: true
        }, (err, modelObj) => resolve(modelObj))
      });

      Promise.all([findUserTask, findModelTask])
        .then(([user, model]) => {
          user = user || {};
          model = model || {};

          // @todo: this resolver doesnt work on fetching multiple items by where statement
          // find better solution?

          // if no model -> just being a storeUser (or admin) is enough
          const checkByModel = model.id && model.storeId;

          const isAdmin = ((user.storeId + '').toUpperCase() === 'ADMIN');
          const isStoreUser = user && (user.storeId === model.storeId || !checkByModel);
          const isStoreAdmin = isStoreUser || isAdmin;
          return cb(null, isStoreAdmin);
        })
        .catch(err => cb(null, false));

    });
  }

}

module.exports = RoleResolver;
