const { config } = require('./config');

const getCopyExampleParams = isChat => ({
  targetDir: isChat ? config.targetDirChat : config.targetDir,
  rawTargetDir: config.rawTargetDir,
  demoDir: config.demoDir,
});

const getCopyAppParams = isChat => ({
  targetDir: isChat ? config.targetDirChatInApp : config.targetDirInApp,
  rawTargetDir: config.rawTargetDirInApp,
  demoDir: config.appPagesMoreDir,
});

const getCopyVue2HXParams = isChat => ({
  targetDir: isChat ? config.targetDirChatInVue2HX : config.targetDirInVue2HX,
  rawTargetDir: '',
  demoDir: config.vue2HXPagesMoreDir,
});


const getCopyVue2CliParams = isChat => ({
  targetDir: isChat ? config.targetDirChatInVue2Cli : config.targetDirInVue2Cli,
  rawTargetDir: '',
  demoDir: config.vue2CliPagesMoreDir,
});

module.exports = {
  getCopyExampleParams,
  getCopyAppParams,
  getCopyVue2HXParams,
  getCopyVue2CliParams,
};
