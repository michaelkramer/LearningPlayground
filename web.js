// @flow

export function startWebServer() {
  // this function exists standalone is case there are Web server startup scripts
  if (process.env.NODE_ENV === 'development') {
    require('./dev-ops/compile-scss').recompileCSS(); // eslint-disable-line
  }

  require('./server/web/router'); // eslint-disable-line
}
