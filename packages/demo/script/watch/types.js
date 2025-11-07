const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { writeFileSync } = require('t-comm');
const { toPascal } = require('../utils/utils');


const CONFIG = {
  pkgJsonPath: path.resolve(__dirname, '../../../tdesign/package.json'),
  dtsDir: path.resolve(__dirname, '../../../tdesign/types'),
  indexPath: path.resolve(__dirname, '../../../tdesign/types/index.d.ts'),
  globalDTSPath: path.resolve(__dirname, '../../../tdesign/global.d.ts'),
  filterTypes: ['form-item'],
};

const OTHER_EXPORTS = {
  './*': './*',
};

const DTS_TEMPLATE = `import type { TransformEventHandlers, ExtractNonOnProps } from '../common/common';
import type { Td{{Component}}Props } from '../{{component}}/type';

export type {{Component}}Props = ExtractNonOnProps<Td{{Component}}Props>;
export type {{Component}}Emits = TransformEventHandlers<Td{{Component}}Props, true>;
declare const {{Component}}Component: import('vue').DefineComponent<{{Component}}Props, {}, {}, {}, {}, {}, {}, {{Component}}Emits, any>;
export default {{Component}}Component;
`;

const GLOBAL_DTS_TEMPLATE = `declare module 'vue' {
  export interface GlobalComponents {
    {{CONTENT}}
  }
}

export {};
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
  genIndexContent(fileNames);
  getGlobalDTS(fileNames);
}


function changePkgExports(fileNames) {
  const exportsType = fileNames.reduce((acc, item) => {
    const key = `./${item}/${item}.vue`;
    return {
      ...acc,
      [key]: {
        types: `./types/${item}.d.ts`,
        import: key,
        default: key,
      },
    };
  }, {
    ...OTHER_EXPORTS,
  });

  const pkgJson = require(CONFIG.pkgJsonPath);
  pkgJson.exports = exportsType;
  writeFileSync(CONFIG.pkgJsonPath, `${JSON.stringify(pkgJson, null, 2)}\n`);
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

function genIndexContent(fileNames) {
  const content = Array.from(new Set(fileNames))
    .filter(item => !CONFIG.filterTypes.includes(item))
    .map(item => `export * from '../${item}/type';`);
  writeFileSync(CONFIG.indexPath, `${content.join('\n')}\n`);
}

function getGlobalDTS(fileNames) {
  const content = Array.from(new Set(fileNames))
    .map(item => `${toPascal(item)}: typeof import('tdesign-uniapp/${item}/${item}.vue').default;`);

  const result = GLOBAL_DTS_TEMPLATE.replace('{{CONTENT}}', content.join('\n    '));
  writeFileSync(CONFIG.globalDTSPath, result);
}


main();
