const browserSync = require('browser-sync'); //npm i gulp browser-sync
const process = require("process");

const watchRefresh = true; //process.argv.indexOf("--watch") >= 0;
let reloadTimerId = 0;
let reloadFiles = [];

let needCreateIndexHtml = false;

function defaultTask() {
    const browserInst = browserSync.create("watcher");
    browserInst.init({
        cors: true,
        server: './',
        startPath: "bin/index.html",
        logFileChanges: false,
    }, (err, inst) => {
        if (err) {
            console.log(err);
            inst.exit();
            browserInst.exit();
            return;
        }
        watchRefresh && browserInst.watch("./bin/", {
            interval: 1000,
            ignoreInitial: true
        }, (event, file) => {
            switch (event) {
                case "add":
                case "unlink":
                    needCreateIndexHtml = true;
                    break;
                case "change": break;
                // case "addDir":break;
                // case "unlinkDir":break;
                default: return;
            }
            if (reloadFiles.indexOf(file) < 0)
                reloadFiles.push(file);

            if (reloadTimerId != 0) clearTimeout(reloadTimerId);
            reloadTimerId = setTimeout(() => {
                if (needCreateIndexHtml) {
                    needCreateIndexHtml = false;
                    require("./project-tools/tsSort/tsSort.js").htmlHandlerScript({
                        workspacePath: __dirname
                    });
                }
                browserInst.reload(reloadFiles);
                reloadFiles.length = 0;
                reloadTimerId = 0;
            }, 1000);
        });
    });
}
exports.default = defaultTask