import * as fs from "fs";
import * as path from "path";
import { BuildBase } from "./BuildBase";
import { Logger } from "./Console";
import { BaseProxyPath, BaseViewCtrlPath, UiDir, ViewDir, ViewIDDeclarePath, ViewIDPath, ViewRegisterPath } from "./Const";
import { GetAllFile, GetTemplateContent, MakeDir, UpperFirst } from "./Utils";
export class BuildView extends BuildBase {
    private viewTemplate = GetTemplateContent("View");
    private ctrlTemplate = GetTemplateContent("ViewCtrl");
    private proxyTemplate = GetTemplateContent("ViewProxy");
    private viewIDTemplate = GetTemplateContent("ViewID");
    private viewIDDeclareTemplate = GetTemplateContent("ViewIDDeclare");
    private viewRegisterTemplate = GetTemplateContent("ViewRegister");

    protected buildFilter = [
        { sign: "UI", funcs: [this.BuildView, this.BuildCtrl, this.BuildProxy] },
        { sign: "Com", funcs: [this.BuildView, this.BuildCtrl], subDir: "coms" },
        { sign: "Btn", funcs: [this.BuildView, this.BuildCtrl], subDir: "btns" },
        { sign: "Render", funcs: [this.BuildView, this.BuildCtrl], subDir: "renders" },
    ];

    doBuild() {
        this.CheckBuild(UiDir);
        this.RemoveUnused();
        this.BuildViewID();
        this.BuildViewRegister();
    }

    private CheckBuild(dirPath: string) {
        fs.readdirSync(dirPath).forEach(filename => {
            const filePath = path.resolve(dirPath, filename);
            const info = fs.statSync(filePath);
            if (info.isDirectory()) {
                this.CheckBuild(filePath);
            }
            else if (info.isFile()) {
                this.buildFilter.forEach(filter => {
                    if (filename.endsWith(".ts") && filename.startsWith(filter.sign))
                        filter.funcs.forEach(func => func.call(this, dirPath, filename.replace(".ts", ""), filter.subDir || ""));
                });
            }
        })
    }

