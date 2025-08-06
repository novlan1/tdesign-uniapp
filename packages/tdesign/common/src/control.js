const defaultOption = {
    valueKey: 'value',
    defaultValueKey: 'defaultValue',
    changeEventName: 'change',
    strict: true
};
function useControl(e = {}) {
    const { valueKey: t, defaultValueKey: a, changeEventName: n, strict: s } = Object.assign(Object.assign({}, defaultOption), e);
    const l = this || {};
    const i = l[t];
    const u = l[s ? a : t];
    let o = false;
    if (s && null != i) {
        o = true;
    }
    const c = (e, a, n) => {
        this.setData(
            Object.assign(
                {
                    [`_${t}`]: e
                },
                a
            ),
            n
        );
    };
    return {
        controlled: o,
        initValue: o ? i : u,
        set: c,
        get: () => this[`_${t}`],
        change: (e, t, a) => {
            this.$emit(n, {
                detail: void 0 !== t ? t : e
            });
            o || ('function' == typeof a ? a() : c(e));
        }
    };
}
export { useControl };
