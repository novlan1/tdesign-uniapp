/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import type { FormResetEvent, FormSubmitEvent } from '../common/common';

export interface TdFormProps<FormData extends Data = Data> {
  /**
   * 是否在表单标签字段右侧显示冒号
   * @default false
   */
  colon?: boolean;
  /**
   * 表单数据
   * @default {}
   */
  data?: FormData;
  /**
   * 是否禁用整个表单
   */
  disabled?: boolean;
  /**
   * 表单错误信息配置，示例：`{ idcard: '请输入正确的身份证号码', max: '字符长度不能超过 ${max}' }`
   */
  errorMessage?: FormErrorMessage;
  /**
   * 表单字段标签对齐方式：左对齐、右对齐、顶部对齐
   * @default right
   */
  labelAlign?: 'left' | 'right' | 'top';
  /**
   * 可以整体设置label标签宽度，默认为81px
   * @default '81px'
   */
  labelWidth?: string | number;
  /**
   * 是否整个表单只读
   */
  readonly?: boolean;
  /**
   * 是否显示必填符号（*），默认显示
   */
  requiredMark?: boolean;
  /**
   * 表单必填符号（*）显示位置
   */
  requiredMarkPosition?: 'left' | 'right';
  /**
   * 重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值
   * @default empty
   */
  resetType?: 'empty' | 'initial';
  /**
   * 表单字段校验规则
   */
  rules?: FormRules<FormData>;
  /**
   * 表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动
   */
  scrollToFirstError?: '' | 'smooth' | 'auto';
  /**
   * 校验不通过时，是否显示错误提示信息，统一控制全部表单项。如果希望控制单个表单项，请给 FormItem 设置该属性
   * @default true
   */
  showErrorMessage?: boolean;
  /**
   * 【讨论中】当校验结果只有告警信息时，是否触发 `submit` 提交事件
   * @default false
   */
  submitWithWarningMessage?: boolean;
  /**
   * 表单重置时触发
   */
  onReset?: (context: { e?: FormResetEvent }) => void;
  /**
   * 表单提交时触发。其中 `context.validateResult` 表示校验结果，`context.firstError` 表示校验不通过的第一个规则提醒。`context.validateResult` 值为 `true` 表示校验通过；如果校验不通过，`context.validateResult` 值为校验结果列表。<br />【注意】⚠️ 默认情况，输入框按下 Enter 键会自动触发提交事件，如果希望禁用这个默认行为，可以给输入框添加  enter 事件，并在事件中设置 `e.preventDefault()`
   */
  onSubmit?: (context: SubmitContext<FormData>) => void;
  /**
   * 校验结束后触发，result 值为 true 表示校验通过；如果校验不通过，result 值为校验结果列表
   */
  onValidate?: (result: ValidateResultContext<FormData>) => void;
}

/** 组件实例方法 */
export interface FormInstanceFunctions<FormData extends Data = Data> {
  /**
   * 清空校验结果。可使用 fields 指定清除部分字段的校验结果，fields 值为空则表示清除所有字段校验结果。清除邮箱校验结果示例：`clearValidate(['email'])`
   */
  clearValidate: (fields?: Array<keyof FormData>) => void;
  /**
   * 重置表单，表单里面没有重置按钮`<button type=\"reset\" />`时可以使用该方法，默认重置全部字段为空，该方法会触发 `reset` 事件。<br />如果表单属性 `resetType='empty'` 或者 `reset.type='empty'` 会重置为空；<br />如果表单属性 `resetType='initial'` 或者 `reset.type='initial'` 会重置为表单初始值。<br />`reset.fields` 用于设置具体重置哪些字段，示例：`reset({ type: 'initial', fields: ['name', 'age'] })`
   */
  reset: (params?: FormResetParams<FormData>) => void;
  /**
   * 设置自定义校验结果，如远程校验信息直接呈现。注意需要在组件挂载结束后使用该方法。`FormData` 指表单数据泛型
   */
  setValidateMessage: (message: FormValidateMessage<FormData>) => void;
  /**
   * 提交表单，表单里面没有提交按钮`<button type=\"submit\" />`时可以使用该方法。`showErrorMessage` 表示是否在提交校验不通过时显示校验不通过的原因，默认显示。该方法会触发 `submit` 事件
   */
  submit: (params?: { showErrorMessage?: boolean }) => void;
  /**
   * 校验函数，包含错误文本提示等功能。泛型 `FormData` 表示表单数据 TS 类型。<br/>【关于参数】`params.fields` 表示校验字段，如果设置了 `fields`，本次校验将仅对这些字段进行校验。`params.trigger` 表示本次触发校验的范围，'params.trigger = blur' 表示只触发校验规则设定为 trigger='blur' 的字段，'params.trigger = change' 表示只触发校验规则设定为 trigger='change' 的字段，默认触发全范围校验。`params.showErrorMessage` 表示校验结束后是否显示错误文本提示，默认显示。<br />【关于返回值】返回值为 true 表示校验通过；如果校验不通过，返回值为校验结果列表
   */
  validate: (params?: FormValidateParams) => Promise<FormValidateResult<FormData>>;
}

export type FormRules<T extends Data = any> = { [field in keyof T]?: Array<FormRule> };

export interface SubmitContext<T extends Data = Data> {
  e?: FormSubmitEvent;
  validateResult: FormValidateResult<T>;
  firstError?: string;
  fields?: any;
}

export type FormValidateResult<T> = boolean | ValidateResultObj<T>;

export type ValidateResultObj<T> = { [key in keyof T]: boolean | ValidateResultList };

export type ValidateResultList = Array<AllValidateResult>;

export type AllValidateResult = CustomValidateObj | ValidateResultType;

export interface ValidateResultType extends FormRule {
  result: boolean;
}

export type ValidateResult<T> = { [key in keyof T]: boolean | ErrorList };

export type ErrorList = Array<FormRule>;

export type ValidateResultContext<T extends Data> = Omit<SubmitContext<T>, 'e'>;

export interface FormResetParams<FormData> {
  type?: 'initial' | 'empty';
  fields?: Array<keyof FormData>;
}

export type FormValidateMessage<FormData> = { [field in keyof FormData]: FormItemValidateMessage[] };

export interface FormItemValidateMessage {
  type: 'warning' | 'error';
  message: string;
}

export interface FormValidateParams {
  fields?: Array<string>;
  showErrorMessage?: boolean;
  trigger?: ValidateTriggerType;
}

export type ValidateTriggerType = 'blur' | 'change' | 'submit' | 'all';

export type Data = { [key: string]: any };
