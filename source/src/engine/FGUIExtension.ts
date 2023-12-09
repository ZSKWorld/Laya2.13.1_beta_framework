/** FGUI扩展 */
export class FGUIExtension {
	static Init() {
		this.GObjectExtension();
		this.AddGUIObjectEventLockable();
	}

	/** GObject扩展 */
	private static GObjectExtension() {
		const prototype = fgui.GObject.prototype;
		prototype.addComponentIntance = function (component) {
			return this._displayObject.addComponentIntance(component);
		}
		prototype.addComponent = function (componentType) {
			return this._displayObject.addComponent(componentType);
		}
		prototype.getComponent = function (componentType) {
			return this._displayObject.getComponent(componentType);
		}
		prototype.getComponents = function (componentType) {
			return this._displayObject.getComponents(componentType);
		}
		prototype.event = function (type: string, data?: any) {
			return this._displayObject.event(type, data);
		};
		prototype.once = function (type: string, caller: any, listener: Function, args?: any[]) {
			return this._displayObject.once(type, caller, listener, args);
		};
		prototype.offAll = function (type?: string) {
			return this._displayObject.offAll(type);
		};
		prototype.offAllCaller = function (caller: any) {
			return this._displayObject.offAllCaller(caller);
		};
	}

	/**扩展添加ui节点事件锁 */
	private static AddGUIObjectEventLockable() {
		const touchMgrPrototype = Laya.TouchManager.prototype;
		const lockChildMap = new Map<number, boolean>();
		//拦截触摸事件派发，处理事件锁
		touchMgrPrototype["sendEvents"] = function (eles: (Laya.Sprite & { __eventLockMap: any })[], type) {
			let i, len, tE, eventLockMap, lockChild
			len = eles.length;
			this._event._stoped = false;
			let _target = eles[0];
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
			type = type == void 0 ? "$LockAll" : type;
			lockChild = lockChild == void 0 ? true : lockChild;
			if (this.isDisposed || type == "") return;
			const eventLockMap = this.displayObject.__eventLockMap || (this.displayObject.__eventLockMap = {});
			eventLockMap[type] = true;
			eventLockMap[type + "_LockChild"] = lockChild;
		}
		gobjProto.hasEventLock = function (type?: string) {
			type = type == void 0 ? "$LockAll" : type;
			if (this.isDisposed || type == "") return false;
			const eventLockMap = this.displayObject.__eventLockMap;
			if (eventLockMap)
				return !!eventLockMap[type];
			return false;
		}
		gobjProto.removeEventLock = function (type?: string) {
			type = type == void 0 ? "$LockAll" : type;
			if (this.isDisposed || type == "") return;
			const eventLockMap = this.displayObject.__eventLockMap;
			if (eventLockMap) {
				if (eventLockMap[type]) eventLockMap[type] = false;
			}
		}
		gobjProto.removeAllEventLock = function () {
			if (this.isDisposed) return;
			this.displayObject.__eventLockMap = null;
		}
	}
}