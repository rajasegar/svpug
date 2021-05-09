'use strict';

const fs = require('fs');
const util = require('util');
const { parse, stringify } = require('svgson');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Create svg tag in pug syntax
function createSvgTag(props) {
  const pugProps = Object.keys(props).map(k => {
    return `${k}="${props[k]}"`;
  });
  return `svg(${pugProps.join(' ')})&attributes(attributes)`;
}

function transformDir(options) {
  const { inputDir, outputDir, ignoreExisting } = options;
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

            // Create directory if it doesn't exist
            if(!fs.existsSync(outputDir)) {
              fs.mkdirSync(outputDir, { recursive: true });
            }
            const outFileName = `${outputDir}/${fileName}.pug`;

            // Ignore existing files
            if(!(ignoreExisting && fs.existsSync(outFileName))) {
              writeFile(outFileName, mixin)
                .then(() => console.log(`File ${outputDir}/${fileName}.pug generated successfully.`))
                .catch(err => console.log('File write error: ', err));
            }
          });
        })
        .catch(err => console.log('File read error: ', err));
    });
}

function transformFile(options) {
  const { input, output } = options;
  const fileName = input.replace('.svg','');
  const outFileName = output || `${fileName}.pug`;
  readFile(input,'utf-8')
    .then(fileContent => {
      parse(fileContent).then(json => {
        const children = stringify(json.children);
        const svg = createSvgTag(json.attributes);
        const mixin = `mixin svg-${fileName}()\n  ${svg}\n    ${children}
          `;
        writeFile(outFileName, mixin)
          .then(() => console.log(`File ${outFileName} generated successfully.`))
          .catch(err => console.log('File write error: ', err));
      });
    })
    .catch(err => console.log('File read error: ', err));
}

module.exports = {
  transformDir,
  transformFile
}
