export class SkeletonMgr implements ISkeletonMgr{
    /** 动画模板 */
    private _templetMap = new Map<string, Laya.Templet>();
    /** 动画对象池 */
    private _skeletonPool = new Map<string, Laya.Skeleton[]>();

    loadSkeleton(urls: string[], progress?: Laya.Handler) {
        return new Promise<void>((resolve, reject) => {
            if (!urls || urls.length == 0) {
                if (progress) progress.runWith(1);
                return resolve();
            }
            const loadCnt = urls.length;
            let loadedCnt = 0;
            let success = true;
            function loadComplete(loadStat: boolean) {
                loadedCnt++;
                if (!loadStat) success = false;
                if (progress) progress.runWith(loadedCnt / loadCnt);
                if (loadedCnt == loadCnt)
                    success ? resolve() : reject();
            }
            urls.forEach(url => {
                let templet = this._templetMap.get(url);
                if (!templet) {
                    if (Laya.Templet["TEMPLET_DICTIONARY"] && Laya.Templet["TEMPLET_DICTIONARY"][url]) {
                        templet = Laya.Templet["TEMPLET_DICTIONARY"][url];
                        this._templetMap.set(url, templet);
                    }
                }
                if (templet) {
                    if (templet.isParseFail) loadComplete(false);
                    else if (templet.isParserComplete) loadComplete(true);
                    else {
                        templet.once(Laya.Event.COMPLETE, this, () => {
                            templet.offAll(Laya.Event.ERROR);
                            loadComplete(true);
                        });
                        templet.once(Laya.Event.ERROR, this, () => {
                            this._templetMap.delete(url);
                            !templet.destroyed && templet.destroy();
                            loadComplete(false);
                        });
                    }
                } else {
                    const skeleton = new Laya.Skeleton();
                    skeleton.load(url);
                    skeleton.once(Laya.Event.COMPLETE, this, () => {
                        skeleton.offAll(Laya.Event.ERROR);
                        this._templetMap.set(url, skeleton.templet);
                        this.recoverSkeleton(skeleton);
                        loadComplete(true);
                    });
                    skeleton.once(Laya.Event.ERROR, this, () => {
                        !skeleton.destroyed && skeleton.destroy();
                        loadComplete(false);
                    });
                }
            });
        });

    }

    createSkeleton(url: string, enableSkin: boolean = false) {
        const skeletonPool = this._skeletonPool.get(url);
        if (skeletonPool && skeletonPool.length)
            return skeletonPool.pop();
        else {
            const templet = this._templetMap.get(url);
            if (templet) {
                return templet.buildArmature(+!!enableSkin);
            }
        }
        return null;
    }

    recoverSkeleton(skeleton: Laya.Skeleton) {
        if (!skeleton) return;
        const url = skeleton.templet.skBufferUrl;
        const poolArr = this._skeletonPool.get(url);
        if (poolArr && poolArr.includes(skeleton)) return;
        skeleton.removeSelf();
        if (poolArr) poolArr.push(skeleton);
        else this._skeletonPool.set(url, [skeleton]);
    }

    clearSkeletons(url: string) {
        const poolArr = this._skeletonPool.get(url);
        if (!poolArr) return;
        poolArr.forEach(v => v.destroy());
        poolArr.length = 0;
    }

    disposeSkeleton(url: string) {
        this.clearSkeletons(url);
        const templet = this._templetMap.get(url);
        if (!templet) return;
        templet.destroy();
        this._templetMap.delete(url);
    }
}