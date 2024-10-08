// v1.1.12
const ideModuleDir = global.ideModuleDir;
const workSpaceDir = global.workSpaceDir;

//引用插件模块
const gulp = require(ideModuleDir + "gulp");
const { strict } = require("assert");
const fs = require("fs");
const path = require("path");
const del = require(ideModuleDir + "del");
const revCollector = require(ideModuleDir + 'gulp-rev-collector');

const { getEngineVersion } = require("./pub_utils");

let copyLibsTask = ["copyPlatformLibsJsFile"];
let versiontask = ["version2"];

let
	config,
	releaseDir,
	tempReleaseDir;
let versionCon; // 版本管理version.json
let commandSuffix,
	layarepublicPath;

let subList = [];

gulp.task("preCreate_TBMini", copyLibsTask, function () {
	releaseDir = global.releaseDir;
	tempReleaseDir = global.tempReleaseDir;
	config = global.config;
	commandSuffix = global.commandSuffix;
	layarepublicPath = global.layarepublicPath;
});

gulp.task("copyPlatformFile_TBMini", versiontask, function () {
	let adapterPath = path.join(layarepublicPath, "LayaAirProjectPack", "lib", "data", "taobaominigame", 'minigame');
	copyLibsList = [`${adapterPath}/**/*.*`];
	var stream = gulp.src(copyLibsList, { base: adapterPath });
	return stream.pipe(gulp.dest(releaseDir));
});

gulp.task("copyFiles2Pages_TBMini", ["copyPlatformFile_TBMini"], function () {
	//return gulp.src([`${tempReleaseDir}/**/*.*`, `!${tempReleaseDir}/libs/**/*.*`]).pipe(gulp.dest(`${releaseDir}/pages/index`));
});

gulp.task("moveToLibs_TBMini", ["copyFiles2Pages_TBMini"], function () {
	// let libsPath = path.join(tempReleaseDir, "libs");
	// let layaenginePath = path.join(releaseDir, "node_modules", "layaengine", "libs");
	// return gulp.src(`${libsPath}/**/*.*`)
	// 	.pipe(gulp.dest(layaenginePath));
});

gulp.task("delFiles_TBMini", ["moveToLibs_TBMini"], function () {
	// let delList = [`${tempReleaseDir}/**`];
	// del(delList, { force: true }).then(paths => {
	// 	cb();
	// }).catch((err) => {
	// 	throw err;
	// })
});

gulp.task("modifyFile_TBMini", ["delFiles_TBMini"], function () {
	if ("landscape" == config.taobaoInfo.orientation) {
		let gameJsonPath = path.join(releaseDir, "game.json");
		let content = fs.readFileSync(gameJsonPath, "utf8");
		let conJson = JSON.parse(content);
		conJson.deviceOrientation = "landscape";
		content = JSON.stringify(conJson, null, 4);
		fs.writeFileSync(gameJsonPath, content, "utf8");
	}


	// if (config.version || config.enableVersion) {
	// 	let versionPath = path.join(releaseDir, "pages", "index", "version.json");
	// 	versionCon = fs.readFileSync(versionPath, "utf-8");
	// 	versionCon = JSON.parse(versionCon);
	// }

	// // 修改 app.json mini.project.json 文件
	// let miniProJJsonPath = path.join(releaseDir, "mini.project.json");
	// let minicontent = fs.readFileSync(miniProJJsonPath, "utf8");
	// let miniConJson = JSON.parse(minicontent);
	// let appJsonPath = path.join(releaseDir, "app.json");
	// let content = fs.readFileSync(appJsonPath, "utf8");
	// let conJson = JSON.parse(content);
	// // 先删掉之前的记录
	// delete conJson.subPackages;
	// delete conJson.subPackageBuildType;
	// delete miniConJson.enableEnhancedBuild;
	// let index = 0, value;
	// while (miniConJson.include.length > index) {
	// 	value = miniConJson.include[index];
	// 	if (value.match(/[\w]+\/\*\*/mg)) {
	// 		miniConJson.include.splice(index, 1);
	// 		continue;
	// 	}
	// 	index++;
	// }
	// if (config.taobaoInfo.subpack) { // 分包
	// 	let subpack = config.taobaoSubpack;
	// 	let subitem, obj;
	// 	conJson.subPackages = [];
	// 	for (let i = 0, len = subpack.length; i < len; i++) {
	// 		subitem = subpack[i];
	// 		obj = {
	// 			"root": subitem.name
	// 		};
	// 		if (config.taobaoInfo.ispagesub) { // 页面分包
	// 			if (!subitem.root) continue;
	// 			obj.pages = subitem.root.split(",")
	// 		} else { // 资源分包
	// 			conJson.subPackageBuildType = "shared";
	// 			miniConJson.enableEnhancedBuild = true;
	// 			if (!miniConJson.include) miniConJson.include = [];
	// 			miniConJson.include.push(`${subitem.name}/**`);
	// 		}
	// 		conJson.subPackages.push(obj);
	// 	}
	// }
	// content = JSON.stringify(conJson, null, 4);
	// fs.writeFileSync(appJsonPath, content, "utf8");
	// minicontent = JSON.stringify(miniConJson, null, 4);
	// fs.writeFileSync(miniProJJsonPath, minicontent, "utf8");

	// // 修改index.js
	// let indexJsStr = (versionCon && versionCon["index.js"]) ? versionCon["index.js"] : "index.js";
	// let indexFilePath = path.join(releaseDir, "pages", "index", indexJsStr);
	// if (!fs.existsSync(indexFilePath)) {
	// 	return;
	// }
	// let indexFileContent = fs.readFileSync(indexFilePath, "utf-8");
	// indexFileContent = indexFileContent.replace(/(window.screenOrientation\s*=\s*"\w+"[,;]?)/gm, "/**$1*/");
	// indexFileContent = indexFileContent.replace(/loadLib(\(['"]libs\/)/gm, `require("layaengine/libs/`);
	// indexFileContent = indexFileContent.replace(/loadLib(\(['"])/gm, "require$1./");
	// indexFileContent = indexFileContent.replace(/require\(\"\.\/laya([-\w]*)\.js\"\)/gm, `require("layaengine/laya$1.js")`);
	// // 特殊的，增加清除缓存
	// indexFileContent = indexFileContent.replace(/(require(\(['"][\w\/\.]+['"]\));?)/gm, "delete require.cache[require.resolve$2];\n$1");
	// fs.writeFileSync(indexFilePath, indexFileContent, "utf-8");
})

