import { ResPath } from "../../../../../common/ResPath";
import { MathUtil } from "../../../../../libs/math/MathUtil";
import { BattleType } from "../../../../../net/enum/BattleEnums";
import RenderChooseBattle from "../../../../ui/PkgBattle/RenderChooseBattle";

export const enum RenderChooseBattleMsg {
    OnBtnBreakClick = "RenderChooseBattle_OnBtnBreakClick",
}

export class RenderChooseBattleView extends ExtensionClass<IView, RenderChooseBattle>(RenderChooseBattle) {
    static readonly PkgRes = ResPath.PkgPath.PkgBattle;

    override onCreate() {
        const { btn_break } = this;
        btn_break.onClick(this, this.sendMessage, [ RenderChooseBattleMsg.OnBtnBreakClick ]);
    }

    refreshByType(type: BattleType, data: BattleLevel) {
        this.ctrlState.selectedIndex = type - 1;
        this.txt_content1.text = data.name;
        switch (type) {
            case BattleType.GuanQia: this.txt_content3.text = "怪物等级：" + data.enemyLevel; break;
            case BattleType.FuBen: this.txt_content3.text = `剩余次数：${ userData.battle.getCopyTime(data.id) }`; break;
            case BattleType.MiJing: this.txt_content3.text = `剩余次数：${ userData.battle.getSecretTime(data.id) }`; break;
            case BattleType.Boss:
                this.refreshBossCool(data as CfgBossData);
                break;
            case BattleType.CaiJi:
                this.txt_content2.text = data.name;
                this.btn_break.visible = false;
                break;
        }
    }

    refreshBossCool(data: CfgBossData) {
        const coolTime = userData.battle.getBossCoolDown(data.id);
        this.txt_content3.text = coolTime <= 0 ? "" : MathUtil.TimeFormat(coolTime);
        this.touchable = coolTime <= 0;
        this.grayed = coolTime > 0;
    }

}
