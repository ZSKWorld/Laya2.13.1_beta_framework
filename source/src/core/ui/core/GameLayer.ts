/** UI层级 */
export enum Layer {
    Game = "Game",
    Bottom = "Bottom",
    Middle = "Middle",
    Top = "Top",
    Dialog = "Dialog",
    Alert = "Alert",
    Lock = "Lock",
}

/** UI层级管理 */
class LayerManager {
    private _layerMap: { [ key in Layer ]: fgui.GComponent };

    init() {
        if (this._layerMap) return;
        this._layerMap = {} as any;
        const gRoot = fgui.GRoot.inst;
        Laya.stage.addChild(gRoot.displayObject);

        for (const key in Layer) {
            if (Object.prototype.hasOwnProperty.call(Layer, key)) {
                const layer = new fgui.GComponent();
                layer.name = Layer[ key ];
                gRoot.addChild(layer);
                this._layerMap[ layer.name ] = layer;
                layer.displayObject.mouseThrough = true;
                layer.displayObject.mouseEnabled = true;
                layer.makeFullScreen();
            }
        }
    }

    /**
     * 添加对象
     * @param obj {@link fgui.GObject} 要添加的对象
     * @param layer {@link Layer} 目标层级
     * @param index 插入位置
     * @returns 
     */
    addObject(obj: fgui.GObject, layer: Layer, index?: number) {
        if (!obj || obj.isDisposed || !this._layerMap[ layer ]) return;
        index = index ?? this._layerMap[ layer ].numChildren;
        this._layerMap[ layer ].addChild(obj);
    }

    /**
     * 添加Laya.Sprite对象
     * @param obj {@link Laya.Sprite} 要添加的Laya.Sprite对象
     * @param layer {@link Layer} 目标层级
     * @param index 插入位置
     * @returns 
     */
    addLayaObject(obj: Laya.Sprite, layer: Layer, index?: number) {
        if (!obj || obj.destroyed || !this._layerMap[ layer ]) return;
        index = index ?? this._layerMap[ layer ].numChildren;
        this._layerMap[ layer ].displayObject.addChildAt(obj, index);
    }

}
export const layerMgr = new LayerManager();
