import { Model } from '@mean-expert/model';
/**
 * @module ImageCache
 * @description
 * Handles on-the-fly resized images (see server/middlewares/image-cache)
 **/
@Model({
  hooks: {},
  remotes: {}
})

class ImageCache {
  constructor(public model: any) {}


}

module.exports = ImageCache;
