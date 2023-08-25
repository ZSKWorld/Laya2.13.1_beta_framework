import ComZhiZuo from "../../../../ui/PkgMain/ComZhiZuo";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComZhiZuoMsg {
	OnBtnJpylClick = "ComZhiZuo_OnBtnJpylClick",
	OnBtnDzzbClick = "ComZhiZuo_OnBtnDzzbClick",
	OnBtnZjzbClick = "ComZhiZuo_OnBtnZjzbClick",
	OnBtnCzzbClick = "ComZhiZuo_OnBtnCzzbClick",
	OnBtnBshcClick = "ComZhiZuo_OnBtnBshcClick",
	OnBtnZztzClick = "ComZhiZuo_OnBtnZztzClick",
	OnBtnFjzbClick = "ComZhiZuo_OnBtnFjzbClick",
	OnBtnFjbsClick = "ComZhiZuo_OnBtnFjbsClick",
	OnBtnYjhcClick = "ComZhiZuo_OnBtnYjhcClick",
}

export class ComZhiZuoView extends ExtensionClass<IView, ComZhiZuo>(ComZhiZuo) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { btn_jpyl, btn_dzzb, btn_zjzb, btn_czzb, btn_bshc, btn_zztz, btn_fjzb, btn_fjbs, btn_yjhc } = this;
		btn_jpyl.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnJpylClick ]);
		btn_dzzb.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnDzzbClick ]);
		btn_zjzb.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnZjzbClick ]);
		btn_czzb.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnCzzbClick ]);
		btn_bshc.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnBshcClick ]);
		btn_zztz.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnZztzClick ]);
		btn_fjzb.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnFjzbClick ]);
		btn_fjbs.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnFjbsClick ]);
		btn_yjhc.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnYjhcClick ]);
    }

}
