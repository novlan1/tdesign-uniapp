<template>
    <view :style="_._style([style, customStyle])" :class="classPrefix + ' class ' + prefix + '-class'">
        <t-grid :gutter="gutter" :border="false" align="center" :column="column" :style="draggable ? 'overflow: visible' : ''">
            <block v-if="!dragLayout">
                <t-grid-item
                    :t-class="classPrefix + '__grid ' + classPrefix + '__grid-file'"
                    :t-class-content="classPrefix + '__grid-content'"
                    aria-role="presentation"
                    v-for="(file, index) in customFiles"
                    :key="index"
                >
                    <view
                        :class="classPrefix + '__wrapper ' + (disabled ? classPrefix + '__wrapper--disabled' : '')"
                        :style="gridItemStyle"
                        :aria-role="ariaRole || _this.getWrapperAriaRole(file)"
                        :aria-label="ariaLabel || _this.getWrapperAriaLabel(file)"
                    >
                        <t-image
                            v-if="file.type !== 'video'"
                            :data-file="file"
                            :data-index="index"
                            :t-class="classPrefix + '__thumbnail'"
                            :style="(imageProps && imageProps.style) || ''"
                            :src="file.thumb || file.url"
                            :mode="(imageProps && imageProps.mode) || 'aspectFill'"
                            :error="(imageProps && imageProps.error) || 'default'"
                            :lazy="(imageProps && imageProps.lazy) || false"
                            :loading="(imageProps && imageProps.loading) || 'default'"
                            :shape="(imageProps && imageProps.shape) || 'round'"
                            :webp="(imageProps && imageProps.webp) || false"
                            :showMenuByLongpress="(imageProps && imageProps.showMenuByLongpress) || false"
                            @tap.native="onProofTap($event, { file, index })"
                        />
                        <video
                            v-if="file.type === 'video'"
                            :class="classPrefix + '__thumbnail'"
                            :src="file.url"
                            :poster="file.thumb"
                            controls
                            :autoplay="false"
                            objectFit="contain"
                            :data-file="file"
                            @tap="onFileClick"
                        />
                        <view v-if="file.status && file.status != 'done'" :class="classPrefix + '__progress-mask'" :data-index="index" :data-file="file" @tap="onFileClick">
                            <block v-if="file.status == 'loading'">
                                <t-icon :t-class="classPrefix + '__progress-loading'" name="loading" size="48rpx" aria-hidden />
                                <view :class="classPrefix + '__progress-text'">{{ file.percent ? file.percent + '%' : '上传中...' }}</view>
                            </block>
                            <t-icon v-else :name="file.status == 'reload' ? 'refresh' : 'close-circle'" size="48rpx" aria-hidden />
                            <view v-if="file.status == 'reload' || file.status == 'failed'" :class="classPrefix + '__progress-text'">
                                {{ file.status == 'reload' ? '重新上传' : '上传失败' }}
                            </view>
                        </view>
                        <view
                            v-if="_.isBoolean(file.removeBtn) ? file.removeBtn : removeBtn"
                            :class="classPrefix + '__close-btn hotspot-expanded'"
                            :data-index="index"
                            aria-role="button"
                            aria-label="删除"
                            @tap="onDelete"
                        >
                            <t-icon name="close" size="32rpx" color="#fff" />
                        </view>
                    </view>
                </t-grid-item>
                <t-grid-item
                    v-if="addBtn && customLimit > 0"
                    :t-class="classPrefix + '__grid'"
                    :t-class-content="classPrefix + '__grid-content'"
                    aria-label="上传"
                    @click="onAddTap"
                >
                    <view :class="classPrefix + '__wrapper'" :style="gridItemStyle">
                        <slot name="add-content" />
                        <block v-if="addContent">{{ addContent }}</block>
                        <view v-else :class="classPrefix + '__add-icon ' + (disabled ? classPrefix + '__add-icon--disabled' : '')"><t-icon name="add" /></view>
                    </view>
                </t-grid-item>
            </block>
            <block v-else>
                <view
                    :class="classPrefix + '__drag'"
                    :list="dragList"
                    :style="dragWrapStyle + ';'"
                    :dragBaseData="dragBaseData"
                    :change:list="handler.listObserver"
                    :change:dragBaseData="handler.baseDataObserver"
                >
                    <view
                        :class="classPrefix + '__drag-item'"
                        :style="
                            'width: ' +
                            100 / column +
                            '%; --td-upload-drag-transition-duration: ' +
                            transition.duration +
                            'ms; --td-upload-drag-transition-timing-function: ' +
                            transition.timingFunction
                        "
                        :data-index="index"
                        @longpress="parseEventDynamicCode($event, handler.longPress)"
                        @touchmove.stop.prevent="parseEventDynamicCode($event, dragging ? handler.touchMove : '')"
                        @touchend.stop.prevent="parseEventDynamicCode($event, dragging ? handler.touchEnd : '')"
                        v-for="(file, index) in customFiles"
                        :key="index"
                    >
                        <t-grid-item
                            :t-class="classPrefix + '__grid ' + classPrefix + '__grid-file'"
                            :t-class-content="classPrefix + '__grid-content'"
                            aria-role="presentation"
                            style="width: 100%"
                        >
                            <view
                                :class="classPrefix + '__wrapper ' + (disabled ? classPrefix + '__wrapper--disabled' : '')"
                                :style="gridItemStyle + ';'"
                                :aria-role="ariaRole || _this.getWrapperAriaRole(file)"
                                :aria-label="ariaLabel || _this.getWrapperAriaLabel(file)"
                            >
                                <t-image
                                    v-if="file.type !== 'video'"
                                    :data-file="file"
                                    :data-index="index"
                                    :t-class="classPrefix + '__thumbnail'"
                                    :style="(imageProps && imageProps.style) || ''"
                                    :src="file.thumb || file.url"
                                    :mode="(imageProps && imageProps.mode) || 'aspectFill'"
                                    :error="(imageProps && imageProps.error) || 'default'"
                                    :lazy="(imageProps && imageProps.lazy) || false"
                                    :loading="(imageProps && imageProps.loading) || 'default'"
                                    :shape="(imageProps && imageProps.shape) || 'round'"
                                    :webp="(imageProps && imageProps.webp) || false"
                                    :showMenuByLongpress="(imageProps && imageProps.showMenuByLongpress) || false"
                                    @tap.native="onProofTap($event, { file, index })"
                                />
                                <video
                                    v-if="file.type === 'video'"
                                    :class="classPrefix + '__thumbnail'"
                                    :src="file.url"
                                    :poster="file.thumb"
                                    controls
                                    :autoplay="false"
                                    objectFit="contain"
                                    :data-file="file"
                                    @tap="onFileClick"
                                />
                                <view v-if="file.status && file.status != 'done'" :class="classPrefix + '__progress-mask'" :data-index="index" :data-file="file" @tap="onFileClick">
                                    <block v-if="file.status == 'loading'">
                                        <t-icon :t-class="classPrefix + '__progress-loading'" name="loading" size="48rpx" aria-hidden />
                                        <view :class="classPrefix + '__progress-text'">{{ file.percent ? file.percent + '%' : '上传中...' }}</view>
                                    </block>
                                    <t-icon v-else :name="file.status == 'reload' ? 'refresh' : 'close-circle'" size="48rpx" aria-hidden />
                                    <view v-if="file.status == 'reload' || file.status == 'failed'" :class="classPrefix + '__progress-text'">
                                        {{ file.status == 'reload' ? '重新上传' : '上传失败' }}
                                    </view>
                                </view>
                                <view
                                    v-if="_.isBoolean(file.removeBtn) ? file.removeBtn : removeBtn"
                                    :class="classPrefix + '__close-btn hotspot-expanded'"
                                    :data-index="index"
                                    :data-url="file.url"
                                    aria-role="button"
                                    aria-label="删除"
                                    @tap="onDelete"
                                >
                                    <t-icon name="close" size="32rpx" color="#fff" />
                                </view>
                            </view>
                        </t-grid-item>
                    </view>
                    <view v-if="addBtn && customLimit > 0" :class="classPrefix + '__drag-item'" :style="'width: ' + 100 / column + '%'">
                        <t-grid-item :t-class="classPrefix + '__grid'" :t-class-content="classPrefix + '__grid-content'" aria-label="上传" style="width: 100%" @click="onAddTap">
                            <view :class="classPrefix + '__wrapper'" :style="gridItemStyle">
                                <slot name="add-content" />
                                <block v-if="addContent">{{ addContent }}</block>
                                <view v-else :class="classPrefix + '__add-icon ' + (disabled ? classPrefix + '__add-icon--disabled' : '')"><t-icon name="add" /></view>
                            </view>
                        </t-grid-item>
                    </view>
                </view>
            </block>
        </t-grid>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="_this" lang="wxs" src="@/upload/upload.wxs"></script>
