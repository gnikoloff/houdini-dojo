# CSS Houdini Deep Sea

A CSS Houdini Paintlet to render stylised 2D sea floor.

![Deep Sea Paintlet Render](https://css-houdini-dojo.georgi-nikolov.com/images/deep-sea-paintlet-export.png)

Demo Page - [http://css-houdini-dojo.georgi-nikolov.com](http://css-houdini-dojo.georgi-nikolov.com/)

## 1. Load the Worklet

Using CDN is the easiest way to add this Worklet:

```
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('https://unpkg.com/@houdini-css-paint/deep-sea/index.js');
}
```

## 2. Polyfill

To add support for all modern browsers, you can load the worklet with [css-paint-polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) fallback.

```
<script>
  ;(async function() {
    if (CSS['paintWorklet'] === undefined)
      await import('https://unpkg.com/css-paint-polyfill')

    CSS.paintWorklet.addModule('https://unpkg.com/@houdini-css-paint/deep-sea/index.js')
  })()
</script>
```

## 3. Using the Paintlet

To use this Paintlet after you have succesffuly loaded it, you need to add `background(-image): paint(deep-sea)` to any HTML element on your page. You can control its appearance just like any other regular image referenced in CSS with properties such as `background-size`, `background-repeat`, `background-position` and so on.

```
.my-element {
  --deep-sea-bubbles-count: 36;
  --deep-sea-grass-count: 100;
  --deep-sea-background-color: #110755;
  --deep-sea-grass-color: #639c5b;
  --deep-sea-grass-height: 50%;

  background-image: paint(deep-sea);
}
```

| Property                    | Description                               | Default Value |
| --------------------------- | ----------------------------------------- | ------------- |
| --deep-sea-bubbles-count    | How many bubbles to render                | 100           |
| --deep-sea-grass-count      | How much individual grass stems to render | 100           |
| --deep-sea-background-color | Background color                          | #6ab04c       |
| --deep-sea-grass-color      | Grass color                               | #639c5b       |
| --deep-sea-grass-height     | Grass height in percentage                | 60%           |

# License

MIT License
