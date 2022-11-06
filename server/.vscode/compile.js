const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

/**删除目录，包括目录中所有文件和子目录 */
const removeDir = function (dir) {
    if (fs.existsSync(dir) == false) return;
    let files = fs.readdirSync(dir)
    for (var i = 0; i < files.length; i++) {
        let newPath = path.join(dir, files[i]);
        let stat = fs.statSync(newPath)
        if (stat.isDirectory()) {
            //如果是文件夹就递归下去
            removeDir(newPath);
        } else {
            //删除文件
            fs.unlinkSync(newPath);
        }
    }
    fs.rmdirSync(dir)
}

removeDir(path.resolve(__dirname, "../bin/declare"));
childProcess.exec("tsc ./src/Main.ts --outDir ./bin/js");