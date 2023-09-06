import { ResPath } from "../../../../../common/ResPath";
import ComTrain from "../../../../ui/PkgMain/ComTrain";

export const enum ComTrainMsg {
	OnBtnLevelClick = "ComTrain_OnBtnLevelClick",
	OnBtnCopyClick = "ComTrain_OnBtnCopyClick",
	OnBtnSecretClick = "ComTrain_OnBtnSecretClick",
	OnBtnBossClick = "ComTrain_OnBtnBossClick",
	OnBtnGatherClick = "ComTrain_OnBtnGatherClick",
	OnBtnGongLueClick = "ComTrain_OnBtnGongLueClick",
	OnBtnWaiYuClick = "ComTrain_OnBtnWaiYuClick",
}

export class ComTrainView extends ExtensionClass<IView, ComTrain>(ComTrain) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_level, btn_copy, btn_secret, btn_boss, btn_gather, btn_gongLue, btn_waiYu } = this;
		btn_level.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnLevelClick ]);
		btn_copy.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnCopyClick ]);
		btn_secret.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnSecretClick ]);
		btn_boss.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnBossClick ]);
		btn_gather.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnGatherClick ]);
		btn_gongLue.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnGongLueClick ]);
		btn_waiYu.onClick(this, this.sendMessage, [ ComTrainMsg.OnBtnWaiYuClick ]);
	}

}
