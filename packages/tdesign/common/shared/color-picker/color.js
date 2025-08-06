import tinyColor from './tinycolor2/esm/tinycolor';
import { cmykInputToColor, rgb2cmyk } from './cmyk';
import { parseGradientString, isGradientColor } from './gradient';
const mathRound = Math.round;
const hsv2rgba = (t) => tinyColor(t).toRgb();
const hsv2hsva = (t) => tinyColor(t).toHsv();
const hsv2hsla = (t) => tinyColor(t).toHsl();
export const gradientColors2string = (t) => {
    const { points: e, degree: r } = t;
    return `linear-gradient(${r}deg,${e
        .sort((t, e) => t.left - e.left)
        .map((t) => `${t.color} ${Math.round(100 * t.left) / 100}%`)
        .join(',')})`;
};
export const getColorWithoutAlpha = (t) => tinyColor(t).setAlpha(1).toHexString();
export const genId = () => (1 + 4294967295 * Math.random()).toString(16);
export const genGradientPoint = (t, e) => ({
    id: genId(),
    left: t,
    color: e
});
export class Color {
    constructor(t) {
        this.states = {
            s: 100,
            v: 100,
            h: 100,
            a: 1
        };
        this.gradientStates = {
            colors: [],
            degree: 0,
            selectedId: null,
            css: ''
        };
        this.update(t);
    }
    update(t) {
        var e;
        var r;
        const s = parseGradientString(t);
        if (this.isGradient && !s) {
            const e = tinyColor(t).toHsv();
            this.states = e;
            return void this.updateCurrentGradientColor();
        }
        this.originColor = t;
        this.isGradient = false;
        let a = t;
        if (s) {
            this.isGradient = true;
            const t = s;
            const i = t.points.map((t) => genGradientPoint(t.left, t.color));
            this.gradientStates = {
                colors: i,
                degree: t.degree,
                selectedId: (null === (e = i[0]) || void 0 === e ? void 0 : e.id) || null
            };
            this.gradientStates.css = this.linearGradient;
            a = null === (r = this.gradientSelectedPoint) || void 0 === r ? void 0 : r.color;
        }
        this.updateStates(a);
    }
    get saturation() {
        return this.states.s;
    }
    set saturation(t) {
        this.states.s = Math.max(0, Math.min(100, t));
        this.updateCurrentGradientColor();
    }
    get value() {
        return this.states.v;
    }
    set value(t) {
        this.states.v = Math.max(0, Math.min(100, t));
        this.updateCurrentGradientColor();
    }
    get hue() {
        return this.states.h;
    }
    set hue(t) {
        this.states.h = Math.max(0, Math.min(360, t));
        this.updateCurrentGradientColor();
    }
    get alpha() {
        return this.states.a;
    }
    set alpha(t) {
        this.states.a = Math.max(0, Math.min(1, Math.round(100 * t) / 100));
        this.updateCurrentGradientColor();
    }
    get rgb() {
        const { r: t, g: e, b: r } = hsv2rgba(this.states);
        return `rgb(${mathRound(t)}, ${mathRound(e)}, ${mathRound(r)})`;
    }
    get rgba() {
        const { r: t, g: e, b: r, a: s } = hsv2rgba(this.states);
        return `rgba(${mathRound(t)}, ${mathRound(e)}, ${mathRound(r)}, ${s})`;
    }
    get hsv() {
        const { h: t, s: e, v: r } = this.getHsva();
        return `hsv(${t}, ${e}%, ${r}%)`;
    }
    get hsva() {
        const { h: t, s: e, v: r, a: s } = this.getHsva();
        return `hsva(${t}, ${e}%, ${r}%, ${s})`;
    }
    get hsl() {
        const { h: t, s: e, l: r } = this.getHsla();
        return `hsl(${t}, ${e}%, ${r}%)`;
    }
    get hsla() {
        const { h: t, s: e, l: r, a: s } = this.getHsla();
        return `hsla(${t}, ${e}%, ${r}%, ${s})`;
    }
    get hex() {
        return tinyColor(this.states).toHexString();
    }
    get hex8() {
        return tinyColor(this.states).toHex8String();
    }
    get cmyk() {
        const { c: t, m: e, y: r, k: s } = this.getCmyk();
        return `cmyk(${t}, ${e}, ${r}, ${s})`;
    }
    get css() {
        return this.isGradient ? this.linearGradient : this.rgba;
    }
    get linearGradient() {
        const { gradientColors: t, gradientDegree: e } = this;
        return gradientColors2string({
            points: t,
            degree: e
        });
    }
    get gradientColors() {
        return this.gradientStates.colors;
    }
    set gradientColors(t) {
        this.gradientStates.colors = t;
        this.gradientStates.css = this.linearGradient;
    }
    get gradientSelectedId() {
        return this.gradientStates.selectedId;
    }
    set gradientSelectedId(t) {
        var e;
        if (t !== this.gradientSelectedId) {
            this.gradientStates.selectedId = t;
            this.updateStates(null === (e = this.gradientSelectedPoint) || void 0 === e ? void 0 : e.color);
        }
    }
    get gradientDegree() {
        return this.gradientStates.degree;
    }
    set gradientDegree(t) {
        this.gradientStates.degree = Math.max(0, Math.min(360, t));
        this.gradientStates.css = this.linearGradient;
    }
    get gradientSelectedPoint() {
        const { gradientColors: t, gradientSelectedId: e } = this;
        return t.find((t) => t.id === e);
    }
    getFormatsColorMap() {
        return {
            HEX: this.hex,
            CMYK: this.cmyk,
            RGB: this.rgb,
            RGBA: this.rgba,
            HSL: this.hsl,
            HSLA: this.hsla,
            HSV: this.hsv,
            HSVA: this.hsva,
            CSS: this.css,
            HEX8: this.hex8
        };
    }
    updateCurrentGradientColor() {
        const { isGradient: t, gradientColors: e, gradientSelectedId: r } = this;
        const { length: s } = e;
        const a = this.gradientSelectedPoint;
        if (!t || 0 === s || !a) {
            return false;
        }
        const i = e.findIndex((t) => t.id === r);
        const n = Object.assign(Object.assign({}, a), {
            color: this.rgba
        });
        e.splice(i, 1, n);
        this.gradientColors = e.slice();
        return this;
    }
    updateStates(t) {
        const e = tinyColor(cmykInputToColor(t)).toHsv();
        this.states = e;
    }
    getRgba() {
        const { r: t, g: e, b: r, a: s } = hsv2rgba(this.states);
        return {
            r: mathRound(t),
            g: mathRound(e),
            b: mathRound(r),
            a: s
        };
    }
    getCmyk() {
        const { r: t, g: e, b: r } = this.getRgba();
        const [s, a, i, n] = rgb2cmyk(t, e, r);
        return {
            c: mathRound(100 * s),
            m: mathRound(100 * a),
            y: mathRound(100 * i),
            k: mathRound(100 * n)
        };
    }
    getHsva() {
        let { h: t, s: e, v: r, a: s } = hsv2hsva(this.states);
        t = mathRound(t);
        e = mathRound(100 * e);
        r = mathRound(100 * r);
        s *= 1;
        return {
            h: t,
            s: e,
            v: r,
            a: s
        };
    }
    getHsla() {
        let { h: t, s: e, l: r, a: s } = hsv2hsla(this.states);
        t = mathRound(t);
        e = mathRound(100 * e);
        r = mathRound(100 * r);
        s *= 1;
        return {
            h: t,
            s: e,
            l: r,
            a: s
        };
    }
    equals(t) {
        return tinyColor.equals(this.rgba, t);
    }
    static isValid(t) {
        return !!parseGradientString(t) || tinyColor(t).isValid();
    }
    static hsva2color(t, e, r, s) {
        return tinyColor({
            h: t,
            s: e,
            v: r,
            a: s
        }).toHsvString();
    }
    static hsla2color(t, e, r, s) {
        return tinyColor({
            h: t,
            s: e,
            l: r,
            a: s
        }).toHslString();
    }
    static rgba2color(t, e, r, s) {
        return tinyColor({
            r: t,
            g: e,
            b: r,
            a: s
        }).toHsvString();
    }
    static hex2color(t, e) {
        const r = tinyColor(t);
        r.setAlpha(e);
        return r.toHexString();
    }
    static object2color(t, e) {
        if ('CMYK' === e) {
            const { c: e, m: r, y: s, k: a } = t;
            return `cmyk(${e}, ${r}, ${s}, ${a})`;
        }
        return tinyColor(t, {
            format: e
        }).toRgbString();
    }
}
Color.isGradientColor = (t) => !!isGradientColor(t);
Color.compare = (t, e) => {
    const r = Color.isGradientColor(t);
    const s = Color.isGradientColor(e);
    if (r && s) {
        return gradientColors2string(parseGradientString(t)) === gradientColors2string(parseGradientString(e));
    }
    return !r && !s && tinyColor.equals(t, e);
};
const COLOR_OBJECT_OUTPUT_KEYS = ['alpha', 'css', 'hex', 'hex8', 'hsl', 'hsla', 'hsv', 'hsva', 'rgb', 'rgba', 'saturation', 'value', 'isGradient'];
export const getColorObject = (t) => {
    if (!t) {
        return null;
    }
    const e = Object.create(null);
    COLOR_OBJECT_OUTPUT_KEYS.forEach((r) => (e[r] = t[r]));
    if (t.isGradient) {
        e.linearGradient = t.linearGradient;
    }
    return e;
};
export default Color;
