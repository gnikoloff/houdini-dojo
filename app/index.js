import DEMOS_DESCRIPTIONS from '../demos-descriptions.json'
import './index.css'
;(async () => {
  if (CSS.paintWorklet === undefined) {
    await import('https://unpkg.com/css-paint-polyfill')
  }
})()

DEMOS_DESCRIPTIONS.forEach(({ id }) => {
  CSS.paintWorklet.addModule(`dist/paint-worklets/${id}.js`)
})

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
  const $demoWrapper = document.getElementsByClassName('demo-wrapper')[0]
  for (let i = 0; i < DEMOS_DESCRIPTIONS.length; i++) {
    const description = DEMOS_DESCRIPTIONS[i]

    const $demoEl = document.createElement('div')
    $demoEl.classList.add('demo')
    $demoWrapper.appendChild($demoEl)

    const $demoTitle = document.createElement('h2')
    $demoTitle.innerText = description.title
    $demoTitle.classList.add('demo-title')
    $demoEl.appendChild($demoTitle)

    const $demoPreviewWrapper = document.createElement('div')
    $demoPreviewWrapper.classList.add('demo-preview-wrapper')

    const $demoPreview = document.createElement('div')
    $demoPreview.dataset.name = description.title
    $demoPreview.classList.add('demo-preview')
    $demoPreviewWrapper.appendChild($demoPreview)

    const $demoControls = document.createElement('div')
    $demoControls.classList.add('demo-controls')

    const $form = document.createElement('form')
    $form.setAttribute('action', '')
    $form.classList.add('demo-control-wrapper')
    $demoControls.appendChild($form)

    $demoEl.appendChild($demoPreviewWrapper)

    $demoEl.appendChild($demoControls)

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
        const maxValue = value.maxValue || 100

        $input.setAttribute('type', 'range')
        $input.setAttribute('min', minValue)
        $input.setAttribute('max', maxValue)
      } else if (value.syntax === '<color>') {
        $input.setAttribute('type', 'color')
      }
      $demoPreview.style.setProperty(key, value.initialValue)
      $input.setAttribute('id', id)
      $input.setAttribute('name', id)
      $input.setAttribute('value', value.initialValue)

      function onInput() {
        $demoPreview.style.setProperty(key, this.value)
        $output.innerText = this.value
      }
      $input.addEventListener('change', onInput)
      $input.addEventListener('input', onInput)

      $wrapperEl.appendChild($label)
      const $inputWrapper = document.createElement('div')
      $inputWrapper.classList.add('input-wrapper')
      $inputWrapper.appendChild($input)
      $inputWrapper.appendChild($output)
      $wrapperEl.appendChild($inputWrapper)
      $demoControls.appendChild($wrapperEl)
    }

    $demoPreview.style.setProperty('background-image', `paint(${description.id})`)
  }
}
