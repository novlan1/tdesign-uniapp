const { uploadCOSFileAndPurgeUrlCache } = require('t-comm');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

require('./local.env')();
const args = process.argv.slice(2);


const COS_CONFIG = {
  bucket: 'mike-1255355338',
  region: 'ap-guangzhou',
  secretId: args[0] || process.env.COS_SECRET_ID,
  secretKey: args[1] || process.env.COS_SECRET_KEY,
};


async function uploadCdn() {
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

  for (const item of files) {
    uploadCOSFileAndPurgeUrlCache({
      ...COS_CONFIG,

      files: [item],

      area: 'mainland',
      useEO: false,
    }).then((res) => {
      console.log('[uploadResult] res: ', res);

      fs.unlinkSync(item.path);
    })
      .catch((e) => {
        console.log('uploadCOSFileAndPurgeUrlCache.err: ', e);
      });
  }
}

uploadCdn();
