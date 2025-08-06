import config from '../common/config';
const { prefix: prefix } = config;
export default function transition() {
    return {
        data() {
            return {
                transitionClass: '',
                transitionDurations: 300,
                className: '',
                realVisible: false
            };
        },
        props: {
            visible: {
                type: Boolean,
                value: null,
                observer: 'watchVisible'
            },
            appear: Boolean,
            name: {
                type: String,
                value: 'fade'
            },
            durations: {
                type: Number,
                optionalTypes: [Array]
            }
        },
        created() {
            this.status = '';
            this.transitionT = 0;
        },
        beforeMount() {
            this.durations = this.getDurations();
            if (this.visible) {
                this.enter();
            }
            this.inited = true;
        },
        destroyed() {
            clearTimeout(this.transitionT);
        },
        methods: {
            watchVisible(t, i) {
                if (this.inited && t !== i) {
                    if (t) {
                        this.enter();
                    } else {
                        this.leave();
                    }
                }
            },
            getDurations() {
                const { durations: t } = this;
                return Array.isArray(t) ? t.map((t) => Number(t)) : [Number(t), Number(t)];
            },
            enter() {
                const { name: t } = this;
                const [i] = this.durations;
                this.status = 'entering';
                this.setData({
                    realVisible: true,
                    transitionClass: `${prefix}-${t}-enter ${prefix}-${t}-enter-active`
                });
                setTimeout(() => {
                    this.setData({
                        transitionClass: `${prefix}-${t}-enter-active ${prefix}-${t}-enter-to`
                    });
                }, 30);
                if ('number' == typeof i && i > 0) {
                    this.transitionT = setTimeout(this.entered.bind(this), i + 30);
                }
            },
            entered() {
                this.customDuration = false;
                clearTimeout(this.transitionT);
                this.status = 'entered';
                this.setData({
                    transitionClass: ''
                });
            },
            leave() {
                const { name: t } = this;
                const [, i] = this.durations;
                this.status = 'leaving';
                this.setData({
                    transitionClass: `${prefix}-${t}-leave  ${prefix}-${t}-leave-active`
                });
                clearTimeout(this.transitionT);
                setTimeout(() => {
                    this.setData({
                        transitionClass: `${prefix}-${t}-leave-active ${prefix}-${t}-leave-to`
                    });
                }, 30);
                if ('number' == typeof i && i > 0) {
                    this.customDuration = true;
                    this.transitionT = setTimeout(this.leaved.bind(this), i + 30);
                }
            },
            leaved() {
                this.customDuration = false;
                this.$emit('leaved');
                clearTimeout(this.transitionT);
                this.status = 'leaved';
                this.setData({
                    transitionClass: ''
                });
            },
            onTransitionEnd() {
                this.customDuration ||
                    (clearTimeout(this.transitionT),
                    'entering' === this.status && this.visible
                        ? this.entered()
                        : 'leaving' !== this.status ||
                          this.visible ||
                          (this.leaved(),
                          this.setData({
                              realVisible: false
                          })));
            }
        }
    };
}
