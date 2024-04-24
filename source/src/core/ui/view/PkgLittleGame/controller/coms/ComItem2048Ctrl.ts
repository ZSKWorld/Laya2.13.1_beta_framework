import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComItem2048View } from "../../view/coms/ComItem2048View";

export interface ComItem2048Data {

}

export class ComItem2048Ctrl extends BaseViewCtrl<ComItem2048View, ComItem2048Data> {
    private _row: number = -1;
    private _col: number = -1;
    private _value: number = 0;
    get row() { return this._row; }
    get col() { return this._col; }
    get value() { return this._value; }
    set value(v) {
        if (v == this._value) return;
        this._value = v;
        this.view.refreshValue(v);
    }

    override onEnable() {
        this.view.setScale(0, 0);
        Laya.Tween.to(this.view, { scaleX: 1, scaleY: 1 }, 200, Laya.Ease.backOut, null, 0, true);
    }

    setPos(row: number, col: number) {
        this._row = row;
        this._col = col;
    }
}