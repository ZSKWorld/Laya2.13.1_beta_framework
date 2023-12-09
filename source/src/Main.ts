import GameConfig from "./GameConfig";
import { Logger } from "./core/libs/utils/Logger";
import { ViewExtend } from "./core/ui/core/ViewExtend";
import { FGUIExtension } from "./engine/FGUIExtension";
import { FGUIRepair } from "./engine/FGUIRepair";
import { LayaExtension } from "./engine/LayaExtension";
import { LayaRepair } from "./engine/LayaRepair";
import { SceneType } from "./scene/SceneDefine";
import { sceneMgr } from "./scene/SceneManager";
import { SceneGame } from "./scene/scene/SceneGame";
import { SceneInit } from "./scene/scene/SceneInit";
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
			[SceneType.PreScreen, new ScenePreScreen()],
			[SceneType.InitScene, new SceneInit()],
			[SceneType.LoginScene, new SceneLogin()],
			[SceneType.MainScene, new SceneMain()],
			[SceneType.GameScene, new SceneGame()],
		]);
		sceneMgr.enterScene(SceneType.PreScreen);
	}

}

//激活启动类
new Main();
windowImmit("Logger", Logger);