# svpug

![Build and Deploy](https://github.com/rajasegar/svpug/workflows/Node%20CI/badge.svg)
[![Version](https://img.shields.io/npm/v/svpug.svg)](https://npmjs.org/package/svpug)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


Generate [Pug](https://pugjs.org) mixins from SVG files inspired by [svgr](https://react-svgr.com).


```
npx svpug -i src/svgs -o views/icons
```

## Install 
```
npm install -g svpug
```

## Usage
```
svpug -i src/svgs -o views/icons
```

This will convert all the SVG files in the folder `src/svgs` to Pug mixins in the folder `views/icons`. 

The beauty of this conversion is that, it uses `&attributes` syntax in the mixins to explode the attributes passed via the mixin, so that you can override any property for the `svg` root tag.  See [Conversion](#conversion) section for more details.

Then you can use your mixins like this:
```pug
include icons/discord.pug
include icons/twitter.pug
doctype html
html
  head
    title svpug - Demo app
  body
    h1 Hello world
    p
      +svg-discord(fill="blue", width="32", height="32")
    p
      +svg-twitter(fill="steelblue", width="32", height="32")
```

You can also add to your development workflow by installing `svpug` as a dev dependency.

```
npm install svpug --save-dev
```

or using `yarn`
```
yarn add svpug --dev
```

and add it your `package.json` as a script like below
```json
{
"svpug": "svpug -i src/svgs -o views/icons"
}
```

And use the script to generate Pug mixins
```
npm run svpug
```
or with yarn 
```
yarn svpug
```


## Conversion

Your SVG files will be converted like this:

### From: discord.svg

```html
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
  <path>
  ...
  </path>
</svg>
```

### To: discord.pug
```pug
mixin svg-discord()
  svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16")&attributes(attributes)
    <path>
    ...
    </path>
```

## Options and Commands
If you want to convert a single SVG file you can use this variation:
```
svpug [input-file] [output-file]
svpug demo/svgs/twitter.svg views/icons/twitter.pug
```

If you don't want to overwrite existing files, you can use the `--ignore-existing` option,
```
svpug -i demo/svgs -o views/icons --ignore-existing
```

Help
```
svpug [args]

Options:
      --version          Show version number                           [boolean]
      --help             Show help                                     [boolean]
  -i, --input-dir        The input directory containing SVG files       [string]
  -o, --output-dir       The output directory containing SVG files
                                               [string] [default: "views/svpug"]
  -x, --ignore-existing  Ignore existing files in the output directory
                                                      [boolean] [default: false]
```
