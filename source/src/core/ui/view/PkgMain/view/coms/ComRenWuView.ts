import ComRenWu from "../../../../ui/PkgMain/ComRenWu";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComRenWuMsg {
	OnBtnWuQiClick = "ComRenWu_OnBtnWuQiClick",
	OnBtnXiangLianClick = "ComRenWu_OnBtnXiangLianClick",
	OnBtnJieZhiClick = "ComRenWu_OnBtnJieZhiClick",
	OnBtnHuFuClick = "ComRenWu_OnBtnHuFuClick",
	OnBtnZuoQiClick = "ComRenWu_OnBtnZuoQiClick",
	OnBtnAnQiClick = "ComRenWu_OnBtnAnQiClick",
	OnBtnTouKuiClick = "ComRenWu_OnBtnTouKuiClick",
	OnBtnYiFuClick = "ComRenWu_OnBtnYiFuClick",
	OnBtnXiaZhuangClick = "ComRenWu_OnBtnXiaZhuangClick",
	OnBtnXieZiClick = "ComRenWu_OnBtnXieZiClick",
	OnBtnShiZhuangClick = "ComRenWu_OnBtnShiZhuangClick",
	OnBtnFaBaoClick = "ComRenWu_OnBtnFaBaoClick",
}

export class ComRenWuView extends ExtensionClass<IView, ComRenWu>(ComRenWu) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { btn_wuQi, btn_xiangLian, btn_jieZhi, btn_huFu, btn_zuoQi, btn_anQi, btn_touKui, btn_yiFu, btn_xiaZhuang, btn_xieZi, btn_shiZhuang, btn_faBao } = this;
		btn_wuQi.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnWuQiClick ]);
		btn_xiangLian.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXiangLianClick ]);
		btn_jieZhi.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnJieZhiClick ]);
		btn_huFu.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnHuFuClick ]);
		btn_zuoQi.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnZuoQiClick ]);
		btn_anQi.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnAnQiClick ]);
		btn_touKui.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnTouKuiClick ]);
		btn_yiFu.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnYiFuClick ]);
		btn_xiaZhuang.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXiaZhuangClick ]);
		btn_xieZi.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXieZiClick ]);
		btn_shiZhuang.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnShiZhuangClick ]);
		btn_faBao.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnFaBaoClick ]);
    }

}
