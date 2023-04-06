import { IViewCtrl } from "../core/Interfaces";
import { Layer, layerMgr } from "../core/LayerManager";
import { uiMgr } from "../core/UIManager";
import { ViewID } from "../core/ViewID";
import { ComNumInputData } from "../viewCtrl/PkgCommon/Coms/ComNumInputCtrl";
import { UIPoolKey } from "./UIPoolKey";

class TipInfoMgr {
	private static cache: string[];
	private static readonly showDelay = 200;
	private static curTime = TipInfoMgr.showDelay;

	static AddTip(text: string, color: string) {
		if (!this.cache) {
			this.cache = [];
			Laya.timer.frameLoop(1, this, this.Update);
		}
		this.cache.push(text, color);
	}

	private static Update() {
		this.curTime += Laya.timer.delta;
		if (this.cache.length && this.curTime >= this.showDelay) {
			this.curTime = 0;
			const viewCtrl = <IViewCtrl>Laya.Pool.getItemByCreateFun(UIPoolKey.TipInfo, () => {
				const viewCtrl = uiMgr.createView(ViewID.ComTipInfoView, false);
				viewCtrl.view.touchable = false;
				return viewCtrl;
			});
			viewCtrl.data = { text: this.cache.shift(), color: this.cache.shift() };
			layerMgr.addObject(viewCtrl.view, Layer.Bottom);
		}
	}
}

/** UI工具类 */
export class UIUtility {
	/**
	 * 获取gui图集贴图
	 * @param pkg 包名
	 * @param name 贴图名字
	 * @returns
	 */
	static GetFGUITexture(pkg: string, name: string) {
		let temp = fgui.UIPackage.getItemByURL(fgui.UIPackage.getItemURL(pkg, name)).getBranch();
		temp = temp.getHighResolution();
		temp.load();
		return temp.texture;
	}

	/**
	 * 弹浮动提示
	 * @param text 文字
	 * @param color 文字颜色，默认："#ffffff"
	 */
	static ShowTipInfo(text: string, color?: string) {
		TipInfoMgr.AddTip(text, color);
	}

	/**
	 * 弹确认窗口
	 * @param text 内容
	 * @param title 标题，默认："提示"
	 * @param callback {@link Laya.Handler} 回调函数
	 */
	static ShowConfirm(text: string, title?: string, callback?: Laya.Handler) {
		uiMgr.addView(ViewID.UITipConfirmView, { text, title, callback }, null, false);
	}

	/**
	 * 弹数量（整数）输入窗口
	 * @param title 标题
	 * @param min 最小值
	 * @param max 最大值
	 * @param callback {@link Laya.Handler} 回调函数，参数为输入数字
	 */
	static ShowNumInput(title: string, min: number, max: number, callback?: Laya.Handler) {
		uiMgr.addView<ComNumInputData>(ViewID.ComNumInputView, { title, min, max, callback }, null, false);
	}

	/**
	 * 设置list
	 * @param list {@link fgui.GList} list组件
	 * @param numItems 元素数量
	 * @param caller 调用者
	 * @param renderFunc 渲染回调
	 * @param clickFunc 点击回调
	 */
	static SetList(
		list: fgui.GList,
		caller: any,
		renderFunc: (index?: number, item?: any) => void,
		clickFunc?: (item?: any, evt?: Laya.Event, index?: number) => void,
		virtual: boolean = true,
	): void {
		virtual && list.setVirtual();
		list.itemRenderer?.recover();
		list.itemRenderer = Laya.Handler.create(caller, renderFunc, null, false);
		clickFunc && list.on(fgui.Events.CLICK_ITEM, caller, clickFunc);
	}

	/**
	 * 设置下拉框
	 * @param cmb {@link fgui.GComboBox} 下拉框组件
	 * @param items item数组
	 * @param values value数组
	 * @param caller 调用者
	 * @param changedFunc changed回调
	 * @param defaultValue 默认值
	 * @param showItemCount 下拉显示数量
	 */
	static SetCombox(
		cmb: fgui.GComboBox,
		items: string[],
		values: any[],
		caller?: any,
		changedFunc?: (evt?: Laya.Event) => void,
		defaultValue?: any,
		showItemCount?: number
	) {
		cmb.items = items;
		cmb.values = values;
		changedFunc && cmb.on(fgui.Events.STATE_CHANGED, caller, changedFunc);
		const index = values.indexOf(defaultValue);
		cmb.selectedIndex = index == -1 ? 0 : index;
		cmb.visibleItemCount = Math.floor(showItemCount) > 0 ? Math.floor(showItemCount) : items.length;
	}
}
windowImmit("UIUtility", UIUtility);