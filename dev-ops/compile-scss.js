// @flow
/* eslint-disable spaced-comment */

const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const csso = require('csso');
const sass = require('node-sass');
const fs = require('fs');

const {chalk, log} = require('distraught');

function transpileSass() {
  return sass.renderSync({
    file: 'server/web/public/css/app.scss',
  }).css;
}

function autoprefix(css /*: string */) {
  return postcss([autoprefixer])
    .process(css)
    .then((postcssResult) => {
      postcssResult.warnings().forEach((warn) => {
        log(chalk.white.bold(warn.toString()));
      });

      return postcssResult.css;
    });
}

function minify(css /*: string */) {
  return csso.minify(css).css;
}

function writeToFile(css /*: string */) {
  fs.writeFile('server/web/public/css/main.css', css, (err) => {
    if (err) {
      throw err;
    }

    log(chalk.green.bold('CSS updated'));
  });
}

exports.recompileCSS = () => {
  const transpiledSass = transpileSass();
  autoprefix(transpiledSass)
    .then((autoprefixedCSS) => {
      const minifiedCSS = minify(autoprefixedCSS);
      return writeToFile(minifiedCSS);
    });
};

/* eslint-enable spaced-comment */
