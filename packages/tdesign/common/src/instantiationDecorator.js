// import { toObject } from './flatTool';
import { isPlainObject } from '../validator';
import { canUseVirtualHost } from '../version';
import { toCamel } from '../utils';

const getInnerControlledValue = key => `data${key.replace(/^(\w)/, (e, t) => t.toUpperCase())}`;

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
  if (!e.properties && e.props) {
    e.properties = e.props;
  }
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
    // Object.keys(t).forEach((o) => {
    //   const s = t[o];
    //   const r = ['parent', 'ancestor'].includes(s.type) ? 'parent' : 'children';
    //   const n = e(r, o);
    //   i[r] = n;
    // });
    // o.push(...Object.keys(i).map(e => i[e]));
  }
  // e.behaviors = [...o];
  e.externalClasses = ['class', ...i];
  Object.getOwnPropertyNames(e).forEach((t) => {
    const o = Object.getOwnPropertyDescriptor(e, t);
    if (o) {
      NativeLifeCycles.indexOf(t) < 0 && 'function' === typeof o.value && false
        ? (Object.defineProperty(e.methods, t, o), delete e[t])
        : ComponentNativeProps.indexOf(t) < 0
          ? (s[t] = o)
          : NativeLifeCycles.indexOf(t) >= 0 && (e.lifetimes[t] = e[t]);
    }
  });
  if (Object.keys(s).length) {
    // const t = e.lifetimes.created;
    const o = e.created;
    const { controlledProps: i = [] } = e;
    // e.lifetimes.created = function (...e) {
    //   Object.defineProperties(this, s);
    //   if (t) {
    //     t.apply(this, e);
    //   }
    // };
    e.created = function (...args) {
      if (o) {
        o.apply(this, args);
      }
      i.forEach(({ key }) => {
        const t = `default${key.replace(/^(\w)/, (e, t) => t.toUpperCase())}`;
        const tDataKey = getInnerControlledValue(key);
        const o = this;
        this[tDataKey] = this[key];

        if (null == o[key]) {
          this._selfControlled = true;
        }
        if (null == o[key] && null != o[t]) {
          // this[e] = o[t];
          this[tDataKey] = o[t];
          // e.props[key].default = o[t];
          // this.setData({
          //   [e]: o[t],
          // });
        } else {

        }
      });
    };
    e.methods._trigger = function (e, t, o) {
      const s = i.find(t => t.event === e);

      if (s) {
        const { key } = s;
        if (this._selfControlled) {
          const tDataKey = getInnerControlledValue(key);
          this[tDataKey] = t[key];
          // this.setData({
          //   [key]: t[key],
          // });
        }
      }
      this.$emit(
        e,
        t,
        o,
      );
    };
  }
  return e;
};
export const wxComponent = function () {
  return function (e) {
    const t = new (class extends e {})();


    t.options = t.options || {};
    if (canUseVirtualHost()) {
      t.options.virtualHost = true;
    }
    const o = toComponent(t);
    // export default o;
    return o;
  };
};

export const uniComponent = function (info) {
  info.options = info.options || {};

  info.props = {
    ...getExternalClasses(info),
    ...(info.props || {}),
  };

  if (canUseVirtualHost()) {
    info.options.virtualHost = true;
  }

  if (!info.options.styleIsolation) {
    info.options.styleIsolation = 'shared';
  }

  info.options.multipleSlots = true;

  const o = toComponent(info);
  return o;
};


function getExternalClasses(info) {
  if (!info.externalClasses) {
    return {};
  }
  const { externalClasses } = info;
  const list = Array.isArray(externalClasses) ? externalClasses : [externalClasses];

  return list.reduce((acc, item) => ({
    ...acc,
    [toCamel(item)]: {
      type: String,
      default: '',
    },
  }), {});
}
