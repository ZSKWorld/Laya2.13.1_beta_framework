import RenderChooseBattle from "../../../../ui/PkgBattle/RenderChooseBattle";
import { ResPath } from "../../../../../common/ResPath";

export const enum RenderChooseBattleMsg {
	OnBtnBreakClick = "RenderChooseBattle_OnBtnBreakClick",
}

export class RenderChooseBattleView extends ExtensionClass<IView, RenderChooseBattle>(RenderChooseBattle) {
    static readonly PkgRes = ResPath.PkgPath.PkgBattle;

	override onCreate() {
        const { btn_break } = this;
		btn_break.onClick(this, this.sendMessage, [ RenderChooseBattleMsg.OnBtnBreakClick ]);
    }

}
