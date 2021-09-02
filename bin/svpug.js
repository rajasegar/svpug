#!/usr/bin/env node

'use strict';

const { transformDir, transformFile } = require('../');

require('yargs')
  .scriptName('svpug')
  .usage('$0 [args]')
  .command(
    '$0 [--input] [--output]',
    'Generate Pug mixins from SVG files!',
    (yargs) => {
      yargs.option('input-dir', {
        type: 'string',
        describe: 'The input directory containing SVG files',
        alias: 'i',
      });

      yargs.option('output-dir', {
        type: 'string',
        describe: 'The output directory containing SVG files',
        alias: 'o',
        default: 'views/svpug',
      });

      yargs.option('ignore-existing', {
        type: 'boolean',
        describe: 'Ignore existing files in the output directory ',
        alias: 'x',
        default: false,
      });
    },
    function (argv) {
      //console.log(argv);

      if (argv.inputDir && argv.outputDir) {
        console.log(
          'Generating Pug mixins from folder: ',
          argv.inputDir,
          ' ...'
        );
        transformDir(argv);
      } else {
        console.log('Generating Pug mixin from file: ', argv.input, ' ...');
        transformFile(argv);
      }
    }
  )
  .help().argv;
