export const getObserver = (e, t) =>
    new Promise((o) => {
        e.createIntersectionObserver(e)
            .relativeToViewport()
            .observe(t, (e) => {
                o(e);
            });
    });
export const getWindowInfo = () => (uni.getWindowInfo && uni.getWindowInfo()) || uni.getSystemInfoSync();
export const getAppBaseInfo = () => (uni.getAppBaseInfo && uni.getAppBaseInfo()) || uni.getSystemInfoSync();
export const getDeviceInfo = () => (uni.getDeviceInfo && uni.getDeviceInfo()) || uni.getSystemInfoSync();
