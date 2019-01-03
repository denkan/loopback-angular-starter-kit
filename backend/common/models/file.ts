import { Model } from '@mean-expert/model';

const path = require('path');
const uuid = require('uuid');


/**
 * @module File
 * @description
 * Model to keep track of a files info (name, type, size) easily in database.
 * Also proxy the uploads between the actually storages (e.g. FileStorage)
 **/
@Model({
  hooks: {
    hookCollectDeletedFiles: { name: 'before delete', type: 'operation' },
    hookClearDeletedFiles: { name: 'after delete', type: 'operation' },
  },
  remotes: {
    upload: {
      accepts: [
        { arg: 'id', type: 'number', required: true },
        { arg: 'req', type: 'object', http: { source: 'req' } },
        { arg: 'res', type: 'object', http: { source: 'res' } },
        { arg: 'options', type: 'object' },
      ],
      returns: { root: true, type: 'object' },
      http: { path: '/upload', verb: 'post' }
    }
  }
})
class File {

  constructor(public model: any) { }


  /*****************************************************************
   * HOOKS
   */

  /**
   * Add files which are about to get deleted to queue to be removed from storages later
   * @param ctx
   * @param next
   */
  hookCollectDeletedFiles(ctx: any, next: Function) {
    ctx.Model.find({ where: ctx.where }, (err, files) => {
      ctx.hookState.deletedFiles = files;
      next();
    })
  }

  /**
   * Look at queue of deleted files and remove actually file from storage
   * @param ctx
   * @param next
   */
  hookClearDeletedFiles(ctx: any, next: Function) {
    const deletedFiles = ctx.hookState.deletedFiles || [];
    const cleaningJobs = [];

    deletedFiles.forEach(file => {
      const job = new Promise((resolve, reject) => {
        const anyStorageModel = this.model.app.models[file.storageModel];
        anyStorageModel.removeFile(
          file.containerName,
          file.name,
          (err, r) => resolve(r ||  err)
        );
      })
      cleaningJobs.push(job);
    });

    Promise.all(cleaningJobs)
      .then(results => next(null, results))
      .catch(err => next(err));
  }


  /*****************************************************************
   * REMOTES
   */


  /**
   * Upload to storage model (default FileStorage) + store in db
   * @param containerName
   * @param req
   * @param res
   * @param any
   * @param options
   * @param next
   */
  upload(containerName: string, req: any, res: any, options: UploadOptions, next: Function) {
    options = options || new UploadOptions();
    options.storageModel = options.storageModel || 'FileStorage';

    const anyStorageModel = this.model.app.models[options.storageModel];
    if (!anyStorageModel) {
      return next(new Error(`Storage model '${options.storageModel}' doesn't exists`));
    }

    // options.nameConflict doesn't seems to work by default - lets fix it!
    if (options.nameConflict && !options.getFilename) {
      options.getFilename = (file, req, res) => {
        return uuid.v4() + path.extname(file.name);
      }
    }

    // create container - ignore error if already exists
    anyStorageModel.createContainer({ name: containerName }, (err, container) => {

      // upload
      anyStorageModel.upload(containerName, req, res, options, (err, result) => {
        if (err) return next(err);

        const file = (((result || {}).files || {}).file || [])[0]; // result.files.file[0]
        if (!file) return next(new Error('Invalid file'));

        // upload ok - save info to db
        const uniqueData = {
          storageModel: options.storageModel,
          name: file.name,
          containerName,
        }
        const allData = {
          ...options.data,
          ...file,
          ...uniqueData,
        }
        this.model.upsertWithWhere(uniqueData, allData, next);
        // returns newly created db instance of File
      });

    });
  }

}

module.exports = File;


export class UploadOptions {
  storageModel: string;
  getFilename: ((file: any, req: any, res) => string);
  nameConflict: 'makeUnique' | string;
  allowedContentTypes: string[] | ((file: any, req: any, res) => string[]);
  maxFileSize: number | ((file: any, req: any, res) => number);
  acl: any | ((file: any, req: any, res) => any);
  data: {
    applicationType: string,
    param1: string,
    param2: string,
    param3: string,
  }
}
