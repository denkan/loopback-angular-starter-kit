import * as path from 'path';

const rootPath = path.resolve(__dirname, '../../../frontend/webapp/dist');
const indexFile = path.resolve(rootPath, 'index.html');

export default function() {
  return (req, res, next) => {

    const info = path.parse(req.url);
    return info.ext ? next() : res.sendFile(indexFile);
  }
}
