import 'css-paint-polyfill'

import DEMOS_DESCRIPTIONS from '../demos-descriptions.json'
import './index.css'

document.addEventListener('DOMContentLoaded', init)

function init() {
  DEMOS_DESCRIPTIONS.forEach(({ id }) => {
    CSS.paintWorklet.addModule(`dist/paint-worklets/${id}/index.js`)
  })

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

  if ('registerProperty' in CSS) {
    for (let i = 0; i < DEMOS_DESCRIPTIONS.length; i++) {
      const description = DEMOS_DESCRIPTIONS[i]
      for (const [key, value] of Object.entries(description.cssVariables)) {
        const { syntax, inherits, initialValue, darkModeInitialValue } = value
        let realInitial = initialValue
        if (isDarkMode && darkModeInitialValue) {
          realInitial = darkModeInitialValue
        }
        CSS.registerProperty({
          name: key,
          syntax,
          inherits,
          initialValue: realInitial,
        })
      }
    }
  }

  const $demoWrapper = document.getElementsByClassName('demo-wrapper')[0]
  for (let i = 0; i < DEMOS_DESCRIPTIONS.length; i++) {
    const description = DEMOS_DESCRIPTIONS[i]

    const $demoElWrapper = document.createElement('article')
    $demoElWrapper.classList.add('demo-el-wrapper')
    $demoWrapper.appendChild($demoElWrapper)

    const $demoTitleWrapper = document.createElement('div')
    $demoTitleWrapper.classList.add('demo-title-wrapper')

    const $demoTitle = document.createElement('h2')
    $demoTitle.innerText = description.title
    $demoTitle.classList.add('demo-title')
    $demoTitleWrapper.appendChild($demoTitle)

    const $linksWrapper = document.createElement('div')

    const $npmLink = document.createElement('a')
    $npmLink.classList.add('code-link')
    $npmLink.setAttribute('href', `https://www.npmjs.com/package/@houdini-css-paint/${description.id}`)
    $npmLink.setAttribute('target', '_blank')
    $npmLink.innerText = 'npm link'
    $linksWrapper.appendChild($npmLink)

    const $unpckgLink = document.createElement('a')
    $unpckgLink.classList.add('code-link')
    $unpckgLink.setAttribute('href', `https://unpkg.com/@houdini-css-paint/${description.id}/index.js`)
    $unpckgLink.setAttribute('target', '_blank')
    $unpckgLink.innerText = 'unpckg link'
    $linksWrapper.appendChild($unpckgLink)

    $demoTitleWrapper.appendChild($linksWrapper)
    $demoElWrapper.appendChild($demoTitleWrapper)

    const $demoEl = document.createElement('div')
    $demoEl.classList.add('demo')
    $demoElWrapper.appendChild($demoEl)

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
      const { syntax } = value
      const id = key.substring(2)

      const $wrapperEl = document.createElement('div')
      $wrapperEl.classList.add('control-wrapper')

      const $label = document.createElement('label')
      $label.setAttribute('for', key)
      $label.innerHTML = key

      const $output = document.createElement('div')
      $output.classList.add('output')
      $output.innerText = value.initialValue

      const $input = document.createElement('input')
      if (syntax === '<number>' || syntax === '<angle>' || syntax === '<percentage>') {
        const minValue = value.minValue || 1
        const maxValue = value.maxValue || 100
        const step = value.step || 1

        $input.setAttribute('type', 'range')
        $input.setAttribute('min', minValue)
        $input.setAttribute('max', maxValue)
        $input.setAttribute('step', step)
      } else if (syntax === '<color>') {
        $input.setAttribute('type', 'color')
      }
      $demoPreview.style.setProperty(key, value.initialValue)
      $input.setAttribute('id', id)
      $input.setAttribute('name', id)
      const initialValue = syntax === '<angle>' ? parseInt(value.initialValue) : value.initialValue

      $input.setAttribute('value', initialValue)

      function onInput() {
        let value = this.value
        if (syntax === '<angle>') {
          value = `${value}deg`
        } else if (syntax === '<percentage>') {
          value = `${value}%`
        }
        $demoPreview.style.setProperty(key, value)
        $output.innerText = value
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
  }
}
