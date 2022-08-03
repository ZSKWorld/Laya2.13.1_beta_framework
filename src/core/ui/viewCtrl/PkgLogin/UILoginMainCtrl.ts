import { LogicSceneType } from '../../../../logicScene/LogicSceneType';
import { NotifyConst } from "../../../common/NotifyConst";
import { platform } from "../../../common/platform/Platform";
import { storage } from "../../../libs/localStorage/LocalStorage";
import { LocalStorageKey } from "../../../libs/localStorage/LocalStorageKey";
import { MathUtil } from "../../../libs/math/MathUtil";
import { GetLang } from "../../../libs/utils/Util";
import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UILoginMainMsg, UILoginMainView } from "../../view/PkgLogin/UILoginMainView";

export interface UILoginMainData {

}

export class UILoginMainCtrl extends BaseViewCtrl<UILoginMainView, UILoginMainData> {

	onAwake(): void {
		super.onAwake();
		this.addMessageListener(UILoginMainMsg.OnBtnLoginClick, this.UILoginMain_OnBtnLoginClick);
		this.addMessageListener(UILoginMainMsg.OnBtnRegisterClick, this.UILoginMain_OnBtnRegisterClick);
	}

	onEnable(): void {
		super.onEnable();
	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
	}

	private async UILoginMain_OnBtnLoginClick(): Promise<void> {
		const [ account, password ] = [ this.view.TxtAccount.text, this.view.TxtPassword.text ];
		const msgCode = await platform.login(account, password);
		if (!msgCode) {
			this.dispatch(NotifyConst.EnterScene, LogicSceneType.MainScene);
			Laya.timer.frameOnce(2, null, () => {
				let jingli = this.userData.calOfflineReward();
				const txt1 = `
                    正在构建游戏世界<br>
                    正在计算离线收益<br>
                    初始化完毕<br>
                `;
				const txt2 = `
                    欢迎回来<br>
                    你最后一次在线时间为:${ new Date(this.userData.base.lastLoginTime).toLocaleString() }<br>
                    离线时间${ MathUtil.TimeFormatChinese(Math.min(Math.floor((Date.now() - this.userData.base.lastLoginTime) / 1000), 24 * 60 * 60)) }<br>
                    获得精力${ jingli }点
                `;
				const battleSpeed = storage.get(LocalStorageKey.BattleSpeed) || 1;
				storage.set(LocalStorageKey.BattleSpeed, battleSpeed);
				const txt3 = `<br>
                    [color=#FFFFFF][size=35]放置游戏，资源全开放，所有道具货币都可获取[/size][/color]<br>
                    [color=#FF842E][size=35]熬死大佬，你就是大佬![/size][/color]<br>
                    战斗速度调整为${ battleSpeed }倍速
                `;
				jingli > 0 && UIUtility.ShowTipConfirm(txt2);
				this.dispatch(NotifyConst.AddMainLog, txt1 + txt2 + txt3);
			});
		} else
			UIUtility.ShowTipInfo(GetLang(msgCode));
	}

	private async UILoginMain_OnBtnRegisterClick(): Promise<void> {
		const [ account, password, nickName ] = [
			this.view.TxtRegisterAccount.text,
			this.view.TxtRegisterPassword.text,
			this.view.TxtRegisterName.text
		];
		if (!account) UIUtility.ShowTipInfo("请输入账号");
		else if (!password) UIUtility.ShowTipInfo("请输入密码");
		else if (!nickName) UIUtility.ShowTipInfo("请输入昵称");
		const msgCode = await platform.register(account, password, nickName);
		if (!msgCode) this.dispatch(NotifyConst.EnterScene, LogicSceneType.MainScene);
		else UIUtility.ShowTipInfo(GetLang(msgCode));
	}
}