const { base } = require('../../src/pages/home/data/base.json');
const { nav } = require('../../src/pages/home/data/nav.json');
const { display } = require('../../src/pages/home/data/display.json');
const { form } = require('../../src/pages/home/data/form.json');
const { ux } = require('../../src/pages/home/data/ux.json');
const { chat } = require('../../src/pages/home/data/chat.json');

const path = require('path');
const pagesJson = path.resolve(__dirname, '../../src/pages.json');
const { writeFileSync, readFileSync, hyphenate } = require('t-comm');
const BASE_PAGE_NUMBER = 4;

function main() {
  const list = [
    chat,
    base,
    nav,
    form,
    display,
    ux,
  ];

  const componentPages = list.reduce((acc, item) => [
    ...acc,
    ...(item.childArr || []),
  ], [])
    .map((item) => {
      const name = hyphenate(item.name);
      const { path } = item;
      return {
        path: path ? path.replace(/^\//, '') : `pages-more/${name}/${name}`,
      };
    });

  const rawData = readFileSync(pagesJson, true);
  rawData.pages = [
    ...(rawData.pages || []).slice(0, BASE_PAGE_NUMBER),
    ...componentPages,
  ];
  writeFileSync(pagesJson, rawData, true);
  console.log('[pages.json] Wrote!');
}

main();
