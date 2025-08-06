export const TimeDataUnit = {
    DD: '天',
    HH: '时',
    mm: '分',
    ss: '秒',
    SSS: '毫秒'
};
const HOUR = 3600000;
const DAY = 24 * HOUR;
export const parseTimeData = function (t) {
    return {
        DD: Math.floor(t / DAY),
        HH: Math.floor((t % DAY) / HOUR),
        mm: Math.floor((t % HOUR) / 60000),
        ss: Math.floor((t % 60000) / 1000),
        SSS: Math.floor(t % 1000)
    };
};
export const isSameSecond = function (t, e) {
    return Math.floor(t / 1000) === Math.floor(e / 1000);
};
export const parseFormat = function (t, e) {
    const o = {
        'D+': Math.floor(t / 86400000),
        'H+': Math.floor((t % 86400000) / 3600000),
        'm+': Math.floor((t % 3600000) / 60000),
        's+': Math.floor((t % 60000) / 1000),
        'S+': Math.floor(t % 1000)
    };
    const r = [];
    let n = e;
    Object.keys(o).forEach((t) => {
        if (new RegExp(`(${t})`).test(n)) {
            n = n.replace(RegExp.$1, (e, n, s) => {
                const a = `${o[t]}`;
                let l = a;
                if (e.length > 1) {
                    l = (e.replace(new RegExp(e[0], 'g'), '0') + a).substr(a.length);
                }
                const h = s.substr(n + e.length);
                const c = r[r.length - 1];
                if (c) {
                    const t = c.unit.indexOf(e);
                    if (-1 !== t) {
                        c.unit = c.unit.substr(0, t);
                    }
                }
                r.push({
                    digit: l,
                    unit: h,
                    match: e
                });
                return l;
            });
        }
    });
    return {
        timeText: n,
        timeList: r
    };
};
