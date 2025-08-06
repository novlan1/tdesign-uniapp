import { __rest } from '@/miniprogram_npm/tslib';
import { getInstance } from '../common/utils';
function Toast(t) {
    var o;
    const { context: s, selector: e = '#t-toast' } = t;
    const n = __rest(t, ['context', 'selector']);
    const a = getInstance(s, e);
    if (a) {
        a.show(
            Object.assign(Object.assign({}, n), {
                duration: null !== (o = n.duration) && void 0 !== o ? o : 2000
            })
        );
    }
}
function showToast(t = {}) {
    Toast(t);
}
function hideToast(t = {}) {
    const { context: o, selector: s = '#t-toast' } = t;
    const e = getInstance(o, s);
    if (e) {
        e.hide();
    }
}
export { Toast as default, showToast, hideToast };
