import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

/** 登录逻辑场景 */
export class LogicSceneLogin extends LogicSceneBase {
	protected override getResArray(): string[] {
		return [ ResPath.PkgPath.PkgLogin ];
	}

	protected onEnter(): void {
		uiMgr.addView(ViewID.UILoginMainView);
	}

	protected onExit(): void {
	}

}