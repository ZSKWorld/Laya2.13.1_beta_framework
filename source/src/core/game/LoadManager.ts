/** 资源加载管理 */
export class LoadManager implements ILoadManager {
	load<T extends string | string[] | Laya.loadItem[]>(
		url: T,
		complete?: Laya.Handler,
		progress?: Laya.Handler,
		type?: string,
		priority?: number,
		cache?: boolean,
		group?: string,
		ignoreCache?: boolean,
		useWorkerLoader?: boolean
	) {
		return new Promise<any>(resolve => {
			const isArr = Array.isArray(url);
			if ((isArr && url.length <= 0) || (!isArr && !url)) {
				progress && progress.runWith(1);
				this.checkLoaded(complete, resolve, url, false, isArr ? true : Laya.loader.getRes(url));
			}
			else
				Laya.loader.load(url, Laya.Handler.create(this, this.checkLoaded, [complete, resolve, url, false]),
					progress, type, priority, cache, group, ignoreCache, useWorkerLoader);
		});
	}

	create<T extends string | string[] | Laya.createItem[]>(
		url: T,
		complete?: Laya.Handler,
		progress?: Laya.Handler,
		type?: string,
		constructParams?: any[],
		propertyParams?: any,
		priority?: number,
		cache?: boolean
	) {
		return new Promise<any>(resolve => {
			const isArr = Array.isArray(url);
			if ((isArr && url.length <= 0) || (!isArr && !url)) {
				progress && progress.runWith(1);
				this.checkLoaded(complete, resolve, url, false, isArr ? true : Laya.loader.getRes(url));
			}
			else
				Laya.loader.create(url, Laya.Handler.create(this, this.checkLoaded, [complete, resolve, url, false]),
					progress, type, constructParams, propertyParams, priority, cache);
		});
	}

	loadPackage(resKey: string | string[], complete?: Laya.Handler, progress?: Laya.Handler) {
		return new Promise<any>(resolve => {
			if (!resKey || (Array.isArray(resKey) && resKey.length == 0)) {
				progress && progress.runWith(1);
				this.checkLoaded(complete, resolve, resKey, true, true);
			}
			else
				fgui.UIPackage.loadPackage(resKey, Laya.Handler.create(this, this.checkLoaded, [complete, resolve, resKey, true]), progress);
		});
	}

	private checkLoaded(complete: Laya.Handler, resolve: Function, url: string | string[] | Laya.loadItem[] | Laya.createItem[], isPkg: boolean, data: any) {
		const loadArr = Array.isArray(url);
		const loadSuccess = loadArr ? (isPkg ? url.length <= 0 || (data && data.length > 0 && data.length == url.length) : !!data) : (isPkg ? data && data.length == 1 : !!data);
		if (loadSuccess) {
			const result = loadArr ? url.map(v => isPkg ? fgui.UIPackage.getById(v) : Laya.loader.getRes(v)) : (isPkg ? fgui.UIPackage.getById(url) : Laya.loader.getRes(url));
			complete && complete.runWith(data);
			resolve && resolve(result);
		}
		else {
			complete && complete.run();
			resolve && resolve(loadArr ? [] : null);
		}
	}
}
WindowImmit("loadMgr", new LoadManager());