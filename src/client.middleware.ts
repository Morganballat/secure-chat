import { Injectable, NestMiddleware } from '@nestjs/common';
import * as path from 'path';
import * as cors from 'cors';

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

const resolvePath = (file: string) => path.resolve(`website/${file}`);

@Injectable()
export class ClientMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { url } = req;
    if (url.startsWith('/api')) {
      next();
    } else if (allowedExt.filter((ext) => url.indexOf(ext) > 0).length > 0) {
      res.sendFile(resolvePath(url));
    } else {
      res.sendFile(resolvePath('index.html'));
    }
  }
}
