const path = require('path');
const glob = require('glob');
const { deleteFolder } = require('t-comm');

const { config } = require('./config');
const { copy } = require('../watch/core.js');


function main() {
  deleteFolder(config.targetDir);
  const list = glob.sync(config.sourceGlob, {
    ignore: '**/{node_modules,_example}/**/*',
    nodir: true,
    dot: true,
  });

  list.forEach((item) => {
    const relativePath = path.relative(config.sourceDir, item);
    const {
      relativeTargetByCwd,
      relativeSourceByCwd,
    } = copy({
      relativePath,
      filePath: item,
      config,
    });
    console.log(`[Wrote] done! \nFrom ${relativeSourceByCwd} to ${relativeTargetByCwd}`);
  });
  console.log(`[Wrote] done! Length is ${list.length}!`);
}

main();
