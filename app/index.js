import './index.css'
;(async () => {
  if (CSS.paintWorklet === undefined) {
    await import('https://unpkg.com/css-paint-polyfill')
  }
  CSS.paintWorklet.addModule('dist/paint-worklets/quadratic-curve.js')
  CSS.paintWorklet.addModule('dist/paint-worklets/spiral.js')
})()

if ('registerProperty' in CSS) {
  window.CSS.registerProperty({
    name: '--bezier-curves-number-points',
    syntax: '<number>',
    inherits: false,
    initialValue: 2,
  })
  window.CSS.registerProperty({
    name: '--bezier-curves-stroke-width',
    syntax: '<number>',
    inherits: false,
    initialValue: 3,
  })
  window.CSS.registerProperty({
    name: '--bezier-curves-stroke-color',
    syntax: '<color>',
    inherits: false,
    initialValue: 'orange',
  })
  window.CSS.registerProperty({
    name: '--bezier-curves-helper-radius',
    syntax: '<number>',
    inherits: false,
    initialValue: 5,
  })
  window.CSS.registerProperty({
    name: '--bezier-curves-helper-background-color',
    syntax: '<color>',
    inherits: false,
    initialValue: '#c0392b',
  })
  window.CSS.registerProperty({
    name: '--bezier-curves-helper-accent-color',
    syntax: '<color>',
    inherits: false,
    initialValue: '#f1c40f',
  })
}

document.addEventListener('DOMContentLoaded', init)

function init() {
  const a = document.querySelector('[name="helper-point-background-color"')
  a.addEventListener('change', (val) => {
    console.log(a.value)
  })
}
