import { isObject } from '../validator';
export const getPrototypeOf = function (t) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(t) : t.__proto__;
};
export const iterateInheritedPrototype = function (t, e, o, r = true) {
    let n = e.prototype || e;
    const c = o.prototype || o;
    for (; n && (r || n !== c) && false !== t(n) && n !== c; ) {
        n = getPrototypeOf(n);
    }
};
export const toObject = function (t, e = {}) {
    const o = {};
    if (!isObject(t)) {
        return o;
    }
    const r = e.excludes || ['constructor'];
    const { enumerable: n = true, configurable: c = 0, writable: i = 0 } = e;
    const p = {};
    if (0 !== n) {
        p.enumerable = n;
    }
    if (0 !== c) {
        p.configurable = c;
    }
    if (0 !== i) {
        p.writable = i;
    }
    iterateInheritedPrototype(
        (t) => {
            Object.getOwnPropertyNames(t).forEach((n) => {
                if (r.indexOf(n) >= 0) {
                    return;
                }
                if (Object.prototype.hasOwnProperty.call(o, n)) {
                    return;
                }
                const c = Object.getOwnPropertyDescriptor(t, n);
                ['get', 'set', 'value'].forEach((t) => {
                    if ('function' == typeof c[t]) {
                        const o = c[t];
                        c[t] = function (...t) {
                            return o.apply(Object.prototype.hasOwnProperty.call(e, 'bindTo') ? e.bindTo : this, t);
                        };
                    }
                });
                Object.defineProperty(o, n, Object.assign(Object.assign({}, c), p));
            });
        },
        t,
        e.till || Object,
        false
    );
    return o;
};
