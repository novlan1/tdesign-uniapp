const path = require('path');

const DIR_MAP = {
  VUE2_CLI: 'tdesign-uniapp-vue2-cli-demo',
};

const config = {
  targetDir: path.resolve(__dirname, '../../src/_tdesign'),
  targetDirChat: path.resolve(__dirname, '../../src/_tdesign-uniapp-chat'),
  targetDirInApp: path.resolve(__dirname, '../../../tdesign-app/uni_modules/tdesign-uniapp/components'),
  targetDirChatInApp: path.resolve(__dirname, '../../../tdesign-app/uni_modules/tdesign-uniapp-chat/components'),
  targetDirInVue2HX: path.resolve(__dirname, '../../../hello-tdesign-vue2/uni_modules/tdesign-uniapp/components'),
  targetDirInVue2Cli: path.resolve(__dirname, '../../../../../', DIR_MAP.VUE2_CLI, './src/_tdesign'),
  targetDirChatInVue2HX: path.resolve(__dirname, '../../../hello-tdesign-vue2/uni_modules/tdesign-uniapp-chat/components'),
  targetDirChatInVue2Cli: path.resolve(__dirname, '../../../../../', DIR_MAP.VUE2_CLI, './src/_tdesign-uniapp-chat'),

  rawTargetDir: path.resolve(__dirname, '../../src/_tdesign-raw'),
  rawTargetDirInApp: path.resolve(__dirname, '../../../tdesign-app/tdesign-uniapp-raw'),

  sourceDir: path.resolve(__dirname, '../../../tdesign'),
  chatSourceDir: path.resolve(__dirname, '../../../tdesign-uniapp-chat'),

  sourceGlob: path.resolve(__dirname, '../../../tdesign/**/*').replace(/\\/g, '/'),
  chatSourceGlob: path.resolve(__dirname, '../../../tdesign-uniapp-chat/**/*').replace(/\\/g, '/'),
  baseAndChatSourceGlob: path.resolve(__dirname, '../../../{tdesign,tdesign-uniapp-chat}/**/*').replace(/\\/g, '/'),

  demoDir: path.resolve(__dirname, '../../src/pages-more'),

  demoRealDir: path.resolve(__dirname, '../../'),

  demoPagesGlob: path.resolve(__dirname, '../../src/pages/**/*').replace(/\\/g, '/'),
  demoComponentsGlob: path.resolve(__dirname, '../../src/components/**/*').replace(/\\/g, '/'),

  appDir: path.resolve(__dirname, '../../../tdesign-app'),
  appPagesMoreDir: path.resolve(__dirname, '../../../tdesign-app/pages-more'),
  appComponentsDir: path.resolve(__dirname, '../../../tdesign-app/components'),
  appPagesDir: path.resolve(__dirname, '../../../tdesign-app/pages'),

  vue2HXDir: path.resolve(__dirname, '../../../hello-tdesign-vue2'),
  vue2HXPagesMoreDir: path.resolve(__dirname, '../../../hello-tdesign-vue2/pages-more'),
  vue2HXComponentsDir: path.resolve(__dirname, '../../../hello-tdesign-vue2/components'),
  vue2HXPagesDir: path.resolve(__dirname, '../../../hello-tdesign-vue2/pages'),

  vue2CliDir: path.resolve(__dirname, '../../../../../', DIR_MAP.VUE2_CLI),
  vue2CliPagesMoreDir: path.resolve(__dirname, '../../../../../', DIR_MAP.VUE2_CLI, './src/pages-more'),
  vue2CliComponentsDir: path.resolve(__dirname, '../../../../../', DIR_MAP.VUE2_CLI, './src/components'),
  vue2CliPagesDir: path.resolve(__dirname, '../../../../../', DIR_MAP.VUE2_CLI, './src/pages'),
};

const TO_CLEAR_DIR = [
  config.targetDir,
  config.targetDirChat,

  config.targetDirInApp,
  config.targetDirChatInApp,

  config.targetDirInVue2HX,
  config.targetDirChatInVue2HX,

  config.targetDirInVue2Cli,
  config.targetDirChatInVue2Cli,

  config.rawTargetDir,
  config.rawTargetDirInApp,
  config.demoDir,

  config.appComponentsDir,
  config.appPagesMoreDir,
  config.appPagesDir,

  config.vue2HXComponentsDir,
  config.vue2HXCPagesMoreDir,
  config.vue2HXCPagesDir,

  config.vue2CliComponentsDir,
  config.vue2CliCPagesMoreDir,
  config.vue2CliCPagesDir,
];

module.exports = {
  config,
  TO_CLEAR_DIR,
};
