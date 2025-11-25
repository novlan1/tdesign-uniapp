const watch = require('gulp-watch');
const path = require('path');
const { config } = require('./config');
const { copy } = require('./core');
const net = require('net');
const {
  getCopyExampleParams,
  getCopyAppParams,
  getCopyVue2HXParams,
  getCopyVue2CliParams,
} = require('./helper');

const port = 12345; // 选择一个空闲端口


function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(true));
    server.once('listening', () => {
      server.close(() => resolve(false));
    });
    server.listen(port);
  });
}


async function main() {
  if (await isPortInUse(port)) {
    console.log('[Watch] 监听已在其他终端运行');
    return;
  }
  // 创建监听服务器（占用端口）
  const server = net.createServer();
  server.listen(port);


  watch(config.baseAndChatSourceGlob, async (e) => {
    const { event, history, base } = e || {};

    if (event !== 'unlink' && history?.[0]) {
      const filePath = history[0];
      let relativePath = path.relative(base, filePath);
      console.log('relativePath', relativePath);
      const isChat = relativePath.includes(`tdesign-uniapp-chat${path.sep}`);
      if (relativePath.startsWith(`tdesign${path.sep}`) || relativePath.startsWith(`tdesign-uniapp-chat${path.sep}`)) {
        relativePath = relativePath.split(path.sep).slice(1)
          .join(path.sep);
      }

      console.log('base', base);
      console.log('history', history);
      console.log('isChat', isChat);

      const {
        relativeTargetByCwd,
        relativeSourceByCwd,
      } = await copy({
        relativePath,
        filePath,
        config: getCopyExampleParams(isChat),
      });
      console.log(`[Wrote] done! \nFrom ${relativeSourceByCwd} to ${relativeTargetByCwd}`);

      const {
        relativeTargetByCwd: relativeTargetByCwdApp,
        relativeSourceByCwd: relativeSourceByCwdApp,
      } = await copy({
        relativePath,
        filePath,
        config: getCopyAppParams(isChat),
      });
      console.log(`[Wrote] done! \nFrom ${relativeSourceByCwdApp} to ${relativeTargetByCwdApp}`);

      const {
        relativeTargetByCwd: relativeTargetByCwdVue2HX,
        relativeSourceByCwd: relativeSourceByCwdVue2HX,
      } = await copy({
        relativePath,
        filePath,
        config: getCopyVue2HXParams(isChat),
      });
      console.log(`[Wrote] done! \nFrom ${relativeSourceByCwdVue2HX} to ${relativeTargetByCwdVue2HX}`);

      const {
        relativeTargetByCwd: relativeTargetByCwdVue2Cli,
        relativeSourceByCwd: relativeSourceByCwdVue2Cli,
      } = await copy({
        relativePath,
        filePath,
        config: getCopyVue2CliParams(isChat),
      });
      console.log(`[Wrote] done! \nFrom ${relativeSourceByCwdVue2Cli} to ${relativeTargetByCwdVue2Cli}`);
    }
  });

  // 监听进程终止信号
  process.on('exit', () => server.close());
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
}


// 优雅关闭函数
function gracefulShutdown() {
  console.log('\n[Watch] 收到终止信号，关闭监听器...');
  process.exit(0); // 退出进程
}


main();
