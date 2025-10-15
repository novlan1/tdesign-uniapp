---
title: Cascader 级联选择器
description: 级联选择器适用于有清晰层级结构的数据集合，用户可以通过逐级查看并选择。
spline: form
isComponent: true
---


## 引入

可在 `main.ts` 或在需要使用的页面或组件中引入。

```js
import TCascader from 'tdesign-uniapp/cascader/cascader.vue';
```

### 基础用法

{{ base }}

### 选项卡风格

{{ theme-tab }}

### 进阶

#### 带初始值

{{ with-value }}

#### 自定义 keys

{{ keys }}

#### 使用次级标题

{{ with-title }}

#### 选择任意一项

{{ check-strictly }}

## API

### Cascader Props

| 名称 | 类型 | 默认值 | 描述 | 必传 |
| -- | -- | -- | -- | -- |
| style | Object | - | 样式 | N |
| custom-style | Object | - | 样式，一般用于开启虚拟化组件节点场景 | N |
| check-strictly | Boolean | false | 父子节点选中状态不再关联，可各自选中或取消 | N |
| close-btn | Boolean / Slot | true | 关闭按钮。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/blob/develop/packages/components/common/common.ts) | N |
| header | Slot | - | `1.9.1`。头部。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/blob/develop/packages/components/common/common.ts) | N |
| keys | Object | - | 用来定义 value / label 在 `options` 中对应的字段别名。TS 类型：`KeysType`。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/blob/develop/packages/components/common/common.ts) | N |
| middle-content | Slot | - | 中间内容。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/blob/develop/packages/components/common/common.ts) | N |
| options | Array | [] | 可选项数据源。TS 类型：`Array<CascaderOption>` | N |
| placeholder | String | 选择选项 | 未选中时的提示文案 | N |
| sub-titles | Array | [] | 每级展示的次标题。TS 类型：`Array<string>` | N |
| theme | String | step | 展示风格。可选项：step/tab | N |
| title | String / Slot | - | 标题。[通用类型定义](https://github.com/Tencent/tdesign-miniprogram/blob/develop/packages/components/common/common.ts) | N |
| value | String / Number | null | 选项值 | N |
| default-value | String / Number | undefined | 选项值。非受控属性 | N |
| visible | Boolean | false | 是否展示 | N |

### Cascader Events

| 名称 | 参数 | 描述 |
| -- | -- | -- | 
| change | `(value: string \| number, selectedOptions: string[])` | `1.0.1`。值发生变更时触发 |
| close | `(trigger: CascaderTriggerSource)` | `1.0.1`。关闭时触发。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/blob/develop/packages/components/cascader/type.ts)。<br/>`type CascaderTriggerSource = 'overlay' \| 'close-btn' \| 'finish'`<br/> |
| pick | `(value: string \| number, label: string, index: number, level: number)` | `1.0.1`。选择后触发 |

### CSS Variables

组件提供了下列 CSS 变量，可用于自定义样式。
| 名称 | 默认值 | 描述 |
| -- | -- | -- | 
| --td-cascader-active-color | @brand-color | - |
| --td-cascader-bg-color | @bg-color-container | - |
| --td-cascader-border-color | @component-stroke | - |
| --td-cascader-content-height | 78vh | - |
| --td-cascader-disabled-color | @text-color-disabled | - |
| --td-cascader-options-height | calc(100% - @cascader-step-height) | - |
| --td-cascader-options-title-color | @text-color-placeholder | - |
| --td-cascader-step-arrow-color | @text-color-placeholder | - |
| --td-cascader-step-dot-size | 16rpx | - |
| --td-cascader-step-height | 88rpx | - |
| --td-cascader-title-color | @text-color-primary | - |
| --td-cascader-title-height | 26rpx | - |
| --td-cascader-title-padding | @spacer-2 | - |
| --td-cascder-title-font-size | 36rpx | - |
