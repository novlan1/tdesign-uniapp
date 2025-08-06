import { __rest } from '@/miniprogram_npm/tslib';
import { MessageType } from './message.interface';
import { getInstance } from '../common/utils';
const showMessage = function (e, s = MessageType.info) {
    const { context: t, selector: o = '#t-message' } = e;
    const n = __rest(e, ['context', 'selector']);
    const r = getInstance(t, o);
    if ('boolean' != typeof n.single) {
        n.single = true;
    }
    if (r) {
        r.setMessage(n, s);
        return r;
    }
    console.error('未找到组件,请确认 selector && context 是否正确');
};
export default {
    data() {
        return {};
    },
    info: (e) => showMessage(e, MessageType.info),
    success: (e) => showMessage(e, MessageType.success),
    warning: (e) => showMessage(e, MessageType.warning),
    error: (e) => showMessage(e, MessageType.error),
    hide(e) {
        const { context: s, selector: t = '#t-message' } = Object.assign({}, e);
        const o = getInstance(s, t);
        if (o) {
            o.hide();
        }
    }
};
