# Houdini CSS Paint Dojo

> The CSS Painting API — part of the [CSS Houdini](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API) umbrella of APIs — allows developers to write JavaScript functions that can draw directly into an element's background, border, or content. - [MDN](https://developer.mozilla.org/en-US/docs/Web/Houdini)

I wrote some demos utilising the new CSS Paint API. I ported some of my [old canvas demos](https://codesketch.nikoloffgeorgi.vercel.app/) to use the new API.

Project link - [http://css-houdini-dojo.georgi-nikolov.com](http://css-houdini-dojo.georgi-nikolov.com/)

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

To use any of the worklets after you have loaded them, you need to add `paint(<worklet-name>)` as a CSS `background-image` property to any valid HTML element on your page. You can reference which CSS custom properties each Worklet supports in the project page, so you can change and customise them to your liking.

##### All CSS Properties have fallbacks in case you don't provide any, so you can just plug and play the demos on any HTML element.
