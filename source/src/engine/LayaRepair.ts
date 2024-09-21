/** Laya修复 */
export class LayaRepair {
    static Fix() {
        this.FixLayaPoolSign();
        this.FixTTFLoaderCallback();
        this.FixSkeletonLoadEvent();
    }

    /** 修复Laya.Pool._getClassSign方法，原方法会导致子类和父类回收到一个对象池中 */
    private static FixLayaPoolSign() {
        const pool = Laya.Pool;
        pool["_getClassSign"] = function (cla: any) {
            var className = cla["__className"] || (Object.prototype.hasOwnProperty.call(cla, "_$gid") ? cla["_$gid"] : null);
            if (!className) {
                cla["_$gid"] = className = Laya.Pool["_CLSID"] + "";
                Laya.Pool["_CLSID"]++;
            }
            return className;
        }

        // var className = cla["__className"] || cla["_$gid"];
        // if (!className) {
        //     cla["_$gid"] = className = Pool._CLSID + "";
        //     Pool._CLSID++;
        // }
        // return className;
    }

    /** 修复ttf字体浏览器下加载失败不触发加载失败回调的bug */
    private static FixTTFLoaderCallback() {
        const ttfProto = Laya.TTFLoader.prototype;
        ttfProto["_loadWithFontFace"] = function () {
            var fontFace = new window.FontFace(this.fontName, "url('" + this._url + "')");
            document.fonts["add"](fontFace);
            var self = this;
            fontFace.loaded.then((function () {
                self._complete();
            }), function () { self._onErr(); });
            fontFace.load();
        }

        const loaderProto = Laya.Loader.prototype;
        loaderProto["_loadTTF"] = function (url) {
            url = Laya.URL.formatURL(url);
            var ttfLoader = new Laya.TTFLoader();
            ttfLoader.complete = Laya.Handler.create(this, this.onLoaded);
            ttfLoader.err = Laya.Handler.create(this, this.onError);
            ttfLoader.load(url);
        }
    }

    private static FixSkeletonLoadEvent() {
        const prototype = Laya.Skeleton.prototype;
        const _onLoaded = prototype["_onLoaded"];
        prototype["_onLoaded"] = function () {
            var arraybuffer = Laya.Loader.getRes(this._aniPath);
            if (arraybuffer == null) {
                this._parseFail();
                return;
            }
            _onLoaded.call(this);
        };

        prototype["_parseComplete"] = function () {
            var tTemple = Laya.Templet["TEMPLET_DICTIONARY"][this._aniPath];
            if (tTemple) {
                this.init(tTemple, this._loadAniMode);
                this.play(0, true);
            }
            this._complete && this._complete.runWith(this);
            this.event(Laya.Event.COMPLETE);
        }
        prototype["_parseFail"] = function () {
            console.log("[Error]:" + this._aniPath + "解析失败");
            this.event(Laya.Event.ERROR);
        }

    }
}