import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComShangCheng from "../../../ui/PkgMain/ComShangCheng";
import { ResPath } from "../../../../common/ResPath";

export const enum ComShangChengMsg {
	OnBtnPropClick = "ComShangCheng_OnBtnPropClick",
	OnBtnGemClick = "ComShangCheng_OnBtnGemClick",
	OnBtnMaterialClick = "ComShangCheng_OnBtnMaterialClick",
	OnBtnMiJiClick = "ComShangCheng_OnBtnMiJiClick",
	OnBtnOtherClick = "ComShangCheng_OnBtnOtherClick",
	OnBtnHeiShiClick = "ComShangCheng_OnBtnHeiShiClick",
	OnBtnXianJieClick = "ComShangCheng_OnBtnXianJieClick",
	OnBtnZBQHClick = "ComShangCheng_OnBtnZBQHClick",
	OnBtnBSJGClick = "ComShangCheng_OnBtnBSJGClick",
	OnBtnJSClick = "ComShangCheng_OnBtnJSClick",
	OnBtnTSDJClick = "ComShangCheng_OnBtnTSDJClick",
	OnBtnGemLv1Click = "ComShangCheng_OnBtnGemLv1Click",
	OnBtnGemLv2Click = "ComShangCheng_OnBtnGemLv2Click",
	OnBtnGemLv3Click = "ComShangCheng_OnBtnGemLv3Click",
	OnBtnGemLv4Click = "ComShangCheng_OnBtnGemLv4Click",
	OnBtnSGCLClick = "ComShangCheng_OnBtnSGCLClick",
	OnBtnTSCLClick = "ComShangCheng_OnBtnTSCLClick",
	OnBtnZWClick = "ComShangCheng_OnBtnZWClick",
	OnBtnQHCLClick = "ComShangCheng_OnBtnQHCLClick",
	OnBtnTJClick = "ComShangCheng_OnBtnTJClick",
	OnBtnXFClick = "ComShangCheng_OnBtnXFClick",
	OnBtnJNClick = "ComShangCheng_OnBtnJNClick",
	OnBtnQTClick = "ComShangCheng_OnBtnQTClick",
	OnBtnYRClick = "ComShangCheng_OnBtnYRClick",
}

export class ComShangChengView extends ExtensionClass<ViewExtension, ComShangCheng>(ComShangCheng) {
    static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
        const { BtnProp, BtnGem, BtnMaterial, BtnMiJi, BtnOther, BtnHeiShi, BtnXianJie, BtnZBQH, BtnBSJG, BtnJS, BtnTSDJ, BtnGemLv1, BtnGemLv2, BtnGemLv3, BtnGemLv4, BtnSGCL, BtnTSCL, BtnZW, BtnQHCL, BtnTJ, BtnXF, BtnJN, BtnQT, BtnYR } = this;
	    BtnProp.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnPropClick ]);
	    BtnGem.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnGemClick ]);
	    BtnMaterial.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnMaterialClick ]);
	    BtnMiJi.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnMiJiClick ]);
	    BtnOther.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnOtherClick ]);
	    BtnHeiShi.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnHeiShiClick ]);
	    BtnXianJie.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnXianJieClick ]);
	    BtnZBQH.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnZBQHClick ]);
	    BtnBSJG.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnBSJGClick ]);
	    BtnJS.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnJSClick ]);
	    BtnTSDJ.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnTSDJClick ]);
	    BtnGemLv1.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnGemLv1Click ]);
	    BtnGemLv2.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnGemLv2Click ]);
	    BtnGemLv3.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnGemLv3Click ]);
	    BtnGemLv4.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnGemLv4Click ]);
	    BtnSGCL.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnSGCLClick ]);
	    BtnTSCL.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnTSCLClick ]);
	    BtnZW.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnZWClick ]);
	    BtnQHCL.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnQHCLClick ]);
	    BtnTJ.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnTJClick ]);
	    BtnXF.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnXFClick ]);
	    BtnJN.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnJNClick ]);
	    BtnQT.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnQTClick ]);
	    BtnYR.onClick(this, this.sendMessage, [ ComShangChengMsg.OnBtnYRClick ]);
    }

}
