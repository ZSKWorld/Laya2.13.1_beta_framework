import UIBattleConfirm from "../../../ui/PkgBattle/UIBattleConfirm";

export const enum UIBattleConfirmMsg {

}

export class UIBattleConfirmView extends ExtensionClass<IView, UIBattleConfirm>(UIBattleConfirm) {
    static readonly pkgRes = ResPath.PkgPath.PkgBattle;

    override onCreate() {
        const { graph_bg } = this;
        graph_bg.onClick(this, this.removeSelf);
    }

}
