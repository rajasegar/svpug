'use strict';

const fs = require('fs');
const util = require('util');
const { parse, stringify } = require('svgson');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


function createSvgTag(props) {

  const pugProps = Object.keys(props).map(k => {
    return `${k}="${props[k]}"`;
  });
  return `svg(${pugProps.join(' ')})&attributes(attributes)`;
}

module.exports = function(inputDir, outputDir) {
  let inputs = fs.readdirSync(inputDir);
  inputs = inputs
    .filter(input => input.endsWith('.svg'))
    .forEach(input => {
      const fileName = input.replace('.svg','');
      readFile(`${inputDir}/${input}`,'utf-8')
        .then(fileContent => {

          parse(fileContent).then(json => {
            //console.log(json);
            const children = stringify(json.children);
            //console.log(str);
            const svg = createSvgTag(json.attributes);
            const mixin = `mixin svg-${fileName}()\n  ${svg}\n    ${children}
          `;


            writeFile(`${outputDir}/${fileName}.pug`, mixin)
              .then(() => console.log(`File ${outputDir}/${fileName}.pug generated successfully.`))
              .catch(err => console.log('File write error: ', err));

          });



        })
        .catch(err => console.log('File read error: ', err));
    });
}
