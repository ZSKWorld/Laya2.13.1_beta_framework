const { watch } = require('gulp');
const { exec } = require('child_process');
const browserSync = require('browser-sync');

let finished = true;
function defaultTask(cb) {
    /** 启动服务根目录 */
    browserSync({ server: './bin', });
    /** 监听src目录下所有变化，延迟100毫秒执行下次监听*/
    watch(['src/**/*.*'], { delay: 100 }, compile);
}

function compile(cb) {
    if (finished) {
        finished = false;
        //执行编译命令 layaair2-cmd compile
        exec('layaair2-cmd compile').on('exit', () => {
            // 刷新浏览器
            browserSync.reload();
            finished = true;
            cb();
        });
    }
}
exports.default = defaultTask


