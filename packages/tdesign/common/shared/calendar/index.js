import { getDateRect, isSameDate, getMonthDateRect, isValidDate, getDate } from '../date';
export default class TCalendar {
    constructor(e = {}) {
        this.type = 'single';
        Object.assign(this, e);
        this.minDate || (this.minDate = getDate());
        this.maxDate || (this.maxDate = getDate(6));
    }
    getTrimValue() {
        const { value: e, type: t } = this;
        const a = (e) => (e instanceof Date ? e : 'number' == typeof e ? new Date(e) : new Date());
        if ('single' === t && isValidDate(e)) {
            return a(e);
        }
        if ('multiple' === t || 'range' === t) {
            if (Array.isArray(e)) {
                return e.every((e) => isValidDate(e)) ? e.map((e) => a(e)) : [];
            }
            return [];
        }
    }
    getDays(e) {
        const t = [];
        let a = this.firstDayOfWeek % 7;
        for (; t.length < 7; ) {
            t.push(e[a]);
            a = (a + 1) % 7;
        }
        return t;
    }
    getMonths() {
        const e = [];
        const t = this.getTrimValue();
        const { minDate: a, maxDate: i, type: r, format: s } = this;
        const n = getDateRect(a);
        let { year: m, month: l } = n;
        const { time: o } = n;
        const { year: D, month: h, time: u } = getDateRect(i);
        const y = (e, a, i) => {
            const s = new Date(e, a, i, 23, 59, 59);
            if (
                'single' === r &&
                t &&
                isSameDate(
                    {
                        year: e,
                        month: a,
                        date: i
                    },
                    t
                )
            ) {
                return 'selected';
            }
            if ('multiple' === r && t) {
                if (
                    t.some((t) =>
                        isSameDate(
                            {
                                year: e,
                                month: a,
                                date: i
                            },
                            t
                        )
                    )
                ) {
                    return 'selected';
                }
            }
            if ('range' === r && t && Array.isArray(t)) {
                const [r, n] = t;
                if (
                    r &&
                    isSameDate(
                        {
                            year: e,
                            month: a,
                            date: i
                        },
                        r
                    )
                ) {
                    return 'start';
                }
                if (
                    n &&
                    isSameDate(
                        {
                            year: e,
                            month: a,
                            date: i
                        },
                        n
                    )
                ) {
                    return 'end';
                }
                if (r && n && s.getTime() > r.getTime() && s.getTime() < n.getTime()) {
                    return 'centre';
                }
            }
            const n = new Date(e, a, i, 0, 0, 0);
            return s.getTime() < o || n.getTime() > u ? 'disabled' : '';
        };
        for (; m < D || (m === D && l <= h); ) {
            const t = getMonthDateRect(new Date(m, l, 1));
            const a = [];
            for (let e = 1; e <= 31 && !(e > t.lastDate); e += 1) {
                const t = {
                    date: new Date(m, l, e),
                    day: e,
                    type: y(m, l, e)
                };
                a.push(s ? s(t) : t);
            }
            e.push({
                year: m,
                month: l,
                months: a,
                weekdayOfFirstDay: t.weekdayOfFirstDay
            });
            const i = getDateRect(new Date(m, l + 1, 1));
            m = i.year;
            l = i.month;
        }
        return e;
    }
    select({ cellType: e, year: t, month: a, date: i }) {
        const { type: r } = this;
        const s = this.getTrimValue();
        if ('disabled' === e) {
            return;
        }
        const n = new Date(t, a, i);
        this.value = n;
        if ('range' === r && Array.isArray(s)) 1 === s.length && n > s[0] ? (this.value = [s[0], n]) : (this.value = [n]);
        else if ('multiple' === r && Array.isArray(s)) {
            const e = [...s];
            const t = s.findIndex((e) => isSameDate(e, n));
            t > -1 ? e.splice(t, 1) : e.push(n);
            this.value = e;
        }
        return this.value;
    }
}
