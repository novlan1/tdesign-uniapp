import _set from '../utils/_set';
import debounce from '../utils/debounce';

/**
 * 老setData polyfill
 * 用于转换后的uniapp的项目能直接使用this.setData()函数
 * @param {*} obj
 * @param {*} callback
 */
function oldSetData(obj, callback) {
  const that = this;
  const handleData = (tepData, tepKey, afterKey) => {
    let tepData2 = tepData;
    tepKey = tepKey.split('.');
    tepKey.forEach((item) => {
      if (tepData[item] === null || tepData[item] === undefined) {
        const reg = /^[0-9]+$/;
        tepData[item] = reg.test(afterKey) ? [] : {};
        tepData2 = tepData[item];
      } else {
        tepData2 = tepData[item];
      }
    });
    return tepData2;
  };
  const isFn = function (value) {
    return typeof value === 'function' || false;
  };
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    key = key.replace(/\]/g, '').replace(/\[/g, '.');
    let front; let after;
    const index_after = key.lastIndexOf('.');
    if (index_after != -1) {
      after = key.slice(index_after + 1);
      front = handleData(that, key.slice(0, index_after), after);
    } else {
      after = key;
      front = that;
    }
    if (front.$data && front.$data[after] === undefined) {
      Object.defineProperty(front, after, {
        get() {
          return front.$data[after];
        },
        set(newValue) {
          front.$data[after] = newValue;
          that.hasOwnProperty('$forceUpdate') && that.$forceUpdate();
        },
        enumerable: true,
        configurable: true,
      });
      front[after] = val;
    } else {
      that.$set(front, after, val);
    }
  });
  // this.$forceUpdate();
  isFn(callback) && this.$nextTick(callback);
}

/**
 * 变量名正则
 */
const variableNameReg = /^([^\x00-\xff]|[a-zA-Z_$])([^\x00-\xff]|[a-zA-Z0-9_$])*$/;


/**
 * 2022-10-31 重写setData
 * 2023-05-08 增加微信“简易双向绑定”支持
 * 用于转换后的uniapp的项目能直接使用this.setData()函数
 * @param {Object} obj
 * @param {Object} callback
 */
export function setData(obj, callback = null) {
  console.log('this', this);
  Object.keys(obj).forEach((key) => {
    _set(this, key, obj[key]);

    // 处理微信“简易双向绑定”
    if (variableNameReg.test(key) && key.endsWith('Clone')) {
      const propName = key.replace(/Clone$/, '');
      if (this.$options && this.$options.propsData[propName]) {
        this.$emit(`update:${propName}`, obj[key]);
      }
    }
  });

  this.$forceUpdate?.();
  if (typeof callback === 'function') this.$nextTick(callback);
}
