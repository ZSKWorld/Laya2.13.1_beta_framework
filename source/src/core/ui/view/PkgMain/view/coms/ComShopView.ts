import ComShop from "../../../../ui/PkgMain/ComShop";

export const enum ComShopMsg {
	OnBtnPropClick = "ComShop_OnBtnPropClick",
	OnBtnGemClick = "ComShop_OnBtnGemClick",
	OnBtnMaterialClick = "ComShop_OnBtnMaterialClick",
	OnBtnMiJiClick = "ComShop_OnBtnMiJiClick",
	OnBtnOtherClick = "ComShop_OnBtnOtherClick",
	OnBtnHeiShiClick = "ComShop_OnBtnHeiShiClick",
	OnBtnXianJieClick = "ComShop_OnBtnXianJieClick",
}

export class ComShopView extends ExtensionClass<IView, ComShop>(ComShop) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_prop, btn_gem, btn_material, btn_miJi, btn_other, btn_heiShi, btn_xianJie } = this;
		btn_prop.onClick(this, this.sendMessage, [ComShopMsg.OnBtnPropClick]);
		btn_gem.onClick(this, this.sendMessage, [ComShopMsg.OnBtnGemClick]);
		btn_material.onClick(this, this.sendMessage, [ComShopMsg.OnBtnMaterialClick]);
		btn_miJi.onClick(this, this.sendMessage, [ComShopMsg.OnBtnMiJiClick]);
		btn_other.onClick(this, this.sendMessage, [ComShopMsg.OnBtnOtherClick]);
		btn_heiShi.onClick(this, this.sendMessage, [ComShopMsg.OnBtnHeiShiClick]);
		btn_xianJie.onClick(this, this.sendMessage, [ComShopMsg.OnBtnXianJieClick]);
	}

}
