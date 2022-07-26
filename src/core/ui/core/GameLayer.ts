export enum Layer {
    BottomUI = "BottomUI",
    MiddleUI = "MiddleUI",
    TopUI = "TopUI",
    Dialog = "Dialog",
    Lock = "Lock",
    Alert = "Alert",
}
class GameLayer {
    private _layerMap: { [key in Layer]: fgui.GComponent };

    init() {
        if (this._layerMap) return;
        this._layerMap = {} as any;
        const gRoot = fgui.GRoot.inst;
        Laya.stage.addChild(gRoot.displayObject);

        for (const key in Layer) {
            if (Object.prototype.hasOwnProperty.call(Layer, key)) {
                const layer = new fgui.GComponent();
                layer.name = Layer[key];
                gRoot.addChild(layer);
                this._layerMap[layer.name] = layer;
                layer.displayObject.mouseThrough = true;
                layer.displayObject.mouseEnabled = true;
                layer.setSize(Laya.stage.width, Laya.stage.height);
            }
        }
    }

    addObject(obj: fgui.GObject, layer: Layer) {
        if (!obj || obj.isDisposed || !this._layerMap[layer]) return;
        this._layerMap[layer].addChild(obj);
    }

}
export const layerMgr = new GameLayer();
