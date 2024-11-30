import { GameUtil } from "../../common/GameUtil";
import { trainLogMgr } from "../../game/TrainLogManager";
import { richTextMgr } from "./RichStrManager";
import { tipMgr } from "./TipManager";

/** UI工具类 */
export class UIUtil {
	/**
	 * 获取gui图集贴图
	 * @param pkg 包名
	 * @param name 贴图名字
	 * @returns
	 */
	static getFGUITexture(pkg: string, name: string): Laya.Texture {
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
	static setList(
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
	static setCombox(
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

	static setInputCheck(input: fgui.GTextInput, onInput: Laya.Handler) {
		let duringComposition = false;
		const onCompositionStart = (event) => {
			// 输入中文开始
			duringComposition = true;
		};
		const onCompositionEnd = (event) => {
			// 输入中文结束
			duringComposition = false;
			onInput && onInput.run();
		};
		input.on(Laya.Event.FOCUS, null, () => {
			input.nativeInput.nativeInput.addEventListener('compositionstart', onCompositionStart);
			input.nativeInput.nativeInput.addEventListener('compositionend', onCompositionEnd);
		});
		input.on(Laya.Event.BLUR, null, () => {
			input.nativeInput.nativeInput.removeEventListener('compositionstart', onCompositionStart);
			input.nativeInput.nativeInput.removeEventListener('compositionend', onCompositionEnd);
		});
		Event.BUBBLING_PHASE
		input.on(Laya.Event.INPUT, null, () => !duringComposition && onInput && onInput.run());
	}

	static showRewardsTip(title: string, rewards: OriginData<IGoods>[]) {
		let logStr = richTextMgr.start(title);
		title && logStr.break();
		rewards.forEach(v => {
			const str = GameUtil.getItemCountStr(v.id, v.count);
			tipMgr.showTip(`恭喜获得${ str }`);
			logStr.append(str).break();
		});
		trainLogMgr.addLog(logStr.end());
	}

	static animAlphaIn(bg: fgui.GObject, panel: fgui.GObject) {
		return new Promise<void>(resolve => {
			bg.alpha = panel.alpha = 0;
			panel.setScale(0, 0);
			Laya.Tween.to(bg, { alpha: 0.8 }, 150, Laya.Ease.quadOut, null, 0, true);
			Laya.Tween.to(panel, { alpha: 1 }, 150, Laya.Ease.quadOut, null, 0, true);
			Laya.Tween.to(panel, { scaleX: 1, scaleY: 1 }, 150, Laya.Ease.backOut, Laya.Handler.create(null, resolve));
		});
	}

	static animAlphaOut(bg: fgui.GObject, panel: fgui.GObject) {
		return new Promise<void>(resolve => {
			Laya.Tween.to(bg, { alpha: 0 }, 150, Laya.Ease.linearNone, null, 0, true);
			Laya.Tween.to(panel, { alpha: 0.4 }, 150, Laya.Ease.linearNone, null, 0, true);
			Laya.Tween.to(panel, { scaleX: 0, scaleY: 0 }, 150, Laya.Ease.backIn, Laya.Handler.create(null, resolve));
		});
	}
}