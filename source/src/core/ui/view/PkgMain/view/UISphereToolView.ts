import UISphereTool from "../../../ui/PkgMain/UISphereTool";
import { ResPath } from "../../../../common/ResPath";

export const enum UISphereToolMsg {
	OnBtnBgClick = "UISphereTool_OnBtnBgClick",
	OnBtnClearLogClick = "UISphereTool_OnBtnClearLogClick",
	OnBtnHFJLClick = "UISphereTool_OnBtnHFJLClick",
	OnBtnCreateClick = "UISphereTool_OnBtnCreateClick",
	OnBtnClearClick = "UISphereTool_OnBtnClearClick",
	OnBtnPercentClick = "UISphereTool_OnBtnPercentClick",
	OnBtnCheck0Click = "UISphereTool_OnBtnCheck0Click",
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
        const { BtnBg, BtnClearLog, BtnHFJL, BtnCreate, BtnClear, BtnPercent, BtnCheck0, BtnCheck1, BtnCheck2, BtnCheck3, BtnCheck4, BtnCheck5, BtnCheck6, BtnCheck7, BtnCheck8, BtnCheck9, BtnCheck10, BtnCheck11, BtnCheck12, BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck16, BtnCheck17, BtnCheck18, BtnCheck19, BtnCheck20, BtnCheck21, BtnCheck22, BtnCheck23, BtnCheck24, BtnCheck25, BtnCheck26, BtnCheck27, BtnCheck28, BtnCheck31, BtnCheck32, BtnAdd, BtnSubmit, BtnRemove, BtnRemoveAll } = this;
		BtnBg.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnBgClick ]);
		BtnClearLog.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnClearLogClick ]);
		BtnHFJL.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnHFJLClick ]);
		BtnCreate.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCreateClick ]);
		BtnClear.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnClearClick ]);
		BtnPercent.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnPercentClick ]);
		BtnCheck0.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck0Click ]);
		BtnCheck1.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck1Click ]);
		BtnCheck2.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck2Click ]);
		BtnCheck3.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck3Click ]);
		BtnCheck4.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck4Click ]);
		BtnCheck5.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck5Click ]);
		BtnCheck6.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck6Click ]);
		BtnCheck7.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck7Click ]);
		BtnCheck8.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck8Click ]);
		BtnCheck9.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck9Click ]);
		BtnCheck10.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck10Click ]);
		BtnCheck11.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck11Click ]);
		BtnCheck12.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck12Click ]);
		BtnCheck13.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck13Click ]);
		BtnCheck14.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck14Click ]);
		BtnCheck15.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck15Click ]);
		BtnCheck16.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck16Click ]);
		BtnCheck17.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck17Click ]);
		BtnCheck18.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck18Click ]);
		BtnCheck19.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck19Click ]);
		BtnCheck20.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck20Click ]);
		BtnCheck21.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck21Click ]);
		BtnCheck22.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck22Click ]);
		BtnCheck23.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck23Click ]);
		BtnCheck24.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck24Click ]);
		BtnCheck25.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck25Click ]);
		BtnCheck26.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck26Click ]);
		BtnCheck27.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck27Click ]);
		BtnCheck28.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck28Click ]);
		BtnCheck31.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck31Click ]);
		BtnCheck32.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCheck32Click ]);
		BtnAdd.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnAddClick ]);
		BtnSubmit.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnSubmitClick ]);
		BtnRemove.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnRemoveClick ]);
		BtnRemoveAll.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnRemoveAllClick ]);
    }

}
