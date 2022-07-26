import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { tableMgr } from "../../../../table/TableManager";
import { ViewExtension } from "../../../core/interfaces";
import ComSkill from "../../../ui/PkgMain/ComSkill";

export const enum ComSkillMsg {
	OnBtnNormal0Click = "ComSkill_OnBtnNormal0Click",
	OnBtnNormal1Click = "ComSkill_OnBtnNormal1Click",
	OnBtnNormal2Click = "ComSkill_OnBtnNormal2Click",
	OnBtnNormal3Click = "ComSkill_OnBtnNormal3Click",
	OnBtnNormal4Click = "ComSkill_OnBtnNormal4Click",
	OnBtnXian0Click = "ComSkill_OnBtnXian0Click",
	OnBtnXian1Click = "ComSkill_OnBtnXian1Click",
	OnBtnXian2Click = "ComSkill_OnBtnXian2Click",
	OnBtnXian3Click = "ComSkill_OnBtnXian3Click",
	OnBtnXian4Click = "ComSkill_OnBtnXian4Click",
}

export class ComSkillView extends ExtensionClass<ViewExtension, ComSkill>(ComSkill) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { BtnNormal0, BtnNormal1, BtnNormal2, BtnNormal3, BtnNormal4, BtnXian0, BtnXian1, BtnXian2, BtnXian3, BtnXian4 } = this;
		BtnNormal0.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnNormal0Click]);
		BtnNormal1.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnNormal1Click]);
		BtnNormal2.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnNormal2Click]);
		BtnNormal3.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnNormal3Click]);
		BtnNormal4.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnNormal4Click]);
		BtnXian0.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnXian0Click]);
		BtnXian1.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnXian1Click]);
		BtnXian2.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnXian2Click]);
		BtnXian3.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnXian3Click]);
		BtnXian4.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnXian4Click]);
	}

	refreshSelectSkill() {
		const normalSkills = this.userData.base.normalSkills;
		const { BtnNormal0, BtnNormal1, BtnNormal2, BtnNormal3, BtnNormal4 } = this;
		BtnNormal0.text = tableMgr.Item[normalSkills[0]].Name.split("·")[1];
		BtnNormal1.text = tableMgr.Item[normalSkills[1]].Name.split("·")[1];
		BtnNormal2.text = tableMgr.Item[normalSkills[2]].Name.split("·")[1];
		BtnNormal3.text = tableMgr.Item[normalSkills[3]].Name.split("·")[1];
		BtnNormal4.text = tableMgr.Item[normalSkills[4]].Name.split("·")[1];
	}

	showMain() {
		this.ctrlState.selectedIndex = 0;
	}

}
