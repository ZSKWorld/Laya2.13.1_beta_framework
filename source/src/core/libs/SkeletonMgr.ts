import { ResPath } from "../common/ResPath";

class SkeletonMgr {
    /** 动画模板 */
    private _templetMap = new Map<string, Laya.Templet>();
    /** 动画对象池 */
    private _skeletonPool = new Map<string, Laya.Skeleton[]>();

    /**
     * 加载骨骼动画模板
     * @param urls 动画路径 {@link ResPath.SkeletonPath}[]
     */
    loadSkeleton(urls: string[], progress?: Laya.Handler) {
        return new Promise<boolean>(resolve => {
            if (!urls || urls.length == 0) {
                if (progress) progress.runWith(1);
                return resolve(true);
            }
            const loadCnt = urls.length;
            let loadedCnt = 0;
            let success = true;
            function loadComplete(loadStat: boolean) {
                loadedCnt++;
                if (!loadStat) success = false;
                if (progress) progress.runWith(loadedCnt / loadCnt);
                if (loadedCnt == loadCnt)
                    resolve(success);
            }
            urls.forEach(url => {
                let templet = this._templetMap.get(url);
                if (!templet || !templet.isParserComplete) {
                    if (!templet) {
                        templet = new Laya.Templet();
                        templet.loadAni(url);
                        this._templetMap.set(url, templet);
                    }
                    templet.once(Laya.Event.COMPLETE, null, () => {
                        templet.offAll(Laya.Event.ERROR);
                        loadComplete(true);
                    });
                    templet.once(Laya.Event.ERROR, null, () => {
                        templet.offAll(Laya.Event.COMPLETE);
                        loadComplete(false);
                    });
                } else loadComplete(true);
            });
        });

    }

    /**
     * 获取一个骨骼动画
     * @param url 动画路径 {@link ResPath.SkeletonPath}
     * @param enableSkin 是否开启换装
     * @returns
     */
    getSkeleton(url: string, enableSkin: boolean = false) {
        let skeleton: Laya.Skeleton;
        const skeletonPool = this._skeletonPool.get(url);
        if (skeletonPool && skeletonPool.length)
            skeleton = skeletonPool.pop();
        else {
            const templet = this._templetMap.get(url);
            if (templet) {
                skeleton = templet.buildArmature(+!!enableSkin);
                //新skeletion首次添加到舞台上不会显示，播放一下才会显示
                skeleton.play(0, false);
                skeleton.stop();
            }
        }
        return skeleton;
    }

    /**
     * 回收骨骼动画到对象池
     */
    recoverSkeleton(skeleton: Laya.Skeleton) {
        if (!skeleton) return;
        const url = skeleton.url;
        //如果已经回收了就返回
        let poolArr = this._skeletonPool.get(url);
        if (poolArr && poolArr.includes(skeleton)) return;
        skeleton.removeSelf();
        if (!poolArr) {
            poolArr = [ skeleton ];
            this._skeletonPool.set(url, poolArr);
        } else poolArr.push(skeleton);
    }

    /**
     * 清除动画对象池
     * @param url
     */
    clearSkeletons(url: string) {
        const poolArr = this._skeletonPool.get(url);
        if (poolArr) {
            if (poolArr) {
                poolArr.forEach(v => v.destroy());
                poolArr.length = 0;
            }
        }
    }

    /**
     * 释放动画资源
     */
    disposeSkeleton(url: string) {
        const templet = this._templetMap.get(url);
        if (templet) {
            templet.destroy();
            this._templetMap.delete(url);
        }
        this.clearSkeletons(url);
    }
}
export const skeletonMgr = new SkeletonMgr();
windowImmit("skeletonMgr", skeletonMgr);