/* global registerPaint */

import { checkInputVariable } from '../helpers'

const WORKLET_NAME = 'depth-spiral'

registerPaint(
  WORKLET_NAME,
  class {
    static get inputProperties() {
      return [
        `--${WORKLET_NAME}-min-radius`,
        `--${WORKLET_NAME}-max-radius`,
        `--${WORKLET_NAME}-num-points`,
        `--${WORKLET_NAME}-angle`,
        `--${WORKLET_NAME}-color`,
        `--${WORKLET_NAME}-line-width`,
      ]
    }

    paint(ctx, paintSize, props) {
      const minRadius = checkInputVariable(props, `--${WORKLET_NAME}-min-radius`, 10, 'percentage')
      const maxRadius = checkInputVariable(props, `--${WORKLET_NAME}-max-radius`, 50, 'percentage')
      const pointsCount = checkInputVariable(props, `--${WORKLET_NAME}-num-points`, 10, 'number')
      const spiralAngle = checkInputVariable(props, `--${WORKLET_NAME}-angle`, 0, 'deg')
      const spiralColor = checkInputVariable(props, `--${WORKLET_NAME}-color`, '#333', 'color')
      const spiralLineWidth = checkInputVariable(props, `--${WORKLET_NAME}-line-width`, 1, 'number')

      const drawSize = Math.min(paintSize.width, paintSize.height)

      const step = spiralAngle / pointsCount
      const stepRadius = (drawSize * (maxRadius / 100) - minRadius) / pointsCount

      ctx.strokeStyle = spiralColor
      ctx.lineWidth = spiralLineWidth

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (let i = 0; i < pointsCount; i++) {
        ctx.globalAlpha = i / pointsCount
        const radius = minRadius + i * stepRadius
        const x = paintSize.width / 2 + Math.sin(i * step) * radius
        const y = paintSize.height / 2 + Math.cos(i * step) * radius
        if (i === 0) {
          ctx.beginPath()
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    }
  }
)
