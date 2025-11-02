const { base, skylineBase } = require('../../src/pages/home/data/base.json');
const { nav, skylineNav } = require('../../src/pages/home/data/nav.json');
const { display, skylineDisplay } = require('../../src/pages/home/data/display.json');
const { form, skylineForm } = require('../../src/pages/home/data/form.json');
const { ux, skylineUx } = require('../../src/pages/home/data/ux.json');
const { chat, skylineChat } = require('../../src/pages/home/data/chat.json');

const path = require('path');
const pagesJson = path.resolve(__dirname, '../../src/pages.json');
const { writeFileSync, readFileSync, hyphenate } = require('t-comm');
const { DEFAULT_PAGES } = require('./config');


const getComponentPages = (list,  isSkyline) => list.reduce((acc, item) => [
  ...acc,
  ...(item.childArr || []).filter(page => !page.hide),
], [])
  .map((item) => {
    const name = hyphenate(item.name);
    const pagePathBaseComponent = `pages-more/${isSkyline ? `${name}/skyline` : `${name}`}/${name}`;
    const { path } = item;
    return {
      name,
      path: path ? path.replace(/^\//, '') : pagePathBaseComponent,
    };
  });

function main() {
  const list = [
    chat,
    base,
    nav,
    form,
    display,
    ux,
  ];
  const skylineList = [
    skylineChat,
    skylineBase,
    skylineNav,
    skylineForm,
    skylineDisplay,
    skylineUx,
  ];

  const componentPages = getComponentPages(list, false);
  const skylinePages = getComponentPages(skylineList, true);

  const rawData = readFileSync(pagesJson, true);
  rawData.pages = [
    ...DEFAULT_PAGES,
    ...componentPages.map(item => ({
      path: item.path,
    })),
    ...skylinePages.map(item => ({
      path: item.path,
      style: {
        renderer: 'skyline',
        componentFramework: 'glass-easel',
      },
    })),
  ];
  rawData.condition = {
    current: 0,
    list: componentPages.map(item => ({
      name: item.name,
      pathName: item.path,
    })),
  };
  writeFileSync(pagesJson, `${JSON.stringify(rawData, null, 2)}\n`, false);
  console.log('[pages.json] Wrote!');
}

main();
