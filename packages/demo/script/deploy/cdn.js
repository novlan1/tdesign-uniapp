const { uploadCOSFileAndPurgeUrlCache } = require('t-comm');
const glob = require('glob');
const path = require('path');

require('./local.env')();


const COS_CONFIG = {
  bucket: 'mike-1255355338',
  region: 'ap-guangzhou',

};


async function uploadCdn({
  secretId,
  secretKey,
}) {
  const list = glob.sync('./packages/site/dist/**/*', {
    ignore: '**/*.html',
    nodir: true,
  });

  const files = list.map((item) => {
    const filePath = path.resolve(process.cwd(), item);
    const key =  `tdesign-uniapp/${path.relative(path.resolve(process.cwd(), './packages/site/dist'), item)}`;

    return {
      key,
      path: filePath,
    };
  });

  await uploadCOSFileAndPurgeUrlCache({
    ...COS_CONFIG,
    secretId: secretId || process.env.COS_SECRET_ID,
    secretKey: secretKey || process.env.COS_SECRET_KEY,

    files,

    area: 'mainland',
    useEO: false,
  }).then((res) => {
    console.log('[uploadResult] res: ', res);
  })
    .catch(() => {});
}

module.exports = {
  uploadCdn,
};
