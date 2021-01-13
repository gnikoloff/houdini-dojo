registerPaint('bezier-curves', class {
  static get inputProperties () {
    return [
      '--stroke-width',
      '--stroke-color',
      '--helper-point-radius',
      '--helper-point-background-color',
      '--helper-point-accent-color'
    ]
  }
  paint (ctx, paintSize, props) {
    console.log(props.get('--stroke-width'))
    const strokeWidth = checkInputVariable(props, '--stroke-width', 2, '<length>')
    const strokeColor = checkInputVariable(props, '--stroke-color', '#111')
    const helperPointRadius = checkInputVariable(props, '--helper-point-radius', 10, '<length>')
    const helperPointBackgroundColor = checkInputVariable(props, '--helper-point-background-color', '222')
    const helperPointAccentColor = checkInputVariable(props, '--helper-point-accent-color', 'red')

    const padding = paintSize.width * 0.075
    const drawWidth = paintSize.width - padding * 2
    const drawHeight = paintSize.height - helperPointRadius * 2
    const halfHeight = drawHeight / 2
    const possibleYOffset = drawHeight / 2
    const stepX = drawWidth / 10

    const positions = new Array(10)
      .fill(null)
      .map((_, i) => [stepX * (i + 1) + padding, halfHeight + (Math.random() * 2 - 1) * possibleYOffset])

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

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'
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
})

/* ------ Helpers ------ */
function checkInputVariable (props, name, defaultValue, type) {
  const inputVariable = props.get(name)
  if (inputVariable.length) {
    if (type === '<length>') {
      return parseInt(inputVariable.toString())
    }
    return inputVariable
  } else {
    return defaultValue
  }
}

function drawHelperPoint (ctx, { x, y, radius, backgroundColor, accentColor }) {
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
  ctx.arc(0, 0, halfRadius , 0, Math.PI * 2)
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
