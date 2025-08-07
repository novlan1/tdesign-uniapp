<template>
<view>
<!-- 基础页脚 只有版权信息 -->
<t-footer :text="text"></t-footer>

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
text: 'Copyright © 2021-2031 TD.All Rights Reserved.'
};
}, 
methods: {}, 
created: function() {}
                };
</script>
<style >
@import "./index.css";
</style>
