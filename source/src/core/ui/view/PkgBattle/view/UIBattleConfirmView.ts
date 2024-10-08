import UIBattleConfirm from "../../../ui/PkgBattle/UIBattleConfirm";

export const enum UIBattleConfirmMsg {

}

export class UIBattleConfirmView extends ExtensionClass<IView, UIBattleConfirm>(UIBattleConfirm) {
    static readonly PkgRes = ResPath.PkgPath.PkgBattle;

    override onCreate() {
        const { graph_bg } = this;
        graph_bg.onClick(this, this.removeSelf);
    }

}
