<template>
  <canvas ref="qrcodeCanvas" type="2d" class="t-qrcode__canvas class" />
</template>

<script>
import props from './props';
import useQRCode from '../../hooks/useQRCode';
import { DEFAULT_MINVERSION, excavateModules } from '../../../common/shared/qrcode/utils';

export default {
  name: 'QrcodeCanvas',
  props: {
    ...props,
  },
  data() {
    return {
      canvas: null,
      ctx: null,
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
      this.initCanvas();
    },
    icon() {
      this.initCanvas();
    },
    size() {
      this.initCanvas();
    },
    iconSize() {
      this.initCanvas();
    },
    level() {
      this.initCanvas();
    },
    bgColor() {
      this.initCanvas();
    },
    color() {
      this.initCanvas();
    },
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    async initCanvas() {
      // 在小程序环境中使用 wx API
      if (typeof wx !== 'undefined' && wx.createSelectorQuery) {
        const query = wx.createSelectorQuery().in(this);
        query
          .select('#qrcodeCanvas')
          .fields({ node: true, size: true })
          .exec(async (res) => {
            if (!res[0]?.node) {
              return;
            }

            const canvas = res[0].node;
            const ctx = canvas.getContext('2d');
            this.canvas = canvas;
            this.ctx = ctx;

            await this.drawQrcode(canvas, ctx);
          });
      } else {
        // 在 Vue 环境中使用 ref
        await this.$nextTick();
        const canvas = this.$refs.qrcodeCanvas;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          this.canvas = canvas;
          this.ctx = ctx;
          await this.drawQrcode(canvas, ctx);
        }
      }
    },

    async drawQrcode(canvas, ctx) {
      if (!ctx) return;

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

        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        canvas.width = this.size * dpr;
        canvas.height = this.size * dpr;
        const scale = (this.size * dpr) / qrData.numCells;
        ctx.scale(scale, scale);

        ctx.fillStyle = this.actualBgColor;
        ctx.fillRect(0, 0, qrData.numCells, qrData.numCells);

        let cellsToDraw = qrData.cells;
        if (this.icon && qrData.calculatedImageSettings?.excavation) {
          cellsToDraw = excavateModules(qrData.cells, qrData.calculatedImageSettings.excavation);
        }

        ctx.fillStyle = this.actualColor;
        cellsToDraw.forEach((row, y) => {
          row.forEach((cell, x) => {
            if (cell) {
              ctx.fillRect(x + qrData.margin, y + qrData.margin, 1.05, 1.05); // 略微大于 1 是抗锯齿处理
            }
          });
        });

        if (this.icon && qrData.calculatedImageSettings) {
          const img = canvas.createImage ? canvas.createImage() : new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = this.icon;
          });
          ctx.drawImage(
            img,
            qrData.calculatedImageSettings.x + qrData.margin,
            qrData.calculatedImageSettings.y + qrData.margin,
            qrData.calculatedImageSettings.w,
            qrData.calculatedImageSettings.h,
          );
        }
        this.$emit('drawCompleted');
      } catch (err) {
        this.$emit('drawError', { error: err });
      }
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
      return new Promise((resolve) => {
        if (typeof wx !== 'undefined' && wx.createSelectorQuery) {
          const query = wx.createSelectorQuery().in(this);
          query
            .select('#qrcodeCanvas')
            .fields({ node: true, size: true })
            .exec((res) => {
              resolve(res[0]?.node);
            });
        } else {
          resolve(this.$refs.qrcodeCanvas);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import './qrcode-canvas.css';
</style>
