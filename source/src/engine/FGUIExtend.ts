/** FGUI扩展 */
export class FGUIExtend {
	static extends() {
		this.gobjectExtension();
		this.addGUIObjectEventLockable();
	}

	/** GObject扩展 */
	private static gobjectExtension() {
		const prototype = fgui.GObject.prototype;
		prototype.tweenMove = function (endX: number, endY: number, duration: number) {
			return fgui.GTween.to2(this.x, this.y, endX, endY, duration).setTarget(this, this.setXY);
		}
		prototype.tweenMoveX = function (endX: number, duration: number) {
			return fgui.GTween.to(this.x, endX, duration).setTarget(this, "x");
		}
		prototype.tweenMoveY = function (endY: number, duration: number) {
			return fgui.GTween.to(this.y, endY, duration).setTarget(this, "y");
		}
		prototype.tweenScale = function (endX: number, endY: number, duration: number) {
			return fgui.GTween.to2(this.scaleX, this.scaleY, endX, endY, duration).setTarget(this, this.setScale);
		}
		prototype.tweenScaleX = function (endX: number, duration: number) {
			return fgui.GTween.to(this.scaleX, endX, duration).setTarget(this, "scaleX");
		}
		prototype.tweenScaleY = function (endY: number, duration: number) {
			return fgui.GTween.to(this.scaleY, endY, duration).setTarget(this, "scaleY");
		}
		prototype.tweenResize = function (endW: number, endH: number, duration: number) {
			return fgui.GTween.to2(this.width, this.height, endW, endH, duration).setTarget(this, this.setSize);
		}
		prototype.tweenFade = function (endValue: number, duration: number) {
			return fgui.GTween.to(this.alpha, endValue, duration).setTarget(this, "alpha");
		}
		prototype.tweenRotate = function (endValue: number, duration: number) {
			return fgui.GTween.to(this.rotation, endValue, duration).setTarget(this, "rotation");
		}
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
	private static addGUIObjectEventLockable() {
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
			// if (type == "click" && this.$owner && this.$owner.getPath) Logger.Error(this.$owner.getPath());
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