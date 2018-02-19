'use strict';

module.exports = {
  // Where you want to put the sql files
  directory: './migrations',

  stopOnWarning: true,

  plugins: ['sql', 'js'],

  // see list of available options at http://knexjs.org
  sql: {},

  backend: 'sql',
};