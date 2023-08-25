import ComTrain from "../../../../ui/PkgMain/ComTrain";
import { ResPath } from "../../../../../common/ResPath";

export const enum ComTrainMsg {
	OnBtnLevelClick = "ComTrain_OnBtnLevelClick",
	OnBtnFuBenClick = "ComTrain_OnBtnFuBenClick",
	OnBtnMiJingClick = "ComTrain_OnBtnMiJingClick",
	OnBtnBossClick = "ComTrain_OnBtnBossClick",
	OnBtnCaiJiClick = "ComTrain_OnBtnCaiJiClick",
	OnBtnGongLueClick = "ComTrain_OnBtnGongLueClick",
	OnBtnWaiYuClick = "ComTrain_OnBtnWaiYuClick",
}

export class ComTrainView extends ExtensionClass<IView, ComTrain>(ComTrain) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { btn_level, btn_fuBen, btn_miJing, btn_boss, btn_caiJi, btn_gongLue, btn_waiYu } = this;
		btn_level.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnLevelClick ]);
		btn_fuBen.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnFuBenClick ]);
		btn_miJing.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnMiJingClick ]);
		btn_boss.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnBossClick ]);
		btn_caiJi.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnCaiJiClick ]);
		btn_gongLue.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnGongLueClick ]);
		btn_waiYu.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnWaiYuClick ]);
    }

}
