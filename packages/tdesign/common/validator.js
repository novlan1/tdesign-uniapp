export function isFunction(t) {
    return 'function' == typeof t;
}
export const isString = (t) => 'string' == typeof t;
export const isNull = (t) => null === t;
export const isUndefined = (t) => void 0 === t;
export function isDef(t) {
    return !isUndefined(t) && !isNull(t);
}
export function isNumber(t) {
    return /^\d+(\.\d+)?$/.test(t);
}
export function isBoolean(t) {
    return 'boolean' == typeof t;
}
export function isObject(t) {
    const n = typeof t;
    return null !== t && ('object' === n || 'function' === n);
}
export function isPlainObject(t) {
    return null !== t && 'object' == typeof t && '[object Object]' === Object.prototype.toString.call(t);
}
