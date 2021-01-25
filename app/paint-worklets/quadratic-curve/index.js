/* global registerPaint */

import { checkInputVariable } from '../../helpers'

const WORKLET_NAME = 'quadratic-curve'

registerPaint(
  WORKLET_NAME,
  class {
    static get inputProperties() {
      return [
        `--${WORKLET_NAME}-number-points`,
        `--${WORKLET_NAME}-stroke-width`,
        `--${WORKLET_NAME}-stroke-color`,
        `--${WORKLET_NAME}-helper-stroke-color`,
        `--${WORKLET_NAME}-helper-radius`,
        `--${WORKLET_NAME}-helper-background-color`,
        `--${WORKLET_NAME}-helper-accent-color`,
      ]
    }

    paint(ctx, paintSize, props) {
      const numPoints = checkInputVariable(props, `--${WORKLET_NAME}-number-points`, 3, 'number')
      const strokeWidth = checkInputVariable(props, `--${WORKLET_NAME}-stroke-width`, 3, 'number')
      const strokeColor = checkInputVariable(props, `--${WORKLET_NAME}-stroke-color`, 'orange', 'color')
      const helperStrokeColor = checkInputVariable(props, `--${WORKLET_NAME}-helper-stroke-color`, 'rgba(0, 0, 0, 0.15)', 'color')
      const helperPointRadius = checkInputVariable(props, `--${WORKLET_NAME}-helper-radius`, 5, 'number')
      const helperPointBackgroundColor = checkInputVariable(props, `--${WORKLET_NAME}-helper-background-color`, '#c0392b', 'color')
      const helperPointAccentColor = checkInputVariable(props, `--${WORKLET_NAME}-helper-accent-color`, '#f1c40f', 'color')

      const padding = paintSize.width * 0.075
      const drawWidth = paintSize.width - padding * 2
      const drawHeight = paintSize.height - helperPointRadius * 2
      const halfHeight = paintSize.height / 2
      const possibleYOffset = drawHeight / 2
      const stepX = drawWidth / numPoints

      const positions = new Array(numPoints)
        .fill(null)
        .map((_, i) => [stepX * (i + 1) + padding, halfHeight + (Math.random() * 2 - 1) * possibleYOffset])

      ctx.lineCap = 'round'

      ctx.lineWidth = strokeWidth
      ctx.strokeStyle = strokeColor
      ctx.beginPath()
      ctx.moveTo(padding, halfHeight)
      positions.forEach(([x, y], i, self) => {
        const nextx = self[i + 1] ? self[i + 1][0] : self[self.length - 1][0]
        const nexty = self[i + 1] ? self[i + 1][1] : self[self.length - 1][1]
        const ctrlpx = (x + nextx) / 2
        const ctrlpy = (y + nexty) / 2
        ctx.quadraticCurveTo(x, y, ctrlpx, ctrlpy)
      })
      ctx.stroke()

      ctx.strokeStyle = helperStrokeColor
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(padding, halfHeight)
      positions.forEach(([x, y]) => ctx.lineTo(x, y))
      ctx.stroke()

      {
        const x = padding
        const y = halfHeight
        const radius = helperPointRadius
        const backgroundColor = helperPointBackgroundColor
        const accentColor = helperPointAccentColor
        drawHelperPoint(ctx, { x, y, radius, backgroundColor, accentColor })
        positions.forEach(([x, y]) => drawHelperPoint(ctx, { x, y, radius, backgroundColor, accentColor }))
      }
    }
  }
)

function drawHelperPoint(ctx, { x, y, radius, backgroundColor, accentColor }) {
  const halfRadius = radius / 2

  ctx.save()
  ctx.translate(x, y)

  ctx.fillStyle = backgroundColor
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()

  ctx.globalAlpha = 0.75
  ctx.fillStyle = accentColor
  ctx.beginPath()
  ctx.arc(0, 0, halfRadius, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()

  ctx.globalAlpha = 1
  ctx.fillStyle = accentColor
  ctx.beginPath()
  ctx.arc(0, 0, halfRadius * 0.5, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}
