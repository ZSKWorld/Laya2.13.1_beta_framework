import ComItem2048 from "../../../../ui/PkgLittleGame/ComItem2048";

export const enum ComItem2048Msg {

}

export class ComItem2048View extends ExtensionClass<IView, ComItem2048>(ComItem2048) {
    static readonly pkgRes = ResPath.PkgPath.PkgLittleGame;

    refreshValue(value: number) {
        this.txt_num.text = value.toString();
    }

}
