import { systemInfo } from '../common/utils';
const useCustomNavbarBehavior = {
    data() {
        return {
            distanceTop: 0
        };
    },
    props: {
        usingCustomNavbar: {
            type: Boolean,
            value: false
        },
        customNavbarHeight: {
            type: Number,
            value: 0
        }
    },
    lifetimes: {
        attached() {
            if (this.usingCustomNavbar) {
                this.calculateCustomNavbarDistanceTop();
            }
        }
    },
    methods: {
        calculateCustomNavbarDistanceTop() {
            const { statusBarHeight: t } = systemInfo;
            const a = uni.getMenuButtonBoundingClientRect();
            const e = a.top + a.bottom - t;
            this.setData({
                distanceTop: Math.max(e, this.customNavbarHeight + t)
            });
        }
    }
};
export default useCustomNavbarBehavior;
