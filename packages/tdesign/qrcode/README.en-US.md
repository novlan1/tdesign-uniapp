# QRCode (Vue2 Version)

A component that can convert text into QR codes, supporting custom colors and Logo configuration.

## Description

This component is a Vue2 single-file component version converted from the mini-program version, maintaining the original functional logic and style implementation.

## Key Features

- ✅ Fully retains original functional logic
- ✅ Converted to Vue single-file component format
- ✅ Styles imported via @import from separate less files
- ✅ Component-level style isolation (scoped)
- ✅ Supports custom colors and Logo
- ✅ Supports multiple QR code states (active/expired/loading/scanned)
- ✅ Supports error correction level configuration

## Component Structure

```
qrcode-vue2/
├── qrcode.vue                          # Main component
├── qrcode.less                         # Main component styles
├── props.ts                            # Property definitions
├── type.ts                             # Type definitions
├── hooks/
│   └── useQRCode.ts                    # QR code generation logic
└── components/
    ├── qrcode-canvas/                  # Canvas rendering sub-component
    │   ├── qrcode-canvas.vue
    │   ├── qrcode-canvas.less
    │   ├── props.ts
    │   └── type.ts
    └── qrcode-status/                  # Status display sub-component
        ├── qrcode-status.vue
        ├── qrcode-status.less
        ├── props.ts
        └── type.ts
```

## Usage Example

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
      console.log('Refresh QR code');
    },
  },
};
</script>
```

## Props

| Name | Type | Default | Description | Required |
| -- | -- | -- | -- | -- |
| bgColor | String | '' | QR code background color | N |
| borderless | Boolean | false | Whether there is a border | N |
| color | String | '' | QR code color | N |
| icon | String | '' | The address of the image in the QR code | N |
| iconSize | Number / Object | 40 | The size of the image in the QR code | N |
| level | String | 'M' | QR code error correction level (L/M/Q/H) | N |
| size | Number | 160 | QR code size | N |
| status | String | 'active' | QR code status (active/expired/loading/scanned) | N |
| value | String | '' | Text after scanning | N |

## Events

| Name | Parameters | Description |
| -- | -- | -- |
| refresh | - | Callback for clicking "Click to refresh" |

## Conversion Notes

### Main Changes from Mini-Program to Vue2

1. **Template Syntax Conversion**
   - `wx:if` → `v-if`
   - `wx:elif` → `v-else-if`
   - `wx:else` → `v-else`
   - `bindtap` → `@click`
   - `bind:event` → `@event`

2. **Component References**
   - Mini-program's `usingComponents` → Vue's `components`
   - Component tags remain in kebab-case

3. **Style Processing**
   - Each Vue file imports corresponding less file via `@import` at the bottom
   - Uses `scoped` for component-level style isolation

4. **Lifecycle**
   - `lifetimes.ready` → `mounted`
   - `lifetimes.attached` → `mounted`

5. **Data Binding**
   - `properties` → `props`
   - `data` → `data()`
   - `methods` → `methods`

## Notes

1. This component retains compatibility checks for mini-program APIs and automatically adapts in non-mini-program environments
2. Canvas rendering logic has been adapted for Vue environment
3. Style files remain independent for easy maintenance and reuse
4. All type definitions are fully retained to ensure type safety

## FAQ

### About QR Code Error Correction Levels

Error correction level, also known as error correction rate, refers to the ability of a QR code to be scanned normally after being partially obscured. The maximum area that can be obscured is the error correction rate.

QR codes are typically divided into 4 error correction levels:
- `L level` can correct approximately `7%` errors
- `M level` can correct approximately `15%` errors
- `Q level` can correct approximately `25%` errors
- `H level` can correct approximately `30%` errors

### Generated QR Code Cannot Be Scanned?

If the QR code cannot be scanned, it may be because the link address is too long, causing the pixels to be too dense. You can configure a larger QR code through `size`, or shorten the link through URL shortening services.
