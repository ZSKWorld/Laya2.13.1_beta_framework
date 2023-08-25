import UISect from "../../../ui/PkgMain/UISect";
import { ResPath } from "../../../../common/ResPath";

export const enum UISectMsg {
	OnBtnSect0Click = "UISect_OnBtnSect0Click",
	OnBtnSect1Click = "UISect_OnBtnSect1Click",
	OnBtnSect2Click = "UISect_OnBtnSect2Click",
	OnBtnSect3Click = "UISect_OnBtnSect3Click",
	OnBtnSect4Click = "UISect_OnBtnSect4Click",
	OnBtnSect5Click = "UISect_OnBtnSect5Click",
	OnBtnSubmitClick = "UISect_OnBtnSubmitClick",
}

export class UISectView extends ExtensionClass<IView, UISect>(UISect) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        const { BtnSect0, BtnSect1, BtnSect2, BtnSect3, BtnSect4, BtnSect5, BtnSubmit } = this;
		BtnSect0.onClick(this, this.sendMessage, [ UISectMsg.OnBtnSect0Click ]);
		BtnSect1.onClick(this, this.sendMessage, [ UISectMsg.OnBtnSect1Click ]);
		BtnSect2.onClick(this, this.sendMessage, [ UISectMsg.OnBtnSect2Click ]);
		BtnSect3.onClick(this, this.sendMessage, [ UISectMsg.OnBtnSect3Click ]);
		BtnSect4.onClick(this, this.sendMessage, [ UISectMsg.OnBtnSect4Click ]);
		BtnSect5.onClick(this, this.sendMessage, [ UISectMsg.OnBtnSect5Click ]);
		BtnSubmit.onClick(this, this.sendMessage, [ UISectMsg.OnBtnSubmitClick ]);
    }

}
