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

function transSiteSass() {
  return sass.renderSync({
    file: 'server/web/public/css/site.scss',
  }).css;
}

function autoprefix(css /*: string */, file: string) {
  return postcss([autoprefixer])
    .process(css, {from: `server/web/public/css/${file}`, to: `server/web/public/css/to_${file}`})
    .then((postcssResult) => {
      postcssResult.warnings().forEach((warn) => {
        log(chalk.white.bold(warn.toString()));
      });

      return postcssResult.css;
    });
}

function minify(css /*: string */) {
  return css; // csso.minify(css).css;
}

function writeToFile(css /*: string */) {
  fs.writeFile('server/web/public/css/main.css', css, (err) => {
    if (err) {
      throw err;
    }

    log(chalk.green.bold('CSS updated'));
  });
}

function writeToFileSite(css /*: string */) {
  fs.writeFile('server/web/public/css/site.css', css, (err) => {
    if (err) {
      throw err;
    }

    log(chalk.green.bold('Site CSS updated'));
  });
}

exports.recompileCSS = () => {
  const transpiledSass = transpileSass();
  autoprefix(transpiledSass, 'main.css')
    .then((autoprefixedCSS) => {
      const minifiedCSS = minify(autoprefixedCSS);
      return writeToFile(minifiedCSS);
    });

  const transpiledSiteSass = transSiteSass();

  autoprefix(transpiledSiteSass, 'site.css')
    .then((autoprefixedCSS) => {
      const minifiedCSS = minify(autoprefixedCSS);
      return writeToFileSite(minifiedCSS);
    });
};

/* eslint-enable spaced-comment */
