# Houdini CSS Paint Dojo

> The CSS Painting API — part of the [CSS Houdini](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API) umbrella of APIs — allows developers to write JavaScript functions that can draw directly into an element's background, border, or content. - [MDN](https://developer.mozilla.org/en-US/docs/Web/Houdini)

I wrote some demos utilising the new CSS Paint API. I ported some of my [old canvas demos](https://codesketch.nikoloffgeorgi.vercel.app/) to use the new API.

Project link - [http://css-houdini-dojo.georgi-nikolov.com](http://css-houdini-dojo.georgi-nikolov.com/)

### NPM Packages

### [Deep Sea](https://github.com/gnikoloff/houdini-dojo/tree/master/app/paint-worklets/deep-sea)
[![NPM version][deep-sea-npm-image]][deep-sea-npm-url] 

[deep-sea-npm-image]: https://img.shields.io/npm/v/@houdini-css-paint/deep-sea
[deep-sea-npm-url]: https://www.npmjs.com/package/@houdini-css-paint/deep-sea
### [Depth Spiral](https://github.com/gnikoloff/houdini-dojo/tree/master/app/paint-worklets/depth-spiral)
[![NPM version][depth-spiral-npm-image]][depth-spiral-npm-url] 

[depth-spiral-npm-image]: https://img.shields.io/npm/v/@houdini-css-paint/depth-spiral
[depth-spiral-npm-url]: https://www.npmjs.com/package/@houdini-css-paint/depth-spiral
### [Loop](https://github.com/gnikoloff/houdini-dojo/tree/master/app/paint-worklets/loop)
[![NPM version][loop-npm-image]][loop-npm-url] 

[loop-npm-image]: https://img.shields.io/npm/v/@houdini-css-paint/loop
[loop-npm-url]: https://www.npmjs.com/package/@houdini-css-paint/loop
### [Quadratic Curve](https://github.com/gnikoloff/houdini-dojo/tree/master/app/paint-worklets/quadratic-curve)
[![NPM version][quadratic-curve-npm-image]][quadratic-curve-npm-url] 

[quadratic-curve-npm-image]: https://img.shields.io/npm/v/@houdini-css-paint/quadratic-curve
[quadratic-curve-npm-url]: https://www.npmjs.com/package/@houdini-css-paint/quadratic-curve


![CSS Paint Dojo export](https://css-houdini-dojo.georgi-nikolov.com/images/houdini-dojo-export.png)

## 1. Load the Worklet

Using CDN is the easiest way to add any of the Worklets. Just click on the "UNPCKG Link" on any of the demos from the project link, copy the address and load it like this:

```
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('https://unpkg.com/@houdini-css-paint/quadratic-curve/index.js');
}
```

## 2. Polyfill

To add support for all moder browsers, you can load the worklet with [css-paint-polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) fallback.

```
<script>
  ;(async function() {
    if (CSS['paintWorklet'] === undefined)
      await import('https://unpkg.com/css-paint-polyfill')

    CSS.paintWorklet.addModule('https://unpkg.com/@houdini-css-paint/quadratic-curve/index.js')
  })()
</script>
```

## 3. Using the Worklet

To use any of the worklets after you have loaded them, you need to add `paint(<worklet-name>)` as a CSS `background-image` property to any valid HTML element on your page. You can control their appearance just like any other regular image referenced in CSS with properties such as `background-size`, `background-repeat`, `background-position` and so on.

Each Worklet comes with predefined values (please refer to the project link). You have the power to overwrite any of them using CSS custom properties (variables).
