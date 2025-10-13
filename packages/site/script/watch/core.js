const fs = require('fs');
const path = require('path');

function copy({
  relativePath, filePath, config,
}) {
  const isDemo = relativePath.split(path.sep)[1] === '_example';
  let targetPath = path.resolve(config.targetDir, relativePath);
  if (isDemo) {
    targetPath = path.resolve(config.demoDir, relativePath.replace(`${path.sep}_example`, ''));
  }
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(filePath, targetPath);

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
