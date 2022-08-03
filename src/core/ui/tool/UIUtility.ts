import { NotifyConst } from "../../common/NotifyConst";
import { eventMgr } from "../../libs/event/EventMgr";
import { Layer, layerMgr } from "../core/GameLayer";
import { IView } from "../core/interfaces";
import { uiMgr } from "../core/UIManager";
import { ViewID } from "../core/ViewID";
import { UIPoolKey } from "./UIPoolKey";

export class UIUtility {
	/**
	 * 弹浮动提示
	 * @param text 文字
	 * @param color 文字颜色，默认："#ffffff"
	 */
	static ShowTipInfo(text: string, color?: string) {
		const tip = this.getViewFromPool(UIPoolKey.TipInfo, ViewID.ComTipInfoView, Layer.Bottom, { info: text, color }, false);
		tip.touchable = false;
		eventMgr.event(NotifyConst.AddMainLog, text);
	}

	/**
	 * 弹确认窗口
	 * @param text 内容
	 * @param title 标题，默认："提示"
	 * @returns Promise => boolean
	 */
	static ShowTipConfirm(text: string, title?: string) {
		return new Promise<boolean>((resolve) => {
			this.getViewFromPool(UIPoolKey.TipConfirm, ViewID.TipConfirmView, Layer.Middle, { text, title, callback: resolve });
		});
	}

	/**
	 * 弹数量（整数）输入窗口
	 * @param title 标题
	 * @param min 最小值
	 * @param max 最大值
	 * @returns Promise => number
	 */
	static ShowNumInput(title: string, min: number, max: number) {
		return new Promise<number>((resolve) => {
			this.getViewFromPool(UIPoolKey.NumInput, ViewID.ComNumInputView, Layer.Bottom, { title, min, max, callback: resolve });
		});
	}

	/**
	 * 显示物品信息栏页面
	 * @param id 物品id
	 * @param buy 是否显示购买选项
	 */
	static ShowItemInfo(id: number, buy: boolean) {
		this.getViewFromPool(UIPoolKey.ItemInfo, ViewID.ComItemInfoView, Layer.Bottom, { id, buy });
	}

	/**
	 * 设置list
	 * @param list list组件
	 * @param numItems 元素数量
	 * @param caller 调用者
	 * @param renderFunc 渲染回调
	 * @param clickFunc 点击回调
	 */
	static SetList(
		list: fairygui.GList,
		numItems: number,
		caller: any,
		renderFunc: (index?: number, item?: any) => void,
		clickFunc?: (item?: any, evt?: Laya.Event, index?: number) => void,
	): void {
		list.setVirtual();
		list.itemRenderer?.recover();
		list.itemRenderer = Laya.Handler.create(caller, renderFunc, null, false);
		clickFunc && list.on(fgui.Events.CLICK_ITEM, caller, clickFunc);
		//如果设置setVirtual，numItems必须在itemRenderer之后赋值
		list.numItems = numItems;
	}

	/**
	 * 设置下拉框
	 * @param cmb 下拉框组件
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

	/**
	 * 从对象池中获取页面实例，没有则创建，有的话则从对象池中获取
	 * @param key 对象池标识
	 * @param viewID 页面ID
	 * @param layer 层级
	 * @param data 初始数据
	 * @param fullScreen 是否全屏
	 */
	private static getViewFromPool(key: UIPoolKey, viewID: ViewID, layer: Layer, data: any, fullScreen: boolean = true) {
		const viewInst = <IView>Laya.Pool.getItemByCreateFun(
			key, () => uiMgr.createViewInstance(viewID, fullScreen)
		);
		viewInst.initView(viewID, viewInst, null, data);
		layerMgr.addObject(viewInst, layer);
		return viewInst;
	}
}