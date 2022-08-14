export function Enum(defines) {
  return Object.keys(defines).reduce((result, key) => {
    result[(result[key] = defines[key])] = key
    return result
  }, {})
}
