<template>
    <view>
        <t-navbar title="TDesign UI" />
        <view class="main">
            <view class="title-wrap">
                <image class="title-icon" mode="aspectFit" :src="'/assets/' + (theme === 'dark' ? 'TDesign-logo_dark' : 'TDesign-logo_light') + '.png'" aria-label="TDesign Logo" />
            </view>
            <view class="desc">
                TDesign 适配微信小程序的组件库{{ isSkyline ? ' (skyline render)' : '' }}
                <text v-if="!isSkyline" class="skyline-entry" @tap="goSkyline">try skyline</text>
            </view>
            <pull-down-list :name="item.name" :icon="item.icon" :childArr="item.childArr" @click="clickHandle" v-for="(item, index) in list" :key="index"></pull-down-list>
        </view>
        <view class="footer">
            <view class="show_privacy" @tap="showPrivacyWin">《TDesign组件库服务声明》</view>
            <t-footer text="该小程序仅演示示例，不收集个人信息。"></t-footer>
            <t-footer :text="'Copyright © 1998 - ' + currentYear + ' Tencent. All Rights Reserved. 腾讯公司 版权所有'"></t-footer>
        </view>
        <trd-privacy id="trdPrivacy" name="TDesign组件库" date="2023年11月14日" :winStyle="winStyle"></trd-privacy>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import pullDownList from '../../components/pull-down-list';
import tFooter from './tdesign-miniprogram/footer/footer';
import trdPrivacy from '@/components/trd-privacy/privacy';
import themeChangeBehavior from './tdesign-miniprogram/mixins/theme-change';
import { list, skylineList } from './data/index';
export default zpMixins.extend({
    components: {
        pullDownList,
        tFooter,
        trdPrivacy
    },
    data() {
        return {
            list: [],
            currentYear: new Date().getFullYear(),
            isSkyline: false,
            theme: '',
            winStyle: ''
        };
    },
    mixins: [themeChangeBehavior],
    onLoad(options: any) {
        const { path, q, skyline } = options;
        console.log(path);
        let compList = [];
        this.skyline = skyline;
        if (this.skyline) {
            compList = skylineList;
        } else {
            compList = list;
        }
        this.setData({
            list: compList,
            isSkyline: !!skyline
        });

        // 小程序跳转各个小程序组件库
        if (q) {
            // Navigator.gotoPage(path, rest);
            // console.log(option);
            const str = this.getQueryByUrl(decodeURIComponent(q));
            console.log(str, str.page);
            uni.navigateTo({
                url: `/pages/${str.page}/${str.page}`
            });
        }
        this.trdPrivacy = this.zpSelectComponent('#trdPrivacy');
    },
    onShareAppMessage() {
        return {
            title: 'TDesign UI',
            path: '/pages/home/home'
        };
    },
    methods: {
        showPrivacyWin() {
            this.trdPrivacy.showPrivacyWin();
        },

        clickHandle(e: any) {
            let { name, path = '' } = e.detail.item as {
                name: string;
                path?: string;
            };
            if (!path) {
                name = name.replace(/^[A-Z]/, (match) => `${match}`.toLocaleLowerCase());
                name = name.replace(/[A-Z]/g, (match) => {
                    return `-${match.toLowerCase()}`;
                });
                path = `/pages/${name}/${this.skyline ? 'skyline/' : ''}${name}`;
            }
            uni.navigateTo({
                url: path,
                fail: () => {
                    uni.navigateTo({
                        url: '/pages/home/navigateFail/navigateFail'
                    });
                }
            });
        },

        getQueryByUrl(url: string) {
            const data = {};
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
        },

        goSkyline() {
            uni.navigateTo({
                url: '/pages/home/home?skyline=1'
            });
        }
    }
});
</script>
<style lang="less">
@import './home.less';
</style>
