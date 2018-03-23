// @flow

import {wrap as w} from 'server/lib/wrap'; // Middleware that requires that route returns a Promise, it will catch any uncaught errors and throw a 500 error if

import type {Req, Res, Site} from 'flow/types';

export function routes(server: Object) {
  server.app.get('/', w(homeHandler));
}

async function homeHandler(req: Req, res: Res) {
  return res.send('something good');
}
