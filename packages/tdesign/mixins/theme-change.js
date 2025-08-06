import { appBaseInfo } from '../common/utils';
const themeChangeBehavior = {
    data() {
        return {
            theme: 'light'
        };
    },
    beforeMount() {
        this._initTheme();
    },
    methods: {
        _initTheme() {
            const that = this;
            that.setData({
                theme: appBaseInfo.theme
            });
            uni.onThemeChange((t) => {
                that.setData({
                    theme: t.theme
                });
            });
        }
    }
};
export default themeChangeBehavior;
