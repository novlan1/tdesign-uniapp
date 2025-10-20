<template>
  <canvas
    :id="canvasId"
    ref="qrcodeCanvas"
    :canvas-id="canvasId"
    type="2d"
    class="t-qrcode__canvas class"
    :style="`width: ${size}px; height: ${size}px;`"
  />
</template>

<script>
import props from './props';
import useQRCode from '../../hooks/useQRCode';
import { DEFAULT_MINVERSION, excavateModules, isSupportPath2d, generatePath } from '../../../common/shared/qrcode/utils';

export default {
  name: 'QrcodeCanvas',
  props: {
    ...props,
  },
  emits: ['drawCompleted', 'drawError'],
  data() {
    return {
      canvas: null,
      ctx: null,
      canvasId: `qrcode-canvas-${Math.random().toString(36)
        .slice(2, 11)}`,
      isWeb: false,
    };
  },
  computed: {
    // 使用计算属性确保有默认值
    actualBgColor() {
      return this.bgColor || '#FFFFFF';
    },
    actualColor() {
      return this.color || '#000000';
    },
  },
  watch: {
    value() {
      this.renderQRCode();
    },
    icon() {
      this.renderQRCode();
    },
    size() {
      this.renderQRCode();
    },
    iconSize() {
      this.renderQRCode();
    },
    level() {
      this.renderQRCode();
    },
    bgColor() {
      this.renderQRCode();
    },
    color() {
      this.renderQRCode();
    },
  },
  mounted() {
    // 判断是否为小程序环境，否则默认为 H5
    // #ifdef MP
    this.isWeb = false;
    // #endif

    // #ifndef MP
    // eslint-disable-next-line no-unreachable
    this.isWeb = true;
    // #endif

    this.initCanvas();
  },
  methods: {
    async initCanvas() {
      await this.$nextTick();

      // #ifdef MP
      this.initMiniProgramCanvas();
      // #endif

      // #ifndef MP
      // eslint-disable-next-line no-unreachable
      this.initH5Canvas();
      // #endif
    },

    // H5 环境初始化
    async initH5Canvas() {
      // 在 uniapp H5 环境中，canvas 会被包裹在 uni-canvas 内
      // 需要先找到 uni-canvas，再获取内部的 canvas 元素
      let canvasElement = document.querySelector(`#${this.canvasId}`);

      // 如果获取到的是 uni-canvas，需要找到内部的 canvas
      if (canvasElement && canvasElement.tagName === 'UNI-CANVAS') {
        canvasElement = canvasElement.querySelector('canvas');
      }

      if (canvasElement) {
        const ctx = canvasElement.getContext('2d');
        this.canvas = canvasElement;
        this.ctx = ctx;
        await this.renderQRCode();
      } else {
        console.error('无法获取 canvas 元素');
      }
    },

    // 小程序环境初始化
    async initMiniProgramCanvas() {
      if (typeof uni !== 'undefined' && uni.createSelectorQuery) {
        const query = uni.createSelectorQuery().in(this);
        query
          .select(`#${this.canvasId}`)
          .fields({ node: true, size: true })
          .exec(async (res) => {
            if (!res || !res[0] || !res[0].node) {
              console.error('获取 canvas 节点失败');
              return;
            }

            const canvas = res[0].node;
            const ctx = canvas.getContext('2d');
            this.canvas = canvas;
            this.ctx = ctx;

            await this.renderQRCode();
          });
      }
    },

    async renderQRCode() {
      if (!this.canvas || !this.ctx) {
        return;
      }

      const { canvas } = this;
      const { ctx } = this;

      const sizeProp = this.getSizeProp(this.iconSize);

      try {
        const qrData = useQRCode({
          value: this.value,
          level: this.level,
          minVersion: DEFAULT_MINVERSION,
          includeMargin: this.includeMargin,
          marginSize: this.marginSize,
          size: this.size,
          imageSettings: this.icon
            ? {
              src: this.icon,
              width: sizeProp.width,
              height: sizeProp.height,
              excavate: true,
            }
            : undefined,
        });

        // 获取设备像素比
        const pixelRatio = this.isWeb
          ? (window.devicePixelRatio || 1)
          : 1;

        // 设置 canvas 实际大小（考虑设备像素比）
        canvas.width = this.size * pixelRatio;
        canvas.height = this.size * pixelRatio;

        // 计算缩放比例
        const scale = (this.size / qrData.numCells) * pixelRatio;

        // 重置变换矩阵并应用缩放
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(scale, scale);

        // 绘制背景
        ctx.fillStyle = this.actualBgColor;
        ctx.fillRect(0, 0, qrData.numCells, qrData.numCells);

        // 处理需要挖空的区域（如果有图标）
        let cellsToDraw = qrData.cells;
        if (this.icon && qrData.calculatedImageSettings?.excavation) {
          cellsToDraw = excavateModules(qrData.cells, qrData.calculatedImageSettings.excavation);
        }

        // 绘制二维码
        ctx.fillStyle = this.actualColor;

        // Web 环境优先使用 Path2D（性能更好）
        if (this.isWeb && isSupportPath2d) {
          ctx.fill(new Path2D(generatePath(cellsToDraw, qrData.margin)));
        } else {
          // 小程序环境或不支持 Path2D 时使用逐个绘制
          cellsToDraw.forEach((row, y) => {
            row.forEach((cell, x) => {
              if (cell) {
                ctx.fillRect(x + qrData.margin, y + qrData.margin, 1, 1);
              }
            });
          });
        }

        // 绘制中心图标
        if (this.icon && qrData.calculatedImageSettings) {
          await this.drawIcon(ctx, qrData);
        }

        this.$emit('drawCompleted');
      } catch (err) {
        console.error('二维码绘制失败:', err);
        this.$emit('drawError', { error: err });
      }
    },

    async drawIcon(ctx, qrData) {
      const { calculatedImageSettings, margin } = qrData;

      if (!calculatedImageSettings) {
        return;
      }

      try {
        // 创建图片对象
        const img = this.createImageObject();

        // 等待图片加载
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = this.icon;
        });

        // 设置透明度
        if (calculatedImageSettings.opacity !== null && calculatedImageSettings.opacity !== undefined) {
          ctx.globalAlpha = calculatedImageSettings.opacity;
        }

        // 绘制图标
        ctx.drawImage(
          img,
          calculatedImageSettings.x + margin,
          calculatedImageSettings.y + margin,
          calculatedImageSettings.w,
          calculatedImageSettings.h,
        );

        // 恢复透明度
        ctx.globalAlpha = 1;
      } catch (err) {
        console.error('图标加载失败:', err);
      }
    },

    // 创建图片对象
    createImageObject() {
      // #ifdef MP
      return this.canvas.createImage ? this.canvas.createImage() : new Image();
      // #endif

      // #ifndef MP
      // eslint-disable-next-line no-unreachable
      const img = new Image();
      img.crossOrigin = 'anonymous'; // 处理跨域图片
      return img;
      // #endif
    },

    getSizeProp(iconSize) {
      if (!iconSize) return { width: 0, height: 0 };
      if (typeof iconSize === 'number') {
        return {
          width: iconSize,
          height: iconSize,
        };
      }
      return {
        width: iconSize.width,
        height: iconSize.height,
      };
    },

    // 暴露 canvas 节点给父组件
    getCanvasNode() {
      // #ifdef MP
      return new Promise((resolve) => {
        if (typeof uni !== 'undefined' && uni.createSelectorQuery) {
          const query = uni.createSelectorQuery().in(this);
          query
            .select(`#${this.canvasId}`)
            .fields({ node: true, size: true })
            .exec((res) => {
              resolve(res[0]?.node);
            });
        } else {
          resolve(null);
        }
      });
      // #endif

      // #ifndef MP
      // eslint-disable-next-line no-unreachable
      return Promise.resolve(document.querySelector(`#${this.canvasId}`));
      // #endif
    },
  },
};
</script>

<style lang="less" scoped>
@import './qrcode-canvas.css';
</style>
