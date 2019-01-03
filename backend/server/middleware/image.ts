import * as path from 'path';
import * as sharp from 'sharp';


export const defaultOptions: ImageResizeOptions = {
  defaultSizeName: '500x500',
  sizes: {
    'small': {
      width: 200,
      height: 200
    },
    'medium': {
      width: 500,
      height: 500
    },
    'large': {
      width: 1200,
      height: 1200
    },
  },
  imageTypes: {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
  },
  src: {
    storageModel: 'FileStorage',
  },
  dest: {
    storageModel: 'ImageCache',
  }
}

export class ImageResizer {
  options: ImageResizeOptions;
  app: any;

  constructor(options: ImageResizeOptions) {
    this.options = options;
  }

  routeHandler(req, res, next: Function) {
    this.app = req.app;

    const opts = this.options;
    const fi = this.getInfoByUrl(req.url);

    // 1. valid image type?
    if(!fi.validImageType) return next();

    // 2. check if already cached
    this.getReadStream(opts.dest, fi.container, fi.fileName)
      .then(_succeeded) // already cached
      .catch(err =>

        // 3. if not, create cached
        this.resizeAndCache(fi)
          .catch(_failed)
          .then(() =>

            // 4. re-check that newly created does exists
            this.getReadStream(opts.dest, fi.container, fi.fileName)
              .then(_succeeded) // yay
              .catch(_failed)
          )
      );

    function _succeeded(stream) {
      const headers = {
        'Content-Type': fi.imageType,
      }
      res.writeHead(200, headers);
      stream.pipe(res);
    }
    function _failed(err) {
      console.log('IMAGE RESIZE FAILED...', err);
      //next(); // cancel middleware
      res.send(fi);
    }
  }


  private getInfoByUrl(url: string) {
    const { name, ext, dir, base: fileName } = path.parse(url);
    const
      container = dir.split('/').pop(),
      nameParts = name.split('-'),
      sizeName = nameParts.pop(),
      validSizeName = this.getValidSizeName(sizeName),
      originalName = (sizeName === validSizeName) ? nameParts.join('-') : name,
      originalFileName = originalName + ext,
      size = this.getSizeOptions(validSizeName),
      imageType = (this.options.imageTypes || {})[ext.toLowerCase()],
      validImageType = !!imageType
      ;
    return <FileInfo>{
      container,
      fileName,
      name,
      ext,
      originalName,
      originalFileName,
      sizeName,
      validSizeName,
      size,
      imageType,
      validImageType,
    }
  }

  private getValidSizeName(sizeName: string) {
    return this.options.sizes[sizeName] ? sizeName : this.options.defaultSizeName;
  }
  private getSizeOptions(sizeName: string): Size {
    const sizeOpts = this.options.sizes[sizeName];
    if (!sizeOpts) return;

    const sizeByName = this.getSizeByName(sizeName);
    sizeOpts.width = sizeOpts.width || sizeByName.width;
    sizeOpts.height = sizeOpts.height || sizeByName.height;

    return sizeOpts;

  }

  // parse e.g. "250x360" to { width: 250, height: 360 }
  private getSizeByName(s) {
    const [width, height] = (s + 'x').split('x');
    return <Size>{
      width: parseInt(width) || 0,
      height: parseInt(height) || 0,
    }
  }

  private getReadStream(srcOrDest: SourceOptions, container: string, fileName: string) {
    return new Promise<any>((resolve, reject) => {

      const modelName = (srcOrDest || {}).storageModel;
      const storageModel = this.app.models[modelName];

      // check if exists
      storageModel.getFile(container, fileName, (err) => {
        if (err) return reject(err); // doesn't exist

        // exists
        const stream = storageModel.downloadStream(container, fileName);
        return resolve(stream);
      })
    });
  }

  private getWriteStream(srcOrDest: SourceOptions, container: string, fileName: string) {
    return new Promise<any>((resolve, reject) => {

      const modelName = (srcOrDest || {}).storageModel;
      const storageModel = this.app.models[modelName];

      // create container (and ignore error if already created)
      storageModel.createContainer({ name: container }, () => {
        const stream = storageModel.uploadStream(container, fileName);
        return resolve(stream);
      });
    });
  }

  private resizeAndCache(fi: FileInfo) {
    return new Promise((resolve, reject) => {

      const opts = this.options;

      // 1. check if original file exists in options.src
      this.getReadStream(opts.src, fi.container, fi.originalFileName)
        .catch(reject)
        .then(srcStream => {

          // 2. get/create destination stream
          this.getWriteStream(opts.dest, fi.container, fi.fileName)
            .catch(reject)
            .then(destStream => {

              // 3. config resizing by sharp lib
              const resizeImage = sharp()
                .limitInputPixels(false)
                .rotate()
                .resize(fi.size.width, fi.size.height)
                ;

              // 4. write source to destination
              srcStream
                .pipe(resizeImage)
                .pipe(destStream);

              // track error and success
              destStream.on('error', reject);
              destStream.on('success', resolve);
            });

        })
    });
  }


} // class ImageResizer


export default function (options: any) {
  const mergedOptions: ImageResizeOptions = {
    ...defaultOptions,
    ...options
  };
  const ir = new ImageResizer(mergedOptions);

  return function (req, res, next) {
    return ir.routeHandler(req, res, next);
  }
}



/************************************
 * HELPER CLASSES
 */

export class ImageResizeOptions {
  defaultSizeName?: string;
  sizes?: { [sizeName: string]: Size };
  imageTypes?: { [ext: string]: string };
  src?: SourceOptions;
  dest?: SourceOptions;
}

export class SourceOptions {
  storageModel?: string;
}

export class Size {
  width?: number;
  height?: number;
}

export class FileInfo {
  container?: string;
  fileName?: string;
  name?: string;
  ext?: string;
  originalName?: string;
  originalFileName?: string;
  sizeName?: string;
  validSizeName?: string;
  size?: Size;
  imageType?: string;
  validImageType?: boolean;
}
