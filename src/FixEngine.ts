export class FixEngine {
	static Fix() {
		this.UbbTagI();
		this.AddGUIObjectEventLockable();
		this.LoadPackage();
	}

	private static UbbTagI() {
		const inst = fairygui.UBBParser.inst as any;
		inst._handlers[ "i" ] = function onTag_I(tagName, end, attr) {
			return end ? ("</span>") : ("<span style='italic:true'>");
		}
		inst._handlers[ "u" ] = function onTag_U(tagName, end, attr) {
			if (!end) return "<a href=\" \">";
			else return "</a>";
		}
	}

	/**添加ui节点事件锁 */
	private static AddGUIObjectEventLockable() {
		const touchMgrPrototype = Laya.TouchManager.prototype;
		const lockChildMap: Map<number, boolean> = new Map();
		//拦截触摸事件派发，处理事件锁
		touchMgrPrototype[ "sendEvents" ] = function (eles: (Laya.Sprite & { __eventLockMap: any })[], type) {
			let i, len, tE, eventLockMap, lockChild
			len = eles.length;
			this._event._stoped = false;
			let _target
			_target = eles[ 0 ];
			lockChildMap.clear();
			for (i = len - 1; i >= 0; i--) {
				tE = eles[ i ];
				if (tE.destroyed) break;
				eventLockMap = tE.__eventLockMap;
				if (eventLockMap) {
					if (eventLockMap[ "$LockAll" ]) lockChild = !!eventLockMap[ "$LockAll_LockChild" ];
					else if (eventLockMap[ type ]) lockChild = !!eventLockMap[ type + "_LockChild" ];
					else continue;
					if (lockChild) {
						i++;
						break;
					} else lockChildMap.set(i, true);
				}
			}
			i < 0 && (i = 0);
			for (; i < len; i++) {
				tE = eles[ i ];
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
			if (eventLockMap && (eventLockMap[ "$LockAll" ] || eventLockMap[ type ]))
				return;
			return oldEvent.call(this, type, data);
		}

		const gobjProto = fgui.GObject.prototype;
		gobjProto.addEventLock = function (type?: string, lockChild?: boolean) {
			if (this.isDisposed || type == "") return;
			const eventLockMap = this.displayObject.__eventLockMap || (this.displayObject.__eventLockMap = {});
			type = type == null ? "$LockAll" : type;
			eventLockMap[ type ] = true;
			eventLockMap[ type + "_LockChild" ] = lockChild == null ? true : lockChild;
		}
		gobjProto.removeEventLock = function (type?: string) {
			if (this.isDisposed || type == "") return;
			const eventLockMap = this.displayObject.__eventLockMap;
			if (eventLockMap) {
				if (type == null) eventLockMap[ "$LockAll" ] = false;
				else if (eventLockMap[ type ]) eventLockMap[ type ] = false;
			}
		}
		gobjProto.removeAllEventLock = function () {
			if (this.isDisposed) return;
			this.displayObject.__eventLockMap = null;
		}
	}

	/** 修复gui GBasicText.text 自动‘宽度’最大尺寸限制不起作用的问题 */
	private static BasicText() {
		const prototype = fgui.GBasicTextField.prototype;
		Object.defineProperty(prototype, "text", {
			get() { return this._text; },
			set(value: string) {
				this._text = value;
				if (this._text == null)
					this._text = "";
				if (this._bitmapFont == null) {
					if (this._widthAutoSize)
						this._textField.width = this.maxWidth || 10000;
					var text2 = this._text;
					if (this._templateVars)
						text2 = this.parseTemplate(text2);
					if (this._ubbEnabled) //laya还不支持同一个文本不同样式
						this._textField.text = fgui.UBBParser.inst.parse(fgui.ToolSet.encodeHTML(text2), true);
					else
						this._textField.text = text2;
				}
				else {
					this._textField.text = "";
					this._textField[ "setChanged" ]();
				}
				if (this.parent && this.parent._underConstruct)
					this._textField.typeset();
			}
		})
	}

	/** 修复loadPackage重复加载的bug */
	private static LoadPackage() {
		fgui.UIPackage.loadPackage = function loadPackage(resKey, completeHandler, progressHandler) {
			const UIPackage = fgui.UIPackage as any;
			let loadKeyArr = [];
			let keys = [];
			let i;
			if (Array.isArray(resKey)) {
				for (i = 0; i < resKey.length; i++) {
					loadKeyArr.push({ url: resKey[ i ] + "." + fgui.UIConfig.packageFileExtension, type: Laya.Loader.BUFFER });
					keys.push(resKey[ i ]);
				}
			}
			else {
				loadKeyArr = [ { url: resKey + "." + fgui.UIConfig.packageFileExtension, type: Laya.Loader.BUFFER } ];
				keys = [ resKey ];
			}
			let pkgArr = [];
			let pkg;
			for (i = 0; i < loadKeyArr.length; i++) {
				pkg = UIPackage._instById[ keys[ i ] ];
				if (pkg) {
					pkgArr.push(pkg);
					loadKeyArr.splice(i, 1);
					keys.splice(i, 1);
					i--;
				}
			}
			if (loadKeyArr.length == 0) {
				completeHandler.runWith([ pkgArr ]);
				return;
			}
			var descCompleteHandler = Laya.Handler.create(this, function () {
				let pkg;
				let urls = [];
				for (i = 0; i < loadKeyArr.length; i++) {
					let asset = fgui.AssetProxy.inst.getRes(loadKeyArr[ i ].url);
					if (asset) {
						pkg = new UIPackage();
						pkgArr.push(pkg);
						pkg._resKey = keys[ i ];
						pkg.loadPackage(new fgui.ByteBuffer(asset));
						let cnt = pkg._items.length;
						for (let j = 0; j < cnt; j++) {
							let pi = pkg._items[ j ];
							if (pi.type == fgui.PackageItemType.Atlas) {
								urls.push({ url: pi.file, type: Laya.Loader.IMAGE });
							}
							else if (pi.type == fgui.PackageItemType.Sound) {
								urls.push({ url: pi.file, type: Laya.Loader.SOUND });
							}
						}
					}
				}
				if (urls.length > 0) {
					fgui.AssetProxy.inst.load(urls, Laya.Handler.create(this, function () {
						for (i = 0; i < pkgArr.length; i++) {
							pkg = pkgArr[ i ];
							if (!UIPackage._instById[ pkg.id ]) {
								UIPackage._instById[ pkg.id ] = pkg;
								UIPackage._instByName[ pkg.name ] = pkg;
								// UIPackage._instByName[pkg._resKey] = pkg;
								UIPackage._instById[ pkg._resKey ] = pkg;
							}
						}
						completeHandler.runWith([ pkgArr ]);
					}, null, true), progressHandler);
				}
				else {
					for (i = 0; i < pkgArr.length; i++) {
						pkg = pkgArr[ i ];
						if (!UIPackage._instById[ pkg.id ]) {
							UIPackage._instById[ pkg.id ] = pkg;
							UIPackage._instByName[ pkg.name ] = pkg;
							// UIPackage._instByName[pkg._resKey] = pkg;
							UIPackage._instById[ pkg._resKey ] = pkg;
						}
					}
					completeHandler.runWith([ pkgArr ]);
				}
			}, null, true);
			fgui.AssetProxy.inst.load(loadKeyArr, descCompleteHandler, null, Laya.Loader.BUFFER);
		}
	}
}