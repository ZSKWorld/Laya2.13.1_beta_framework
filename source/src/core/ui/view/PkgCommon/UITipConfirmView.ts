import { ResPath } from "../../../common/ResPath";
import { ExtensionClass } from "../../../libs/utils/Util";
import { ViewExtension } from "../../core/Interfaces";
import UITipConfirm from "../../ui/PkgCommon/UITipConfirm";

export const enum UITipConfirmMsg {
	OnBtnBgClick = "UITipConfirm_OnBtnBgClick",
	OnBtnConfirmClick = "UITipConfirm_OnBtnConfirmClick",
}

export class UITipConfirmView extends ExtensionClass<ViewExtension, UITipConfirm>(UITipConfirm) {
	static readonly PkgRes = ResPath.UIPath.PkgCommon;
	static readonly DontDestroy = true;

	override onCreate(): void {
		const { BtnBg, BtnConfirm } = this;
		BtnBg.onClick(this, this.sendMessage, [ UITipConfirmMsg.OnBtnBgClick ]);
		BtnConfirm.onClick(this, this.sendMessage, [ UITipConfirmMsg.OnBtnConfirmClick ]);
	}

	setContent(text: string, title: string) {
		this.TxtContent.text = text;
		this.TxtTitle.text = title || "提示";
	}

	playAni(close?: boolean) {
		this.addEventLock(Laya.Event.CLICK);
		return new Promise((resolve) => {
			const completed = Laya.Handler.create(this, () => {
				resolve(null);
				this.removeEventLock(Laya.Event.CLICK);
			});
			if (close) this.EffectShow.playReverse(completed);
			else this.EffectShow.play(completed);
		});
	}

}
