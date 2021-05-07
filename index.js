'use strict';

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = function(inputDir, outputDir) {
  let inputs = fs.readdirSync(inputDir);
  inputs = inputs
    .filter(input => input.endsWith('.svg'))
    .forEach(input => {
      const fileName = input.replace('.svg','');
      readFile(`${inputDir}/${input}`,'utf-8')
        .then(fileContent => {

          const mixin = `mixin svg-${fileName}()\n
          ${fileContent}`;

          writeFile(`${outputDir}/${fileName}.pug`, mixin)
            .then(() => console.log(`File ${fileName}.pug generated successfully.`))
            .catch(err => console.log('File write error: ', err));
        })
        .catch(err => console.log('File read error: ', err));
    });
}
