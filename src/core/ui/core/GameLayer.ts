export enum Layer {
    Bottom = "Bottom",
    Middle = "Middle",
    Top = "Top",
    Dialog = "Dialog",
    Alert = "Alert",
    Lock = "Lock",
}
class LayerManager {
    private layerMap: { [ key in Layer ]: fgui.GComponent };

    init() {
        if (this.layerMap) return;
        this.layerMap = {} as any;
        const gRoot = fgui.GRoot.inst;
        Laya.stage.addChild(gRoot.displayObject);

        for (const key in Layer) {
            if (Object.prototype.hasOwnProperty.call(Layer, key)) {
                const layer = new fgui.GComponent();
                layer.name = Layer[ key ];
                gRoot.addChild(layer);
                this.layerMap[ layer.name ] = layer;
                layer.displayObject.mouseThrough = true;
                layer.displayObject.mouseEnabled = true;
                layer.setSize(Laya.stage.width, Laya.stage.height);
            }
        }
    }

    addObject(obj: fgui.GObject, layer: Layer) {
        if (!obj || obj.isDisposed || !this.layerMap[ layer ]) return;
        this.layerMap[ layer ].addChild(obj);
    }

}
export const layerMgr = new LayerManager();
