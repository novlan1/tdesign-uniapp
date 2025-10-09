<template>
  <view>
    <t-button
      variant="outline"
      block
      size="large"
      theme="primary"
      @click="openDrawerBase"
    >
      带标题抽屉
    </t-button>

    <t-drawer
      :visible="visible"
      :placement="placement"
      title="标题"
      :items="sidebar"
      using-custom-navbar
      @overlay-click="overlayClick"
      @item-click="itemClick"
    />
  </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tDrawer from 'tdesign-uniapp/drawer/drawer';
export default {
  components: {
    tButton,
    tDrawer,
  },
  data() {
    return {
      placement: 'left',
      sidebar: [],

      baseSidebar: [
        {
          title: '菜单一',
        },
        {
          title: '菜单二',
        },
        {
          title: '菜单三',
        },
        {
          title: '菜单四',
        },
        {
          title: '菜单五',
        },
        {
          title: '菜单六',
        },
        {
          title: '菜单七',
        },
        {
          title: '菜单八',
        },
      ],

      visible: false,
    };
  },
  created() {},
  methods: {
    openDrawerBase() {
      this.setData({
        visible: true,
        sidebar: this.baseSidebar,
      });
    },
    itemClick(e) {
      console.log(e.detail);
    },
    overlayClick(e) {
      console.log(e.detail);
    },
  },
};
</script>
<style>
@import './index.css';
</style>
