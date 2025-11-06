/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import type { TdSwiperNavProps as SwiperNavProps } from '../swiper-nav/type';

export interface TdSwiperProps {
  /**
   * 是否自动播放
   * @default true
   */
  autoplay?: boolean;
  /**
   * 当前轮播在哪一项（下标）
   * @default 0
   */
  current?: number;
  /**
   * 轮播滑动方向，包括横向滑动和纵向滑动两个方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 同时显示的滑块数量
   * @default 1
   */
  displayMultipleItems?: number;
  /**
   * 滑动动画时长
   * @default 300
   */
  duration?: number;
  /**
   * 指定 swiper 切换缓动动画类型
   * @default default
   */
  easingFunction?: 'default' | 'linear' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic';
  /**
   * 轮播的高度；默认单位 `px`
   * @default 192
   */
  height?: string | number;
  /**
   * 透传至 Image 组件
   * @default {}
   */
  imageProps?: object;
  /**
   * 轮播间隔时间
   * @default 5000
   */
  interval?: number;
  /**
   * 图片列表
   */
  list?: string[] | SwiperList[];
  /**
   * 是否循环播放
   * @default true
   */
  loop?: boolean;
  /**
   * 导航器全部配置，true 的话使用默认配置
   * @default true
   */
  navigation?: SwiperNavProps | boolean;
  /**
   * 后边距，可用于露出后一项的一小部分。默认单位 `px`
   * @default 0
   */
  nextMargin?: string | number;
  /**
   * 页码信息展示位置
   * @default bottom
   */
  paginationPosition?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right' | 'left' | 'right';
  /**
   * 前边距，可用于露出前一项的一小部分。默认单位 `px`
   * @default 0
   */
  previousMargin?: string | number;
  /**
   * 当 swiper-item 的个数大于等于 2，关闭 circular 并且开启 previous-margin 或 next-margin 的时候，可以指定这个边距是否应用到第一个、最后一个元素
   * @default false
   */
  snapToEdge?: boolean;
  /**
   * 轮播切换时触发
   */
  onAnimationfinish?: (current: number, source: SwiperChangeSource) => void;
  /**
   * 轮播切换时触发
   */
  onChange?: (current: number, source: SwiperChangeSource) => void;
  /**
   * 点击轮播项时触发
   */
  onClick?: (index: number) => void;
  /**
   * 图片加载时触发
   */
  onImageLoad?: (index: number) => void;
}

export interface SwiperNavigation {
  /**
   * 当前轮播在哪一项（下标）
   * @default 0
   */
  current?: number;
  /**
   * 轮播滑动方向，包括横向滑动和纵向滑动两个方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 小于这个数字不会显示导航器
   */
  minShowNum?: number;
  /**
   * 页码信息展示位置
   * @default bottom
   */
  paginationPosition?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right' | 'left' | 'right';
  /**
   * 是否显示两侧的控制按钮
   * @default false
   */
  showControls?: boolean;
  /**
   * 总共的项数
   * @default 0
   */
  total?: number;
  /**
   * 导航器类型，点状(dots)、点条状(dots-bar)、分式(fraction)等
   * @default ''
   */
  type?: SwiperNavigationType;
}

export interface SwiperList {
  value: string;
  ariaLabel: string;
}

export type SwiperChangeSource = 'autoplay' | 'touch' | 'nav';

export type SwiperNavigationType = 'dots' | 'dots-bar' | 'fraction';
