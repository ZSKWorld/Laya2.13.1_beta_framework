import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { uiMgr } from "../../../../core/UIManager";
import { ComItem2048View } from "../../view/coms/ComItem2048View";

export interface ComItem2048Data {
    
}

export class ComItem2048Ctrl extends BaseViewCtrl<ComItem2048View, ComItem2048Data> {
    private _row: number = -1;
    private _col: number = -1;
    private _value: number = 0;
    private _mergeValue: number = 0;
    get row() { return this._row; }
    get col() { return this._col; }
    get value() { return this._value; }
    set value(v) {
        if (v == this._value) return;
        this._value = v;
        this.view.refreshValue(v);
    }
    get mergeValue() { return this._mergeValue; }
    static count = 0;
    static get(value: number, row: number, col: number) {
        const item: ComItem2048Ctrl = Laya.Pool.getItemByCreateFun("ComItem2048Ctrl", () => {
            const result = uiMgr.createView(ViewID.ComItem2048View);
            result.view.setPivot(0.5, 0.5, true);
            return result;
        });
        item.value = value;
        item._mergeValue = 0;
        item.setPos(row, col);
        return item;
    }

    static recover(item: ComItem2048Ctrl) {
        if (!item) return;
        item.value = 0;
        item._mergeValue = 0;
        item.setPos(-1, -1);
        item.view.removeFromParent();
        Laya.Tween.clearAll(item.view);
        Laya.Pool.recover("ComItem2048Ctrl", item);
    }

    override onEnable() {
        this.view.setScale(0, 0);
        Laya.Tween.to(this.view, { scaleX: 1, scaleY: 1 }, 80, Laya.Ease.backOut, null, 0, true);
    }

    setPos(row: number, col: number) {
        this._row = row;
        this._col = col;
    }

    moveTarget(x: number, y: number, mergeValue: number) {
        this._mergeValue = mergeValue;
        Laya.Tween.to(this.view, { x, y }, 100, Laya.Ease.circOut, Laya.Handler.create(this, this.onMoveCompleted), 0, true);
    }

    private onMoveCompleted() {
        const mergeValue = this._mergeValue;
        if (mergeValue == 0) return;
        if (mergeValue > 0) {
            this.value = mergeValue;
            this._mergeValue = 0;
        } else {
            ComItem2048Ctrl.recover(this);
        }
    }
}