import { GameEvent } from "../core/common/GameEvent";
import { GameUtil } from "../core/common/GameUtil";
import { localData } from "../core/libs/localData/LocalData";
import { LocalDataKey } from "../core/libs/localData/LocalDataKey";
import { PlatformBase } from "./PlatformBase";
import { PlatformType } from "./PlatformDefine";

export class PlatformWX extends PlatformBase {
	// private _userInfoBtn: WechatMinigame.UserInfoButton;
	override get safeArea() {
		if (!this._safeArea) {
			const { width, height, top, bottom, left, right } = wx.getSystemInfoSync().safeArea;
			this._safeArea = {
				width: GameUtil.PRX2LRX(width),
				height: GameUtil.PRY2LRY(height),
				top: GameUtil.PRY2LRY(top),
				bottom: GameUtil.PRY2LRY(bottom),
				left: GameUtil.PRX2LRX(left),
				right: GameUtil.PRX2LRX(right),
			};
		}
		return this._safeArea;
	}
	override get menuBtnArea() {
		wx.onShow
		if (!this._menuBtnArea) {
			const { width, height, top, bottom, left, right } = wx.getMenuButtonBoundingClientRect();
			this._menuBtnArea = {
				width: GameUtil.PRX2LRX(width),
				height: GameUtil.PRY2LRY(height),
				top: GameUtil.PRY2LRY(top),
				bottom: GameUtil.PRY2LRY(bottom),
				left: GameUtil.PRX2LRX(left),
				right: GameUtil.PRX2LRX(right),
			};
		}
		return this._menuBtnArea;
	}

	showConfirm(title: string, msg: string) {
		return new Promise<boolean>(resolve => {
			wx.showModal({
				title: title,
				content: msg,
				cancelText: "取消",
				confirmText: "确定",
				success: (res) => {
					if (res.confirm) resolve(true);
					else resolve(false);
				},
				fail: (err) => {
					resolve(false);
				}
			});
		});
	}

	login(account?: string, password?: string) {
		return new Promise<string>(resolve => {
			this.doLogin(account || userData.base.uid);
			resolve(null);
			// wx.getSetting({
			// 	success: (res) => {
			// 		if (res.authSetting[ "scope.userInfo" ]) {
			// 			// 已经授权，可以直接调用 getUserInfo 获取头像昵称
			// 			wx.getUserInfo({
			// 				success: (res2) => {
			// 					this.doLogin(account || userData.base.uid);
			// 					resolve(null);
			// 				},
			// 				fail: (res2) => resolve("获取用户信息失败！")
			// 			});
			// 		}
			// 		else {
			// 			wx.requirePrivacyAuthorize({
			// 				success: (res2) => {
			// 					if (!this._userInfoBtn) {
			// 						this._userInfoBtn = wx.createUserInfoButton({
			// 							type: 'image',
			// 							image: "",
			// 							style: {
			// 								left: 0,
			// 								top: 0,
			// 								width: GameUtil.LRX2PRX(Laya.stage.width),
			// 								height: GameUtil.LRY2PRY(Laya.stage.height),
			// 								lineHeight: 40,
			// 								backgroundColor: '#ff000000',
			// 								color: '#ffffff',
			// 								textAlign: 'center',
			// 								fontSize: 16,
			// 								borderRadius: 4,
			// 								borderColor: '#ff0000',
			// 								borderWidth: 0,
			// 							}
			// 						});
			// 						this._userInfoBtn.onTap((res3) => {
			// 							this._userInfoBtn.destroy();
			// 							this._userInfoBtn = null;
			// 							if (res3.userInfo) {
			// 								this.doLogin(account || userData.base.uid);
			// 								resolve(null);
			// 							} else {
			// 								resolve("用户拒绝授权");
			// 							}
			// 						});
			// 					}
			// 				},
			// 				fail: (res2) => {
			// 					resolve("用户未同意隐私授权");
			// 				},
			// 			})
			// 		}
			// 	},
			// 	fail: (res) => {
			// 		resolve("获取用户设置失败！");
			// 	}
			// });
		});
	}

	protected onFix(): void {
		//修复微信版本库2.16 - 2.20屏幕显示只有四分之一的问题
		const MiniInput = Laya[ "MiniInput" ];
		if (MiniInput) {
			Laya.stage.off("resize", null, MiniInput._onStageResize);
			MiniInput._onStageResize = function (): void {
				var ts = Laya.stage[ "_canvasTransform" ].identity();
				ts.scale((Laya.Browser.width / Laya.Render.canvas.width / Laya.Browser.pixelRatio), Laya.Browser.height / Laya.Render.canvas.height / Laya.Browser.pixelRatio);
				var canvasStyle = Laya.Render.canvas.style;
				canvasStyle.transform = canvasStyle.webkitTransform = canvasStyle.msTransform = canvasStyle.mozTransform = canvasStyle.oTransform = "";
			}
			Laya.stage.on("resize", null, MiniInput._onStageResize);
		}
	}

	protected onInit(): void {
		this._platform = PlatformType.Wechat;
		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
		Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
		Laya.Text.defaultFont = "SimHei";
		fgui.UIConfig.defaultFont = "SimHei";
		Laya.Stat.show(0, this.safeArea.top);
		wx.onShow((res) => {
			this.dispatch(GameEvent.OnGameShow);
		});
		wx.onHide((res) => {
			this.dispatch(GameEvent.OnGameHide);
		});
	}

	private doLogin(account?: string): void {
		let data = localData.get<PartialAll<IUserData>>(account);
		localData.set<Partial<LoginInput>>(LocalDataKey.LastLoginAccount, { account });
		if (!data) data = { base: { account } };
		else delete data[ "$_GID" ];
		userData.decode(data);
	}

}