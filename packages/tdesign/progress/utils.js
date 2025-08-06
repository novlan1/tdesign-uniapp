import { __rest } from '@/miniprogram_npm/tslib';
export function getBackgroundColor(r) {
    if ('string' == typeof r) {
        return r;
    }
    if (Array.isArray(r)) {
        if (r[0] && '#' === r[0][0]) {
            r.unshift('90deg');
        }
        return `linear-gradient( ${r.join(',')} )`;
    }
    const { from: t, to: e, direction: n = 'to right' } = r;
    const i = __rest(r, ['from', 'to', 'direction']);
    let o = Object.keys(i);
    if (o.length) {
        o = o.sort((r, t) => parseFloat(r.substr(0, r.length - 1)) - parseFloat(t.substr(0, t.length - 1)));
        return `linear-gradient(${n}, ${o.map((r) => `${i[r]} ${r}`).join(',')})`;
    }
    return `linear-gradient(${n}, ${t}, ${e})`;
}
