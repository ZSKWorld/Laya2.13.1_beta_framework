import ComTenWater from "../../../../ui/PkgLittleGame/ComTenWater";

export const enum ComTenWaterMsg {
	OnBtnAddClick = "ComTenWater_OnBtnAddClick",
	OnBtnSubClick = "ComTenWater_OnBtnSubClick",
}

export const enum WaterStatus {
	None,
	One,
	Two,
	Three,
	Four,
}

export class ComTenWaterView extends ExtensionClass<IView, ComTenWater>(ComTenWater) {
	static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
		const { btn_add, btn_sub } = this;
		btn_add.onClick(this, this.sendMessage, [ComTenWaterMsg.OnBtnAddClick]);
		btn_sub.onClick(this, this.sendMessage, [ComTenWaterMsg.OnBtnSubClick]);
	}

	refreshWater(status: WaterStatus) {
		const icons = ["", "ui://PkgLittleGame/icon1", "ui://PkgLittleGame/icon2", "ui://PkgLittleGame/icon3", "ui://PkgLittleGame/icon4"];
		this.loader_icon.icon = icons[status];
		this.txt_needed.text = (WaterStatus.Four - status + 1).toString();
	}

}
