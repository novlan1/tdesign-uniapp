/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import type { TdIsEmailOptions as IsEmailOptions } from 'validator/es/lib/isEmail';
import type { TdIsURLOptions as IsURLOptions } from 'validator/es/lib/isURL';

export interface FormRule {
  /**
   * 内置校验方法，校验值类型是否为布尔类型，示例：`{ boolean: true, message: '数据类型必须是布尔类型' }`
   */
  boolean?: boolean;
  /**
   * 内置校验方法，校验值是否为日期格式，[参数文档](https://github.com/validatorjs/validator.js)，示例：`{ date: { delimiters: '-' }, message: '日期分隔线必须是短横线（-）' }`
   */
  date?: boolean | IsDateOptions;
  /**
   * 内置校验方法，校验值是否为邮件格式，[参数文档](https://github.com/validatorjs/validator.js)，示例：`{ email: { ignore_max_length: true }, message: '请输入正确的邮箱地址' }`
   */
  email?: boolean | IsEmailOptions;
  /**
   * 内置校验方法，校验值是否属于枚举值中的值。示例：`{ enum: ['primary', 'info', 'warning'], message: '值只能是 primary/info/warning 中的一种' }`
   */
  enum?: Array<string>;
  /**
   * 内置校验方法，校验值是否为身份证号码，组件校验正则为 `/^(\\d{18,18}|\\d{15,15}|\\d{17,17}x)$/i`，示例：`{ idcard: true, message: '请输入正确的身份证号码' }`
   */
  idcard?: boolean;
  /**
   * 内置校验方法，校验值固定长度，如：len: 10 表示值的字符长度只能等于 10 ，中文表示 2 个字符，英文为 1 个字符。示例：`{ len: 10, message: '内容长度不对' }`。<br />如果希望字母和中文都是同样的长度，示例：`{ validator: (val) => val.length === 10, message: '内容文本长度只能是 10 个字' }`
   */
  len?: number | boolean;
  /**
   * 内置校验方法，校验值最大长度，如：max: 100 表示值最多不能超过 100 个字符，中文表示 2 个字符，英文为 1 个字符。示例：`{ max: 10, message: '内容超出' }`。<br />如果希望字母和中文都是同样的长度，示例：`{ validator: (val) => val.length <= 10, message: '内容文本长度不能超过 10 个字' }`<br />如果数据类型数字（Number），则自动变为数字大小的比对
   */
  max?: number | boolean;
  /**
   * 校验未通过时呈现的错误信息，值为空则不显示
   * @default ''
   */
  message?: string;
  /**
   * 内置校验方法，校验值最小长度，如：min: 10 表示值最多不能少于 10 个字符，中文表示 2 个字符，英文为 1 个字符。示例：`{ min: 10, message: '内容长度不够' }`。<br />如果希望字母和中文都是同样的长度，示例：`{ validator: (val) => val.length >= 10, message: '内容文本长度至少为 10 个字' }`。<br />如果数据类型数字（Number），则自动变为数字大小的比对
   */
  min?: number | boolean;
  /**
   * 内置校验方法，校验值是否为数字（1.2 、 1e5  都算数字），示例：`{ number: true, message: '请输入数字' }`
   */
  number?: boolean;
  /**
   * 内置校验方法，校验值是否符合正则表达式匹配结果，示例：`{ pattern: /@qq.com/, message: '请输入 QQ 邮箱' }`
   */
  pattern?: RegExp | string;
  /**
   * 内置校验方法，校验值是否已经填写。该值为 true，默认显示必填标记，可通过设置 `requiredMark: false` 隐藏必填标记
   */
  required?: boolean;
  /**
   * 内置校验方法，校验值是否为手机号码，校验正则为 `/^1[3-9]\d{9}$/`，示例：`{ telnumber: true, message: '请输入正确的手机号码' }`
   */
  telnumber?: boolean;
  /**
   * 校验触发方式
   * @default change
   */
  trigger?: ValidateTriggerType;
  /**
   * 校验未通过时呈现的错误信息类型，有 告警信息提示 和 错误信息提示 等两种
   * @default error
   */
  type?: 'error' | 'warning';
  /**
   * 内置校验方法，校验值是否为网络链接地址，[参数文档](https://github.com/validatorjs/validator.js)，示例：`{ url: { protocols: ['http','https','ftp'] }, message: '请输入正确的 Url 地址' }`
   */
  url?: boolean | IsURLOptions;
  /**
   * 自定义校验规则，示例：`{ validator: (val) => val.length > 0, message: '请输入内容'}`
   */
  validator?: CustomValidator;
  /**
   * 内置校验方法，校验值是否为空格。示例：`{ whitespace: true, message: '值不能为空' }`
   */
  whitespace?: boolean;
}

export interface IsDateOptions {
  format: string;
  strictMode: boolean;
  delimiters: string[];
}

export type CustomValidator = (val: ValueType) => CustomValidateResolveType | Promise<CustomValidateResolveType>;

export type CustomValidateResolveType = boolean | CustomValidateObj;

export interface CustomValidateObj {
  result: boolean;
  message: string;
  type?: 'error' | 'warning' | 'success';
}

export type ValueType = any;
