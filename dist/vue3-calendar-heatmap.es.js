var ae = Object.defineProperty;
var re = (e, t, a) => t in e ? ae(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var l = (e, t, a) => re(e, typeof t != "symbol" ? t + "" : t, a);
import { defineComponent as ne, ref as S, toRefs as se, watch as D, toRef as P, nextTick as oe, onMounted as le, onBeforeUnmount as ie, openBlock as i, createElementBlock as u, normalizeClass as ue, createElementVNode as d, Fragment as m, renderList as w, toDisplayString as A, normalizeStyle as $, createCommentVNode as M, renderSlot as N } from "vue";
import de, { createSingleton as _e } from "tippy.js";
const _ = class _ {
  constructor(t, a, s) {
    l(this, "startDate");
    l(this, "endDate");
    l(this, "max");
    l(this, "_values");
    l(this, "_firstFullWeekOfMonths");
    l(this, "_activities");
    l(this, "_calendar");
    this.endDate = this.parseDate(t), this.max = s || Math.ceil(Math.max(...a.map((h) => h.count)) / 5 * 4), this.startDate = this.shiftDate(t, -_.DAYS_IN_ONE_YEAR), this._values = a;
  }
  set values(t) {
    this.max = Math.ceil(Math.max(...t.map((a) => a.count)) / 5 * 4), this._values = t, this._firstFullWeekOfMonths = void 0, this._calendar = void 0, this._activities = void 0;
  }
  get values() {
    return this._values;
  }
  get activities() {
    if (!this._activities) {
      this._activities = /* @__PURE__ */ new Map();
      for (let t = 0, a = this.values.length; t < a; t++)
        this._activities.set(this.keyDayParser(this.values[t].date), {
          count: this.values[t].count,
          colorIndex: this.getColorIndex(this.values[t].count)
        });
    }
    return this._activities;
  }
  get weekCount() {
    return this.getDaysCount() / _.DAYS_IN_WEEK;
  }
  get calendar() {
    if (!this._calendar) {
      let t = this.shiftDate(this.startDate, -this.getCountEmptyDaysAtStart());
      t = new Date(t.getFullYear(), t.getMonth(), t.getDate()), this._calendar = new Array(this.weekCount);
      for (let a = 0, s = this._calendar.length; a < s; a++) {
        this._calendar[a] = new Array(_.DAYS_IN_WEEK);
        for (let h = 0; h < _.DAYS_IN_WEEK; h++) {
          const o = this.activities.get(this.keyDayParser(t));
          this._calendar[a][h] = {
            date: new Date(t.valueOf()),
            count: o ? o.count : void 0,
            colorIndex: o ? o.colorIndex : 0
          }, t.setDate(t.getDate() + 1);
        }
      }
    }
    return this._calendar;
  }
  get firstFullWeekOfMonths() {
    if (!this._firstFullWeekOfMonths) {
      const t = this.calendar;
      this._firstFullWeekOfMonths = [];
      for (let a = 1, s = t.length; a < s; a++) {
        const h = t[a - 1][0].date, o = t[a][0].date;
        (h.getFullYear() < o.getFullYear() || h.getMonth() < o.getMonth()) && this._firstFullWeekOfMonths.push({ value: o.getMonth(), index: a });
      }
    }
    return this._firstFullWeekOfMonths;
  }
  getColorIndex(t) {
    return t == null ? 0 : t <= 0 ? 1 : t >= this.max ? 5 : Math.ceil(t * 100 / this.max * 0.03) + 1;
  }
  getCountEmptyDaysAtStart() {
    return this.startDate.getDay();
  }
  getCountEmptyDaysAtEnd() {
    return _.DAYS_IN_WEEK - 1 - this.endDate.getDay();
  }
  getDaysCount() {
    return _.DAYS_IN_ONE_YEAR + 1 + this.getCountEmptyDaysAtStart() + this.getCountEmptyDaysAtEnd();
  }
  shiftDate(t, a) {
    const s = new Date(t);
    return s.setDate(s.getDate() + a), s;
  }
  parseDate(t) {
    return t instanceof Date ? t : new Date(t);
  }
  keyDayParser(t) {
    const a = this.parseDate(t);
    return String(a.getFullYear()) + String(a.getMonth()).padStart(2, "0") + String(a.getDate()).padStart(2, "0");
  }
};
l(_, "DEFAULT_RANGE_COLOR_LIGHT", ["#ebedf0", "#dae2ef", "#c0ddf9", "#73b3f3", "#3886e1", "#17459e"]), l(_, "DEFAULT_RANGE_COLOR_DARK", ["#1f1f22", "#1e334a", "#1d466c", "#1d5689", "#1d69ac", "#1B95D1"]), // other color candidates
// static readonly DEFAULT_RANGE_COLOR_LIGHT = [ '#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39' ];
// static readonly DEFAULT_RANGE_COLOR_DARK  = [ '#161b22', '#0e4429', '#006d32', '#26a641', '#39d353' ];
// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#011526', '#012E40', '#025959', '#02735E', '#038C65' ];
// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#161b22', '#015958', '#008F8C', '#0CABA8', '#0FC2C0' ];
// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#012030', '#13678A', '#45C4B0', '#9AEBA3', '#DAFDBA' ];
l(_, "DEFAULT_LOCALE", {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  on: "on",
  less: "Less",
  more: "More"
}), l(_, "DEFAULT_TOOLTIP_UNIT", "contributions"), l(_, "DAYS_IN_ONE_YEAR", 365), l(_, "DAYS_IN_WEEK", 7), l(_, "SQUARE_SIZE", 10);
let n = _;
const he = /* @__PURE__ */ ne({
  name: "CalendarHeatmap",
  props: {
    showFutureDays: {
      type: Boolean,
      default: !1
    },
    endDate: {
      required: !0
    },
    max: {
      type: Number
    },
    rangeColor: {
      type: Array
    },
    values: {
      type: Array,
      required: !0
    },
    locale: {
      type: Object
    },
    tooltip: {
      type: Boolean,
      default: !0
    },
    tooltipUnit: {
      type: String,
      default: n.DEFAULT_TOOLTIP_UNIT
    },
    tooltipFormatter: {
      type: Function
    },
    vertical: {
      type: Boolean,
      default: !1
    },
    noDataText: {
      type: [Boolean, String],
      default: null
    },
    round: {
      type: Number,
      default: 0
    },
    darkMode: Boolean
  },
  emits: ["dayClick"],
  setup(e) {
    const t = n.SQUARE_SIZE / 5, a = n.SQUARE_SIZE + t, s = Math.ceil(n.SQUARE_SIZE * 2.5), h = a * 3, o = n.SQUARE_SIZE + n.SQUARE_SIZE / 2, E = n.SQUARE_SIZE + n.SQUARE_SIZE / 2, v = `translate(${s}, ${o})`, I = S(null), U = S(/* @__PURE__ */ new Date()), f = S(
      new n(e.endDate, e.values, e.max)
    ), T = S(0), O = S(0), F = S("0 0 0 0"), W = S("0 0 0 0"), k = S(""), L = S(""), b = S(""), R = S({}), p = S(
      e.rangeColor || (e.darkMode ? n.DEFAULT_RANGE_COLOR_DARK : n.DEFAULT_RANGE_COLOR_LIGHT)
    ), {
      values: K,
      tooltipUnit: z,
      tooltipFormatter: H,
      noDataText: V,
      max: q,
      vertical: B,
      locale: J
    } = se(e), g = /* @__PURE__ */ new Map();
    let c;
    function Y() {
      g.clear(), c ? c.setInstances(Array.from(g.values())) : c = _e(Array.from(g.values()), {
        overrides: [],
        moveTransition: "transform 0.1s ease-out",
        allowHTML: !0
      });
    }
    function j(r) {
      if (e.tooltip) {
        if (r.count !== void 0)
          return e.tooltipFormatter ? e.tooltipFormatter(r, e.tooltipUnit) : `<b>${r.count} ${e.tooltipUnit}</b> ${R.value.on} ${R.value.months[r.date.getMonth()]} ${r.date.getDate()}, ${r.date.getFullYear()}`;
        if (e.noDataText)
          return `${e.noDataText}`;
        if (e.noDataText !== !1)
          return `<b>No ${e.tooltipUnit}</b> ${R.value.on} ${R.value.months[r.date.getMonth()]} ${r.date.getDate()}, ${r.date.getFullYear()}`;
      }
    }
    function X(r) {
      return e.vertical ? `translate(0, ${a * f.value.weekCount - (r + 1) * a})` : `translate(${r * a}, 0)`;
    }
    function x(r) {
      return e.vertical ? `translate(${r * a}, 0)` : `translate(0, ${r * a})`;
    }
    function ee(r) {
      return e.vertical ? {
        x: 3,
        y: a * f.value.weekCount - a * r.index - a / 4
      } : {
        x: a * r.index,
        y: a - t
      };
    }
    D(
      [P(e, "rangeColor"), P(e, "darkMode")],
      ([r, y]) => {
        p.value = r || (y ? n.DEFAULT_RANGE_COLOR_DARK : n.DEFAULT_RANGE_COLOR_LIGHT);
      }
    ), D(
      B,
      (r) => {
        r ? (T.value = s + a * n.DAYS_IN_WEEK + h, O.value = o + a * f.value.weekCount + t, k.value = `translate(${s}, 0)`, L.value = `translate(0, ${o})`) : (T.value = s + a * f.value.weekCount + t, O.value = o + a * n.DAYS_IN_WEEK, k.value = `translate(0, ${o})`, L.value = `translate(${s}, 0)`);
      },
      { immediate: !0 }
    ), D([T, O], ([r, y]) => F.value = ` 0 0 ${r} ${y}`, {
      immediate: !0
    }), D(
      [T, O, p],
      ([r, y, C]) => {
        b.value = B.value ? `translate(${s + a * n.DAYS_IN_WEEK}, ${o})` : `translate(${r - a * C.length - 30}, ${y - E})`;
      },
      { immediate: !0 }
    ), D(
      J,
      (r) => R.value = r ? { ...n.DEFAULT_LOCALE, ...r } : n.DEFAULT_LOCALE,
      { immediate: !0 }
    ), D(
      p,
      (r) => W.value = `0 0 ${n.SQUARE_SIZE * (r.length + 1)} ${n.SQUARE_SIZE}`,
      { immediate: !0 }
    ), D(
      [K, z, H, V, q, p],
      () => {
        f.value = new n(
          e.endDate,
          e.values,
          e.max
        ), g.forEach((r) => r.destroy()), oe(Y);
      }
    ), le(Y), ie(() => {
      c == null || c.destroy(), g.forEach((r) => r.destroy());
    });
    function te(r) {
      if (c && r.target && r.target.classList.contains("vch__day__square") && r.target.dataset.weekIndex !== void 0 && r.target.dataset.dayIndex !== void 0) {
        const y = Number(r.target.dataset.weekIndex), C = Number(r.target.dataset.dayIndex);
        if (!isNaN(y) && !isNaN(C)) {
          const Q = j(
            f.value.calendar[y][C]
          );
          if (Q) {
            const Z = g.get(r.target);
            Z ? Z.setContent(Q) : Z || (g.set(
              r.target,
              de(r.target, { content: Q })
            ), c.setInstances(Array.from(g.values())));
          }
        }
      }
    }
    return {
      SQUARE_BORDER_SIZE: t,
      SQUARE_SIZE: a,
      LEFT_SECTION_WIDTH: s,
      RIGHT_SECTION_WIDTH: h,
      TOP_SECTION_HEIGHT: o,
      BOTTOM_SECTION_HEIGHT: E,
      svg: I,
      heatmap: f,
      now: U,
      width: T,
      height: O,
      viewbox: F,
      daysLabelWrapperTransform: k,
      monthsLabelWrapperTransform: L,
      yearWrapperTransform: v,
      legendWrapperTransform: b,
      lo: R,
      legendViewbox: W,
      curRangeColor: p,
      getWeekPosition: X,
      getDayPosition: x,
      getMonthLabelPosition: ee,
      initTippyLazy: te
    };
  }
}), Ee = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [s, h] of t)
    a[s] = h;
  return a;
}, ve = ["viewBox"], Se = ["transform"], fe = ["x", "y"], ge = ["transform"], ce = ["x", "y"], ye = ["x", "y"], Ae = ["x", "y"], De = ["transform"], Re = ["x"], me = ["rx", "ry", "width", "height", "x", "y"], Ie = ["x", "y"], Ue = ["transform"], Te = ["transform"], Oe = ["rx", "ry", "transform", "width", "height", "data-week-index", "data-day-index", "onClick"], pe = { class: "vch__legend" }, we = { class: "vch__legend-left" }, Ce = { class: "vch__legend-right" }, ke = { class: "vch__legend" }, Le = ["viewBox", "height"], Qe = { class: "vch__legend__wrapper" }, Ze = ["rx", "ry", "width", "height", "x"];
function $e(e, t, a, s, h, o) {
  return i(), u("div", {
    class: ue({ vch__container: !0, "dark-mode": e.darkMode })
  }, [
    (i(), u("svg", {
      class: "vch__wrapper",
      ref: "svg",
      viewBox: e.viewbox
    }, [
      d("g", {
        class: "vch__months__labels__wrapper",
        transform: e.monthsLabelWrapperTransform
      }, [
        (i(!0), u(m, null, w(e.heatmap.firstFullWeekOfMonths, (E, v) => (i(), u("text", {
          class: "vch__month__label",
          key: v,
          x: e.getMonthLabelPosition(E).x,
          y: e.getMonthLabelPosition(E).y
        }, A(e.lo.months[E.value]), 9, fe))), 128))
      ], 8, Se),
      d("g", {
        class: "vch__days__labels__wrapper",
        transform: e.daysLabelWrapperTransform
      }, [
        d("text", {
          class: "vch__day__label",
          x: e.vertical ? e.SQUARE_SIZE : 0,
          y: e.vertical ? e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE : 20
        }, A(e.lo.days[1]), 9, ce),
        d("text", {
          class: "vch__day__label",
          x: e.vertical ? e.SQUARE_SIZE * 3 : 0,
          y: e.vertical ? e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE : 44
        }, A(e.lo.days[3]), 9, ye),
        d("text", {
          class: "vch__day__label",
          x: e.vertical ? e.SQUARE_SIZE * 5 : 0,
          y: e.vertical ? e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE : 69
        }, A(e.lo.days[5]), 9, Ae)
      ], 8, ge),
      e.vertical ? (i(), u("g", {
        key: 0,
        class: "vch__legend__wrapper",
        transform: e.legendWrapperTransform
      }, [
        d("text", {
          x: e.SQUARE_SIZE * 1.25,
          y: "8"
        }, A(e.lo.less), 9, Re),
        (i(!0), u(m, null, w(e.curRangeColor, (E, v) => (i(), u("rect", {
          key: v,
          rx: e.round,
          ry: e.round,
          style: $({ fill: E }),
          width: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE,
          height: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE,
          x: e.SQUARE_SIZE * 1.75,
          y: e.SQUARE_SIZE * (v + 1)
        }, null, 12, me))), 128)),
        d("text", {
          x: e.SQUARE_SIZE * 1.25,
          y: e.SQUARE_SIZE * (e.curRangeColor.length + 2) - e.SQUARE_BORDER_SIZE
        }, A(e.lo.more), 9, Ie)
      ], 8, De)) : M("", !0),
      d("g", {
        class: "vch__year__wrapper",
        transform: e.yearWrapperTransform,
        onMouseover: t[0] || (t[0] = (...E) => e.initTippyLazy && e.initTippyLazy(...E))
      }, [
        (i(!0), u(m, null, w(e.heatmap.calendar, (E, v) => (i(), u("g", {
          class: "vch__month__wrapper",
          key: v,
          transform: e.getWeekPosition(v)
        }, [
          (i(!0), u(m, null, w(E, (I, U) => (i(), u(m, { key: U }, [
            e.showFutureDays || I.date < e.now ? (i(), u("rect", {
              key: 0,
              class: "vch__day__square",
              rx: e.round,
              ry: e.round,
              transform: e.getDayPosition(U),
              width: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE,
              height: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE,
              style: $({ fill: e.curRangeColor[I.colorIndex] }),
              "data-week-index": v,
              "data-day-index": U,
              onClick: (f) => e.$emit("dayClick", I)
            }, null, 12, Oe)) : M("", !0)
          ], 64))), 128))
        ], 8, Te))), 128))
      ], 40, Ue)
    ], 8, ve)),
    d("div", pe, [
      N(e.$slots, "legend", {}, () => [
        d("div", we, [
          N(e.$slots, "vch__legend-left")
        ]),
        d("div", Ce, [
          N(e.$slots, "legend-right", {}, () => [
            d("div", ke, [
              d("div", null, A(e.lo.less), 1),
              e.vertical ? M("", !0) : (i(), u("svg", {
                key: 0,
                class: "vch__external-legend-wrapper",
                viewBox: e.legendViewbox,
                height: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE
              }, [
                d("g", Qe, [
                  (i(!0), u(m, null, w(e.curRangeColor, (E, v) => (i(), u("rect", {
                    key: v,
                    rx: e.round,
                    ry: e.round,
                    style: $({ fill: E }),
                    width: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE,
                    height: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE,
                    x: e.SQUARE_SIZE * v
                  }, null, 12, Ze))), 128))
                ])
              ], 8, Le)),
              d("div", null, A(e.lo.more), 1)
            ])
          ])
        ])
      ])
    ])
  ], 2);
}
const G = /* @__PURE__ */ Ee(he, [["render", $e]]);
function Me(e) {
  e.component(G.name, G);
}
const be = { install: Me };
export {
  G as CalendarHeatmap,
  n as Heatmap,
  be as default
};
//# sourceMappingURL=vue3-calendar-heatmap.es.js.map
