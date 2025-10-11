const { config } = require('./config');
const fs = require('fs');
const path = require('path');

function copy(relativePath, filePath) {
  const targetPath = path.resolve(config.targetDir, relativePath);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(filePath, targetPath);
}

module.exports = {
  copy,
};
