/* global registerPaint */

registerPaint(
  'deep-sea',
  class {
    paint(ctx, paintSize, props) {
      ctx.fillStyle = 'rgba(72, 52, 212,1.0)'
      ctx.fillRect(0, 0, paintSize.width, paintSize.height)
      const paddingBottom = 0
      const bubblesCount = 100
      ctx.fillStyle = 'white'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      for (let i = 0; i < bubblesCount; i++) {
        const radius = 2 + Math.random() * 6
        const randX = Math.random() * paintSize.width
        const randY = Math.random() * (paintSize.height * 0.9)
        ctx.beginPath()
        ctx.arc(randX, randY, radius, 0, Math.PI * 2, false)
        ctx.closePath()
        ctx.stroke()
      }
      const grassCount = 100
      for (let i = 0; i < grassCount; i++) {
        const maxHeight = paintSize.height * (0.1 + Math.random() * 0.65)
        const maxOffsetX = (Math.random() * 2 - 1) * 20
        const x = Math.random() * paintSize.width
        // const lineSegments = Math.round(4 + Math.random() * 5)
        const lineSegments = 4
        const yStep = maxHeight / lineSegments
        const xOffsetStep = maxOffsetX / lineSegments
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x, paintSize.height - paddingBottom)
        let offsetXFactor = 0
        for (let n = 1; n < lineSegments; n++) {
          ctx.strokeStyle = 'rgba(106, 176, 76, 0.5)'
          ctx.lineWidth = n * 2
          ctx.lineTo(x + offsetXFactor, paintSize.height - paddingBottom - n * yStep)
          ctx.stroke()
          offsetXFactor += n * xOffsetStep
        }
        ctx.restore()
      }
    }
  }
)
