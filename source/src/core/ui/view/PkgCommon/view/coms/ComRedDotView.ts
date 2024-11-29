import ComRedDot from "../../../../ui/PkgCommon/ComRedDot";

export const enum ComRedDotMsg {

}

export class ComRedDotView extends ExtensionClass<IView, ComRedDot>(ComRedDot) {
    static readonly pkgRes = ResPath.PkgPath.PkgCommon;

}
