#!/usr/bin/env node 

'use strict';

const svpug = require('../');

require('yargs')
  .scriptName("svpug")
  .usage('$0 <cmd> [args]')
  .command('generate [--input] [--output]', 'Generate Pug mixins from SVG files!', (yargs) => {
    yargs.option('input', {
      type: 'string',
      describe: 'The input directory containing SVG files'
    })
  }, function (argv) {
    console.log('Generating Pug mixins from ', argv.input, ' ...')
    svpug(argv.input, argv.output);
  })
  .help()
  .argv
