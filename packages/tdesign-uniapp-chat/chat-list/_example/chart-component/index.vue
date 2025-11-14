<template>
    <!-- index.wxml -->
    <view v-if="ec" class="container">
        <ec-canvas canvas-id="mychart-line" :ec="ec"></ec-canvas>
    </view>
</template>

<script>
import ecCanvas from '../ec-canvas/ec-canvas';
import * as echarts from '../ec-canvas/echarts';
function onInitNormalLine(opt) {
    console.log('contentItem数据:', opt);

    // 使用contentItem中的数据，如果没有则使用mockData2
    const data = opt.data.options;
    const normalLineOption = {
        xAxis: data.xAxis,
        yAxis: data.yAxis,
        series: [
            {
                data: data.series[0].data,
                type: 'line'
            }
        ]
    };
    return (canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // 像素比
        });
        canvas.setChart(chart);
        chart.setOption(normalLineOption);
        return chart;
    };
}
export default {
    components: {
        ecCanvas
    },
    data() {
        return {
            ec: null
        };
    },
    props: {
        options: {
            type: Object
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    methods: {
        attached() {
            this.setData({
                ec: {
                    onInit: onInitNormalLine(this.options)
                }
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
