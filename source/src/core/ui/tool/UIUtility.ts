import { uiMgr } from "../core/UIManager";
import { ViewID } from "../core/ViewID";
import { UIChooseNumData } from "../view/PkgCommon/controller/UIChooseNumCtrl";

/** UI工具类 */
export class UIUtility {
	/**
	 * 获取gui图集贴图
	 * @param pkg 包名
	 * @param name 贴图名字
	 * @returns
	 */
	static GetFGUITexture(pkg: string, name: string): Laya.Texture {
		let temp = fgui.UIPackage.getItemByURL(fgui.UIPackage.getItemURL(pkg, name)).getBranch();
		temp = temp.getHighResolution();
		temp.load();
		return temp.texture;
	}

	/**
	 * 设置list
	 * @param list {@link fgui.GList} list组件
	 * @param virtual 虚拟列表?
	 * @param caller 调用者
	 * @param renderFunc 渲染回调
	 * @param clickFunc 点击回调
	 */
	static SetList(
		list: fgui.GList,
		virtual: boolean = true,
		caller?: any,
		renderFunc?: (index?: number, item?: any) => void,
		clickFunc?: (item?: any, evt?: Laya.Event) => void,
	) {
		virtual && list.setVirtual();
		list.itemRenderer?.recover();
		if (renderFunc)
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

	/**
	 * 弹数量（整数）输入窗口
	 * @param title 标题
	 * @param min 最小值
	 * @param max 最大值
	 * @param callback {@link Laya.Handler} 回调函数，参数为输入数字
	 */
	static ShowChooseNum(title: string, min: number, max: number, callback?: Laya.Handler) {
		uiMgr.showView<UIChooseNumData>(ViewID.UIChooseNumView, { title, min, max, callback });
	}
}