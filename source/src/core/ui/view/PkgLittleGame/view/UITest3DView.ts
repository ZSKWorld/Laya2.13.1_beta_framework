import UITest3D from "../../../ui/PkgLittleGame/UITest3D";

export const enum UITest3DMsg {
    OnBtnBackClick = "UITest3D_OnBtnBackClick",
}

export class UITest3DView extends ExtensionClass<IView, UITest3D>(UITest3D) {
    static readonly PkgRes = ResPath.PkgPath.PkgLittleGame;

    override onCreate() {
        const { btn_back } = this;
        btn_back.onClick(this, this.sendMessage, [UITest3DMsg.OnBtnBackClick]);
    }

}
