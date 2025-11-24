const path = require('path');

const DEFAULT_PAGES = [
  {
    path: 'pages/home/home',
  },
  {
    path: 'pages/home/navigate-fail/index',
  },
  {
    path: 'pages-more/result/result-page',
  },
  {
    path: 'pages-more/indexes/custom/index',
  },
  {
    path: 'pages-more/indexes/base/index',
  },
  {
    path: 'pages-more/side-bar/base/index',
  },
  {
    path: 'pages-more/side-bar/switch/index',
  },
  {
    path: 'pages-more/side-bar/with-icon/index',
  },
  {
    path: 'pages-more/side-bar/custom/index',
  },
];

const SHOW_SKYLINE_PAGES = false;

const CONFIG = {
  VUE3_CLI_PAGES_JSON: path.resolve(__dirname, '../../src/pages.json'),
  VUE3_HX_PAGES_JSON: path.resolve(__dirname, '../../../tdesign-app/pages.json'),
  VUE2_HX_PAGES_JSON: path.resolve(__dirname, '../../../hello-tdesign-vue2/pages.json'),
  VUE2_CLI_PAGES_JSON: path.resolve(__dirname, '../../../../../tdesign-vue2-cli/src/pages.json'),
};


module.exports = {
  DEFAULT_PAGES,
  SHOW_SKYLINE_PAGES,
  CONFIG,
};
