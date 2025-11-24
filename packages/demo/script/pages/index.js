const {
  components,
} = require('../utils/components.js');
const { writeFileSync, readFileSync, hyphenate } = require('t-comm');
const { DEFAULT_PAGES, SHOW_SKYLINE_PAGES, CONFIG } = require('./config');


const {
  base,
  skylineBase,
  nav,
  skylineNav,
  display,
  skylineDisplay,
  form,
  skylineForm,
  ux,
  skylineUx,
  chat,
  skylineChat,
} = components;

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

function parseData(rawData) {
  const list = [
    // chat,
    base,
    nav,
    form,
    display,
    ux,
  ];

  const skylineList = SHOW_SKYLINE_PAGES ? [
    skylineChat,
    skylineBase,
    skylineNav,
    skylineForm,
    skylineDisplay,
    skylineUx,
  ] : [];

  const componentPages = getComponentPages(list, false);
  const skylinePages = getComponentPages(skylineList, true);

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
  rawData.subPackages = [
    ...chat.childArr.map((item) => {
      const camelName = hyphenate(item.name);
      return {
        root: `pages-more/${camelName}`,
        pages: [
          {
            path: camelName,
          },
        ],
      };
    }),
  ];

  rawData.condition = {
    current: 0,
    list: [
      ...componentPages.map(item => ({
        name: item.name,
        pathName: item.path,
      })),
      ...rawData.subPackages.reduce((acc, item) => [
        ...acc,
        ...item.pages.map(page => ({
          name: page.path,
          pathName: `${item.root}/${page.path}`,
        })),
      ], []),
    ],
  };
}

function main() {
  const list = [
    CONFIG.VUE3_CLI_PAGES_JSON,
    CONFIG.VUE3_HX_PAGES_JSON,
    CONFIG.VUE2_HX_PAGES_JSON,
    CONFIG.VUE2_CLI_PAGES_JSON,
  ];

  for (const file of list) {
    const rawData = readFileSync(file, true);
    parseData(rawData);
    writeFileSync(file, `${JSON.stringify(rawData, null, 2)}\n`, false);
  }

  console.log('[pages.json] Wrote!');
}

main();
