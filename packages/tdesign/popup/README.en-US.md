:: BASE_DOC ::

## API

### Popup Props

name | type | default | description | required
-- | -- | -- | -- | --
customStyle | Object | - | CSS(Cascading Style Sheets) | N
closeBtn | Boolean / TNode | - | Typescript：`boolean \| TNode`。[see more ts definition](https://github.com/novlan1/tdesign-uniapp/blob/develop/packages/tdesign/common/common.ts) | N
closeOnOverlayClick | Boolean | true | \- | N
content | String / TNode | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/novlan1/tdesign-uniapp/blob/develop/packages/tdesign/common/common.ts) | N
duration | Number | 240 | \- | N
overlayProps | Object | {} | Typescript：`OverlayProps`，[Overlay API Documents](./overlay?tab=api)。[see more ts definition](https://github.com/novlan1/tdesign-uniapp/blob/develop/packages/tdesign/popup/type.ts) | N
placement | String | top | options: top/left/right/bottom/center | N
preventScrollThrough | Boolean | true | \- | N
showOverlay | Boolean | true | \- | N
usingCustomNavbar | Boolean | false | \- | N
visible | Boolean | - | `v-model:visible` is supported。Typescript：`boolean` | N
defaultVisible | Boolean | - | uncontrolled property。Typescript：`boolean` | N
zIndex | Number | 11500 | \- | N

### Popup Events

name | params | description
-- | -- | --
visible-change | `(visible: boolean, trigger: PopupSource) ` | [see more ts definition](https://github.com/novlan1/tdesign-uniapp/blob/develop/packages/tdesign/popup/type.ts)。<br/>`type PopupSource = 'close-btn' \| 'overlay'`<br/>

### Popup Slots

name | Description
-- | --
- | \-

### Popup External Classes

className | Description
-- | --
t-class | \-
t-class-content | \-

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.
Name | Default Value | Description 
-- | -- | --
--td-popup-bg-color | @bg-color-container | - 
--td-popup-border-radius | @radius-extraLarge | - 
--td-popup-close-btn-color | @text-color-primary | - 
--td-popup-distance-top | 0) | - 
--td-popup-transition | all 300ms ease | -