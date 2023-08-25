import ComShop from "../../../../ui/PkgMain/ComShop";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComShopMsg {
	OnBtnPropClick = "ComShop_OnBtnPropClick",
	OnBtnGemClick = "ComShop_OnBtnGemClick",
	OnBtnMaterialClick = "ComShop_OnBtnMaterialClick",
	OnBtnMiJiClick = "ComShop_OnBtnMiJiClick",
	OnBtnOtherClick = "ComShop_OnBtnOtherClick",
	OnBtnHeiShiClick = "ComShop_OnBtnHeiShiClick",
	OnBtnXianJieClick = "ComShop_OnBtnXianJieClick",
	OnBtnZbqhClick = "ComShop_OnBtnZbqhClick",
	OnBtnBsjgClick = "ComShop_OnBtnBsjgClick",
	OnBtnJsClick = "ComShop_OnBtnJsClick",
	OnBtnTsdjClick = "ComShop_OnBtnTsdjClick",
	OnBtnGemLv1Click = "ComShop_OnBtnGemLv1Click",
	OnBtnGemLv2Click = "ComShop_OnBtnGemLv2Click",
	OnBtnGemLv3Click = "ComShop_OnBtnGemLv3Click",
	OnBtnGemLv4Click = "ComShop_OnBtnGemLv4Click",
	OnBtnSgclClick = "ComShop_OnBtnSgclClick",
	OnBtnTsclClick = "ComShop_OnBtnTsclClick",
	OnBtnZwClick = "ComShop_OnBtnZwClick",
	OnBtnQhclClick = "ComShop_OnBtnQhclClick",
	OnBtnTjClick = "ComShop_OnBtnTjClick",
	OnBtnXfClick = "ComShop_OnBtnXfClick",
	OnBtnJnClick = "ComShop_OnBtnJnClick",
	OnBtnQtClick = "ComShop_OnBtnQtClick",
	OnBtnYrClick = "ComShop_OnBtnYrClick",
}

export class ComShopView extends ExtensionClass<IView, ComShop>(ComShop) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { btn_prop, btn_gem, btn_material, btn_miJi, btn_other, btn_heiShi, btn_xianJie, btn_zbqh, btn_bsjg, btn_js, btn_tsdj, btn_gemLv1, btn_gemLv2, btn_gemLv3, btn_gemLv4, btn_sgcl, btn_tscl, btn_zw, btn_qhcl, btn_tj, btn_xf, btn_jn, btn_qt, btn_yr } = this;
		btn_prop.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnPropClick ]);
		btn_gem.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnGemClick ]);
		btn_material.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnMaterialClick ]);
		btn_miJi.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnMiJiClick ]);
		btn_other.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnOtherClick ]);
		btn_heiShi.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnHeiShiClick ]);
		btn_xianJie.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnXianJieClick ]);
		btn_zbqh.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnZbqhClick ]);
		btn_bsjg.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnBsjgClick ]);
		btn_js.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnJsClick ]);
		btn_tsdj.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnTsdjClick ]);
		btn_gemLv1.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnGemLv1Click ]);
		btn_gemLv2.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnGemLv2Click ]);
		btn_gemLv3.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnGemLv3Click ]);
		btn_gemLv4.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnGemLv4Click ]);
		btn_sgcl.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnSgclClick ]);
		btn_tscl.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnTsclClick ]);
		btn_zw.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnZwClick ]);
		btn_qhcl.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnQhclClick ]);
		btn_tj.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnTjClick ]);
		btn_xf.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnXfClick ]);
		btn_jn.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnJnClick ]);
		btn_qt.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnQtClick ]);
		btn_yr.onClick(this, this.sendMessage, [ ComShopMsg.OnBtnYrClick ]);
    }

}
