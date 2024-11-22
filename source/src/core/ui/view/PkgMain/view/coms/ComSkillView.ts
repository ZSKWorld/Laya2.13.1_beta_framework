import ComSkill from "../../../../ui/PkgMain/ComSkill";

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

export class ComSkillView extends ExtensionClass<IView, ComSkill>(ComSkill) {
	static readonly pkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_normal0, btn_normal1, btn_normal2, btn_normal3, btn_normal4, btn_xian0, btn_xian1, btn_xian2, btn_xian3, btn_xian4 } = this;
		btn_normal0.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnNormal0Click]);
		btn_normal1.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnNormal1Click]);
		btn_normal2.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnNormal2Click]);
		btn_normal3.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnNormal3Click]);
		btn_normal4.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnNormal4Click]);
		btn_xian0.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnXian0Click]);
		btn_xian1.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnXian1Click]);
		btn_xian2.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnXian2Click]);
		btn_xian3.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnXian3Click]);
		btn_xian4.onClick(this, this.sendMessage, [ComSkillMsg.OnBtnXian4Click]);
	}

}
