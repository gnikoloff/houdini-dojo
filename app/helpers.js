/* global CSSUnparsedValue */
/* global CSSUnitValue */
/* global CSSStyleValue */

export function checkInputVariable(props, name, defaultValue, defaultType) {
  const inputVariable = props.get(name)
  if (inputVariable instanceof CSSUnparsedValue) {
    if (inputVariable.length) {
      if (defaultType === 'number' || defaultValue === 'percentage') {
        return parseInt(inputVariable.toString())
      } else {
        return inputVariable.toString()
      }
    }
    return defaultValue
  } else if (inputVariable instanceof CSSUnitValue) {
    return inputVariable.value
  } else if (inputVariable instanceof CSSStyleValue) {
    return inputVariable
  } else {
    return defaultValue
  }
}
