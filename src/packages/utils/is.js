function check(item, type) {
  return Object.prototype.toString.call(item) === type
}

export function isString(item) {
  return check(item, '[object String]')
}

export function isObject(item) {
  return check(item, '[object Object]')
}

export function isFunction(item) {
  return check(item, '[object Function]')
}

export function isNull(item) {
  return check(item, '[object Null]')
}

export function isNumber(item) {
  return check(item, '[object Number]')
}

export function isUndefined(item) {
  return check(item, '[object Undefined]')
}

export function isBoolean(item) {
  return check(item, '[object Boolean]')
}
