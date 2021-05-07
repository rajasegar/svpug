# svpug

Generate [Pug](https://pugjs.org) mixins from SVG files inspired by [svgr](https://react-svgr.com).


```
npx svpug generate --input src/svgs --output views/icons
```

## Install 
```
npm install -g svpug
```

## Usage
```
svpug generate --input src/svgs --output views/icons
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

You can also add to your development workflow by installing svpug as a dev dependency.

```
npm install --save-dev svpug
```

or using `yarn`
```
yarn add svpug --dev
```

and add it your package.json as a script like below
```json
{
"svpug": "svpug generate --input src/svgs --output views/icons"
}
```

## Conversion
Your SVG files will be converted like this:

```html
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
  <path>
  ...
  </path>
</svg>
```

```pug
mixin svg-discord()
  svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16")&attributes(attributes)
    <path>
    ...
    </path>
```
