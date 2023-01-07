import { ResPath } from "../../core/common/ResPath";
import { uiMgr } from "../../core/ui/core/UIManager";
import { ViewID } from "../../core/ui/core/ViewID";
import { LogicSceneBase } from "../LogicSceneBase";

/** 主页逻辑场景 */
export class LogicSceneMain extends LogicSceneBase {
	protected override loadViewId = ViewID.Loading2View;
	protected override getResArray(): string[] {
		return [
			ResPath.FontPath.Font01,
			ResPath.FontPath.Font02,
			ResPath.FontPath.Font03,
			ResPath.FontPath.Font04,
			ResPath.FontPath.Font05,
			ResPath.FontPath.Font06,
			ResPath.FontPath.Font07,
			ResPath.FontPath.Font08,
			ResPath.FontPath.Font09,
			ResPath.FontPath.Font10,
			ResPath.FontPath.Font11,
			ResPath.FontPath.Font12,
			ResPath.FontPath.Font13,
			ResPath.FontPath.Font14,
			ResPath.UIPath.PkgMain
		];
	}

	protected onEnter(): void {
		uiMgr.addView(ViewID.MainView);
	}

	protected onExit(): void {
	}
}