# CSS Houdini Deep Sea

A CSS Houdini Paintlet to render configurable 2D loop around a circle.

![Depth Spiral Paintlet Render](https://css-houdini-dojo.georgi-nikolov.com/images/loop-paintlet-export.png)

Demo Page - [http://css-houdini-dojo.georgi-nikolov.com](http://css-houdini-dojo.georgi-nikolov.com/)

## 1. Load the Worklet

Using CDN is the easiest way to add this Worklet:

```
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('https://unpkg.com/@houdini-css-paint/loop/index.js');
}
```

## 2. Polyfill

To add support for all modern browsers, you can load the worklet with [css-paint-polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) fallback.

```
<script>
  ;(async function() {
    if (CSS['paintWorklet'] === undefined)
      await import('https://unpkg.com/css-paint-polyfill')

    CSS.paintWorklet.addModule('https://unpkg.com/@houdini-css-paint/loop/index.js')
  })()
</script>
```

## 3. Using the Paintlet

To use this Paintlet after you have succesffuly loaded it, you need to add `background(-image): paint(loop)` to any HTML element on your page. You can control its appearance just like any other regular image referenced in CSS with properties such as `background-size`, `background-repeat`, `background-position` and so on.

```
.my-element {
  --loop-number-sides: 6;
  --loop-rotation: 0deg;
  --loop-size: 100%;
  --loop-stroke-color: #444444;
  --loop-stroke-width: 1;

  background-image: paint(loop);
}
```

| Property            | Description                         | Default Value |
| ------------------- | ----------------------------------- | ------------- |
| --loop-number-sides | The number of generated sides       | 6             |
| --loop-rotation     | Rotation expressed as deg / radians | 0deg          |
| --loop-size         | Size expressed as percentage        | 100%          |
| --loop-stroke-color | The stroke color                    | #eee          |
| --loop-stroke-width | The stroke width                    | 1             |

# License

MIT License
