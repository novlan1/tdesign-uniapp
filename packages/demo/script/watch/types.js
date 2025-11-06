const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { writeFileSync } = require('t-comm');
const { toPascal } = require('../utils/utils');


const CONFIG = {
  pkgJsonPath: path.resolve(__dirname, '../../../tdesign/package.json'),
  dtsDir: path.resolve(__dirname, '../../../tdesign/types'),
};

const OTHER_EXPORTS = {
  './common/style/theme/index.css': './common/style/theme/index.css',
};

const DTS_TEMPLATE = `import type { TransformEventHandlers, ExtractNonOnProps } from '../common/common';
import type { Td{{Component}}Props } from '../{{component}}/type';

export type {{Component}}Props = ExtractNonOnProps<Td{{Component}}Props>;
export type {{Component}}Emits = TransformEventHandlers<Td{{Component}}Props, true>;
declare const {{Component}}Component: import('vue').DefineComponent<{{Component}}Props, {}, {}, {}, {}, {}, {}, {{Component}}Emits, any>;
export default {{Component}}Component;
`;


function main() {
  const list = glob.sync('packages/tdesign/*/*.vue');
  const filtered = list.filter((item) => {
    const typeFile = path.resolve(item, '../type.ts');
    return fs.existsSync(typeFile);
  });

  const fileNames = filtered.map(item => item.split(path.sep)[item.split(path.sep).length - 2]);
  fileNames.sort();

  changePkgExports(fileNames);
  genDTS(fileNames);
}


function changePkgExports(fileNames) {
  const exportsType = fileNames.reduce((acc, item) => {
    const key = `./${item}/${item}.vue`;
    return {
      ...acc,
      [key]: {
        import: key,
        require: key,
        types: `./types/${item}.d.ts`,
      },
    };
  }, {
    ...OTHER_EXPORTS,
  });

  const pkgJson = require(CONFIG.pkgJsonPath);
  pkgJson.exports = exportsType;
  writeFileSync(CONFIG.pkgJsonPath, pkgJson, true);
}


function genDTS(list) {
  list.forEach((item) => {
    const fileName = path.resolve(CONFIG.dtsDir, `${item}.d.ts`);
    const content = DTS_TEMPLATE
      .replaceAll('{{Component}}', toPascal(item))
      .replaceAll('{{component}}', item);
    writeFileSync(fileName, content);
  });
}


main();
