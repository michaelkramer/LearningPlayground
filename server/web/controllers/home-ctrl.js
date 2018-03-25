// @flow
import _ from 'lodash';
import {wrap as w} from 'server/lib/wrap'; // Middleware that requires that route returns a Promise, it will catch any uncaught errors and throw a 500 error if

import type {Req, Res} from 'flow/types';

export function routes(server: Object) {
  server.app.get('/', w(homeHandler));
}

async function homeHandler(req: Req, res: Res) {
  return res.render('pages/home.pug', {_});
}