gulp.task("movesubpack_TBMini", ["modifyFile_TBMini"], function () {
	if (!config.taobaoInfo.subpack || config.taobaoSubpack.length == 0) { // 分包
		return;
	}
	let subpack = config.taobaoSubpack;
	let appJsonPath = path.join(releaseDir, "game.json");
	let content = fs.readFileSync(appJsonPath, "utf8");
	let conJson = JSON.parse(content);
	conJson.subpackages = subpack;
	content = JSON.stringify(conJson, null, 4);
	fs.writeFileSync(appJsonPath, content, "utf8");


	// let subitem, obj;
	// // conJson.subPackages = [];
	// for (let i = 0, len = subpack.length; i < len; i++) {
	// 	subitem = subpack[i];
	// 	subList.push(`${subitem.name}/**`);
	// }
	// let source = `${path.join(releaseDir, "pages", "index")}/${subList.length > 1 ? `{${subList.join(",")}}` : `${subList[0]}`}`;
	// return gulp.src(source, { base: path.join(releaseDir, "pages", "index") }).pipe(gulp.dest(releaseDir));
})

gulp.task("rmsubpack_TBMini", ["movesubpack_TBMini"], function () {
	// if (!config.taobaoInfo.subpack || subList.length == 0) { // 分包
	// 	return cb();
	// }
	// let delList = [];
	// for (let i = 0, len = subList.length; i < len; i++) {
	// 	delList.push(`${releaseDir}/pages/index/${subList[i]}`);
	// }
	// console.log(delList);
	// del(delList, { force: true }).then(paths => {
	// 	cb();
	// }).catch((err) => {
	// 	throw err;
	// })
});

function modifyTemplateString(template, replacements) {
	let modifiedString = template;
	for (let key in replacements) {
		modifiedString = modifiedString.replace(`{${key}}`, replacements[key]);
	}
	return modifiedString;
}

