import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { tableMgr } from "../../../table/TableManager";
import { ViewExtension } from "../../core/interfaces";
import UISect from "../../ui/PkgMain/UISect";

export const enum UISectMsg {
	OnBtnSect0Click = "UISect_OnBtnSect0Click",
	OnBtnSect1Click = "UISect_OnBtnSect1Click",
	OnBtnSect2Click = "UISect_OnBtnSect2Click",
	OnBtnSect3Click = "UISect_OnBtnSect3Click",
	OnBtnSect4Click = "UISect_OnBtnSect4Click",
	OnBtnSect5Click = "UISect_OnBtnSect5Click",
	OnBtnSubmitClick = "UISect_OnBtnSubmitClick",
}

export class UISectView extends ExtensionClass<ViewExtension, UISect>(UISect) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { BtnSect0, BtnSect1, BtnSect2, BtnSect3, BtnSect4, BtnSect5, BtnSubmit } = this;
		BtnSect0.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect0Click]);
		BtnSect1.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect1Click]);
		BtnSect2.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect2Click]);
		BtnSect3.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect3Click]);
		BtnSect4.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect4Click]);
		BtnSect5.onClick(this, this.sendMessage, [UISectMsg.OnBtnSect5Click]);
		BtnSubmit.onClick(this, this.sendMessage, [UISectMsg.OnBtnSubmitClick]);
	}

	refreshContent(id: number) {
		const { ProBar0, ProBar1, ProBar2, ProBar3, ProBar4, ProBar5, ProBar6, TxtDesc } = this;
		const cfg = tableMgr.Sect[id];
		ProBar0.value = cfg.AtkFactor * 1000;
		ProBar1.value = cfg.DefFactor * 1000;
		ProBar2.value = cfg.HpFactor * 1000;
		ProBar3.value = cfg.HitFactor * 1000;
		ProBar4.value = cfg.DodFactor * 1000;
		ProBar5.value = cfg.CriFactor * 1000;
		ProBar6.value = cfg.CrFactor * 1000;
		let mainAttri = "";
		const attri = ["金", "木", "水", "火", "土"];
		const desces = ["命中、暴击成长较高", "攻击、防御、生命成长较高", "攻击、暴击成长较高", "防御、生命成长较高", "命中、闪避、暴击成长较高", "各项成长都一般"];
		cfg.Attribute.forEach((v, index) => mainAttri += (index == cfg.Attribute.length - 1) ? attri[v] : (attri[v] + "、"));
		TxtDesc.text = `主属性-${mainAttri}\n${desces[cfg.ID - 101]}\n「${cfg.Name}」`;
	}

}
