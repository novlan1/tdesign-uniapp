/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

export interface FormErrorMessage {
  /**
   * 布尔类型校验不通过时的表单项显示文案，全局配置默认是：`'${name}数据类型必须是布尔类型'`
   * @default ''
   */
  boolean?: string;
  /**
   * 日期校验规则不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'`
   * @default ''
   */
  date?: string;
  /**
   * 枚举值校验规则不通过时的表单项显示文案，全局配置默认是：`${name}只能是${validate}等`
   * @default ''
   */
  enum?: string;
  /**
   * 身份证号码校验不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'`
   * @default ''
   */
  idcard?: string;
  /**
   * 值长度校验不通过时的表单项显示文案，全局配置默认是：`'${name}字符长度必须是 ${validate}'`
   * @default ''
   */
  len?: string;
  /**
   * 值的长度太长或值本身太大时，校验不通过的表单项显示文案，全局配置默认是：`'${name}字符长度不能超过 ${validate} 个字符，一个中文等于两个字符'`
   * @default ''
   */
  max?: string;
  /**
   * 值的长度太短或值本身太小时，校验不通过的表单项显示文案，全局配置默认是：`'${name}字符长度不能少于 ${validate} 个字符，一个中文等于两个字符'`
   * @default ''
   */
  min?: string;
  /**
   * 数字类型校验不通过时的表单项显示文案，全局配置默认是：`'${name}必须是数字'`
   * @default ''
   */
  number?: string;
  /**
   * 正则表达式校验不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'`
   * @default ''
   */
  pattern?: string;
  /**
   * 没有填写必填项时的表单项显示文案，全局配置默认是：`'${name}必填'`
   * @default ''
   */
  required?: string;
  /**
   * 手机号号码校验不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'`
   * @default ''
   */
  telnumber?: string;
  /**
   * 链接校验规则不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'`
   * @default ''
   */
  url?: string;
  /**
   * 自定义校验规则校验不通过时的表单项显示文案，全局配置默认是：'${name}不符合要求'
   * @default ''
   */
  validator?: string;
  /**
   * 值为空格校验不通过时表单项显示文案，全局配置默认是：`'${name}不能为空`
   * @default ''
   */
  whitespace?: string;
}
