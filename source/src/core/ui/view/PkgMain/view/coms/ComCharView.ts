import ComChar from "../../../../ui/PkgMain/ComChar";

export const enum ComCharMsg {

}

export class ComCharView extends ExtensionClass<IView, ComChar>(ComChar) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
        
    }

}
