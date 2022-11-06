import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComRenWu from "../../../ui/PkgMain/ComRenWu";
import { ResPath } from "../../../../common/ResPath";

export const enum ComRenWuMsg {
	OnBtnWQClick = "ComRenWu_OnBtnWQClick",
	OnBtnXLClick = "ComRenWu_OnBtnXLClick",
	OnBtnJZClick = "ComRenWu_OnBtnJZClick",
	OnBtnHFClick = "ComRenWu_OnBtnHFClick",
	OnBtnZQClick = "ComRenWu_OnBtnZQClick",
	OnBtnAQClick = "ComRenWu_OnBtnAQClick",
	OnBtnTKClick = "ComRenWu_OnBtnTKClick",
	OnBtnYFClick = "ComRenWu_OnBtnYFClick",
	OnBtnXZClick = "ComRenWu_OnBtnXZClick",
	OnBtnXieZClick = "ComRenWu_OnBtnXieZClick",
	OnBtnSZClick = "ComRenWu_OnBtnSZClick",
	OnBtnFBClick = "ComRenWu_OnBtnFBClick",
}

export class ComRenWuView extends ExtensionClass<ViewExtension, ComRenWu>(ComRenWu) {
    static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
        const { BtnWQ, BtnXL, BtnJZ, BtnHF, BtnZQ, BtnAQ, BtnTK, BtnYF, BtnXZ, BtnXieZ, BtnSZ, BtnFB } = this;
	    BtnWQ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnWQClick ]);
	    BtnXL.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXLClick ]);
	    BtnJZ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnJZClick ]);
	    BtnHF.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnHFClick ]);
	    BtnZQ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnZQClick ]);
	    BtnAQ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnAQClick ]);
	    BtnTK.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnTKClick ]);
	    BtnYF.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnYFClick ]);
	    BtnXZ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXZClick ]);
	    BtnXieZ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnXieZClick ]);
	    BtnSZ.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnSZClick ]);
	    BtnFB.onClick(this, this.sendMessage, [ ComRenWuMsg.OnBtnFBClick ]);
    }

}
