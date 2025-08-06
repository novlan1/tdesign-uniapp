export function getMonthByOffset(t, e) {
    const n = new Date(t);
    n.setMonth(n.getMonth() + e);
    n.setDate(1);
    return n;
}
export function getYearByOffset(t, e) {
    const n = new Date(t);
    n.setFullYear(n.getFullYear() + e);
    n.setDate(1);
    return n;
}
export const getPrevMonth = (t) => getMonthByOffset(t, -1);
export const getNextMonth = (t) => getMonthByOffset(t, 1);
export const getPrevYear = (t) => getYearByOffset(t, -1);
export const getNextYear = (t) => getYearByOffset(t, 1);
