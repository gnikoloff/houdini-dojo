const a = (({ b = 12 } = {}) => ({ b }))()
console.log(a)