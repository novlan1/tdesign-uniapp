const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('tdesign-uniapp', resolve('./uni_modules/tdesign-uniapp/components'))
      .set('tdesign-uniapp-chat', resolve('./uni_modules/tdesign-uniapp-chat/components'));
  },
};
