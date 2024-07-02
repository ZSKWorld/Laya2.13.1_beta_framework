/** 资源加载管理 */
class LoadManager {
	load(
		url: string | (string | Laya.loadItem)[],
		complete?: Laya.Handler | null,
		progress?: Laya.Handler | null,
		type?: string | null,
		priority?: number,
		cache?: boolean,
		group?: string | null,
		ignoreCache?: boolean,
		useWorkerLoader?: boolean
	) {
		return new Promise<any>((resolve, reject) => {
			if (!url || (Array.isArray(url) && url.length == 0)) {
				progress && progress.runWith(1);
				this.checkLoaded(complete, resolve, reject, url, true);
			}
			else
				Laya.loader.load(url, Laya.Handler.create(this, this.checkLoaded, [complete, resolve, reject, url]),
					progress, type, priority, cache, group, ignoreCache, useWorkerLoader);
		});
	}

	create(
		url: string | (string | Laya.createItem)[],
		complete?: Laya.Handler | null,
		progress?: Laya.Handler | null,
		type?: string | null,
		constructParams?: any[] | null,
		propertyParams?: any,
		priority?: number,
		cache?: boolean
	) {
		return new Promise<any>((resolve, reject) => {
			if (!url || (Array.isArray(url) && url.length == 0)) {
				progress && progress.runWith(1);
				this.checkLoaded(complete, resolve, reject, url, true);
			}
			else
				Laya.loader.create(url, Laya.Handler.create(this, this.checkLoaded, [complete, resolve, reject, url]),
					progress, type, constructParams, propertyParams, priority, cache);
		});
	}

	loadPackage(
		resKey: string | string[],
		complete?: Laya.Handler,
		progress?: Laya.Handler
	) {
		return new Promise<any>((resolve, reject) => {
			if (!resKey || (Array.isArray(resKey) && resKey.length == 0)) {
				progress && progress.runWith(1);
				this.checkLoaded(complete, resolve, reject, resKey, true);
			}
			else
				fgui.UIPackage.loadPackage(resKey, Laya.Handler.create(this, this.checkLoaded, [complete, resolve, reject, resKey]), progress);
		});
	}

	private checkLoaded(complete: Laya.Handler, resolve: Function, reject: Function, url: string | (string | Laya.loadItem)[], data: any) {
		let loaded = data ? (Array.isArray(data) ? data.length > 0 : true) : false;
		if (loaded) {
			complete && complete.runWith([data]);
			resolve && resolve(data);
		} else {
			reject && reject(`${ String(url) }加载失败`);
		}
	}
}
export const loadMgr = new LoadManager();