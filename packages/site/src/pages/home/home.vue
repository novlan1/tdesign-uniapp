<template>
  <!-- <TNavbar title="TDesign UI" /> -->
  <view class="main">
    <view class="title-wrap">
      <image
        class="title-icon"
        mode="aspectFit"
        :src="`/assets/${theme === 'dark' ? 'TDesign-logo_dark' : 'TDesign-logo_light'}.png`"
        aria-label="TDesign Logo"
      />
    </view>
    <view class="desc">
      TDesign 适配 uni-app 的组件库{{ isSkyline?' (skyline render)':'' }}
      <text
        v-if="!isSkyline && showTrySkyline"
        class="skyline-entry"
        @click="goSkyline"
      >
        try skyline
      </text>
    </view>
    <PullDownList
      v-for="item of list"
      :key="item.name"
      :name="item.name"
      :icon="item.icon"
      :child-arr="item.childArr"
      @click="clickHandle"
    />
  </view>
  <view class="footer">
    <view
      class="show_privacy"
      @click="showPrivacyWin"
    >
      《TDesign组件库服务声明》
    </view>
    <TFooter text="该小程序仅演示示例，不收集个人信息。" />
    <TFooter :text="`Copyright © 1998 - ${currentYear} All Rights Reserved`" />
  </view>
  <TrdPrivacy
    ref="trdPrivacy"
    name="TDesign组件库"
    date="2023年11月14日"
    :win-style="winStyle"
  />
</template>

<script lang="ts" setup>
import TFooter from 'tdesign-uniapp/footer/footer';
// import TNavbar from 'tdesign-uniapp/navbar/navbar';
import { useTheme } from 'tdesign-uniapp/mixins/theme-change';

import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import { list as dataList, skylineList } from './data/index';
import PullDownList from '../../components/pull-down-list/index.vue';
import TrdPrivacy from '../../components/trd-privacy/index.vue';

interface PageItem {
  name: string;
  icon: string;
  childArr: ComponentItem[];
}

interface ComponentItem {
  name: string;
  label: string;
}

const list = ref<PageItem[]>([]);
const currentYear = new Date().getFullYear();
const isSkyline = ref(false);

// just focus on webview
const showTrySkyline = ref(false);

const trdPrivacy = ref<any>(null);
const { theme } = useTheme();
const winStyle = ref(false);

onLoad((options) => {
  const { q, skyline: querySkyline } = options || {};

  let compList: PageItem[] = [];
  isSkyline.value = !!querySkyline;
  if (querySkyline) {
    compList = skylineList;
  } else {
    compList = dataList;
  }

  list.value = compList;

  // 小程序跳转各个小程序组件库
  if (q) {
    const str = getQueryByUrl(decodeURIComponent(q));
    uni.navigateTo({
      url: `/pages/${str.page}/${str.page}`,
    });
  }
});

const showPrivacyWin = () => {
  trdPrivacy.value?.showPrivacyWin();
};

const clickHandle = (item) => {
  if (!item) {
    console.error('clickHandle: item is undefined');
    return;
  }

  let { name, path = '' } = item as {
      name: string;
      path?: string;
    };

  // 确保name存在
  if (!name) {
    console.error('clickHandle: name is undefined', item);
    return;
  }

  if (!path) {
    name = name.replace(/^[A-Z]/, match => `${match}`.toLocaleLowerCase());
    name = name.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);

    path = `/pages-more/${name}/${isSkyline.value ? 'skyline/' : ''}${name}`;
  }

  uni.navigateTo({
    url: path,
    fail: () => {
      uni.navigateTo({
        url: '/pages/home/navigate-fail/index',
      });
    },
  });
};

defineOptions({
  onShareAppMessage() {
    return {
      title: 'TDesign UI',
      path: '/pages/home/home',
    };
  },
});


const getQueryByUrl = (url: string) => {
  const data: { page?: string } = {};
  const queryArr = `${url}`.match(/([^=&#?]+)=[^&#]+/g) || [];
  // 必须是合法字符串
  if (queryArr.length) {
    queryArr.forEach((para) => {
      const d = para.split('=');
      const val = decodeURIComponent(d[1]);
      if (data[d[0]] !== undefined) {
        data[d[0]] += `,${val}`;
      } else {
        data[d[0]] = val;
      }
    });
  }
  return data;
};


const goSkyline = () => {
  uni.navigateTo({
    url: '/pages/home/home?skyline=1',
  });
};

</script>
<style lang="less" src="./home.less"></style>
