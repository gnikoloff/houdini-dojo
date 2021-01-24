/* global registerPaint */

import { checkInputVariable } from '../../helpers'

const WORKLET_NAME = 'deep-sea'

registerPaint(
  WORKLET_NAME,
  class {
    static get inputProperties() {
      return [
        `--${WORKLET_NAME}-bubbles-count`,
        `--${WORKLET_NAME}-grass-count`,
        `--${WORKLET_NAME}-background-color`,
        `--${WORKLET_NAME}-grass-color`,
        `--${WORKLET_NAME}-grass-height`,
      ]
    }

    paint(ctx, paintSize, props) {
      const bubblesCount = checkInputVariable(props, `--${WORKLET_NAME}-bubbles-count`, 100, 'number')
      const grassCount = checkInputVariable(props, `--${WORKLET_NAME}-grass-count`, 100, 'number')
      const backgroundColor = checkInputVariable(props, `--${WORKLET_NAME}-background-color`, 'rgb(106, 176, 76)', 'color')
      const grassColor = checkInputVariable(props, `--${WORKLET_NAME}-grass-color`, '#639c5b', 'color')
      const grassHeight = checkInputVariable(props, `--${WORKLET_NAME}-grass-height`, 60, 'percentage')

      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, paintSize.width, paintSize.height)

      const paddingBottom = 0
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      for (let i = 0; i < bubblesCount; i++) {
        const radius = 2 + Math.random() * 6
        const randX = Math.random() * paintSize.width
        const randY = Math.random() * (paintSize.height * 0.9)
        ctx.save()
        ctx.beginPath()
        ctx.arc(randX, randY, radius, 0, Math.PI * 2, false)
        ctx.closePath()
        ctx.clip()
        ctx.stroke()

        const offsetX = Math.random() > 0.5 ? -radius / 2 : radius / 2
        const offsetY = Math.random() > 0.5 ? -radius / 2 : radius / 2
        const x = randX + offsetX
        const y = randY + offsetY
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.05 + Math.random() * 0.2})`)
        gradient.addColorStop(1, `transparent`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2, false)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      const gradient = ctx.createLinearGradient(0, paintSize.height, 0, 0)
      gradient.addColorStop(0, backgroundColor)
      gradient.addColorStop(1, 'transparent')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, paintSize.width, paintSize.height)

      const grassHeightPercentage = grassHeight / 100
      for (let i = 0; i < grassCount; i++) {
        const maxHeight = paintSize.height * (grassHeightPercentage + Math.random() * 0.25)
        const maxOffsetX = (Math.random() * 2 - 1) * 12
        const x = Math.random() * paintSize.width
        const lineSegments = Math.round(4 + Math.random() * 5)
        const yStep = maxHeight / lineSegments
        const xOffsetStep = maxOffsetX / lineSegments
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x, paintSize.height - paddingBottom)
        let offsetXFactor = 0
        ctx.lineWidth = Math.random() * 2
        ctx.strokeStyle = grassColor
        for (let n = 1; n < lineSegments; n++) {
          ctx.lineTo(x + offsetXFactor, paintSize.height - paddingBottom - n * yStep)
          offsetXFactor += n * xOffsetStep
        }
        ctx.stroke()
        ctx.restore()
      }
    }
  }
)
