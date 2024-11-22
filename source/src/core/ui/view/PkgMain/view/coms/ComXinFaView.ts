import ComXinFa from "../../../../ui/PkgMain/ComXinFa";

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
	OnBtnSkill0Click = "ComXinFa_OnBtnSkill0Click",
	OnBtnSkill1Click = "ComXinFa_OnBtnSkill1Click",
	OnBtnSkill2Click = "ComXinFa_OnBtnSkill2Click",
	OnBtnSkill3Click = "ComXinFa_OnBtnSkill3Click",
	OnBtnUpgrade0Click = "ComXinFa_OnBtnUpgrade0Click",
	OnBtnUpgrade1Click = "ComXinFa_OnBtnUpgrade1Click",
	OnBtnUpgrade2Click = "ComXinFa_OnBtnUpgrade2Click",
}

export class ComXinFaView extends ExtensionClass<IView, ComXinFa>(ComXinFa) {
	static readonly pkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { btn_xinFa0, btn_xinFa1, btn_xinFa2, btn_xinFa3, btn_xinFa4, btn_xinFa5, btn_xinFa6, btn_xinFa7, btn_xinFa8, btn_skill0, btn_skill1, btn_skill2, btn_skill3, btn_upgrade0, btn_upgrade1, btn_upgrade2 } = this;
		btn_xinFa0.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa0Click]);
		btn_xinFa1.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa1Click]);
		btn_xinFa2.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa2Click]);
		btn_xinFa3.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa3Click]);
		btn_xinFa4.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa4Click]);
		btn_xinFa5.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa5Click]);
		btn_xinFa6.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa6Click]);
		btn_xinFa7.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa7Click]);
		btn_xinFa8.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnXinFa8Click]);
		btn_skill0.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnSkill0Click]);
		btn_skill1.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnSkill1Click]);
		btn_skill2.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnSkill2Click]);
		btn_skill3.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnSkill3Click]);
		btn_upgrade0.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnUpgrade0Click]);
		btn_upgrade1.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnUpgrade1Click]);
		btn_upgrade2.onClick(this, this.sendMessage, [ComXinFaMsg.OnBtnUpgrade2Click]);

	}

}
