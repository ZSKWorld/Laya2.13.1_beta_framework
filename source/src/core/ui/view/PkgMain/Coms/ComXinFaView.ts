import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComXinFa from "../../../ui/PkgMain/ComXinFa";
import { ResPath } from "../../../../common/ResPath";

export const enum ComXinFaMsg {
	OnBtnXinFa0Click = "ComXinFa_OnBtnXinFa0Click",
	OnBtnXinFa1Click = "ComXinFa_OnBtnXinFa1Click",
	OnBtnXinFa2Click = "ComXinFa_OnBtnXinFa2Click",
	OnBtnXinFa3Click = "ComXinFa_OnBtnXinFa3Click",
	OnBtnXinFa4Click = "ComXinFa_OnBtnXinFa4Click",
	OnBtnXinFa5Click = "ComXinFa_OnBtnXinFa5Click",
	OnBtnXinFa6Click = "ComXinFa_OnBtnXinFa6Click",
	OnBtnXinFa7Click = "ComXinFa_OnBtnXinFa7Click",
	OnBtnXinFa8Click = "ComXinFa_OnBtnXinFa8Click",
	OnBtnUpgradeBgClick = "ComXinFa_OnBtnUpgradeBgClick",
	OnBtnSkill0Click = "ComXinFa_OnBtnSkill0Click",
	OnBtnSkill1Click = "ComXinFa_OnBtnSkill1Click",
	OnBtnSkill2Click = "ComXinFa_OnBtnSkill2Click",
	OnBtnSkill3Click = "ComXinFa_OnBtnSkill3Click",
	OnBtnUpgrade0Click = "ComXinFa_OnBtnUpgrade0Click",
	OnBtnUpgrade1Click = "ComXinFa_OnBtnUpgrade1Click",
	OnBtnUpgrade2Click = "ComXinFa_OnBtnUpgrade2Click",
}

export class ComXinFaView extends ExtensionClass<ViewExtension, ComXinFa>(ComXinFa) {
    static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
        const { BtnXinFa0, BtnXinFa1, BtnXinFa2, BtnXinFa3, BtnXinFa4, BtnXinFa5, BtnXinFa6, BtnXinFa7, BtnXinFa8, BtnUpgradeBg, BtnSkill0, BtnSkill1, BtnSkill2, BtnSkill3, BtnUpgrade0, BtnUpgrade1, BtnUpgrade2 } = this;
	    BtnXinFa0.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnXinFa0Click ]);
	    BtnXinFa1.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnXinFa1Click ]);
	    BtnXinFa2.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnXinFa2Click ]);
	    BtnXinFa3.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnXinFa3Click ]);
	    BtnXinFa4.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnXinFa4Click ]);
	    BtnXinFa5.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnXinFa5Click ]);
	    BtnXinFa6.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnXinFa6Click ]);
	    BtnXinFa7.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnXinFa7Click ]);
	    BtnXinFa8.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnXinFa8Click ]);
	    BtnUpgradeBg.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnUpgradeBgClick ]);
	    BtnSkill0.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnSkill0Click ]);
	    BtnSkill1.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnSkill1Click ]);
	    BtnSkill2.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnSkill2Click ]);
	    BtnSkill3.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnSkill3Click ]);
	    BtnUpgrade0.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnUpgrade0Click ]);
	    BtnUpgrade1.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnUpgrade1Click ]);
	    BtnUpgrade2.onClick(this, this.sendMessage, [ ComXinFaMsg.OnBtnUpgrade2Click ]);
    }

}
