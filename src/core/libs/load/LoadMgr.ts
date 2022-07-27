class LoadMgr {
	load(url: string | (string | Laya.loadItem)[], complete?: Laya.Handler | null, progress?: Laya.Handler | null, type?: string | null,
		priority?: number, cache?: boolean, group?: string | null, ignoreCache?: boolean, useWorkerLoader?: boolean) {
		return new Promise((resolve, reject) => {
			if (!url || (Array.isArray(url) && url.length == 0))
				resolve(null);
			else
				Laya.loader.load(url, Laya.Handler.create(this, this.checkLoaded, [ complete, resolve, reject, url ]),
					progress, type, priority, cache, group, ignoreCache, useWorkerLoader);
		});
	}

	create(url: string | (string | Laya.createItem)[], complete?: Laya.Handler | null, progress?: Laya.Handler | null, type?: string | null,
		constructParams?: any[] | null, propertyParams?: any, priority?: number, cache?: boolean) {
		return new Promise((resolve, reject) => {
			if (!url || (Array.isArray(url) && url.length == 0))
				resolve(null);
			else
				Laya.loader.create(url, Laya.Handler.create(this, this.checkLoaded, [ complete, resolve, reject, url ]),
					progress, type, constructParams, propertyParams, priority, cache);
		});
	}

	loadPackage(resKey: string | string[], completeHandler?: Laya.Handler, progressHandler?: Laya.Handler) {
		return new Promise((resolve, reject) => {
			if (!resKey || (Array.isArray(resKey) && resKey.length == 0))
				resolve(null);
			else
				return fgui.UIPackage.loadPackage(resKey,
					Laya.Handler.create(this, this.checkLoaded, [ completeHandler, resolve, reject, resKey ]), progressHandler);
		});
	}

	private checkLoaded(complete: Laya.Handler, resolve: Function, reject: Function, url: string | string[], data: any) {
		let loaded = data ? (Array.isArray(data) ? data.length > 0 : true) : false;
		if (loaded) {
			complete && complete.runWith(data);
			resolve && resolve(data);
		} else {
			reject && reject(`${ String(url) }加载失败`);
		}
	}
}

export const loadMgr = new LoadMgr();