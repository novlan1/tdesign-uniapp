<template>
  <view class="t-qrcode__canvas-wrapper">
    <canvas
      :id="canvasId"
      ref="qrcodeCanvas"
      :canvas-id="canvasId"
      type="2d"
      class="t-qrcode__canvas class"
      :style="`width: ${size}px; height: ${size}px;`"
    />
  </view>
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
      const uniCanvasElement = document.querySelector(`#${this.canvasId}`);
      let canvasElement = null;

      // 如果获取到的是 uni-canvas，需要找到内部的 canvas
      if (uniCanvasElement && uniCanvasElement.tagName === 'UNI-CANVAS') {
        canvasElement = uniCanvasElement.querySelector('canvas');

        // 设置 uni-canvas 的样式
        uniCanvasElement.style.width = `${this.size}px`;
        uniCanvasElement.style.height = `${this.size}px`;
        uniCanvasElement.style.overflow = 'visible';

        // 设置 wrapper 的样式
        const wrapper = uniCanvasElement.parentElement;
        if (wrapper) {
          wrapper.style.width = `${this.size}px`;
          wrapper.style.height = `${this.size}px`;
          wrapper.style.overflow = 'visible';
        }
      } else {
        canvasElement = uniCanvasElement;
      }

      if (canvasElement) {
        // 在初始化时设置 Canvas 的物理尺寸和显示尺寸
        const pixelRatio = window.devicePixelRatio || 1;
        const canvasSize = this.size * pixelRatio;

        // 设置物理尺寸（实际像素）
        canvasElement.width = canvasSize;
        canvasElement.height = canvasSize;

        // 设置显示尺寸（CSS 像素）
        canvasElement.style.width = `${this.size}px`;
        canvasElement.style.height = `${this.size}px`;

        // 添加 willReadFrequently 属性以优化性能并消除警告
        const ctx = canvasElement.getContext('2d', { willReadFrequently: true });
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
            // 小程序环境也添加 willReadFrequently 属性
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
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
        let pixelRatio = 1;

        // #ifdef MP
        // 小程序环境：获取真实的设备像素比并设置 Canvas 尺寸
        const systemInfo = uni.getSystemInfoSync();
        pixelRatio = systemInfo.pixelRatio || 1;
        const canvasSize = this.size * pixelRatio;
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        // #endif

        // #ifndef MP
        // eslint-disable-next-line no-unreachable
        // H5 环境：Canvas 尺寸已在 initH5Canvas 中设置，获取 pixelRatio
        pixelRatio = window.devicePixelRatio || 1;
        // #endif

        // 计算缩放比例
        // 关键：基于逻辑尺寸（this.size）而不是物理尺寸（canvas.width）
        // 因为 canvas.width 已经乘以了 pixelRatio，所以 scale 也需要相应调整
        const scale = this.size / qrData.numCells;

        // 重置变换矩阵并应用缩放
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        // 同时应用逻辑缩放和设备像素比缩放
        ctx.scale(scale * pixelRatio, scale * pixelRatio);

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
          await this.drawIcon(ctx, qrData, pixelRatio);
        }

        this.$emit('drawCompleted');
      } catch (err) {
        console.error('二维码绘制失败:', err);
        this.$emit('drawError', { error: err });
      }
    },

    async drawIcon(ctx, qrData, pixelRatio) {
      const { calculatedImageSettings, margin } = qrData;

      if (!calculatedImageSettings) {
        return;
      }

      try {
        // 加载图标图片
        const img = await this.loadIconImage();

        if (!img) {
          console.error('无法加载图标图片');
          return;
        }

        const drawX = calculatedImageSettings.x + margin;
        const drawY = calculatedImageSettings.y + margin;

        // 设置透明度
        if (calculatedImageSettings.opacity !== null && calculatedImageSettings.opacity !== undefined) {
          ctx.globalAlpha = calculatedImageSettings.opacity;
        }
        ctx.scale(1 / pixelRatio, 1 / pixelRatio);
        // 绘制图标
        ctx.drawImage(
          img,
          drawX,
          drawY,
          calculatedImageSettings.w,
          calculatedImageSettings.h,
        );

        // 恢复透明度
        ctx.globalAlpha = 1;
      } catch (err) {
        console.error('图标绘制失败:', err);
      }
    },

    // 加载图标图片
    // 参考 TSX (H5) 和 TS (小程序) 的实现
    async loadIconImage() {
      if (!this.icon) {
        return null;
      }

      // #ifdef MP
      // 小程序环境：使用 canvas.createImage
      if (this.canvas && this.canvas.createImage) {
        const img = this.canvas.createImage();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = this.icon;
        });
        return img;
      }
      return null;
      // #endif

      // #ifndef MP
      // eslint-disable-next-line no-unreachable
      // H5 环境：创建 Image 对象（参考 TSX 实现）
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = this.icon;
      });
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
