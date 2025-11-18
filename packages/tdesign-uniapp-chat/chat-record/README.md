## API
### ChatRecord Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
### 事件

事件名 | 说明 | 回调参数
-- | -- | --
recognize | 发送消息 | msg:string



### 插槽

插槽名 | 说明
-- | --
speechInput | 自定义语音输入按钮内容
speechNoAuth | 自定义未授权麦克风时的提示内容

### 示例用法

```vue
<template>
  <chat-record
    @recognize="handleRecognize"
  >
    <template #speechInput>
      <view>按住说话</view>
    </template>
    <template #speechNoAuth>
      <view>请授权麦克风权限</view>
    </template>
  </chat-record>
</template>

<script>
export default {
  methods: {
    handleRecognize(msg){
      console.log("msg", msg)
    }
  },
};
</script>
```