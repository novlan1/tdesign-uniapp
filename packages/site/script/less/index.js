const glob = require('glob');
const path = require('path');
const fs = require('fs');

const { writeFileSync, readFileSync  } = require('t-comm');

const config = {
  target: path.resolve(__dirname, '../../../tdesign'),
  source: path.resolve(__dirname, '../../../../../tdesign-miniprogram/packages/components'),
};

function cpLess(file) {
  const componentName = path.basename(file, '.less');
  const targetPath = path.resolve(config.target, componentName, `${componentName}.less`);

  if (fs.existsSync(path.dirname(targetPath))) {
    writeFileSync(targetPath, readFileSync(file));
  }
}

function main() {
  const list = glob.sync(`${config.source}/*/*.less`);
  list.forEach(cpLess);
  console.log('[less] Wrote!');
}

main();
