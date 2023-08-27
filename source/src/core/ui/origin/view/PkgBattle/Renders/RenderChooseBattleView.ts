import { ResPath } from "../../../../common/ResPath";
import { MathUtil } from "../../../../libs/math/MathUtil";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import RenderChooseBattle from "../../../ui/PkgBattle/RenderChooseBattle";

export const enum RenderChooseBattleMsg {
    OnBtnBreakClick = "RenderChooseBattle_OnBtnBreakClick",
    OnSecondUpdate = "RenderChooseBattle_OnSecondUpdate",
}

export class RenderChooseBattleView extends ExtensionClass<ViewExtension, RenderChooseBattle>(RenderChooseBattle) {
    static readonly PkgRes = ResPath.PkgPath.PkgBattle;


    private _bossData: ConfigBossData;

    override onCreate(): void {
        this.addMessage(RenderChooseBattleMsg.OnSecondUpdate, this.onSecondUpdate);
        const { BtnBreak } = this;
        BtnBreak.onClick(this, this.sendMessage, [ RenderChooseBattleMsg.OnBtnBreakClick ]);
    }

    refreshGuanQia(data: ConfigLevelData) {
        this.ctrlState.selectedIndex = 0;
        this.TxtContent1.text = data.Name;
        this.TxtContent3.text = "怪物等级：" + data.EnemyLevel;
    }

    refreshFuBen(data: ConfigFuBenData) {
        this.ctrlState.selectedIndex = 1;
        this.TxtContent1.text = "Lv." + data.EnemyLevel + " " + data.Name;
        this.TxtContent3.text = `剩余次数：${ this.userData.getCopyTime(data.ID) }`;
    }

    refreshMiJing(data: ConfigMiJingData) {
        this.ctrlState.selectedIndex = 2;
        this.TxtContent1.text = "Lv." + data.EnemyLevel + " " + data.Name;
        this.TxtContent3.text = `剩余次数：${ this.userData.getSecretTime(data.ID) }`;
    }

    refreshBoss(data: ConfigBossData) {
        this._bossData = data;
        this.ctrlState.selectedIndex = 3;
        this.TxtContent1.text = "Lv." + data.EnemyLevel + " " + data.Name;
        this.refreshBossCool();
    }

    private refreshBossCool() {
        if (!this._bossData) return;
        const coolTime = this.userData.getBossCoolDown(this._bossData.ID);
        this.TxtContent3.text = coolTime <= 0 ? "" : MathUtil.TimeFormat(coolTime);
        coolTime <= 0 && (this._bossData = null);
        this.touchable = coolTime <= 0;
        this.grayed = coolTime > 0;
    }

    refreshCaiJi(data: ConfigCaiJiData) {
        this.ctrlState.selectedIndex = 4;
        this.TxtContent2.text = data.Name;
        this.BtnBreak.visible = false;
    }

    private onSecondUpdate() {
        this.refreshBossCool();
    }

}
