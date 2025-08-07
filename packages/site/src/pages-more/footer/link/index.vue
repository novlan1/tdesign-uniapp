<template>
<view>
<!-- theme 为 text，含有底部链接 -->
<view class="footer-example">
  <t-footer :text="text" :links="links[0]"/>
</view>

<view class="footer-example">
  <t-footer :text="text" :links="links[1]"/>
</view>

</view>
</template>

<script >
import tFooter from "tdesign-uniapp/footer/footer";
export default {
                    components: {
                                        tFooter
                    },
                    data() {
return {
text: 'Copyright © 2021-2031 TD.All Rights Reserved.',
links: [[{
name: '底部链接',
url: '/pages/index',
openType: 'navigate'
}], [{
name: '底部链接',
url: '/pages/index',
openType: 'navigate'
}, {
name: '底部链接',
url: '',
openType: 'navigateBack'
}]]
};
}, 
methods: {}, 
created: function() {}
                };
</script>
<style >
@import "./index.css";
</style>
