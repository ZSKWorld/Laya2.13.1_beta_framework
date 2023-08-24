import { Layer, layerMgr } from "../core/LayerManager";
import { uiMgr } from "../core/UIManager";
import { ViewID } from "../core/ViewID";
import { UIPoolKey } from "./UIPoolKey";

/** 文本提示管理器 */
class TipManager {
    private readonly showDelay = 200;
    private _cache: string[];
    private _curTime = this.showDelay;

    /**
     * 显示文本提示
     * @param text 显示文本
     * @param color 文本颜色，默认："#ffffff"
     */
    showTip(text: string, color?: string) {
        if (!this._cache) {
            this._cache = [];
            Laya.timer.frameLoop(1, this, this.update);
        }
        this._cache.push(text, color);
    }

    private update() {
        this._curTime += Laya.timer.delta;
        if (this._cache.length && this._curTime >= this.showDelay) {
            this._curTime = 0;
            const viewCtrl = <IViewCtrl>Laya.Pool.getItemByCreateFun(UIPoolKey.TipInfo, () => {
                const viewCtrl = uiMgr.createView(ViewID.ComTipInfoView);
                viewCtrl.view.touchable = false;
                return viewCtrl;
            });
            viewCtrl.data = { text: this._cache.shift(), color: this._cache.shift() };
            layerMgr.addObject(viewCtrl.view, Layer.Bottom);
        }
    }
}
export const tipMgr = new TipManager();
windowImmit("tipMgr", tipMgr);
