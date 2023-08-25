import { GameUtil } from "../../../common/GameUtil";
import { ResPath } from "../../../common/ResPath";
import { tableMgr } from "../../../table/TableManager";
import UISphereTool from "../../ui/PkgMain/UISphereTool";

export const enum UISphereToolMsg {
	OnBtnBgClick = "UISphereTool_OnBtnBgClick",
	OnBtnClearLogClick = "UISphereTool_OnBtnClearLogClick",
	OnBtnHFJLClick = "UISphereTool_OnBtnHFJLClick",
	OnBtnCreateClick = "UISphereTool_OnBtnCreateClick",
	OnBtnClearClick = "UISphereTool_OnBtnClearClick",
	OnBtnAddClick = "UISphereTool_OnBtnAddClick",
	OnBtnSubmitClick = "UISphereTool_OnBtnSubmitClick",
	OnBtnRemoveClick = "UISphereTool_OnBtnRemoveClick",
	OnBtnRemoveAllClick = "UISphereTool_OnBtnRemoveAllClick",
	OnIpt29Input = "UISphereTool_OnIpt29Input",
	OnCmbItemDropDownDisplay = "UISphereTool_OnCmbItemDropDownDisplay",
}

export class UISphereToolView extends ExtensionClass<IView, UISphereTool>(UISphereTool) {
	static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate(): void {
		const { BtnBg, BtnClearLog, BtnHFJL, BtnCreate, BtnClear, BtnAdd, BtnSubmit, BtnRemove, BtnRemoveAll, Ipt29, CmbItem } = this;
		BtnBg.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnBgClick ]);
		BtnClearLog.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnClearLogClick ]);
		BtnHFJL.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnHFJLClick ]);
		BtnCreate.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnCreateClick ]);
		BtnClear.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnClearClick ]);
		BtnAdd.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnAddClick ]);
		BtnSubmit.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnSubmitClick ]);
		BtnRemove.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnRemoveClick ]);
		BtnRemoveAll.onClick(this, this.sendMessage, [ UISphereToolMsg.OnBtnRemoveAllClick ]);
		Ipt29.on(Laya.Event.INPUT, this, this.sendMessage, [ UISphereToolMsg.OnIpt29Input ]);
		CmbItem.dropdown.on(Laya.Event.DISPLAY, this, this.sendMessage, [ UISphereToolMsg.OnCmbItemDropDownDisplay ]);
	}

	refreshAdds(adds: { id: number, count: number }[]) {
		let str = "";
		adds.forEach(v => str += `${ v.id }--${ GameUtil.GetColorStr(tableMgr.Item[ v.id ].Quality, tableMgr.Item[ v.id ].Name) }&nbsp;x${ v.count }<br>`);
		this.TxtContent.text = str;
	}

}
