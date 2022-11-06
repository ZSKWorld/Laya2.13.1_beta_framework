import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

/** 主页逻辑场景 */
export class LogicSceneMain extends LogicSceneBase {
	protected override getResArray(): string[] {
		return [
			ResPath.UIPath.PkgMain
		];
	}

	protected onEnter(): void {
		uiMgr.addView(ViewID.MainView);
	}

	protected onExit(): void {
	}
}