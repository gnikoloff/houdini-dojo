/* global CSSUnparsedValue */
/* global CSSUnitValue */
/* global CSSStyleValue */

export function checkInputVariable(props, name, defaultValue, defaultType) {
  const inputVariable = props.get(name)
  console.log(inputVariable)
  if (inputVariable instanceof CSSUnparsedValue) {
    if (inputVariable.length) {
      if (defaultType === 'number') {
        return parseInt(inputVariable.toString())
      } else {
        return inputVariable.toString()
      }
    }
    return defaultValue
  } else if (inputVariable instanceof CSSUnitValue) {
    if (inputVariable.unit === 'number') {
      return inputVariable.value
    }
  } else if (inputVariable instanceof CSSStyleValue) {
    return inputVariable
  } else {
    return defaultValue
  }
}
