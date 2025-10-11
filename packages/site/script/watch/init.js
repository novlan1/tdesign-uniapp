const path = require('path');
const glob = require('glob');
const { config } = require('./config');
const { copy } = require('./core');


function main() {
  const list = glob.sync(config.sourceGlob, {
    ignore: '**/node_modules/**/*',
    nodir: true,
  });

  list.forEach((item) => {
    const relativePath = path.relative(config.sourceDir, item);
    console.log('[Wrote] ', relativePath);
    copy(relativePath, item);
  });
  console.log(`[Wrote] done! Length is ${list.length}!`);
}

main();
