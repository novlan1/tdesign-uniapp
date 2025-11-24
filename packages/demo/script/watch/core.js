const fs = require('fs');
const path = require('path');
const { processLess } = require('../release/less');


async function copy({
  relativePath,
  filePath,

  config: {
    targetDir,
    rawTargetDir,
    demoDir,
  },
}) {
  // action-sheet/action-sheet.vue
  // action-sheet/_example/list/index.vue
  const isDemo = relativePath.split(path.sep)[1] === '_example';
  const isCommon = relativePath.split(path.sep)[0] === 'common';

  let targetPath = path.resolve(targetDir, relativePath);

  if (rawTargetDir) {
    const rawTargetPath = path.resolve(rawTargetDir, relativePath);

    if (isCommon) {
      fs.mkdirSync(path.dirname(rawTargetPath), { recursive: true });
      fs.copyFileSync(filePath, rawTargetPath);
    }
  }


  if (isDemo) {
    targetPath = path.resolve(demoDir, relativePath.replace(`${path.sep}_example`, ''));
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  let lessResult = false;
  if (!filePath.includes('_example')) {
    lessResult = await processLess(filePath, targetPath);
  }

  if (!lessResult) {
    fs.copyFileSync(filePath, targetPath);
  }

  return {
    targetPath,
    isDemo,
    relativeTargetByCwd: path.relative(process.cwd(), targetPath),
    relativeSourceByCwd: path.relative(process.cwd(), filePath),
  };
}

module.exports = {
  copy,
};
