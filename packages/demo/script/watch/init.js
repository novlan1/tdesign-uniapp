const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { config } = require('./config');
const { copy } = require('./core');
const { deleteFolder } = require('t-comm');


async function main() {
  deleteFolder(config.targetDir);
  deleteFolder(config.rawTargetDir);
  deleteFolder(config.demoDir);

  const list = glob.sync(config.sourceGlob, {
    ignore: '**/node_modules/**/*',
    nodir: true,
  });

  for (const item of list) {
    const relativePath = path.relative(config.sourceDir, item);
    await copy({
      relativePath,
      filePath: item,
      config,
    });
  }
  console.log(`[Wrote] done! Length is ${list.length}!`);

  await copyDemoPagesToApp();
}


async function copyDemoPagesToApp() {
  const list = glob.sync([config.demoPagesGlob, config.demoComponentsGlob], {
    ignore: '**/node_modules/**/*',
    nodir: true,
  });

  for (const item of list) {
    const relativePath = path.relative(path.resolve(config.demoRealDir, 'src'), item);

    const targetPath = path.resolve(config.appDir, relativePath);

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(item, targetPath);
  }

  console.log(`[Wrote] done! Length of App Files is ${list.length}!`);
}

main();
