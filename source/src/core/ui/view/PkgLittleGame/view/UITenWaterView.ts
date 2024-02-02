import UITenWater from "../../../ui/PkgLittleGame/UITenWater";
import { ResPath } from "../../../../common/ResPath";

export const enum UITenWaterMsg {
	OnBtnBackClick = "UITenWater_OnBtnBackClick",
}

export class UITenWaterView extends ExtensionClass<IView, UITenWater>(UITenWater) {
    static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
        const { btn_back } = this;
		btn_back.onClick(this, this.sendMessage, [UITenWaterMsg.OnBtnBackClick]);
    }

}
