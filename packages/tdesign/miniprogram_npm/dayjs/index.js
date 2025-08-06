!(function (t, e) {
    if ('object' == typeof exports && 'undefined' != typeof module) {
        module.exports = e();
    } else {
        if ('function' == typeof define && define.amd) {
            define(e);
        } else {
            (t = 'undefined' != typeof globalThis ? globalThis : t || self).dayjs = e();
        }
    }
})(this, function () {
    'use strict';

    var t = 60000;
    var e = 3600000;
    var n = 'millisecond';
    var r = 'second';
    var i = 'minute';
    var s = 'hour';
    var u = 'day';
    var a = 'week';
    var o = 'month';
    var c = 'quarter';
    var f = 'year';
    var h = 'date';
    var d = 'Invalid Date';
    var l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
    var $ = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
    var y = {
        name: 'en',
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        ordinal: function (t) {
            var e = ['th', 'st', 'nd', 'rd'];
            var n = t % 100;
            return '[' + t + (e[(n - 20) % 10] || e[n] || e[0]) + ']';
        }
    };
    var M = function (t, e, n) {
        var r = String(t);
        return !r || r.length >= e ? t : '' + Array(e + 1 - r.length).join(n) + t;
    };
    var m = {
        s: M,
        z: function (t) {
            var e = -t.utcOffset();
            var n = Math.abs(e);
            var r = Math.floor(n / 60);
            var i = n % 60;
            return (e <= 0 ? '+' : '-') + M(r, 2, '0') + ':' + M(i, 2, '0');
        },
        m: function t(e, n) {
            if (e.date() < n.date()) {
                return -t(n, e);
            }
            var r = 12 * (n.year() - e.year()) + (n.month() - e.month());
            var i = e.clone().add(r, o);
            var s = n - i < 0;
            var u = e.clone().add(r + (s ? -1 : 1), o);
            return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
        },
        a: function (t) {
            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
        },
        p: function (t) {
            return (
                {
                    M: o,
                    y: f,
                    w: a,
                    d: u,
                    D: h,
                    h: s,
                    m: i,
                    s: r,
                    ms: n,
                    Q: c
                }[t] ||
                String(t || '')
                    .toLowerCase()
                    .replace(/s$/, '')
            );
        },
        u: function (t) {
            return void 0 === t;
        }
    };
    var v = 'en';
    var g = {};
    g[v] = y;
    var D = '$isDayjsObject';
    var p = function (t) {
        return t instanceof b || !(!t || !t[D]);
    };
    var S = function t(e, n, r) {
        var i;
        if (!e) {
            return v;
        }
        if ('string' == typeof e) {
            var s = e.toLowerCase();
            if (g[s]) {
                i = s;
            }
            if (n) {
                g[s] = n;
                i = s;
            }
            var u = e.split('-');
            if (!i && u.length > 1) {
                return t(u[0]);
            }
        } else {
            var a = e.name;
            g[a] = e;
            i = a;
        }
        if (!r && i) {
            v = i;
        }
        return i || (!r && v);
    };
    var w = function (t, e) {
        if (p(t)) {
            return t.clone();
        }
        var n = 'object' == typeof e ? e : {};
        n.date = t;
        n.args = arguments;
        return new b(n);
    };
    var O = m;
    O.l = S;
    O.i = p;
    O.w = function (t, e) {
        return w(t, {
            locale: e.$L,
            utc: e.$u,
            x: e.$x,
            $offset: e.$offset
        });
    };
    var b = (function () {
        function y(t) {
            this.$L = S(t.locale, null, true);
            this.parse(t);
            this.$x = this.$x || t.x || {};
            this[D] = true;
        }
        var M = y.prototype;
        M.parse = function (t) {
            this.$d = (function (t) {
                var e = t.date;
                var n = t.utc;
                if (null === e) {
                    return new Date(NaN);
                }
                if (O.u(e)) {
                    return new Date();
                }
                if (e instanceof Date) {
                    return new Date(e);
                }
                if ('string' == typeof e && !/Z$/i.test(e)) {
                    var r = e.match(l);
                    if (r) {
                        var i = r[2] - 1 || 0;
                        var s = (r[7] || '0').substring(0, 3);
                        return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
                    }
                }
                return new Date(e);
            })(t);
            this.init();
        };
        M.init = function () {
            var t = this.$d;
            this.$y = t.getFullYear();
            this.$M = t.getMonth();
            this.$D = t.getDate();
            this.$W = t.getDay();
            this.$H = t.getHours();
            this.$m = t.getMinutes();
            this.$s = t.getSeconds();
            this.$ms = t.getMilliseconds();
        };
        M.$utils = function () {
            return O;
        };
        M.isValid = function () {
            return !(this.$d.toString() === d);
        };
        M.isSame = function (t, e) {
            var n = w(t);
            return this.startOf(e) <= n && n <= this.endOf(e);
        };
        M.isAfter = function (t, e) {
            return w(t) < this.startOf(e);
        };
        M.isBefore = function (t, e) {
            return this.endOf(e) < w(t);
        };
        M.$g = function (t, e, n) {
            return O.u(t) ? this[e] : this.set(n, t);
        };
        M.unix = function () {
            return Math.floor(this.valueOf() / 1000);
        };
        M.valueOf = function () {
            return this.$d.getTime();
        };
        M.startOf = function (t, e) {
            var that = this;
            var c = !!O.u(e) || e;
            var d = O.p(t);
            var l = function (t, e) {
                var r = O.w(that.$u ? Date.UTC(that.$y, e, t) : new Date(that.$y, e, t), that);
                return c ? r : r.endOf(u);
            };
            var $ = function (t, e) {
                return O.w(that.toDate()[t].apply(that.toDate('s'), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), that);
            };
            var y = this.$W;
            var M = this.$M;
            var m = this.$D;
            var v = 'set' + (this.$u ? 'UTC' : '');
            switch (d) {
                case f:
                    return c ? l(1, 0) : l(31, 11);
                case o:
                    return c ? l(1, M) : l(0, M + 1);
                case a:
                    var g = this.$locale().weekStart || 0;
                    var D = (y < g ? y + 7 : y) - g;
                    return l(c ? m - D : m + (6 - D), M);
                case u:
                case h:
                    return $(v + 'Hours', 0);
                case s:
                    return $(v + 'Minutes', 1);
                case i:
                    return $(v + 'Seconds', 2);
                case r:
                    return $(v + 'Milliseconds', 3);
                default:
                    return this.clone();
            }
        };
        M.endOf = function (t) {
            return this.startOf(t, false);
        };
        M.$set = function (t, e) {
            var a;
            var c = O.p(t);
            var d = 'set' + (this.$u ? 'UTC' : '');
            var l = ((a = {}),
            (a[u] = d + 'Date'),
            (a[h] = d + 'Date'),
            (a[o] = d + 'Month'),
            (a[f] = d + 'FullYear'),
            (a[s] = d + 'Hours'),
            (a[i] = d + 'Minutes'),
            (a[r] = d + 'Seconds'),
            (a[n] = d + 'Milliseconds'),
            a)[c];
            var $ = c === u ? this.$D + (e - this.$W) : e;
            if (c === o || c === f) {
                var y = this.clone().set(h, 1);
                y.$d[l]($);
                y.init();
                this.$d = y.set(h, Math.min(this.$D, y.daysInMonth())).$d;
            } else {
                if (l) {
                    this.$d[l]($);
                }
            }
            this.init();
            return this;
        };
        M.set = function (t, e) {
            return this.clone().$set(t, e);
        };
        M.get = function (t) {
            return this[O.p(t)]();
        };
        M.add = function (n, c) {
            var h;
            var that = this;
            n = Number(n);
            var l = O.p(c);
            var $ = function (t) {
                var e = w(that);
                return O.w(e.date(e.date() + Math.round(t * n)), that);
            };
            if (l === o) {
                return this.set(o, this.$M + n);
            }
            if (l === f) {
                return this.set(f, this.$y + n);
            }
            if (l === u) {
                return $(1);
            }
            if (l === a) {
                return $(7);
            }
            var y = ((h = {}), (h[i] = t), (h[s] = e), (h[r] = 1000), h)[l] || 1;
            var M = this.$d.getTime() + n * y;
            return O.w(M, this);
        };
        M.subtract = function (t, e) {
            return this.add(-1 * t, e);
        };
        M.format = function (t) {
            var that = this;
            var n = this.$locale();
            if (!this.isValid()) {
                return n.invalidDate || d;
            }
            var r = t || 'YYYY-MM-DDTHH:mm:ssZ';
            var i = O.z(this);
            var s = this.$H;
            var u = this.$m;
            var a = this.$M;
            var o = n.weekdays;
            var c = n.months;
            var f = n.meridiem;
            var h = function (t, n, i, s) {
                return (t && (t[n] || t(that, r))) || i[n].slice(0, s);
            };
            var l = function (t) {
                return O.s(s % 12 || 12, t, '0');
            };
            var y =
                f ||
                function (t, e, n) {
                    var r = t < 12 ? 'AM' : 'PM';
                    return n ? r.toLowerCase() : r;
                };
            return r.replace($, function (t, r) {
                return (
                    r ||
                    (function (t) {
                        switch (t) {
                            case 'YY':
                                return String(that.$y).slice(-2);
                            case 'YYYY':
                                return O.s(that.$y, 4, '0');
                            case 'M':
                                return a + 1;
                            case 'MM':
                                return O.s(a + 1, 2, '0');
                            case 'MMM':
                                return h(n.monthsShort, a, c, 3);
                            case 'MMMM':
                                return h(c, a);
                            case 'D':
                                return that.$D;
                            case 'DD':
                                return O.s(that.$D, 2, '0');
                            case 'd':
                                return String(that.$W);
                            case 'dd':
                                return h(n.weekdaysMin, that.$W, o, 2);
                            case 'ddd':
                                return h(n.weekdaysShort, that.$W, o, 3);
                            case 'dddd':
                                return o[that.$W];
                            case 'H':
                                return String(s);
                            case 'HH':
                                return O.s(s, 2, '0');
                            case 'h':
                                return l(1);
                            case 'hh':
                                return l(2);
                            case 'a':
                                return y(s, u, true);
                            case 'A':
                                return y(s, u, false);
                            case 'm':
                                return String(u);
                            case 'mm':
                                return O.s(u, 2, '0');
                            case 's':
                                return String(that.$s);
                            case 'ss':
                                return O.s(that.$s, 2, '0');
                            case 'SSS':
                                return O.s(that.$ms, 3, '0');
                            case 'Z':
                                return i;
                        }
                        return null;
                    })(t) ||
                    i.replace(':', '')
                );
            });
        };
        M.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        };
        M.diff = function (n, h, d) {
            var l;
            var that = this;
            var y = O.p(h);
            var M = w(n);
            var m = (M.utcOffset() - this.utcOffset()) * t;
            var v = this - M;
            var g = function () {
                return O.m(that, M);
            };
            switch (y) {
                case f:
                    l = g() / 12;
                    break;
                case o:
                    l = g();
                    break;
                case c:
                    l = g() / 3;
                    break;
                case a:
                    l = (v - m) / 604800000;
                    break;
                case u:
                    l = (v - m) / 86400000;
                    break;
                case s:
                    l = v / e;
                    break;
                case i:
                    l = v / t;
                    break;
                case r:
                    l = v / 1000;
                    break;
                default:
                    l = v;
            }
            return d ? l : O.a(l);
        };
        M.daysInMonth = function () {
            return this.endOf(o).$D;
        };
        M.$locale = function () {
            return g[this.$L];
        };
        M.locale = function (t, e) {
            if (!t) {
                return this.$L;
            }
            var n = this.clone();
            var r = S(t, e, true);
            if (r) {
                n.$L = r;
            }
            return n;
        };
        M.clone = function () {
            return O.w(this.$d, this);
        };
        M.toDate = function () {
            return new Date(this.valueOf());
        };
        M.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
        };
        M.toISOString = function () {
            return this.$d.toISOString();
        };
        M.toString = function () {
            return this.$d.toUTCString();
        };
        return y;
    })();
    var _ = b.prototype;
    w.prototype = _;
    [
        ['$ms', n],
        ['$s', r],
        ['$m', i],
        ['$H', s],
        ['$W', u],
        ['$M', o],
        ['$y', f],
        ['$D', h]
    ].forEach(function (t) {
        _[t[1]] = function (e) {
            return this.$g(e, t[0], t[1]);
        };
    });
    w.extend = function (t, e) {
        t.$i || (t(e, b, w), (t.$i = true));
        return w;
    };
    w.locale = S;
    w.isDayjs = p;
    w.unix = function (t) {
        return w(1000 * t);
    };
    w.en = g[v];
    w.Ls = g;
    w.p = {};
    return w;
});
