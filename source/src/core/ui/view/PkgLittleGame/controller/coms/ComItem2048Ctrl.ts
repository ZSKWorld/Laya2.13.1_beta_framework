import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { ComItem2048View } from "../../view/coms/ComItem2048View";

export interface ComItem2048Data {

}

export class ComItem2048Ctrl extends BaseViewCtrl<ComItem2048View, ComItem2048Data> {
    private _value: number = 0;
    get value() { return this._value; }
    set value(v) {
        if (v == this._value) return;
        this._value = v;
        this.view.refreshValue(v);
    }

    override onAdded() {

    }


}