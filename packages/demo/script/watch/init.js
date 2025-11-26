const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { config, TO_CLEAR_DIR } = require('./config');
const { copy } = require('./core');
const { deleteFolder } = require('t-comm');
const {
  getCopyExampleParams,
  getCopyAppParams,
  getCopyVue2HXParams,
  getCopyVue2CliParams,
} = require('./helper');

async function copyOneProject({
  globMode,
  sourceDir,
  isChat,
}) {
  const list = glob.sync(globMode, {
    ignore: '**/node_modules/**/*',
    nodir: true,
  });

  for (const item of list) {
    const relativePath = path.relative(sourceDir, item);
    await copy({
      relativePath,
      filePath: item,
      config: getCopyExampleParams(isChat),
    });

    await copy({
      relativePath,
      filePath: item,
      config: getCopyAppParams(isChat),
    });

    await copy({
      relativePath,
      filePath: item,
      config: getCopyVue2HXParams(isChat),
    });

    await copy({
      relativePath,
      filePath: item,
      config: getCopyVue2CliParams(isChat),
    });
  }

  console.log(`[Wrote] done! Length is ${list.length}!`);
}


async function main() {
  for (const dir of TO_CLEAR_DIR) {
    deleteFolder(dir);
  }

  await copyOneProject({
    globMode: config.sourceGlob,
    sourceDir: config.sourceDir,
  });
  await copyOneProject({
    globMode: config.chatSourceGlob,
    sourceDir: config.chatSourceDir,
    isChat: true,
  });


  const targetDirList = [
    { dir: config.appDir },
    { dir: config.vue2HXDir },
    { dir: config.vue2CliDir, isCli: true },
  ];

  await copyDemoPagesToApp(targetDirList);
}


async function copyDemoPagesToApp(targetDirList) {
  const list = glob.sync([
    config.demoPagesGlob,
    config.demoComponentsGlob,
  ], {
    ignore: '**/node_modules/**/*',
    nodir: true,
  });


  for (const item of list) {
    const relativePath = path.relative(path.resolve(config.demoRealDir, 'src'), item);

    for (const dir of targetDirList) {
      const targetPath = path.resolve(dir.dir, dir.isCli ? 'src' : '', relativePath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(item, targetPath);
    }
  }

  console.log(`[Wrote] done! Length of App Files is ${list.length}!`);
}

main();
