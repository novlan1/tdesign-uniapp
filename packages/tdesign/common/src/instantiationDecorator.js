import { toObject } from './flatTool';
import { isPlainObject } from '../validator';
import { canUseVirtualHost } from '../version';
const RawLifeCycles = ['Created', 'Attached', 'Ready', 'Moved', 'Detached', 'Error'];
const NativeLifeCycles = RawLifeCycles.map(e => e.toLowerCase());
const ComponentNativeProps = [
  'properties',
  'data',
  'observers',
  'methods',
  'behaviors',
  ...NativeLifeCycles,
  'relations',
  'externalClasses',
  'options',
  'lifetimes',
  'pageLifeTimes',
  'definitionFilter',
];
export const toComponent = function (e) {
  console.log('toComponent.e', e);
  const { relations: t, behaviors: o = [], externalClasses: i = [] } = e;
  if (e.properties) {
    Object.keys(e.properties).forEach((t) => {
      let o = e.properties[t];
      isPlainObject(o)
                || (o = {
                  type: o,
                });
      e.properties[t] = o;
    });
    [
      {
        key: 'ariaHidden',
        type: Boolean,
      },
      {
        key: 'ariaRole',
        type: String,
      },
      {
        key: 'ariaLabel',
        type: String,
      },
      {
        key: 'ariaLabelledby',
        type: String,
      },
      {
        key: 'ariaDescribedby',
        type: String,
      },
      {
        key: 'ariaBusy',
        type: Boolean,
      },
    ].forEach(({ key: t, type: o }) => {
      e.properties[t] = {
        type: o,
      };
    });
    e.properties.style = {
      type: String,
      value: '',
    };
    e.properties.customStyle = {
      type: String,
      value: '',
    };
  }
  e.methods || (e.methods = {});
  e.lifetimes || (e.lifetimes = {});
  const s = {};
  if (t) {
    const e = (e, t) => Behavior({
      created() {
        Object.defineProperty(this, `$${e}`, {
          get: () => {
            const o = this.getRelationNodes(t) || [];
            return 'parent' === e ? o[0] : o;
          },
        });
      },
    });
    const i = {};
    Object.keys(t).forEach((o) => {
      const s = t[o];
      const r = ['parent', 'ancestor'].includes(s.type) ? 'parent' : 'children';
      const n = e(r, o);
      i[r] = n;
    });
    o.push(...Object.keys(i).map(e => i[e]));
  }
  e.behaviors = [...o];
  e.externalClasses = ['class', ...i];
  Object.getOwnPropertyNames(e).forEach((t) => {
    const o = Object.getOwnPropertyDescriptor(e, t);
    if (o) {
      NativeLifeCycles.indexOf(t) < 0 && 'function' === typeof o.value
        ? (Object.defineProperty(e.methods, t, o), delete e[t])
        : ComponentNativeProps.indexOf(t) < 0
          ? (s[t] = o)
          : NativeLifeCycles.indexOf(t) >= 0 && (e.lifetimes[t] = e[t]);
    }
  });
  if (Object.keys(s).length) {
    const t = e.lifetimes.created;
    const o = e.lifetimes.attached;
    const { controlledProps: i = [] } = e;
    e.lifetimes.created = function (...e) {
      Object.defineProperties(this, s);
      if (t) {
        t.apply(this, e);
      }
    };
    e.lifetimes.attached = function (...e) {
      if (o) {
        o.apply(this, e);
      }
      i.forEach(({ key: e }) => {
        const t = `default${e.replace(/^(\w)/, (e, t) => t.toUpperCase())}`;
        const o = this;
        if (null == o[e]) {
          this._selfControlled = true;
        }
        if (null == o[e] && null != o[t]) {
          this.setData({
            [e]: o[t],
          });
        }
      });
    };
    e.methods._trigger = function (e, t, o) {
      const s = i.find(t => t.event === e);
      if (s) {
        const { key: e } = s;
        if (this._selfControlled) {
          this.setData({
            [e]: t[e],
          });
        }
      }
      this.$emit(
        e,
        {
          detail: t,
        },
        o,
      );
    };
  }
  return e;
};
export const wxComponent = function () {
  return function (e) {
    const t = new (class extends e {})();
    console.log('t', t);
    console.log('e', e);
    t.options = t.options || {};
    if (canUseVirtualHost()) {
      t.options.virtualHost = true;
    }
    const o = toComponent(t);
    // export default o;
    return o;
  };
};
