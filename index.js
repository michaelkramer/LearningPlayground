#!/usr/bin/env node
/* @flow */
/* eslint-disable strict */

'use strict';

require('babel-register');
const packageJson = require('./package.json');
const program = require('commander');


const startWebServer = require('./web').startWebServer;

process.env.VERSION = process.env.NODE_ENV === 'production' ? packageJson.version : String(Date.now());

// startWebServer();
program
  .command('web')
  .description('start a web server')
  .action(startWebServer);

program
  .version('0.1.0')
  .command('pizza')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(1);
} else {
  // console.log('you ordered a pizza with:');
  // if (program.peppers) console.log('  - peppers');
  // if (program.pineapple) console.log('  - pineapple');
  // if (program.bbqSauce) console.log('  - bbq');
  // console.log('  - %s cheese', program.cheese);
}
