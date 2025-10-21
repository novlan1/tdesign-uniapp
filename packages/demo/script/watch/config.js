const path = require('path');

const config = {
  targetDir: path.resolve(__dirname, '../../src/_tdesign'),
  rawTargetDir: path.resolve(__dirname, '../../src/_tdesign-raw'),
  rawTargetDirInApp: path.resolve(__dirname, '../../../tdesign-app/tdesign-uniapp-raw'),

  sourceDir: path.resolve(__dirname, '../../../tdesign'),
  sourceGlob: path.resolve(__dirname, '../../../tdesign/**/*'),

  demoDir: path.resolve(__dirname, '../../src/pages-more'),

  demoRealDir: path.resolve(__dirname, '../../'),

  demoPagesGlob: path.resolve(__dirname, '../../src/pages/**/*'),
  demoComponentsGlob: path.resolve(__dirname, '../../src/components/**/*'),

  appPagesMoreDir: path.resolve(__dirname, '../../../tdesign-app/pages-more'),
  appDir: path.resolve(__dirname, '../../../tdesign-app'),
};


module.exports = {
  config,
};