gulp.task("modifyMinJs_TBMini", ["rmsubpack_TBMini"], function () {

	let dirPath = path.join(releaseDir, "libs", "min");
	let filePath = path.join(releaseDir, "game.js");
	let content = fs.readFileSync(filePath, 'utf-8');
	if (fs.existsSync(dirPath)) {
		// let templateString = "Hello, {name}!";
		// let replacements = { name: "GitHub Copilot" };

		// let modifiedString = modifyTemplateString(templateString, replacements);
		// console.log(modifiedString);
		content = modifyTemplateString(content, { tbmini: "./libs/min/laya.tbmini.min.js" });

	} else {
		content = modifyTemplateString(content, { tbmini: "./libs/laya.tbmini.js" });
	}
	fs.writeFileSync(filePath, content, 'utf-8');

	// 如果保留了平台文件，如果同时取消使用min类库，就会出现文件引用不正确的问题
	// if (config.keepPlatformFile) {
	// 	let fileJsPath = path.join(releaseDir, "pages", "index", "game.js");
	// 	let content = fs.readFileSync(fileJsPath, "utf-8");
	// 	content = content.replace(/min\/laya(-[\w\d]+)?\.tbmini\.min\.js/gm, "laya.tbmini.js");
	// 	fs.writeFileSync(fileJsPath, content, 'utf-8');
	// }
	// if (!config.useMinJsLibs) {
	// 	return;
	// }
	// let fileJsPath = path.join(releaseDir, "pages", "index", "game.js");
	// let content = fs.readFileSync(fileJsPath, "utf-8");
	// content = content.replace(/(min\/)?laya(-[\w\d]+)?\.tbmini(\.min)?\.js/gm, "min/laya.tbmini.min.js");
	// fs.writeFileSync(fileJsPath, content, 'utf-8');
});
function recursiveModifyJsFiles(directory) {
	const files = fs.readdirSync(directory);
	files.forEach((file) => {
		const filePath = path.join(directory, file);
		const stats = fs.statSync(filePath);
		if (stats.isDirectory()) {
			recursiveModifyJsFiles(filePath);
		} else if (path.extname(file) === ".js") {
			let str = fs.readFileSync(filePath, "utf8");
			//str = `var window = $global;var Laya = window.Laya;var performance = window.performance;var navigator = window.navigator;var spine = window.spine;var CANNON = window.CANNON;` + str;
			let i = str.indexOf("\"use strict\";");

			let addStr = `var window = $global,
				global = $global,
				globalThis = $global;
			var Laya = window.Laya;
			var performance = window.performance;
			var navigator = window.navigator;
			var spine = window.spine;
			var CANNON = window.CANNON;
			var document = window.document;
			var Config = window.Config;
			var Laya3D = window.Laya3D;
			var XMLHttpRequest = window.XMLHttpRequest;
			var requestAnimationFrame = window.requestAnimationFrame;\n`
			if (i > -1) {
				i = str.indexOf("\n", i);
				str = str.substring(0, i + 1) + addStr + str.substring(i);
			} else {
				str = addStr + str;
			}

			fs.writeFileSync(filePath, str, "utf8");
		}
	});
}

gulp.task("modifyLibsJs_TBMini", ["modifyMinJs_TBMini"], function () {
	recursiveModifyJsFiles(releaseDir);
	// const NONCORESTR = "var window = $global.window;\nvar document = window.document;\nvar XMLHttpRequest = window.XMLHttpRequest;\nvar Laya = window.Laya;\nvar Config = window.Config;\nvar Config3D = window.Config3D;\nvar Laya3D = window.Laya3D;\nvar performance = window.performance;\nvar CANNON = window.CANNON;\nvar spine = window.spine;\n";
	// const CORESTR = "var window = $global.window;\nvar document = window.document;\nvar XMLHttpRequest = window.XMLHttpRequest;\n";
	// // libs
	// let libsPath = path.join(releaseDir, "node_modules", "layaengine", "libs", config.useMinJsLibs ? "min" : "");
	// let libsList = fs.readdirSync(libsPath);
	// for (let libName, fullPath, con, len = libsList.length, i = 0; i < len; i++) {
	// 	libName = libsList[i];
	// 	fullPath = path.join(libsPath, libName);
	// 	con = fs.readFileSync(fullPath, "utf8");
	// 	if (/laya(-[\w\d]+)?\.core/gm.test(libName)) {
	// 		con = CORESTR + con;
	// 	} else {
	// 		con = NONCORESTR + con;
	// 	}

	// 	if (/domparserinone\./.test(libName)) {
	// 		con = con.replace(/htmlEntity = {};/, 'var htmlEntity = {};');
	// 		con = con.replace(/SaxO = {};/, 'var SaxO = {};');
	// 		con = con.replace(/,htmlEntity={},/, ';var htmlEntity={};');
	// 		con = con.replace(/}SaxO={},/, '}var SaxO={};');
	// 	}
	// 	fs.writeFileSync(fullPath, con, "utf8");
	// }
	// // bundle.js
	// let bundleJsStr = (versionCon && versionCon["js/bundle.js"]) ? versionCon["js/bundle.js"] : "js/bundle.js";
	// let bundlePath = path.join(releaseDir, "pages", "index", bundleJsStr);
	// let con = fs.readFileSync(bundlePath, "utf8");
	// // as 侵入式的修改bundle.js
	// if (fs.existsSync(path.join(workSpaceDir, "asconfig.json"))) {
	// 	let fileList = fs.readdirSync(path.join(workSpaceDir, "src"));
	// 	for (let i = 0, len = fileList.length, fileItem, filePath, isDir; i < len; i++) {
	// 		fileItem = fileList[i];
	// 		filePath = path.join(workSpaceDir, "src", fileItem);
	// 		isDir = fs.statSync(filePath).isDirectory();
	// 		if (isDir && (con.includes(`window.${fileItem} = {};`) || con.includes(`window.${fileItem}={}`))) {
	// 			// 因为压缩时不能禁用逗号，只能穷尽所有可能
	// 			con = con.replace(`window.${fileItem} = {};`, `var ${fileItem} = window.${fileItem} = {};`)
	// 				.replace(`;window.${fileItem}={};`, `;var ${fileItem}=window.${fileItem}={};`)
	// 				.replace(`,window.${fileItem}={};`, `;var ${fileItem}=window.${fileItem}={};`)
	// 				.replace(`,window.${fileItem}={},`, `;var ${fileItem}=window.${fileItem}={};`)
	// 				.replace(`;window.${fileItem}={},`, `;var ${fileItem}=window.${fileItem}={};`)
	// 			if (!con.includes(`;var ${fileItem}=window.${fileItem}={};`)) {
	// 				con = con.replace(`window.${fileItem}={}`, `;var ${fileItem}=window.${fileItem}={};`)
	// 			}
	// 		}
	// 	}
	// }
	// con = NONCORESTR + con;
	// fs.writeFileSync(bundlePath, con, "utf8");
	// // laya.js
	// let layaJsStr = (versionCon && versionCon["laya.js"]) ? versionCon["laya.js"] : "laya.js";
	// let layaPath = path.join(releaseDir, "pages", "index", layaJsStr);
	// if (fs.existsSync(layaPath)) {
	// 	let con = fs.readFileSync(layaPath, "utf8");
	// 	con = CORESTR + con;

	// 	// 移动到 layaengine 下
	// 	let newLayaPath = path.join(releaseDir, "node_modules", "layaengine", layaJsStr);
	// 	fs.writeFileSync(newLayaPath, con, "utf8");
	// 	fs.unlinkSync(layaPath);
	// }
});

