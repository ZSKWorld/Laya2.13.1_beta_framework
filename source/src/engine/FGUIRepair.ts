/** FGUI修复 */
export class FGUIRepair {
	static repair() {
		this.ubbTagI();
		this.playTransitionAction();
		this.fixGUIInputSingleLine();
		this.fixGUILoadPackgeProgressError();
		this.fixGUIRichTextAlignError();
	}

	/**修复GUI粗体不生效 */
	private static ubbTagI() {
		const inst = fgui.UBBParser.inst as any;
		inst._handlers["i"] = function onTag_I(tagName, end, attr) {
			return end ? ("</span>") : ("<span style='italic:true'>");
		}
		inst._handlers["u"] = function onTag_U(tagName, end, attr) {
			if (!end) return "<a href=\" \">";
			else return "</a>";
		}
	}

	/** 修改控制器动效播放机制为每次都从头播放 */
	private static playTransitionAction() {
		const prototype = fgui.PlayTransitionAction.prototype;
		prototype["enter"] = function (controller: fgui.Controller) {
			if (!this._currentTransition) {
				this._currentTransition = controller.parent.getTransition(this.transitionName);
			}
			this._currentTransition.play(null, this.playTimes, this.delay);
		}
	}

	/** 修复gui 输入框自动换行 */
	private static fixGUIInputSingleLine() {
		const prototype = fgui.GTextInput.prototype;
		Object.defineProperty(prototype, "singleLine", {
			get() {
				return !this._input.multiline;
			},
			set(v) {
				this._input.multiline = !v;
				this._input.wordWrap = !v;
			}
		});
	}

	/** 修复gui加载错误不触发失败回调的bug */
	private static fixGUILoadPackgeProgressError() {
		const UIPackage: any = fgui.UIPackage;
		UIPackage.loadPackage = function (resKey, completeHandler, progressHandler) {
			let loadKeyArr = [];
			let keys = [];
			let i;
			if (Array.isArray(resKey)) {
				for (i = 0; i < resKey.length; i++) {
					loadKeyArr.push({ url: resKey[i] + "." + fgui.UIConfig.packageFileExtension, type: Laya.Loader.BUFFER });
					keys.push(resKey[i]);
				}
			}
			else {
				loadKeyArr = [{ url: resKey + "." + fgui.UIConfig.packageFileExtension, type: Laya.Loader.BUFFER }];
				keys = [resKey];
			}
			let pkgArr = [];
			let pkg;
			for (i = 0; i < loadKeyArr.length; i++) {
				pkg = UIPackage._instById[keys[i]];
				if (pkg) {
					pkgArr.push(pkg);
					loadKeyArr.splice(i, 1);
					keys.splice(i, 1);
					i--;
				}
			}
			if (loadKeyArr.length == 0) {
				progressHandler && progressHandler.runWith(1);
				completeHandler.runWith([pkgArr]);
				return;
			}
			var descCompleteHandler = Laya.Handler.create(this, function () {
				let pkg;
				let urls = [];
				for (i = 0; i < loadKeyArr.length; i++) {
					let asset = fgui.AssetProxy.inst.getRes(loadKeyArr[i].url);
					if (asset) {
						pkg = new UIPackage();
						pkgArr.push(pkg);
						pkg._resKey = keys[i];
						pkg.loadPackage(new fgui.ByteBuffer(asset));
						let cnt = pkg._items.length;
						for (let j = 0; j < cnt; j++) {
							let pi = pkg._items[j];
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
							pkg = pkgArr[i];
							if (!UIPackage._instById[pkg.id]) {
								UIPackage._instById[pkg.id] = pkg;
								UIPackage._instByName[pkg.name] = pkg;
								UIPackage._instById[pkg._resKey] = pkg;
							}
						}
						completeHandler.runWith([pkgArr]);
					}, null, true), progressHandler);
				}
				else {
					for (i = 0; i < pkgArr.length; i++) {
						pkg = pkgArr[i];
						if (!UIPackage._instById[pkg.id]) {
							UIPackage._instById[pkg.id] = pkg;
							UIPackage._instByName[pkg.name] = pkg;
							UIPackage._instById[pkg._resKey] = pkg;
						}
					}
					progressHandler && progressHandler.runWith(1);
					completeHandler.runWith([pkgArr]);
				}
			}, null, true);
			fgui.AssetProxy.inst.load(loadKeyArr, descCompleteHandler, null, Laya.Loader.BUFFER);
		}
	}

	private static fixGUIRichTextAlignError() {
		const prototype = fgui.GRichTextField.prototype;
		prototype["correctDivXY"] = function () {
			if (!this._div) return;
			if (!this.parent) return;
			if (this.align != "center") return;
			if (this.__originDivX == null) this.__originDivX = this._div.x;
			var x = Math.max((this.parent._width - this._div.width) / 2, this.__originDivX);
			this._div.x = x;
		};
		Object.defineProperty(prototype, "text", {
			set(value) {
				this._text = value;
				var text2 = this._text;
				if (this._templateVars)
					text2 = this.parseTemplate(text2);
				try {
					this._div.size(this._width, this._height);
					if (this._ubbEnabled)
						this._div.innerHTML = fgui.UBBParser.inst.parse(text2);
					else
						this._div.innerHTML = text2;
					if (this._widthAutoSize || this._heightAutoSize) {
						var w, h = 0;
						if (this._widthAutoSize) {
							w = this._div.contextWidth;
							if (w > 0)
								w += 8;
						}
						else
							w = this._width;
						if (this._heightAutoSize)
							h = this._div.contextHeight;
						else
							h = this._height;
						this._updatingSize = true;
						this.setSize(w, h);
						this._updatingSize = false;
					}
					if (!this._widthAutoSize && this._heightAutoSize) {
						Laya.timer.callLater(this, this.correctDivXY);
					}
				}
				catch (err) {
					Logger.log("laya reports html error:" + err);
				}
			},
		})
	}
}