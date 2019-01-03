

/**
 * Substitute for File from SDK due to
 * non-public models doesn't get generated
 */
export class File {
  id: number;
  name: string;
  originalName: string;
  type: string;
  size: number;
  storageModel: string;
  containerName: string;
  applicationType: string;
  param1: string;
  param2: string;
  param3: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: any) {
    Object.assign(this, data);
  }

  /**
   * Generate available urls for file
   * @param file
   */
  static getUrls(file: File): { [name: string]: string } {
    file = file || <File>{};
    switch ((file.type || '').toLowerCase()) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif': {
        if (file.storageModel.toUpperCase() !== 'FILESTORAGE') return {};
        const nameParts = file.name.split('.');
        const ext = nameParts.pop();
        const name = nameParts.join('.');
        const urls = {};
        ['small', 'medium', 'large'].forEach(size =>
          urls[size] = `/content/images/${file.containerName}/${name}-${size}.${ext}`
        );
        return urls;
      }
    }
    return {};
  }

  /**
   * Get specific url by its name
   * @param file
   * @param name
   */
  static getUrl(file: File, name: string) {
    return File.getUrls(file)[name];
  }
}
