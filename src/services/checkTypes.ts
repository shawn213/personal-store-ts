import { Request } from 'express';

function isAjax(req: Request): boolean {
  return req.headers.accept.search('json') > -1;
}

export { isAjax };
