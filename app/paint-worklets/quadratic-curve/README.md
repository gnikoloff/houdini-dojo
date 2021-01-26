# CSS Houdini Quadratic Curve
  
A CSS Houdini Paintlet to render configurable 2D quadratic curve.

[![NPM version][quadratic-curve-npm-image]][quadratic-curve-npm-url] 

[quadratic-curve-npm-image]: https://img.shields.io/npm/v/@houdini-css-paint/quadratic-curve
[quadratic-curve-npm-url]: https://www.npmjs.com/package/@houdini-css-paint/quadratic-curve

![Depth Spiral Paintlet Render](https://css-houdini-dojo.georgi-nikolov.com/images/quadratic-curve-paintlet-export.png)

Demo Page - [http://css-houdini-dojo.georgi-nikolov.com](http://css-houdini-dojo.georgi-nikolov.com/)

## 1. Load the Worklet

Using CDN is the easiest way to add this Worklet:

```
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('https://unpkg.com/@houdini-css-paint/quadratic-curve/index.js');
}
```

## 2. Polyfill

To add support for all modern browsers, you can load the worklet with [css-paint-polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) fallback.

```
<script>
  ;(async function() {
    if (CSS['paintWorklet'] === undefined)
      await import('https://unpkg.com/css-paint-polyfill')

    CSS.paintWorklet.addModule('https://unpkg.com/@houdini-css-paint/quadratic-curve/index.js')
  })()
</script>
```

## 3. Using the Paintlet

To use this Paintlet after you have succesffuly loaded it, you need to add `background(-image): paint(quadratic-curve)` to any HTML element on your page. You can control its appearance just like any other regular image referenced in CSS with properties such as `background-size`, `background-repeat`, `background-position` and so on.

```
.my-element {
  --quadratic-curve-number-points: 6;
  --quadratic-curve-stroke-width: 3;
  --quadratic-curve-stroke-color: #d35400;
  --quadratic-curve-helper-stroke-color: #999999;
  --quadratic-curve-helper-radius: 5;
  --quadratic-curve-helper-background-color: #c0392b;
  --quadratic-curve-helper-accent-color: #f1c40f;

  background-image: paint(quadratic-curve);
}
```

| Property                                  | Description                                 | Default Value       |
| ----------------------------------------- | ------------------------------------------- | ------------------- |
| --quadratic-curve-number-points           | The number of points in the curve           | 3                   |
| --quadratic-curve-stroke-width            | The stroke width for the bezier curve       | 3                   |
| --quadratic-curve-stroke-color            | The stroke color for the bezier curve       | orange              |
| --quadratic-curve-helper-stroke-color     | The stroke color for the helper line        | rgba(0, 0, 0, 0.15) |
| --quadratic-curve-helper-radius           | The radius for the helper circles           | 5                   |
| --quadratic-curve-helper-background-color | The background color for the helper circles | #c0392b             |
| --quadratic-curve-helper-accent-color     | The accent color for the helper circles     | #f1c40f             |

# License

MIT License
