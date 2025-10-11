const path = require('path');

const config = {
  targetDir: path.resolve(__dirname, '../../src/_tdesign'),
  sourceDir: path.resolve(__dirname, '../../../tdesign'),
  sourceGlob: path.resolve(__dirname, '../../../tdesign/**/*'),
};


module.exports = {
  config,
};
