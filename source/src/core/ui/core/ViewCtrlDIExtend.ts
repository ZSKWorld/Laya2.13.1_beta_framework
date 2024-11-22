
type FuncCfg = { __once: boolean, __done: boolean, __args: any[] };
type CfgFunction = Function & { [key: string]: FuncCfg; };
type DIViewCtrl = IViewCtrl & {
	__keyEventList?: KeyMap<KeyMap<CfgFunction[]>>;
	__mouseEventList?: KeyMap<CfgFunction[]>,
}

/**
 * 页面控制器设备（鼠标、键盘）交互事件扩展 ViewCtrlDIExtend => ViewCtrlDeviceInteractionExtend的缩写
  */
export class ViewCtrlDIExtend {

	/**
	 * 注册设备交互事件
	 * @param viewCtrl 目标控制器
	 * @returns
	 */
	static registerDeviceEvent(viewCtrl: DIViewCtrl) {
		if (!viewCtrl) return;
		const { __keyEventList, __mouseEventList } = viewCtrl;
		if (__keyEventList) {
			const func = this.doKeyEvent;
			__keyEventList.keydown && (viewCtrl.onKeyDown = func);
			__keyEventList.keypress && (viewCtrl.onKeyPress = func);
			__keyEventList.keyup && (viewCtrl.onKeyUp = func);
		}
		if (__mouseEventList) {
			const { doMouseEvent: mouseFunc, doStageMouseEvent: stageMousFunc } = this;
			__mouseEventList.mouseover && (viewCtrl.onMouseOver = mouseFunc);
			__mouseEventList.mousedown && (viewCtrl.onMouseDown = mouseFunc);
			__mouseEventList.mousemove && (viewCtrl.onMouseMove = mouseFunc);
			__mouseEventList.mouseup && (viewCtrl.onMouseUp = mouseFunc);
			__mouseEventList.mouseout && (viewCtrl.onMouseOut = mouseFunc);
			__mouseEventList.doubleclick && (viewCtrl.onDoubleClick = mouseFunc);
			__mouseEventList.rightclick && (viewCtrl.onRightClick = mouseFunc);
			__mouseEventList.click && (viewCtrl.onClick = mouseFunc);
			__mouseEventList.stagemousedown && (viewCtrl.onStageMouseDown = stageMousFunc);
			__mouseEventList.stagemousemove && (viewCtrl.onStageMouseMove = stageMousFunc);
			__mouseEventList.stagemouseup && (viewCtrl.onStageMouseUp = stageMousFunc);
			__mouseEventList.stageclick && (viewCtrl.onStageClick = stageMousFunc);
		}

		this.resetOnceEvent(viewCtrl);
	}

	/**
	 * 关闭设备交互事件
	 * @param viewCtrl 目标控制器
	 * @returns
	 */
	static offDeviceEvent(viewCtrl: DIViewCtrl) {
		if (!viewCtrl) return;
		const prototype = Laya.Script.prototype;
		viewCtrl.onKeyDown = prototype.onKeyDown;
		viewCtrl.onKeyPress = prototype.onKeyPress;
		viewCtrl.onKeyUp = prototype.onKeyUp;

		viewCtrl.onMouseOver = prototype.onMouseOver;
		viewCtrl.onMouseDown = prototype.onMouseDown;
		viewCtrl.onMouseMove = prototype.onMouseMove;
		viewCtrl.onMouseUp = prototype.onMouseUp;
		viewCtrl.onMouseOut = prototype.onMouseOut;
		viewCtrl.onDoubleClick = prototype.onDoubleClick;
		viewCtrl.onRightClick = prototype.onRightClick;
		viewCtrl.onClick = prototype.onClick;
		viewCtrl.onStageMouseDown = prototype.onStageMouseDown;
		viewCtrl.onStageMouseMove = prototype.onStageMouseMove;
		viewCtrl.onStageMouseUp = prototype.onStageMouseUp;
		viewCtrl.onStageClick = prototype.onStageClick;
	}

	/**重置once事件标志 */
	private static resetOnceEvent(viewCtrl: DIViewCtrl) {
		if (!viewCtrl) return;
		//重置事件once标志
		const { __keyEventList: kel, __mouseEventList: mel } = viewCtrl;
		if (kel) {
			for (const key in kel) {
				const eventList = kel[key];
				for (const eventKey in eventList) {
					const list = eventList[eventKey];
					list.forEach(v => Object.keys(v).forEach(v1 => v[v1].__done != null && (v[v1].__done = false)));
				}
			}
		}
		if (mel) {
			for (const key in mel) {
				const list = mel[key];
				list.forEach(v => Object.keys(v).forEach(v1 => v[v1].__done != null && (v[v1].__done = false)));
			}
		}
	}

	/**处理键盘事件 */
	private static doKeyEvent(e: Laya.Event) {
		//这里的this是BaseViewCtrl
		const __keyEventList = (this as unknown as DIViewCtrl).__keyEventList;
		if (!__keyEventList) return;
		let eventList = __keyEventList[e.type];
		if (!eventList) return;
		let list = eventList[e.keyCode] || eventList[-1];
		if (!list) return;
		for (let i = 0, len = list.length; i < len; i++) {
			const func = list[i];
			const cfg = func[e.keyCode];
			const args = cfg && cfg.__args ? [...cfg.__args, e] : [e];
			if (cfg && cfg.__once) {
				if (!cfg.__done) {
					cfg.__done = true;
					func && func.call(this, ...args);
				}
			} else {
				func && func.call(this, ...args);
			}
		}
	}

	/**处理鼠标事件 */
	private static doMouseEvent(e: Laya.Event, eventType?: string) {
		const eType = eventType || e.type;
		//这里的this是BaseViewCtrl
		const __mouseEventList = (this as unknown as DIViewCtrl).__mouseEventList;
		if (!__mouseEventList) return;
		const list = __mouseEventList[eType];
		if (!list) return;
		for (let i = 0, len = list.length; i < len; i++) {
			const func = list[i];
			const cfg = func[eType];
			const args = cfg && cfg.__args ? [...cfg.__args, e] : [e];
			if (cfg && cfg.__once) {
				if (!cfg.__done) {
					cfg.__done = true;
					func && func.call(this, ...args);
				}
			} else {
				func && func.call(this, ...args);
			}
		}
	}

	/**处理舞台鼠标事件 */
	private static doStageMouseEvent(e: Laya.Event) {
		let eType = e.type;
		switch (eType) {
			case Laya.Event.CLICK: eType = MouseEventType.StageClick; break;
			case Laya.Event.MOUSE_DOWN: eType = MouseEventType.StageMouseDown; break;
			case Laya.Event.MOUSE_MOVE: eType = MouseEventType.StageMouseMove; break;
			case Laya.Event.MOUSE_UP: eType = MouseEventType.StageMouseUp; break;
			default: return;
		}
		ViewCtrlDIExtend.doMouseEvent.call(this, e, eType);
	}
}