import DEMOS_DESCRIPTIONS from './demos-descriptions.json'
import './index.css'
console.log(DEMOS_DESCRIPTIONS)
;(async () => {
  if (CSS.paintWorklet === undefined) {
    await import('https://unpkg.com/css-paint-polyfill')
  }
  CSS.paintWorklet.addModule('dist/paint-worklets/quadratic-curve.js')
  CSS.paintWorklet.addModule('dist/paint-worklets/spiral.js')
})()

if ('registerProperty' in CSS) {
  for (let i = 0; i < DEMOS_DESCRIPTIONS.length; i++) {
    const description = DEMOS_DESCRIPTIONS[i]
    for (const [key, value] of Object.entries(description.cssVariables)) {
      CSS.registerProperty({
        name: key,
        ...value,
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', init)

function init() {
  for (let i = 0; i < DEMOS_DESCRIPTIONS.length; i++) {
    const description = DEMOS_DESCRIPTIONS[i]

    const $demoEl = document.querySelector(`[data-name="${description.title}"]`)
    const $demoPreviewEl = $demoEl.getElementsByClassName('demo-preview')[0]
    const $controlsWrapperEl = $demoEl.getElementsByClassName('demo-control-wrapper')[0]

    for (const [key, value] of Object.entries(description.cssVariables)) {
      const id = key.substring(2)

      const $wrapperEl = document.createElement('div')
      $wrapperEl.classList.add('control-wrapper')

      const $label = document.createElement('label')
      $label.setAttribute('for', key)
      $label.innerHTML = key

      const $output = document.createElement('div')
      $output.innerText = value.initialValue

      const $input = document.createElement('input')
      if (value.syntax === '<number>') {
        const minValue = value.minValue || 1
        const maxValue = value.maxValue || 50

        $input.setAttribute('type', 'range')
        $input.setAttribute('min', minValue)
        $input.setAttribute('max', maxValue)
      } else if (value.syntax === '<color>') {
        $input.setAttribute('type', 'color')
      }
      $input.setAttribute('id', id)
      $input.setAttribute('name', id)
      $input.setAttribute('value', value.initialValue)
      $input.addEventListener('change', function () {
        $demoPreviewEl.style.setProperty(key, this.value)
        $output.innerText = this.value
      })

      $wrapperEl.appendChild($label)
      const $inputWrapper = document.createElement('div')
      $inputWrapper.classList.add('input-wrapper')
      $inputWrapper.appendChild($input)
      $inputWrapper.appendChild($output)
      $wrapperEl.appendChild($inputWrapper)
      $controlsWrapperEl.appendChild($wrapperEl)
    }
  }
}
