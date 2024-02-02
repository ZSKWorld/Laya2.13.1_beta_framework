import ComTenWater from "../../../../ui/PkgLittleGame/ComTenWater";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComTenWaterMsg {
	OnBtnAddClick = "ComTenWater_OnBtnAddClick",
	OnBtnSubClick = "ComTenWater_OnBtnSubClick",
}

export class ComTenWaterView extends ExtensionClass<IView, ComTenWater>(ComTenWater) {
    static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

	override onCreate() {
        const { btn_add, btn_sub } = this;
		btn_add.onClick(this, this.sendMessage, [ComTenWaterMsg.OnBtnAddClick]);
		btn_sub.onClick(this, this.sendMessage, [ComTenWaterMsg.OnBtnSubClick]);
    }

}
