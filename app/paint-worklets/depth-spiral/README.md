# CSS Houdini Depth Spiral

A CSS Houdini Paintlet to render configurable 2D spiral.

[![NPM version][depth-spiral-npm-image]][depth-spiral-npm-url] 

[depth-spiral-npm-image]: https://img.shields.io/npm/v/@houdini-css-paint/depth-spiral
[depth-spiral-npm-url]: https://www.npmjs.com/package/@houdini-css-paint/depth-spiral

![Depth Spiral Paintlet Render](https://css-houdini-dojo.georgi-nikolov.com/images/depth-spiral-paintlet-export.png)

Demo Page - [http://css-houdini-dojo.georgi-nikolov.com](http://css-houdini-dojo.georgi-nikolov.com/)

## 1. Load the Worklet

Using CDN is the easiest way to add this Worklet:

```
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('https://unpkg.com/@houdini-css-paint/depth-spiral/index.js');
}
```

## 2. Polyfill

To add support for all modern browsers, you can load the worklet with [css-paint-polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) fallback.

```
<script>
  ;(async function() {
    if (CSS['paintWorklet'] === undefined)
      await import('https://unpkg.com/css-paint-polyfill')

    CSS.paintWorklet.addModule('https://unpkg.com/@houdini-css-paint/depth-spiral/index.js')
  })()
</script>
```

## 3. Using the Paintlet

To use this Paintlet after you have succesffuly loaded it, you need to add `background(-image): paint(depth-spiral)` to any HTML element on your page. You can control its appearance just like any other regular image referenced in CSS with properties such as `background-size`, `background-repeat`, `background-position` and so on.

```
.my-element {
  --depth-spiral-min-radius: 10%;
  --depth-spiral-max-radius: 100%;
  --depth-spiral-num-points: 200;
  --depth-spiral-angle: 183deg;
  --depth-spiral-line-width: 1;
  --depth-spiral-color: #aaaaaa;

  background-image: paint(depth-spiral);
}
```

| Property                  | Description                                     | Default Value |
| ------------------------- | ----------------------------------------------- | ------------- |
| --depth-spiral-min-radius | Minimum radius of the spiral in percentages     | 10%           |
| --depth-spiral-max-radius | Maximum radius of the spiral in percentages     | 100%          |
| --depth-spiral-num-points | How many point to add to the spiral             | 10            |
| --depth-spiral-angle      | The spiral angle expressed in degrees / radians | 0deg          |
| --depth-spiral-color      | The color to use for stroke                     | #333          |
| --depth-spiral-line-width | The line-width to use for stroke                | 1             |

# License

MIT License
