const watch = require('gulp-watch');
const path = require('path');
const { config } = require('./config');
const { copy } = require('./core');


function main() {
  watch(config.sourceGlob, (e) => {
    const { event, history, base } = e || {};

    if (event !== 'unlink' && history?.[0]) {
      const filePath = history[0];
      const relativePath = path.relative(base, filePath);
      copy(relativePath, filePath);
      console.log('[Wrote] done!', filePath);
    }
  });
}


main();
