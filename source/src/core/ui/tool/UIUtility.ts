
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

	static AnimAlphaIn(bg: fairygui.GObject, panel: fairygui.GObject) {
		return new Promise<void>(resolve => {
			bg.alpha = panel.alpha = 0;
			panel.setScale(0, 0);
			Laya.Tween.to(bg, { alpha: 0.8 }, 250, Laya.Ease.quadOut);
			Laya.Tween.to(panel, { alpha: 1 }, 250, Laya.Ease.quadOut);
			Laya.Tween.to(panel, { scaleX: 1, scaleY: 1 }, 250, Laya.Ease.backOut, Laya.Handler.create(null, resolve), 0, false);
		});
	}

	static AnimAlphaOut(bg: fairygui.GObject, panel: fairygui.GObject) {
		return new Promise<void>(resolve => {
			bg.alpha = 0.8;
			panel.alpha = 1;
			panel.setScale(1, 1);
			Laya.Tween.to(bg, { alpha: 0 }, 100, Laya.Ease.linearNone, null, 150);
			Laya.Tween.to(panel, { alpha: 0.4 }, 150, Laya.Ease.linearNone, null, 100);
			Laya.Tween.to(panel, { scaleX: 0, scaleY: 0 }, 250, Laya.Ease.backIn, Laya.Handler.create(null, resolve), 0, false);
		});
	}
}