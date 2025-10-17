# QRCode 二维码 (Vue2 版本)

二维码能够将文本转换生成二维码的组件，支持自定义配色和 Logo 配置。

## 说明

本组件是从小程序版本转换而来的 Vue2 单文件组件版本，保持了原有的功能逻辑和样式实现。

## 主要特性

- ✅ 完整保留原有功能逻辑
- ✅ 转换为 Vue 单文件组件格式
- ✅ 样式通过 @import 引入独立 less 文件
- ✅ 组件级样式隔离（scoped）
- ✅ 支持自定义配色和 Logo
- ✅ 支持多种二维码状态（active/expired/loading/scanned）
- ✅ 支持纠错等级配置

## 组件结构

```
qrcode-vue2/
├── qrcode.vue                          # 主组件
├── qrcode.less                         # 主组件样式
├── props.ts                            # 属性定义
├── type.ts                             # 类型定义
├── hooks/
│   └── useQRCode.ts                    # 二维码生成逻辑
└── components/
    ├── qrcode-canvas/                  # Canvas 绘制子组件
    │   ├── qrcode-canvas.vue
    │   ├── qrcode-canvas.less
    │   ├── props.ts
    │   └── type.ts
    └── qrcode-status/                  # 状态显示子组件
        ├── qrcode-status.vue
        ├── qrcode-status.less
        ├── props.ts
        └── type.ts
```

## 使用示例

```vue
<template>
  <t-qrcode
    :value="qrcodeValue"
    :size="200"
    :level="'M'"
    :icon="iconUrl"
    :status="status"
    @refresh="handleRefresh"
  />
</template>

<script>
import TQrcode from './qrcode-vue2/qrcode.vue';

export default {
  components: {
    TQrcode,
  },
  data() {
    return {
      qrcodeValue: 'https://tdesign.tencent.com/',
      iconUrl: '',
      status: 'active',
    };
  },
  methods: {
    handleRefresh() {
      console.log('刷新二维码');
    },
  },
};
</script>
```

## Props

| 名称 | 类型 | 默认值 | 说明 | 必传 |
| -- | -- | -- | -- | -- |
| bgColor | String | '' | 二维码背景颜色 | N |
| borderless | Boolean | false | 是否有边框 | N |
| color | String | '' | 二维码颜色 | N |
| icon | String | '' | 二维码中图片的地址 | N |
| iconSize | Number / Object | 40 | 二维码中图片的大小 | N |
| level | String | 'M' | 二维码纠错等级（L/M/Q/H） | N |
| size | Number | 160 | 二维码大小 | N |
| status | String | 'active' | 二维码状态（active/expired/loading/scanned） | N |
| value | String | '' | 扫描后的文本 | N |

## Events

| 名称 | 参数 | 描述 |
| -- | -- | -- |
| refresh | - | 点击"点击刷新"的回调 |

## 转换说明

### 从小程序到 Vue2 的主要变更

1. **模板语法转换**
   - `wx:if` → `v-if`
   - `wx:elif` → `v-else-if`
   - `wx:else` → `v-else`
   - `bindtap` → `@click`
   - `bind:event` → `@event`

2. **组件引用**
   - 小程序的 `usingComponents` → Vue 的 `components`
   - 组件标签从 kebab-case 保持不变

3. **样式处理**
   - 每个 Vue 文件底部通过 `@import` 引入对应的 less 文件
   - 使用 `scoped` 实现组件级样式隔离

4. **生命周期**
   - `lifetimes.ready` → `mounted`
   - `lifetimes.attached` → `mounted`

5. **数据绑定**
   - `properties` → `props`
   - `data` → `data()`
   - `methods` → `methods`

## 注意事项

1. 本组件保留了小程序 API 的兼容性判断，在非小程序环境中会自动适配
2. Canvas 绘制逻辑已适配 Vue 环境
3. 样式文件保持独立，便于维护和复用
4. 所有类型定义完整保留，确保类型安全

## FAQ

### 关于二维码纠错等级

纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。

通常情况下二维码分为 4 个纠错级别：
- `L级` 可纠正约 `7%` 错误
- `M级` 可纠正约 `15%` 错误
- `Q级` 可纠正约 `25%` 错误
- `H级` 可纠正约 `30%` 错误

### 生成的二维码无法扫描？

若二维码无法扫码识别，可能是因为链接地址过长导致像素过于密集，可以通过 `size` 配置二维码更大，或者通过短链接服务等方式将链接变短。
