import Raven from 'raven';

import {captureException} from 'server/lib/exception';

import type {Req, Res} from 'flow/types';

/**
 * [w - wrap function used around Route Handler functions that allows unhandled promise errors to be caught]
 */
export function wrap(genFn: Function) {
  return function handler(req: any, res: any, next: Function) {
    return genFn(req, res)
      .catch((err) => {
        if (process.env.SENTRY_DSN) {
          const ravenPayload = {};
          if (req && req.user && req.user.id) {
            ravenPayload.user = req.user;
          }

          Raven.captureException(err, ravenPayload);
        } else {
          captureException(err, {params: req.params, body: req.body, query: req.query, user: req.user});
        }

        if (process.env.NODE_ENV === 'production') {
          return res.render('pages/errors/internal-server-error');
        }

        return res.status(500).send(`${err.message}<br /><br />${err.stack.split('\n').join('<br />')}`);
      });
  };
}

export function jsonWrap(genFn: (Req, Res) => Promise<*>) {
  return function handler(req: Req, res: Res, next: Function) {
    return genFn(req, res)
      .catch((err) => {
        if (process.env.SENTRY_DSN) {
          const ravenPayload = {};
          if (req && req.user && req.user.id) {
            ravenPayload.user = req.user;
          }

          Raven.captureException(err, ravenPayload);
        } else {
          captureException(err, {params: req.params, body: req.body, query: req.query});
        }

        if (err.message.indexOf('Unauthorized') !== -1) {
          return res.status(401).send({
            message: 'Unauthorized',
          });
        }

        if (err.message.indexOf('Forbidden') !== -1) {
          return res.status(403).send({
            message: 'Forbidden',
          });
        }

        if (err.message.indexOf('timeout') !== -1) {
          return res.status(504).json({
            message: 'Server taking too long to respond',
          });
        }

        return res.status(500).send({
          message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
        });
      });
  };
}
