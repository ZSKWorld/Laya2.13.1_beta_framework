import * as readline from "readline";
import { BuildBase } from "./BuildBase";
import { BuildConfig } from "./BuildConfig";
import { BuildDataEvent } from "./BuildDataEvent";
import { BuildExcelDeclare } from "./BuildExcelDeclare";
import { BuildNet } from "./BuildNet";
import { BuildProtoDeclare } from "./BuildProtoDeclare";
import { BuildResPath } from "./BuildResPath";
import { BuildServerConfig } from "./BuildServerConfig";
import { BuildServerNet } from "./BuildServerNet";
import { BuildView } from "./BuildView";
import { Logger } from "./Console";

interface Act {
    desc: string,
    cls: new () => BuildBase;
}

export class BatMain {
    constructor() {
        this.run2();


        //动态require js
        // const util = require("../js/Utils").GetTemplateContent("View");

        //文件名或者目录名
        //path.basename
        //文件或目录所在目录
        //path.dirname
        //文件后缀，目录为空
        //path.extname
    }

    private run1() {
        const act: Act[] = [
            { desc: "创建 View & ViewCtrl & ViewProxy", cls: BuildView },
            { desc: "导出表配置", cls: BuildConfig },
            { desc: "导出服务器表配置", cls: BuildServerConfig },
            { desc: "更新资源路径", cls: BuildResPath },
            { desc: "用户数据事件", cls: BuildDataEvent },
            { desc: "更新网络相关", cls: BuildNet },
        ];
        let tip = "选择要进行的操作：\n0. 全部执行\n";
        act.forEach((v, index) => tip += `${ index + 1 }. ${ v.desc }\n`);
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const question = () => {
            rl.question(tip, function (prompt) {
                let index = +prompt;
                if (Number.isNaN(index) == false && (index && act[index - 1] || !index)) {
                    index -= 1;
                    const acts: Act[] = [];
                    if (index == -1) acts.push(...act);
                    else acts.push(act[index]);
                    acts.length && acts.forEach(v => {
                        Logger.warn("正在执行 => " + v.desc);
                        (new v.cls()).doBuild();
                        Logger.green(v.desc + " => 执行完毕！")
                    });
                } else {
                    Logger.error("错误的选项！");
                }
                rl.close();
                process.exit();
                // question();
            });
        }
        question();
    }

    private run2() {
        const index = +process.argv[2];
        if (isNaN(index)) return;

        const act: Act[] = [
            { desc: "创建 View & ViewCtrl & ViewProxy", cls: BuildView },
            { desc: "导出表配置", cls: BuildConfig },
            { desc: "更新资源路径", cls: BuildResPath },
            { desc: "用户数据事件", cls: BuildDataEvent },
            { desc: "更新网络相关", cls: BuildNet },
            { desc: "导出服务器表配置", cls: BuildServerConfig },
            { desc: "更新服务器网络相关", cls: BuildServerNet },
            { desc: "更新ExcelDeclare", cls: BuildExcelDeclare },
            { desc: "更新ProtoDeclare", cls: BuildProtoDeclare },
        ];
        if (index == -1) act.forEach(v => this.runLog(v));
        else this.runLog(act[index]);
        process.exit();
    }

    private runLog(act: Act) {
        if (!act) return;
        Logger.warn("正在执行 => " + act.desc);
        (new act.cls()).doBuild();
        Logger.green(act.desc + " => 执行完毕！")
    }
}
new BatMain();