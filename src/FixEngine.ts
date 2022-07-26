export class FixEngine {
	static fix() {
		this.ubbTagI();
		this.addGUIObjectEventLockable();
	}

	private static ubbTagI() {
		const inst = fairygui.UBBParser.inst as any;
		inst._handlers["i"] = function onTag_I(tagName, end, attr) {
			return end ? ("</span>") : ("<span style='italic:true'>");
		}
		inst._handlers["u"] = function onTag_U(tagName, end, attr) {
			if (!end) return "<a href=\" \">";
			else return "</a>";
		}
	}

	/**添加ui节点事件锁 */
	private static addGUIObjectEventLockable() {
		const touchMgrPrototype = Laya.TouchManager.prototype;
		const lockChildMap: Map<number, boolean> = new Map();
		//拦截触摸事件派发，处理事件锁
		touchMgrPrototype["sendEvents"] = function (eles: (Laya.Sprite & { __eventLockMap: any })[], type) {
			let i, len, tE, eventLockMap, lockChild
			len = eles.length;
			this._event._stoped = false;
			let _target
			_target = eles[0];
			lockChildMap.clear();
			for (i = len - 1; i >= 0; i--) {
				tE = eles[i];
				if (tE.destroyed) break;
				eventLockMap = tE.__eventLockMap;
				if (eventLockMap) {
					if (eventLockMap["$LockAll"]) lockChild = !!eventLockMap["$LockAll_LockChild"];
					else if (eventLockMap[type]) lockChild = !!eventLockMap[type + "_LockChild"];
					else continue;
					if (lockChild) {
						i++;
						break;
					} else lockChildMap.set(i, true);
				}
			}
			i < 0 && (i = 0);
			for (; i < len; i++) {
				tE = eles[i];
				if (tE.destroyed)
					return;
				if (!lockChildMap.get(i))
					tE.event(type, this._event.setTo(type, tE, _target));
				if (this._event._stoped)
					break;
			}
		}

		const eventDispatchProto = Laya.EventDispatcher.prototype;
		const oldEvent = eventDispatchProto.event;
		//拦截事件，处理事件锁
		eventDispatchProto.event = function (type: string, data?: any): boolean {
			const eventLockMap = this.__eventLockMap;
			if (eventLockMap && (eventLockMap["$LockAll"] || eventLockMap[type]))
				return;
			return oldEvent.call(this, type, data);
		}

		const gobjProto = fgui.GObject.prototype;
		gobjProto.addEventLock = function (type?: string, lockChild?: boolean) {
			if (this.isDisposed || type == "") return;
			const eventLockMap = this.displayObject.__eventLockMap || (this.displayObject.__eventLockMap = {});
			type = type == null ? "$LockAll" : type;
			eventLockMap[type] = true;
			eventLockMap[type + "_LockChild"] = lockChild == null ? true : lockChild;
		}
		gobjProto.removeEventLock = function (type?: string) {
			if (this.isDisposed || type == "") return;
			const eventLockMap = this.displayObject.__eventLockMap;
			if (eventLockMap) {
				if (type == null) eventLockMap["$LockAll"] = false;
				else if (eventLockMap[type]) eventLockMap[type] = false;
			}
		}
		gobjProto.removeAllEventLock = function () {
			if (this.isDisposed) return;
			this.displayObject.__eventLockMap = null;
		}
	}
}