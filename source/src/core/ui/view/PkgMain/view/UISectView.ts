import UISect from "../../../ui/PkgMain/UISect";

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
		const { btn_sect0, btn_sect1, btn_sect2, btn_sect3, btn_sect4, btn_sect5, btn_submit } = this;
		btn_sect0.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect0Click]);
		btn_sect1.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect1Click]);
		btn_sect2.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect2Click]);
		btn_sect3.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect3Click]);
		btn_sect4.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect4Click]);
		btn_sect5.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect5Click]);
		btn_submit.onClick(this, this.sendMessage, [UISectMsg.OnBtnSubmitClick]);
	}

}