<script module="handler" lang="wxs" src="@/upload/drag.wxs"></script>
<script>
import tGrid from "../grid/grid";
import tGridItem from "../grid-item/grid-item";
import tIcon from "../icon/icon";
import tImage from "../image/image";
import { __decorate, __rest } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import props from "./props";
import config from "../common/config";
import { isOverSize } from "../common/utils";
import { isObject } from "../common/validator";
const {
  prefix: prefix
} = config;
const name = `${prefix}-upload`;
let Upload = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.options = {
      multipleSlots: true
    };
    this.setData({
      classPrefix: name,
      prefix: prefix,
      current: false,
      proofs: [],
      customFiles: [],
      customLimit: 0,
      column: 4,
      dragBaseData: {},
      rows: 0,
      dragWrapStyle: "",
      dragList: [],
      dragging: true,
      dragLayout: false
    });
    this = props;
    this.controlledProps = [{
      key: "files",
      event: "success"
    }];
    this.observers = {
      "files, max, draggable"(t, e) {
        this.handleLimit(t, e);
      },
      gridConfig() {
        this.updateGrid();
      }
    };
    this.lifetimes = {
      ready() {
        this.handleLimit(this.customFiles, this.max);
        this.updateGrid();
      }
    };
    this.methods = {
      uploadFiles(t) {
        return new Promise(e => {
          const i = this.requestMethod(t);
          if (i instanceof Promise) {
            return i;
          }
          e({});
        });
      },
      startUpload(t) {
        return "function" == typeof this.requestMethod ? this.uploadFiles(t).then(() => {
          t.forEach(t => {
            t.percent = 100;
          });
          this.triggerSuccessEvent(t);
        }).catch(t => {
          this.triggerFailEvent(t);
        }) : (this.triggerSuccessEvent(t), this.handleLimit(this.customFiles, this.max), Promise.resolve());
      },
      onAddTap() {
        const {
          disabled: t,
          mediaType: e,
          source: i
        } = this;
        t || ("media" === i ? this.chooseMedia(e) : this.chooseMessageFile(e));
      },
      chooseMedia(t) {
        const {
          customLimit: e
        } = this;
        const {
          config: i,
          sizeLimit: s
        } = this;
        uni.chooseMedia(Object.assign(Object.assign({
          count: Math.min(20, e),
          mediaType: t
        }, i), {
          success: e => {
            const i = [];
            e.tempFiles.forEach(e => {
              const {
                size: r,
                fileType: a,
                tempFilePath: o,
                width: n,
                height: l,
                duration: c,
                thumbTempFilePath: h
              } = e;
              const g = __rest(e, ["size", "fileType", "tempFilePath", "width", "height", "duration", "thumbTempFilePath"]);
              if (isOverSize(r, s)) {
                let t = ("image" === a ? "图片" : "视频") + "大小超过限制";
                if ("number" != typeof s) {
                  t = s.message.replace("{sizeLimit}", null == s ? void 0 : s.size);
                }
                return void uni.showToast({
                  icon: "none",
                  title: t
                });
              }
              const d = this.getRandFileName(o);
              i.push(Object.assign({
                name: d,
                type: this.getFileType(t, o, a),
                url: o,
                size: r,
                width: n,
                height: l,
                duration: c,
                thumb: h,
                percent: 0
              }, g));
            });
            this.afterSelect(i);
          },
          fail: t => {
            this.triggerFailEvent(t);
          },
          complete: t => {
            this.$emit("complete", {
              detail: t
            });
          }
        }));
      },
      chooseMessageFile(t) {
        const {
          customLimit: e
        } = this;
        const {
          config: i,
          sizeLimit: s
        } = this;
        uni.chooseMessageFile(Object.assign(Object.assign({
          count: Math.min(100, e),
          type: Array.isArray(t) ? "all" : t
        }, i), {
          success: e => {
            const i = [];
            e.tempFiles.forEach(e => {
              const {
                size: r,
                type: a,
                path: o
              } = e;
              const n = __rest(e, ["size", "type", "path"]);
              if (isOverSize(r, s)) {
                let t = ("image" === a ? "图片" : "视频") + "大小超过限制";
                if ("number" != typeof s) {
                  t = s.message.replace("{sizeLimit}", null == s ? void 0 : s.size);
                }
                return void uni.showToast({
                  icon: "none",
                  title: t
                });
              }
              const l = this.getRandFileName(o);
              i.push(Object.assign({
                name: l,
                type: this.getFileType(t, o, a),
                url: o,
                size: r,
                percent: 0
              }, n));
            });
            this.afterSelect(i);
          },
          fail: t => this.triggerFailEvent(t),
          complete: t => this.$emit("complete", {
            detail: t
          })
        }));
      },
      afterSelect(t) {
        this._trigger("select-change", {
          files: [...this.customFiles],
          currentSelectedFiles: [t]
        });
        this._trigger("add", {
          files: t
        });
        this.startUpload(t);
      },
      dragVibrate(t) {
        var e;
        const {
          vibrateType: i
        } = t;
        const {
          draggable: s
        } = this;
        const r = null === (e = null == s ? void 0 : s.vibrate) || void 0 === e || e;
        const a = null == s ? void 0 : s.collisionVibrate;
        if (r && "longPress" === i || a && "touchMove" === i) {
          uni.vibrateShort({
            type: "light"
          });
        }
      },
      dragStatusChange(t) {
        const {
          dragging: e
        } = t;
        this.setData({
          dragging: e
        });
      },
      dragEnd(t) {
        const {
          dragCollisionList: e
        } = t;
        let i = [];
        i = 0 === e.length ? this.customFiles : e.reduce((t, e) => {
          const {
            realKey: i,
            data: s,
            fixed: r
          } = e;
          r || (t[i] = Object.assign({}, s));
          return t;
        }, []);
        this.triggerDropEvent(i);
      },
      triggerDropEvent(t) {
        const {
          transition: e
        } = this;
        if (e.backTransition) {
          const i = setTimeout(() => {
            this.$emit("drop", {
              detail: {
                files: t
              }
            });
            clearTimeout(i);
          }, e.duration);
        } else {
          this.$emit("drop", {
            detail: {
              files: t
            }
          });
        }
      }
    };
  }
  onProofTap(t) {
    var e;
    this.onFileClick(t);
    const {
      preview: i
    } = this;
    if (!i) {
      return;
    }
    const {
      index: s
    } = t.currentTarget.dataset;
    uni.previewImage({
      urls: this.customFiles.filter(t => -1 !== t.percent).map(t => t.url),
      current: null === (e = this.customFiles[s]) || void 0 === e ? void 0 : e.url
    });
  }
  handleLimit(t, e) {
    if (0 === e) {
      e = Number.MAX_SAFE_INTEGER;
    }
    this.setData({
      customFiles: t.length > e ? t.slice(0, e) : t,
      customLimit: e - t.length,
      dragging: true
    });
    this.initDragLayout();
  }
  triggerSuccessEvent(t) {
    this._trigger("success", {
      files: [...this.customFiles, ...t]
    });
  }
  triggerFailEvent(t) {
    this.$emit("fail", {
      detail: t
    });
  }
  onFileClick(t) {
    const {
      file: e
    } = t.currentTarget.dataset;
    this.$emit("click", {
      detail: {
        file: e
      }
    });
  }
  getFileType(t, e, i) {
    if (i) {
      return i;
    }
    if (1 === t.length) {
      return t[0];
    }
    const s = e.split(".");
    const r = s[s.length - 1];
    return ["avi", "wmv", "mkv", "mp4", "mov", "rm", "3gp", "flv", "mpg", "rmvb"].includes(r.toLocaleLowerCase()) ? "video" : "image";
  }
  getRandFileName(t) {
    const e = t.lastIndexOf(".");
    const i = -1 === e ? "" : t.substr(e);
    return parseInt(`${Date.now()}${Math.floor(900 * Math.random() + 100)}`, 10).toString(36) + i;
  }
  onDelete(t) {
    const {
      index: e
    } = t.currentTarget.dataset;
    this.deleteHandle(e);
  }
  deleteHandle(t) {
    const {
      customFiles: e
    } = this;
    const i = e[t];
    this.$emit("remove", {
      detail: {
        index: t,
        file: i
      }
    });
  }
  updateGrid() {
    let {
      gridConfig: t = {}
    } = this;
    isObject(t) || (t = {});
    const {
      column: e = 4,
      width: i = 160,
      height: s = 160
    } = t;
    this.setData({
      gridItemStyle: `width:${i}rpx;height:${s}rpx`,
      column: e
    });
  }
  initDragLayout() {
    const {
      draggable: t,
      disabled: e
    } = this;
    if (t && !e) {
      this.initDragList();
      this.initDragBaseData();
    }
  }
  initDragList() {
    let t = 0;
    const {
      column: e,
      customFiles: i,
      customLimit: s
    } = this;
    const r = [];
    i.forEach((i, s) => {
      r.push({
        realKey: t,
        sortKey: s,
        tranX: s % e * 100 + "%",
        tranY: 100 * Math.floor(s / e) + "%",
        data: Object.assign({}, i)
      });
      t += 1;
    });
    if (s > 0) {
      const t = r.length;
      r.push({
        realKey: t,
        sortKey: t,
        tranX: t % e * 100 + "%",
        tranY: 100 * Math.floor(t / e) + "%",
        fixed: true
      });
    }
    this.rows = Math.ceil(r.length / e);
    this.setData({
      dragList: r
    });
  }
  initDragBaseData() {
    const {
      classPrefix: t,
      rows: e,
      column: i,
      customFiles: s
    } = this;
    if (0 === s.length) {
      return void this.setData({
        dragBaseData: {},
        dragWrapStyle: "",
        dragLayout: false
      });
    }
    const r = uni.createSelectorQuery().in(this);
    const a = `.${t} >>> .t-grid-item`;
    const o = `.${t} >>> .t-grid`;
    r.select(a).boundingClientRect();
    r.select(o).boundingClientRect();
    r.selectViewport().scrollOffset();
    r.exec(s => {
      const [{
        width: r,
        height: a
      }, {
        left: o,
        top: n
      }, {
        scrollTop: l
      }] = s;
      const c = {
        rows: e,
        classPrefix: t,
        itemWidth: r,
        itemHeight: a,
        wrapLeft: o,
        wrapTop: n + l,
        columns: i
      };
      const h = `height: ${e * a}px`;
      this.setData({
        dragBaseData: c,
        dragWrapStyle: h,
        dragLayout: true
      }, () => {
        const t = setTimeout(() => {
          this.setData({
            dragging: false
          });
          clearTimeout(t);
        }, 0);
      });
    });
  }
};
Upload = __decorate([wxComponent()], Upload);
export default Upload;
</script>
<style>
@import './upload.css';
</style>
