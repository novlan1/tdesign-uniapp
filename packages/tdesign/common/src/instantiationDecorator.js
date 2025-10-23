/* eslint-disable no-param-reassign */
import { isPlainObject } from '../validator';
import { canUseVirtualHost } from '../version';
import { toCamel } from '../utils';

const getInnerControlledValue = key => `data${key.replace(/^(\w)/, (e, t) => t.toUpperCase())}`;


export const toComponent = function (options) {
  if (!options.properties && options.props) {
    options.properties = options.props;
  }

  const { externalClasses = [] } = options;

  if (options.properties) {
    Object.keys(options.properties).forEach((k) => {
      let opt = options.properties[k];
      // 如果不是 Object 类型，则默认指定 type = options.properties[k]；
      if (!isPlainObject(opt)) {
        opt = { type: opt };
      }
      options.properties[k] = opt;
    });

    // 内置 aria 相关属性
    const ariaProps = [
      { key: 'ariaHidden', type: Boolean },
      { key: 'ariaRole', type: String },
      { key: 'ariaLabel', type: String },
      { key: 'ariaLabelledby', type: String },
      { key: 'ariaDescribedby', type: String },
      { key: 'ariaBusy', type: Boolean },
    ];
    ariaProps.forEach(({ key, type }) => {
      options.properties[key] = {
        type,
      };
    });

    // 处理 style 和 customStyle 属性
    options.properties.style = { type: String, value: '' };
    options.properties.customStyle = { type: String, value: '' };
  }

  if (!options.methods) options.methods = {};

  if (!options.lifetimes) options.lifetimes = {};

  options.externalClasses = ['class', ...externalClasses];

  const oldCreated = options.created;
  const { controlledProps = [] } = options;

  options.created = function (...args) {
    if (oldCreated) {
      oldCreated.apply(this, args);
    }
    controlledProps.forEach(({ key }) => {
      const defaultKey = `default${key.replace(/^(\w)/, (e, t) => t.toUpperCase())}`;
      const tDataKey = getInnerControlledValue(key);
      this[tDataKey] = this[key];

      if (this[key] == null) {
        this._selfControlled = true;
      }

      if (this[key] == null && this[defaultKey] != null) {
        this[tDataKey] = this[defaultKey];
      }
    });
  };

  options.methods._trigger = function (evtName, detail, opts) {
    const target = controlledProps.find(item => item.event === evtName);

    if (target) {
      const { key } = target;
      if (this._selfControlled) {
        const tDataKey = getInnerControlledValue(key);
        this[tDataKey] = detail[key];
      }
    }

    this.$emit(
      evtName,
      detail,
      opts,
    );
  };
  return options;
};


/**
 * 将一个继承了 BaseComponent 的类转化成 小程序 Component 的调用
 * 根据最新的微信 d.ts 描述文件，Component 在实例化的时候，会忽略不支持的自定义属性
 */
export const wxComponent = function wxComponent() {
  return function (baseConstructor) {
    class WxComponent extends baseConstructor {
      // 暂时移除了冗余的代码，后续补充
    }

    const current = new WxComponent();

    current.options = current.options || {};

    // 所有组件默认都开启css作用域
    // 写到这里是为了防止组件设置 options 时无意覆盖掉了 addGlobalClass
    // 使用 "styleIsolation": "apply-shared" 代替 addGlobalClass: true，see https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/glass-easel/migration.html#JSON-%E9%85%8D%E7%BD%AE
    // if (current.options.addGlobalClass === undefined) {
    //   current.options.addGlobalClass = true;
    // }

    if (canUseVirtualHost()) {
      current.options.virtualHost = true;
    }

    // const obj = toComponent(toObject(current));
    const obj = toComponent(current);

    // Component(obj);
    return obj;
  };
};


export const uniComponent = function (info) {
  info.props = {
    ...getExternalClasses(info),
    ...(info.props || {}),
  };

  info.options = {
    ...(info.options || {}),
    multipleSlots: true,
  };

  if (canUseVirtualHost()) {
    info.options.virtualHost = true;
  }

  if (!info.options.styleIsolation) {
    info.options.styleIsolation = 'shared';
  }

  const obj = toComponent(info);
  return obj;
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
