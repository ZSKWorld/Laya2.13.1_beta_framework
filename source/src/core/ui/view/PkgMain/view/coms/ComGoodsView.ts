import { ResPath } from "../../../../../common/ResPath";
import ComGoods from "../../../../ui/PkgMain/ComGoods";

export const enum ComGoodsMsg {
	OnBtnShouCangClick = "ComGoods_OnBtnShouCangClick",
	OnBtnEquipClick = "ComGoods_OnBtnEquipClick",
	OnBtnPropClick = "ComGoods_OnBtnPropClick",
	OnBtnGemClick = "ComGoods_OnBtnGemClick",
	OnBtnMaterialClick = "ComGoods_OnBtnMaterialClick",
	OnBtnBookClick = "ComGoods_OnBtnBookClick",
	OnBtnOtherClick = "ComGoods_OnBtnOtherClick",
}

export class ComGoodsView extends ExtensionClass<IView, ComGoods>(ComGoods) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_shouCang, btn_equip, btn_prop, btn_gem, btn_material, btn_book, btn_other } = this;
		btn_shouCang.onClick(this, this.sendMessage, [ComGoodsMsg.OnBtnShouCangClick]);
		btn_equip.onClick(this, this.sendMessage, [ComGoodsMsg.OnBtnEquipClick]);
		btn_prop.onClick(this, this.sendMessage, [ComGoodsMsg.OnBtnPropClick]);
		btn_gem.onClick(this, this.sendMessage, [ComGoodsMsg.OnBtnGemClick]);
		btn_material.onClick(this, this.sendMessage, [ComGoodsMsg.OnBtnMaterialClick]);
		btn_book.onClick(this, this.sendMessage, [ComGoodsMsg.OnBtnBookClick]);
		btn_other.onClick(this, this.sendMessage, [ComGoodsMsg.OnBtnOtherClick]);
	}

}