    private BuildView(dirPath: string, filename: string, subDir: string = "") {
        const viewDir = path.resolve(ViewDir, path.basename(dirPath) + "/view/" + subDir);
        MakeDir(viewDir);
        const [viewCls, viewPath, pkgName] = [
            filename + "View",
            path.resolve(viewDir, filename + "View.ts"),
            path.basename(dirPath),
        ];
        if (!fs.existsSync(viewPath)) {
            let content = this.viewTemplate;
            content = content.replace(/#viewPath#/g, path.relative(viewDir, path.resolve(dirPath, filename)).replace(/\\/g, "/").replace(/\.ts/g, ""))
                .replace(/#className#/g, viewCls)
                .replace(/#packageName#/g, pkgName)
                .replace(/#fileName#/g, filename);

            let [sendContent, compContent, compExtension, messages] = ["", "", "\n", ""];

            const matches = fs.readFileSync(path.resolve(dirPath, filename + ".ts")).toString().match(/public.*:.*;/g);
            const uiComps = matches ? matches.filter(v => !v.includes("static")) : [];
            // const uiComps = fs.readFileSync(path.resolve(dirPath, filename + ".ts")).toString().match(/public((?!static).)*;/g);
            if (uiComps.length > 0) {
                let msgEnumName = `${ filename }Msg`;
                let useComps = [];
                uiComps.forEach((v, index) => {
                    const [varName, varType] = v.substring(7, v.length - 1).split(":");
                    if (varName.toLowerCase().startsWith("btn")) {
                        let msgName = `On${ UpperFirst(varName, ["_"], "") }Click`;
                        let msgValue = `"${ filename }_${ msgName }"`;
                        messages += `\t${ msgName } = ${ msgValue },\n`;
                        sendContent += `\n\t\t${ varName }.onClick(this, this.sendMessage, [${ msgEnumName }.${ msgName }]);`;
                    } else return;
                    useComps.push(varName);
                });

                compContent = useComps.length > 0 ? `const { ${ useComps.join(", ") } } = this;${ sendContent }` : sendContent;
            }

            content = content.replace(/#allComp#/g, compContent)
                .replace(/#messages#/g, messages.trimEnd())
                .replace(/#compExtension#/g, compExtension.trimEnd());
            console.log(viewCls);
            fs.writeFileSync(viewPath, content);
        }
    }

    private BuildCtrl(dirPath: string, filename: string, subDir: string) {
        const _viewDir = path.resolve(ViewDir, path.basename(dirPath) + "/view/" + subDir);
        const _ctrlDir = path.resolve(ViewDir, path.basename(dirPath) + "/controller/" + subDir);
        MakeDir(_ctrlDir);
        const [viewCls, viewMsg, ctrlCls, dataName, viewPath, ctrlPath, pkgName] = [
            filename + "View",
            filename + "Msg",
            filename + "Ctrl",
            filename + "Data",
            path.resolve(_viewDir, filename + "View.ts"),
            path.resolve(_ctrlDir, filename + "Ctrl.ts"),
            path.basename(dirPath),
        ];
        if (!fs.existsSync(ctrlPath)) {
            let content = this.ctrlTemplate;
            content = content.replace(/#baseViewCtrlPath#/g, path.relative(_ctrlDir, BaseViewCtrlPath).replace(/\\/g, "/").replace(/\.ts/g, ""))
                .replace(/#viewPath#/g, path.relative(_ctrlDir, viewPath).replace(/\\/g, "/").replace(/\.ts/g, ""))
                .replace(/#className#/g, ctrlCls)
                .replace(/#packageName#/g, pkgName)
                .replace(/#viewClass#/g, viewCls)
                .replace(/#viewMsg#/g, viewMsg)
                .replace(/#dataName#/g, dataName);
            let [msgContent, funcContent] = ["", ""];
            const matches = fs.readFileSync(path.resolve(dirPath, filename + ".ts")).toString().match(/public.*:.*;/g);
            const uiComps = matches ? matches.filter(v => !v.includes("static")) : [];
            if (uiComps.length > 0) {
                uiComps.forEach(v => {
                    v = v.split(" ")[1].split(":")[0];
                    if (v.toLowerCase().startsWith("btn")) {
                        const btnName = UpperFirst(v, ["_"], "");
                        msgContent += `\t\tthis.addMessage(${ viewMsg }.On${ btnName }Click, this.on${ btnName }Click);\n`;
                        funcContent += `\tprivate on${ btnName }Click() {\n\t\n\t}\n\n`;
                    }
                })
                msgContent = msgContent ? msgContent.trimEnd() : msgContent;
                funcContent = funcContent ? funcContent.trimEnd() + "\n" : funcContent;
            }
            content = content.replace(/#btnMessage#/g, msgContent);
            content = content.replace(/#btnFunctions#/g, funcContent);
            console.log(ctrlCls);
            fs.writeFileSync(ctrlPath, content);
        }
    }

    private BuildProxy(dirPath: string, filename: string, subDir: string) {
        return;
        const _ctrlDir = path.resolve(ViewDir, path.basename(dirPath) + "/controller/" + subDir);
        const _proxyDir = path.resolve(ViewDir, path.basename(dirPath) + "/proxy/" + subDir);
        MakeDir(_proxyDir);
        const [ctrlCls, proxyCls, ctrlPath, proxyPath] = [
            filename + "Ctrl",
            filename + "Proxy",
            path.resolve(_ctrlDir, filename + "Ctrl"),
            path.resolve(_proxyDir, filename + "Proxy.ts"),
        ];
        if (!fs.existsSync(proxyPath)) {
            let content = this.proxyTemplate;
            content = content.replace(/#baseProxyPath#/g, path.relative(_proxyDir, BaseProxyPath).replace(/\\/g, "/").replace(/\.ts/g, ""))
                .replace(/#viewCtrlPath#/g, path.relative(_proxyDir, ctrlPath).replace(/\\/g, "/"))
                .replace(/#proxyName#/g, proxyCls)
                .replace(/#viewCtrl#/g, ctrlCls);
            fs.writeFileSync(proxyPath, content);
        }
    }

    private RemoveUnused() {
        GetAllFile(
            ViewDir, true,
            filename => filename.endsWith("View.ts") || filename.endsWith("Ctrl.ts") || filename.endsWith("Proxy.ts")
        ).forEach(filepath => {
            const relative = path.relative(ViewDir, filepath);
            const pkgname = relative.split("\\")[0];
            const filename = path.basename(relative, ".ts");
            let uiname = "";
            if (filename.endsWith("View")) uiname = filename.substring(0, filename.length - 4);
            else if (filename.endsWith("Ctrl")) uiname = filename.substring(0, filename.length - 4);
            else if (filename.endsWith("Proxy")) uiname = filename.substring(0, filename.length - 5);
            else return;
            const uipath = path.resolve(UiDir, pkgname, uiname + ".ts");
            if (!fs.existsSync(uipath)) {
                Logger.error("删除=>" + filepath);
                fs.unlinkSync(filepath);
            }
        });
    }

    private GetViewIDContent() {
        let [btns, renders, coms, views] = [
            "\t/**Btns */\n",
            "\t/**Renders */\n",
            "\t/**Coms */\n",
            "\t/**UIs */\n"
        ];
        const viewNames = GetAllFile(
            ViewDir, false,
            filename => (filename.startsWith("Btn")
                || filename.startsWith("Render")
                || filename.startsWith("Com")
                || filename.startsWith("UI")) && filename.endsWith("View.ts"),
            filename => filename.replace(".ts", ""),
        );
        let viewCount = 0;
        viewNames.forEach(v => {
            if (v.startsWith("UI")) {
                views += `\t${ v } = "${ v }",\n`;
            } else if (v.startsWith("Com")) {
                coms += `\t${ v } = "${ v }",\n`;
            } else if (v.startsWith("Btn")) {
                btns += `\t${ v } = "${ v }",\n`;
            } else if (v.startsWith("Render")) {
                renders += `\t${ v } = "${ v }",\n`;
            }
            else
                return;
            viewCount++;
        });
        let combine = btns + "\n" + renders + "\n" + coms + "\n" + views;
        if (viewCount == 0) combine = "\tNone = \"\",\n" + combine;
        return combine;
    }

    private BuildViewID() {
        const content = this.GetViewIDContent();
        const viewIDContent = this.viewIDTemplate.replace("#content#", content);
        fs.writeFileSync(ViewIDPath, viewIDContent);
        const viewIDDeclareContent = this.viewIDDeclareTemplate.replace("#content#", content);
        fs.writeFileSync(ViewIDDeclarePath, viewIDDeclareContent);
    }

    private BuildViewRegister() {
        const viewRegisterDir = path.dirname(ViewRegisterPath);
        const mapFunc = (fileName: string) => fileName.replace(".ts", "");
        const filterFunc = (start: string, end: string) => (fileName: string) => (!start || fileName.startsWith(start)) && (!end || fileName.endsWith(end));

        const binderNames = GetAllFile(UiDir, true, filterFunc("", "Binder.ts"), mapFunc);
        const uiNames = GetAllFile(UiDir, true, filterFunc("UI", ".ts"), mapFunc);
        const btnNames = GetAllFile(UiDir, true, filterFunc("Btn", ".ts"), mapFunc);
        const comNames = GetAllFile(UiDir, true, filterFunc("Com", ".ts"), mapFunc);
        const renderNames = GetAllFile(UiDir, true, filterFunc("Render", ".ts"), mapFunc);

        let [binderCode, registerCode, imports] = ["", "", []];

        binderNames.forEach(v => {
            const basename = path.basename(v);
            binderCode += `\t\t${ basename }.bindAll();\n`
            imports.push(`import ${ basename } from "${ path.relative(viewRegisterDir, v).replace(/\\/g, "/") }";`);
        });

        const subDirMap = { Btns: "btns\\", Renders: "renders\\", Coms: "coms\\", UIs: "" };
        const addExtAndRegistCode = (arr: string[], desc: string) => {
            registerCode += `\n\t\t//${ desc }\n`;
            arr.forEach(v => {
                const basename = path.basename(v);
                const tempPath = v.replace("ui\\Pkg", "view\\Pkg");
                const viewPath = tempPath.replace(basename, "view\\" + subDirMap[desc] + basename + "View.ts");
                const ctrlPath = tempPath.replace(basename, "controller\\" + subDirMap[desc] + basename + "Ctrl.ts");
                const proxyPath = tempPath.replace(basename, "proxy\\" + subDirMap[desc] + basename + "Proxy.ts");
                registerCode += `\t\tregister(ViewID.${ basename }View`;
                if (fs.existsSync(viewPath)) {
                    registerCode += ", " + basename + "View";
                    imports.push(`import { ${ basename }View } from "${ path.relative(viewRegisterDir, mapFunc(viewPath)).replace(/\\/g, "/") }";`);
                }
                if (fs.existsSync(ctrlPath)) {
                    registerCode += ", " + basename + "Ctrl";
                    imports.push(`import { ${ basename }Ctrl } from "${ path.relative(viewRegisterDir, mapFunc(ctrlPath)).replace(/\\/g, "/") }";`);
                }
                if (fs.existsSync(proxyPath)) {
                    registerCode += ", " + basename + "Proxy";
                    imports.push(`import { ${ basename }Proxy } from "${ path.relative(viewRegisterDir, mapFunc(proxyPath)).replace(/\\/g, "/") }";`);
                }
                registerCode += ");\n";
            });
        }
        addExtAndRegistCode(btnNames, "Btns");
        addExtAndRegistCode(renderNames, "Renders");
        addExtAndRegistCode(comNames, "Coms");
        addExtAndRegistCode(uiNames, "UIs");

        let content = this.viewRegisterTemplate
            .replace("#import#", imports.join("\n"))
            .replace("#binderCode#", binderCode + "\t")
            .replace("#registerCode#", registerCode + "\t");
        content = content.replace("#ViewIDContent#", this.GetViewIDContent());
        fs.writeFileSync(ViewRegisterPath, content);
    }
}