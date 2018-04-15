// @flow
declare var process: {
  // Note: this file tells Flowtype what env vars we expect to be populated
  env: {
    APP_NAME: string,
    DATABASE_URL: string,
    
    KNEX_DEBUG: ?string,
    NODE_ENV: string,
    NODE_PATH: string,
    
    WORKER_DEBUG: string,
    PORT: string,
    SESSION_SECRET: string,
    VERSION: string,
  },
  hrtime: Function,
  argv: Array<string>,
  cwd: Function,
  on: Function,
  exit: Function,
};
