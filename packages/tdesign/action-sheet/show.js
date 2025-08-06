import { __rest } from '@/miniprogram_npm/tslib';
import { getInstance } from '../common/utils';
export var ActionSheetTheme;
!(function (t) {
    t.List = 'list';
    t.Grid = 'grid';
})(ActionSheetTheme || (ActionSheetTheme = {}));
export const show = function (t) {
    const e = Object.assign({}, t);
    const { context: o, selector: n = '#t-action-sheet' } = e;
    const c = __rest(e, ['context', 'selector']);
    const s = getInstance(o, n);
    if (s) {
        s.show(Object.assign({}, c));
        return s;
    }
    console.error('未找到组件,请确认 selector && context 是否正确');
};
export const close = function (t) {
    const { context: e, selector: o = '#t-action-sheet' } = Object.assign({}, t);
    const n = getInstance(e, o);
    if (n) {
        n.close();
    }
};
