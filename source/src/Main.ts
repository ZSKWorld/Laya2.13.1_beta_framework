import { GameConfig } from "./GameConfig";
import { GlobalInitialize } from "./GlobalInitializer";
import { ViewExtend } from "./core/ui/core/ViewExtend";
import { FGUIExtend } from "./engine/FGUIExtend";
import { FGUIRepair } from "./engine/FGUIRepair";
import { LayaExtend } from "./engine/LayaExtend";
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
		if (Laya3D) Laya3D.init(1080, 1920);
		else Laya.init(1080, 1920, Laya.WebGL);
		Laya.Physics && Laya.Physics.enable();

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		// if (false || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		// if (false && Laya.PhysicsDebugDraw) Laya.PhysicsDebugDraw.enable();
		// Laya.alertGlobalError(true);
		document.body.style.backgroundColor = "#666666";
		// document.body.style.backgroundImage = `url(${ ResPath.TexturePath.Background })`;


		LayaRepair.repair();
		LayaExtend.extends();
		FGUIRepair.repair();
		FGUIExtend.extends();
		ViewExtend.extends();
		fgui.UIConfig.packageFileExtension = "zip";

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	private onVersionLoaded() {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onFileConfigLoaded));
	}

	private async onFileConfigLoaded() {
		const data = await loadMgr.load("gameconfig.json");
		GameConfig.init(data);
		GlobalInitialize();
		this.enterGame();
	}

	private enterGame() {
		sceneMgr.init([
			new ScenePreScreen(),
			new SceneInit(),
			new SceneLogin(),
			new SceneMain(),
			new SceneGame(),
			new SceneLittleGame(),
		]);
		sceneMgr.enterScene(SceneType.PreScreen);

		// CustomSpriteManager.Init();
	}
}

//激活启动类
new Main();

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