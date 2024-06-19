import GameConfig from "./GameConfig";
import { Logger } from "./core/game/Logger";
import { ViewExtend } from "./core/ui/core/ViewExtend";
import { FGUIExtension } from "./engine/FGUIExtension";
import { FGUIRepair } from "./engine/FGUIRepair";
import { LayaExtension } from "./engine/LayaExtension";
import { LayaRepair } from "./engine/LayaRepair";
import { SceneType } from "./scene/SceneDefine";
import { sceneMgr } from "./scene/SceneManager";
import { SceneGame } from "./scene/scene/SceneGame";
import { SceneInit } from "./scene/scene/SceneInit";
import { SceneLittleGame } from "./scene/scene/SceneLittleGame";
import { SceneLogin } from "./scene/scene/SceneLogin";
import { SceneMain } from "./scene/scene/SceneMain";
import { ScenePreScreen } from "./scene/scene/ScenePreScreen";

class Main {
	constructor() {
		//根据IDE设置初始化引擎
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		LayaRepair.Fix();
		LayaExtension.Init();
		FGUIRepair.Fix();
		FGUIExtension.Init();
		ViewExtend.Init();
		fgui.UIConfig.packageFileExtension = "zip";

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	private onVersionLoaded() {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	private onConfigLoaded() {
		sceneMgr.init([
			new ScenePreScreen(),
			new SceneInit(),
			new SceneLogin(),
			new SceneMain(),
			new SceneGame(),
			new SceneLittleGame(),
		]);
		sceneMgr.enterScene(SceneType.PreScreen);
	}

}

//激活启动类
new Main();
windowImmit("Logger", Logger);

// /* Cursor */
// div.cursor {
// 	animation: 25s linear infinite alternate bp-animation;
// 	background: linear-gradient( rgb(226, 84, 84), yellow, lime, cyan, rgb(182, 110, 255));
// 	background-size: 100% 1000%;
// 	border-radius: 2px;
// 	overflow: visible !important;
// }

// div.cursor::after {
// 	content: "";
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	width: 100%;
// 	height: 100%;
// 	background: inherit;
// 	background-size: 100% 1000%;
// 	border-radius: 3px;
// 	transform: scale(140%, 120%);
// 	filter: blur(4px) brightness(200%);
// 	z-index: -1;
// }
	
// @keyframes bp-animation {
// 	0% {background-position: 0 0;}
// 	20% {background-position: 0 200%;}
// 	40% {background-position: 0 400%;}
// 	60% {background-position: 0 600%;}
// 	80% {background-position: 0 800%;}
// 	100% {background-position: 0 1000%;}
// }