gulp.task("pluginEngin_TB", ["modifyLibsJs_TBMini"], function () {
	let indexJsPath = path.join(releaseDir, "index.js");
	let content = fs.readFileSync(indexJsPath, "utf8");
	if (config.uesEnginePlugin) {
		let libNames = ["laya.ani.js", "laya.core.js", "laya.d3.js", "laya.html.js", "laya.particle.js", "laya.tiledmap.js", "laya.ui.js"];
		let srcLibName = {};
		let dirPath = path.join(releaseDir, "libs", "min");
		let pluginPath = path.join(releaseDir, "layaPlugin");
		fs.mkdirSync(pluginPath, { recursive: true });
		let libPath = 'libs/';
		if (fs.existsSync(dirPath)) {
			libPath += 'min/';
			libNames = libNames.map((item, index) => {
				let ret = item.replace(".js", ".min.js");
				//if ('laya.physics.js' == item) item = 'laya.physics_o.js'
				srcLibName[ret] = item;
				return ret;
			});
		} else {
			libNames.map((item, index) => {
				//if ('laya.physics.js' == item) item = 'laya.physics_o.js';
				srcLibName[item] = item;
			});
			dirPath = path.join(releaseDir, "libs");
		}
		let libList = fs.readdirSync(dirPath);

		for (let i = libList.length - 1; i >= 0; i--) {
			let srcName = srcLibName[libList[i]];
			if (srcName) {
				fs.renameSync(path.join(dirPath, libList[i]), path.join(pluginPath, srcName));
				let srcStr = 'loadLib("' + libPath + libList[i] + '")';
				let dstStr = 'requirePlugin("layaPlugin/' + srcName + '")';
				content = content.replace(srcStr, dstStr);
				//content += srcStr + "\n";
			}
		}

		let EngineVersion = getEngineVersion();
		let gameJsonPath = path.join(releaseDir, "game.json");
		let gamejson = fs.readFileSync(gameJsonPath, "utf8");
		let conJson = JSON.parse(gamejson);
		conJson.plugins = {
			layaPlugin:
			{
				pluginVersion: EngineVersion,
				pluginId: "3000000116352705",
				path: "layaPlugin"
			}
		};


		gamejson = JSON.stringify(conJson, null, 4);
		fs.writeFileSync(gameJsonPath, gamejson, "utf8");

	}
	content = content.replace(/loadLib\(/g, 'require(');
	fs.writeFileSync(indexJsPath, content, "utf8");
});

gulp.task("buildTBMiniProj", ["pluginEngin_TB"], function () {
	console.log("all tasks completed");
});