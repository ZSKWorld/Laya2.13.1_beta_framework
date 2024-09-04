import { layerMgr } from "../core/LayerManager";
import { uiMgr } from "../core/UIManager";
import { UIPoolKey } from "./UIPoolKey";

/** 文本提示管理器 */
class TipManager {
    private _cache: string[] = [];
    private _inCD: boolean = false;

    /**
     * 显示文本提示
     * @param text 显示文本
     * @param color 文本颜色，默认："#ffffff"
     */
    showTip(text: string, color?: string) {
        if (this._cache.includes(text)) return;
        this._cache.push(text, color);
        if (!this._inCD) this.showNext()
    }

    private showNext() {
        this._inCD = false;
        if (!this._cache.length) return;
        this._inCD = true;
        const viewCtrl = <IViewCtrl>Laya.Pool.getItemByCreateFun(UIPoolKey.TipInfo, () => {
            const viewCtrl = uiMgr.createView(ViewID.ComTipInfoView);
            viewCtrl.view.touchable = false;
            return viewCtrl;
        });
        viewCtrl.data = { text: this._cache.shift(), color: this._cache.shift() };
        layerMgr.addObject(viewCtrl.view, Layer.UITop);
        Laya.timer.once(250, this, this.showNext);
    }
}
export const tipMgr = new TipManager();
windowImmit("tipMgr", tipMgr);