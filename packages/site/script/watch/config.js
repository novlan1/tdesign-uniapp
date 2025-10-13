const path = require('path');

const config = {
  targetDir: path.resolve(__dirname, '../../src/_tdesign'),
  rawTargetDir: path.resolve(__dirname, '../../src/_tdesign-raw'),

  sourceDir: path.resolve(__dirname, '../../../tdesign'),
  sourceGlob: path.resolve(__dirname, '../../../tdesign/**/*'),

  demoDir: path.resolve(__dirname, '../../src/pages-more'),
};


module.exports = {
  config,
};
