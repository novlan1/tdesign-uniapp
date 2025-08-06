export const rgb2cmyk = (t, r, e) => {
    let n = 0;
    let o = 0;
    let c = 0;
    let a = 0;
    const s = parseInt(`${t}`.replace(/\s/g, ''), 10);
    const m = parseInt(`${r}`.replace(/\s/g, ''), 10);
    const u = parseInt(`${e}`.replace(/\s/g, ''), 10);
    if (0 === s && 0 === m && 0 === u) {
        a = 1;
        return [0, 0, 0, 1];
    }
    n = 1 - s / 255;
    o = 1 - m / 255;
    c = 1 - u / 255;
    const p = Math.min(n, Math.min(o, c));
    n = (n - p) / (1 - p);
    o = (o - p) / (1 - p);
    c = (c - p) / (1 - p);
    a = p;
    return [n, o, c, a];
};
export const cmyk2rgb = (t, r, e, n) => {
    let o = t / 100;
    let c = r / 100;
    let a = e / 100;
    const s = n / 100;
    o = o * (1 - s) + s;
    c = c * (1 - s) + s;
    a = a * (1 - s) + s;
    let m = 1 - o;
    let u = 1 - c;
    let p = 1 - a;
    m = Math.round(255 * m);
    u = Math.round(255 * u);
    p = Math.round(255 * p);
    return {
        r: m,
        g: u,
        b: p
    };
};
const REG_CMYK_STRING = /cmyk\((\d+%?),(\d+%?),(\d+%?),(\d+%?)\)/;
const toNumber = (t) => Math.max(0, Math.min(255, parseInt(t, 10)));
export const cmykInputToColor = (t) => {
    if (/cmyk/i.test(t)) {
        const r = t.replace(/\s/g, '').match(REG_CMYK_STRING);
        const e = toNumber(r[1]);
        const n = toNumber(r[2]);
        const o = toNumber(r[3]);
        const c = toNumber(r[4]);
        const { r: a, g: s, b: m } = cmyk2rgb(e, n, o, c);
        return `rgb(${a}, ${s}, ${m})`;
    }
    return t;
};
