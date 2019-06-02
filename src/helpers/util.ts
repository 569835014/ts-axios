const toString = Object.prototype.toString
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
export function isObject(val: any): val is Object {
  return toString.call(val) === '[object object]'
}

/**
 * 允许url中出现特殊字符
 * @param val
 */
export function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/g, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
