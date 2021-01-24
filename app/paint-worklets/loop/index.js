/* global registerPaint */

import { checkInputVariable } from '../../helpers'

const WORKLET_NAME = 'loop'

registerPaint(
  WORKLET_NAME,
  class {
    static get inputProperties() {
      return [
        `--${WORKLET_NAME}-number-sides`,
        `--${WORKLET_NAME}-rotation`,
        `--${WORKLET_NAME}-size`,
        `--${WORKLET_NAME}-stroke-color`,
        `--${WORKLET_NAME}-stroke-width`,
      ]
    }

    paint(ctx, paintSize, props) {
      const sidesCount = checkInputVariable(props, `--${WORKLET_NAME}-number-sides`, 6, 'number')
      const rotation = checkInputVariable(props, `--${WORKLET_NAME}-rotation`, 0, 'deg')
      const sizeScale = checkInputVariable(props, `--${WORKLET_NAME}-size`, 100, 'percentage')
      const strokeColor = checkInputVariable(props, `--${WORKLET_NAME}-stroke-color`, '#eee', 'color')
      const lineWidth = checkInputVariable(props, `--${WORKLET_NAME}-stroke-width`, 1, 'number')

      const radius = (Math.min(paintSize.width, paintSize.height) - lineWidth) * 0.5 * (sizeScale / 100)

      const angle = (Math.PI * 2) / sidesCount
      ctx.translate(paintSize.width / 2, paintSize.height / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.moveTo(0, radius)
      ctx.lineWidth = lineWidth
      ctx.lineJoin = 'round'
      ctx.strokeStyle = strokeColor
      for (let i = 0; i < sidesCount; i++) {
        const x = Math.sin(i * angle) * radius
        const y = Math.cos(i * angle) * radius
        for (let n = i; n < sidesCount; n++) {
          const x2 = Math.sin(n * angle) * radius
          const y2 = Math.cos(n * angle) * radius

          ctx.lineTo(x, y)
          ctx.lineTo(x2, y2)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }
  }
)
