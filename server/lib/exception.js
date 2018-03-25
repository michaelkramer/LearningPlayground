// @flow

import _ from 'lodash';
import Raven from 'raven';
import {log, chalk} from 'distraught';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

export function captureException(err: Error, extra: Object = {}): void {
  if (process.env.SENTRY_DSN) {
    Raven.captureException(err, {extra});
  } else {
    let stringified;
    try {
      stringified = JSON.stringify(extra);
    } catch (jsonStringifyErr) {} // eslint-disable-line

    let stack = err.stack;
    if (process.env.STACK_STRIP_NODE_MODULES) {
      stack = _.reduce(err.stack.split('\n'), (memo, line) => {
        if (
          line.indexOf('node_modules') === -1 &&
          line.indexOf('events.js') === -1 &&
          line.indexOf('_stream_readable.js') === -1 &&
          line.indexOf('net.js') === -1 &&
          line.indexOf('child_process.js') === -1 &&
          line.indexOf('next_tick.js') === -1 &&
          line.indexOf('timers.js') === -1 &&
          line.indexOf('module.js') === -1 &&
          line.indexOf('domain.js') === -1 &&
          line.indexOf('fs.js') === -1
        ) {
          memo.push(line);
        }
        return memo;
      }, []).join('\n');
    }

    err.stack = stack; // eslint-disable-line
    log(pe.render(err), chalk.cyan.bold('- ') + chalk.cyan.bold(stringified || extra) + chalk.cyan('\n'));
  }
}

/**
 * Assert an object has the required keys, keys can be deeply needed strings
 * Ex:
 *
 * assertKeys(
 *  {one: 1, two: 2, three: false, four: null, five: {nested: 1}},
 *  ['one', 'two', 'three', 'four', 'five.nested'],
 * )
 */
export function assertKeys(payload: Object, keys: Array<string> = []): boolean {
  const errors = [];
  _.each(keys, (key) => {
    if (_.get(payload, key) === undefined) {
      errors.push(`missing key: ${key}`);
    }
  });

  if (errors.length) {
    if (process.env.NODE_ENV === 'test') {
      return false;
    }

    captureException(new Error('Object missing required keys'), {payload, errors});
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
    return false;
  }
  return true;
}
