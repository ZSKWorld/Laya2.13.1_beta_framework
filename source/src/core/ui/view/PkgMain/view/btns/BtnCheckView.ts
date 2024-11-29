import BtnCheck from "../../../../ui/PkgMain/BtnCheck";

export const enum BtnCheckMsg {

}

export class BtnCheckView extends ExtensionClass<IView, BtnCheck>(BtnCheck) {
    static readonly pkgRes = ResPath.PkgPath.PkgMain;

}
