import ComZhiZuo from "../../../../ui/PkgMain/ComZhiZuo";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComZhiZuoMsg {
	OnBtnJPYLClick = "ComZhiZuo_OnBtnJPYLClick",
	OnBtnDZZBClick = "ComZhiZuo_OnBtnDZZBClick",
	OnBtnZJZBClick = "ComZhiZuo_OnBtnZJZBClick",
	OnBtnCZZBClick = "ComZhiZuo_OnBtnCZZBClick",
	OnBtnBSHCClick = "ComZhiZuo_OnBtnBSHCClick",
	OnBtnZZTZClick = "ComZhiZuo_OnBtnZZTZClick",
	OnBtnFJZBClick = "ComZhiZuo_OnBtnFJZBClick",
	OnBtnFJBSClick = "ComZhiZuo_OnBtnFJBSClick",
	OnBtnYJHCClick = "ComZhiZuo_OnBtnYJHCClick",
}

export class ComZhiZuoView extends ExtensionClass<IView, ComZhiZuo>(ComZhiZuo) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { BtnJPYL, BtnDZZB, BtnZJZB, BtnCZZB, BtnBSHC, BtnZZTZ, BtnFJZB, BtnFJBS, BtnYJHC } = this;
		BtnJPYL.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnJPYLClick ]);
		BtnDZZB.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnDZZBClick ]);
		BtnZJZB.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnZJZBClick ]);
		BtnCZZB.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnCZZBClick ]);
		BtnBSHC.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnBSHCClick ]);
		BtnZZTZ.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnZZTZClick ]);
		BtnFJZB.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnFJZBClick ]);
		BtnFJBS.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnFJBSClick ]);
		BtnYJHC.onClick(this, this.sendMessage, [ ComZhiZuoMsg.OnBtnYJHCClick ]);
    }

}
