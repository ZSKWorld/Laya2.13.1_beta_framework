import ComLiLian from "../../../../ui/PkgMain/ComLiLian";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComLiLianMsg {
	OnBtnGuanQiaClick = "ComLiLian_OnBtnGuanQiaClick",
	OnBtnFuBenClick = "ComLiLian_OnBtnFuBenClick",
	OnBtnMiJingClick = "ComLiLian_OnBtnMiJingClick",
	OnBtnBossClick = "ComLiLian_OnBtnBossClick",
	OnBtnCaiJiClick = "ComLiLian_OnBtnCaiJiClick",
	OnBtnGongLueClick = "ComLiLian_OnBtnGongLueClick",
	OnBtnWaiYuClick = "ComLiLian_OnBtnWaiYuClick",
}

export class ComLiLianView extends ExtensionClass<IView, ComLiLian>(ComLiLian) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { BtnGuanQia, BtnFuBen, BtnMiJing, BtnBoss, BtnCaiJi, BtnGongLue, BtnWaiYu } = this;
		BtnGuanQia.onClick(this, this.sendMessage, [ ComLiLianMsg.OnBtnGuanQiaClick ]);
		BtnFuBen.onClick(this, this.sendMessage, [ ComLiLianMsg.OnBtnFuBenClick ]);
		BtnMiJing.onClick(this, this.sendMessage, [ ComLiLianMsg.OnBtnMiJingClick ]);
		BtnBoss.onClick(this, this.sendMessage, [ ComLiLianMsg.OnBtnBossClick ]);
		BtnCaiJi.onClick(this, this.sendMessage, [ ComLiLianMsg.OnBtnCaiJiClick ]);
		BtnGongLue.onClick(this, this.sendMessage, [ ComLiLianMsg.OnBtnGongLueClick ]);
		BtnWaiYu.onClick(this, this.sendMessage, [ ComLiLianMsg.OnBtnWaiYuClick ]);
    }

}
