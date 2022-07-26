import { IViewCtrl } from "./interfaces";

export type DIViewCtrl = IViewCtrl & {
	__keyEventList?: {
		keydown?: { [keyCode: string]: Function[] },
		keypress?: { [keyCode: string]: Function[] },
		keyup?: { [keyCode: string]: Function[] },
	};
	__mouseEventList?: {
		mousedown?: Function[],
		mousemove?: Function[],
		mouseout?: Function[],
		mouseover?: Function[],
		mouseup?: Function[],
	},
}

/**
 * @description 页面控制器设备（鼠标、键盘）交互事件扩展
 * @description ViewCtrlDIExtend => ViewCtrlDeviceInteractionExtend的缩写
 */
export class ViewCtrlDIExtend {

	/**注册设备交互事件 */
	static registerDeviceEvent(viewCtrl: DIViewCtrl) {
		if (!viewCtrl) return;
		const { __keyEventList, __mouseEventList } = viewCtrl;
		if (__keyEventList) {
			const func = this.__doKeyEvent;
			__keyEventList.keydown && (viewCtrl.onKeyDown = func);
			__keyEventList.keypress && (viewCtrl.onKeyPress = func);
			__keyEventList.keyup && (viewCtrl.onKeyUp = func);
		}
		if (__mouseEventList) {
			const func = this.__doMouseEvent;
			__mouseEventList.mousedown && (viewCtrl.onMouseDown = func);
			__mouseEventList.mousemove && (viewCtrl.onMouseMove = func);
			__mouseEventList.mouseout && (viewCtrl.onMouseOut = func);
			__mouseEventList.mouseover && (viewCtrl.onMouseOver = func);
			__mouseEventList.mouseup && (viewCtrl.onMouseUp = func);
		}
	}

	/**关闭设备交互事件 */
	static offDeviceEvent(viewCtrl: DIViewCtrl) {
		if (!viewCtrl) return;
		const prototype = Laya.Script.prototype;
		viewCtrl.onKeyDown = prototype.onKeyDown;
		viewCtrl.onKeyPress = prototype.onKeyPress;
		viewCtrl.onKeyUp = prototype.onKeyUp;
		viewCtrl.onMouseDown = prototype.onMouseDown;
		viewCtrl.onMouseMove = prototype.onMouseMove;
		viewCtrl.onMouseOut = prototype.onMouseOut;
		viewCtrl.onMouseOver = prototype.onMouseOver;
		viewCtrl.onMouseUp = prototype.onMouseUp;

		this.resetOnceEvent(viewCtrl);
	}

	/**重置once事件标志 */
	private static resetOnceEvent(viewCtrl: DIViewCtrl) {
		if (!viewCtrl) return;
		//重置事件once标志
		const { __keyEventList: kel, __mouseEventList: mel } = viewCtrl;
		if (kel) {
			for (const key in kel) {
				const eventList: { [keyCode: string]: Function[] } = kel[key];
				for (const eventKey in eventList) {
					if (Object.prototype.hasOwnProperty.call(eventList, eventKey)) {
						const list: Function[] = eventList[eventKey];
						list.forEach(v => Object.keys(v).forEach(v1 => v[v1].__done != null && (v[v1].__done = false)));
					}
				}
			}
			// Object.values(kl).forEach(v => Object.values(v).forEach(v1 => v1.forEach(v2 => Object.keys(v2).forEach(v3 => v2[v3].__done != null && (v2[v3].__done = false)))));
		}
		if (mel) {
			for (const key in mel) {
				if (Object.prototype.hasOwnProperty.call(mel, key)) {
					const list: Function[] = mel[key];
					list.forEach(v => Object.keys(v).forEach(v1 => v[v1].__done != null && (v[v1].__done = false)));
				}
			}
			// Object.values(ml).forEach(v => v.forEach(v => Object.keys(v).forEach(v1 => v[v1].__done != null && (v[v1].__done = false))));
		}
	}

	/**处理键盘事件 */
	private static __doKeyEvent(e: Laya.Event) {
		//这里的this是BaseViewCtrl
		const __keyEventList = (this as unknown as DIViewCtrl).__keyEventList;
		if (!__keyEventList) return;
		let eventList = __keyEventList[e.type];
		if (!eventList) return;
		let list = eventList[e.keyCode];
		if (!list) return;
		let func: Function, _cfg: any, len = list.length;
		for (let i = 0; i < len; i++) {
			func = list[i];
			_cfg = func[e.keyCode];
			if (_cfg && _cfg.__once) {
				if (!_cfg.__done) {
					_cfg.__done = true;
					func && func.call(this, e);
				}
			} else
				func && func.call(this, e);
		}
	}

	/**处理鼠标事件 */
	private static __doMouseEvent(e: Laya.Event) {
		//这里的this是BaseViewCtrl
		const __mouseEventList = (this as unknown as DIViewCtrl).__mouseEventList;
		if (!__mouseEventList) return;
		const list = __mouseEventList[e.type];
		if (!list) return;

		let func: Function, _cfg: any, len = list.length;
		for (let i = 0; i < len; i++) {
			func = list[i];
			_cfg = func[e.type];
			if (_cfg && _cfg.__once) {
				if (!_cfg.__done) {
					_cfg.__done = true;
					func && func.call(this, e);
				}
			} else
				func && func.call(this, e);
		}
	}
}