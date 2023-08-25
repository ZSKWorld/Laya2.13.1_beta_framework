import UIMain from "../../../ui/PkgMain/UIMain";
import { ResPath } from "../../../../common/ResPath";

export const enum UIMainMsg {
	OnBtnTrainClick = "UIMain_OnBtnTrainClick",
	OnBtnCharClick = "UIMain_OnBtnCharClick",
	OnBtnGoodsClick = "UIMain_OnBtnGoodsClick",
	OnBtnShopClick = "UIMain_OnBtnShopClick",
	OnBtnAbodeClick = "UIMain_OnBtnAbodeClick",
	OnBtnChatClick = "UIMain_OnBtnChatClick",
	OnBtnSettingClick = "UIMain_OnBtnSettingClick",
	OnBtnRankClick = "UIMain_OnBtnRankClick",
	OnBtnSphereClick = "UIMain_OnBtnSphereClick",
}

export class UIMainView extends ExtensionClass<IView, UIMain>(UIMain) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { btn_train, btn_char, btn_goods, btn_shop, btn_abode, btn_chat, btn_setting, btn_rank, btn_sphere } = this;
		btn_train.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnTrainClick ]);
		btn_char.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnCharClick ]);
		btn_goods.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnGoodsClick ]);
		btn_shop.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnShopClick ]);
		btn_abode.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnAbodeClick ]);
		btn_chat.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnChatClick ]);
		btn_setting.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnSettingClick ]);
		btn_rank.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnRankClick ]);
		btn_sphere.onClick(this, this.sendMessage, [ UIMainMsg.OnBtnSphereClick ]);
    }

}
