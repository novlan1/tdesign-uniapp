const path = require('path');
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
}

main();
