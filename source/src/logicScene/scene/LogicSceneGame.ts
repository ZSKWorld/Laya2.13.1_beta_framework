import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

/** 游戏逻辑场景 */
export class LogicSceneGame extends LogicSceneBase {

	protected override getResArray(): string[] {
		return [
			ResPath.UIPath.PkgGame
		];
	}

	protected onEnter(): void {
		uiMgr.addView(ViewID.GameMainView);
	}

	protected onExit(): void {

	}

}