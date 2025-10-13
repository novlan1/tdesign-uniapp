const fs = require('fs');
const path = require('path');
const { processLess } = require('../release/less');


async function copy({
  relativePath, filePath, config,
}) {
  const isDemo = relativePath.split(path.sep)[1] === '_example';
  const isCommon = relativePath.split(path.sep)[0] === 'common';
  let targetPath = path.resolve(config.targetDir, relativePath);
  const rawTargetPath = path.resolve(config.rawTargetDir, relativePath);

  if (isCommon) {
    fs.mkdirSync(path.dirname(rawTargetPath), { recursive: true });
    fs.copyFileSync(filePath, rawTargetPath);
  }


  if (isDemo) {
    targetPath = path.resolve(config.demoDir, relativePath.replace(`${path.sep}_example`, ''));
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
