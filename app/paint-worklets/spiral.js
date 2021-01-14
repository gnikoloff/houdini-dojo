registerPaint('spiral', class {
  paint (ctx, paintSize, props) {
    const points = 10
    const halfWidth = paintSize.width / 2
    const halfHeight = paintSize.height / 2
    const radius = halfWidth * 0.5
    const offset = 0.01
    ctx.save()
    ctx.translate(halfWidth, halfHeight)
    let accAngle = 0
    const step = Math.PI * 2 / points
    for (let i = 0; i < points; i++) {
      ctx.beginPath()
      ctx.lineWidth = i * 2
      ctx.arc(0, 0, radius, accAngle - offset, accAngle + step + offset, false)
      ctx.stroke()
      accAngle += step
    }
    ctx.restore()
  }
})