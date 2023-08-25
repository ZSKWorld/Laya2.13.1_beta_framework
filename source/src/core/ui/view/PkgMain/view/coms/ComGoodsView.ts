import ComGoods from "../../../../ui/PkgMain/ComGoods";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComGoodsMsg {
	OnBtnShouCangClick = "ComGoods_OnBtnShouCangClick",
	OnBtnEquipClick = "ComGoods_OnBtnEquipClick",
	OnBtnPropClick = "ComGoods_OnBtnPropClick",
	OnBtnGemClick = "ComGoods_OnBtnGemClick",
	OnBtnMaterialClick = "ComGoods_OnBtnMaterialClick",
	OnBtnBookClick = "ComGoods_OnBtnBookClick",
	OnBtnOtherClick = "ComGoods_OnBtnOtherClick",
	OnBtnQualityUpClick = "ComGoods_OnBtnQualityUpClick",
	OnBtnQualityDownClick = "ComGoods_OnBtnQualityDownClick",
	OnBtnTypeUpClick = "ComGoods_OnBtnTypeUpClick",
	OnBtnTypeDownClick = "ComGoods_OnBtnTypeDownClick",
	OnBtnScoreUpClick = "ComGoods_OnBtnScoreUpClick",
	OnBtnScoreDownClick = "ComGoods_OnBtnScoreDownClick",
}

export class ComGoodsView extends ExtensionClass<IView, ComGoods>(ComGoods) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { btn_shouCang, btn_equip, btn_prop, btn_gem, btn_material, btn_book, btn_other, btn_qualityUp, btn_qualityDown, btn_typeUp, btn_typeDown, btn_scoreUp, btn_scoreDown } = this;
		btn_shouCang.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnShouCangClick ]);
		btn_equip.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnEquipClick ]);
		btn_prop.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnPropClick ]);
		btn_gem.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnGemClick ]);
		btn_material.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnMaterialClick ]);
		btn_book.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnBookClick ]);
		btn_other.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnOtherClick ]);
		btn_qualityUp.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnQualityUpClick ]);
		btn_qualityDown.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnQualityDownClick ]);
		btn_typeUp.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnTypeUpClick ]);
		btn_typeDown.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnTypeDownClick ]);
		btn_scoreUp.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnScoreUpClick ]);
		btn_scoreDown.onClick(this, this.sendMessage, [ ComGoodsMsg.OnBtnScoreDownClick ]);
    }

}
