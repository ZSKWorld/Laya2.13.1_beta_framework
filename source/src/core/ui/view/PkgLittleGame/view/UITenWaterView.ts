import UITenWater from "../../../ui/PkgLittleGame/UITenWater";

export const enum UITenWaterMsg {
	OnBtnBackClick = "UITenWater_OnBtnBackClick",
	OnBtnCalculateClick = "UILittleGame_OnBtnCalculateClick",
	OnBtnResetMap = "UILittleGame_OnBtnResetMap",
}

export class UITenWaterView extends ExtensionClass<IView, UITenWater>(UITenWater) {
    static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
        const { btn_back, btn_calcuate, btn_resetMap } = this;
		btn_back.onClick(this, this.sendMessage, [UITenWaterMsg.OnBtnBackClick]);
		btn_calcuate.onClick(this, this.sendMessage, [UITenWaterMsg.OnBtnCalculateClick]);
		btn_resetMap.onClick(this, this.sendMessage, [UITenWaterMsg.OnBtnResetMap]);
    }

}
