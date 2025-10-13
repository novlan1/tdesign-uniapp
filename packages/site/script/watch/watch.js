const watch = require('gulp-watch');
const path = require('path');
const { config } = require('./config');
const { copy } = require('./core');


function main() {
  watch(config.sourceGlob, async (e) => {
    const { event, history, base } = e || {};

    if (event !== 'unlink' && history?.[0]) {
      const filePath = history[0];
      const relativePath = path.relative(base, filePath);

      const { relativeTargetByCwd, relativeSourceByCwd } = await copy({
        relativePath,
        filePath,
        config,
      });
      console.log(`[Wrote] done! \nFrom ${relativeSourceByCwd} to ${relativeTargetByCwd}`);
    }
  });
}


main();
