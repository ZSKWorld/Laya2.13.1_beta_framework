import UISphereTool from "../../../ui/PkgMain/UISphereTool";

export const enum UISphereToolMsg {
	OnBtnClearLogClick = "UISphereTool_OnBtnClearLogClick",
	OnBtnRecoverVigorClick = "UISphereTool_OnBtnRecoverVigorClick",
	OnBtnLittleGameClick = "UISphereTool_OnBtnLittleGameClick",
	OnBtnCreateClick = "UISphereTool_OnBtnCreateClick",
	OnBtnClearClick = "UISphereTool_OnBtnClearClick",
	OnBtnPercentClick = "UISphereTool_OnBtnPercentClick",
	OnBtnCheck1Click = "UISphereTool_OnBtnCheck1Click",
	OnBtnCheck2Click = "UISphereTool_OnBtnCheck2Click",
	OnBtnCheck3Click = "UISphereTool_OnBtnCheck3Click",
	OnBtnCheck4Click = "UISphereTool_OnBtnCheck4Click",
	OnBtnCheck5Click = "UISphereTool_OnBtnCheck5Click",
	OnBtnCheck6Click = "UISphereTool_OnBtnCheck6Click",
	OnBtnCheck7Click = "UISphereTool_OnBtnCheck7Click",
	OnBtnCheck8Click = "UISphereTool_OnBtnCheck8Click",
	OnBtnCheck9Click = "UISphereTool_OnBtnCheck9Click",
	OnBtnCheck10Click = "UISphereTool_OnBtnCheck10Click",
	OnBtnCheck11Click = "UISphereTool_OnBtnCheck11Click",
	OnBtnCheck12Click = "UISphereTool_OnBtnCheck12Click",
	OnBtnCheck13Click = "UISphereTool_OnBtnCheck13Click",
	OnBtnCheck14Click = "UISphereTool_OnBtnCheck14Click",
	OnBtnCheck15Click = "UISphereTool_OnBtnCheck15Click",
	OnBtnCheck16Click = "UISphereTool_OnBtnCheck16Click",
	OnBtnCheck17Click = "UISphereTool_OnBtnCheck17Click",
	OnBtnCheck18Click = "UISphereTool_OnBtnCheck18Click",
	OnBtnCheck19Click = "UISphereTool_OnBtnCheck19Click",
	OnBtnCheck20Click = "UISphereTool_OnBtnCheck20Click",
	OnBtnCheck21Click = "UISphereTool_OnBtnCheck21Click",
	OnBtnCheck22Click = "UISphereTool_OnBtnCheck22Click",
	OnBtnCheck23Click = "UISphereTool_OnBtnCheck23Click",
	OnBtnCheck24Click = "UISphereTool_OnBtnCheck24Click",
	OnBtnCheck25Click = "UISphereTool_OnBtnCheck25Click",
	OnBtnCheck26Click = "UISphereTool_OnBtnCheck26Click",
	OnBtnCheck27Click = "UISphereTool_OnBtnCheck27Click",
	OnBtnCheck28Click = "UISphereTool_OnBtnCheck28Click",
	OnBtnCheck0Click = "UISphereTool_OnBtnCheck0Click",
	OnBtnCheck31Click = "UISphereTool_OnBtnCheck31Click",
	OnBtnCheck32Click = "UISphereTool_OnBtnCheck32Click",
	OnBtnAddClick = "UISphereTool_OnBtnAddClick",
	OnBtnSubmitClick = "UISphereTool_OnBtnSubmitClick",
	OnBtnRemoveClick = "UISphereTool_OnBtnRemoveClick",
	OnBtnRemoveAllClick = "UISphereTool_OnBtnRemoveAllClick",
}

export class UISphereToolView extends ExtensionClass<IView, UISphereTool>(UISphereTool) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { graph_bg, btn_clearLog, btn_recoverVigor, btn_littleGame, btn_create, btn_clear, btn_percent, btn_check1, btn_check2,
			btn_check3, btn_check4, btn_check5, btn_check6, btn_check7, btn_check8, btn_check9, btn_check10,
			btn_check11, btn_check12, btn_check13, btn_check14, btn_check15, btn_check16, btn_check17, btn_check18,
			btn_check19, btn_check20, btn_check21, btn_check22, btn_check23, btn_check24, btn_check25, btn_check26,
			btn_check27, btn_check28, btn_check0, btn_check31, btn_check32, btn_add, btn_submit, btn_remove, btn_removeAll } = this;
		graph_bg.onClick(this, this.removeSelf);
		btn_clearLog.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnClearLogClick]);
		btn_recoverVigor.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnRecoverVigorClick]);
		btn_littleGame.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnLittleGameClick]);
		btn_create.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCreateClick]);
		btn_clear.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnClearClick]);
		btn_percent.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnPercentClick]);
		btn_check1.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck1Click]);
		btn_check2.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck2Click]);
		btn_check3.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck3Click]);
		btn_check4.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck4Click]);
		btn_check5.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck5Click]);
		btn_check6.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck6Click]);
		btn_check7.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck7Click]);
		btn_check8.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck8Click]);
		btn_check9.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck9Click]);
		btn_check10.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck10Click]);
		btn_check11.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck11Click]);
		btn_check12.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck12Click]);
		btn_check13.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck13Click]);
		btn_check14.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck14Click]);
		btn_check15.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck15Click]);
		btn_check16.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck16Click]);
		btn_check17.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck17Click]);
		btn_check18.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck18Click]);
		btn_check19.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck19Click]);
		btn_check20.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck20Click]);
		btn_check21.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck21Click]);
		btn_check22.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck22Click]);
		btn_check23.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck23Click]);
		btn_check24.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck24Click]);
		btn_check25.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck25Click]);
		btn_check26.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck26Click]);
		btn_check27.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck27Click]);
		btn_check28.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck28Click]);
		btn_check0.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck0Click]);
		btn_check31.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck31Click]);
		btn_check32.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnCheck32Click]);
		btn_add.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnAddClick]);
		btn_submit.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnSubmitClick]);
		btn_remove.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnRemoveClick]);
		btn_removeAll.onClick(this, this.sendMessage, [UISphereToolMsg.OnBtnRemoveAllClick]);
	}

}
