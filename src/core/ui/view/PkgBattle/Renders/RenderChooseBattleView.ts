import { MathUtil } from "../../../../libs/math/MathUtil";
import { BattleType } from "../../../../playerData/Interface";
import { playerData } from "../../../../playerData/PlayerData";
import RenderChooseBattle from "../../../ui/PkgBattle/RenderChooseBattle";

export class RenderChooseBattleView extends RenderChooseBattle {
    protected onConstruct() {
        super.onConstruct();
        this.on(Laya.Event.REMOVED, this, this.onRemoved);
    }
    private onRemoved() {
        Laya.timer.clearAll(this);
    }
    refreshGuanQia(data: ConfigLevelData) {
        this.ctrlState.selectedIndex = 0;
        this.TxtContent1.text = data.Name;
        this.TxtContent3.text = "怪物等级：" + data.EnemyLevel;
    }
    refreshFuBen(data: ConfigFuBenData) {
        this.ctrlState.selectedIndex = 1;
        this.TxtContent1.text = "Lv." + data.EnemyLevel + " " + data.Name;
        this.TxtContent3.text = `剩余次数：${playerData.base.getLeftCount(BattleType.FuBen,data.ID)}`;
    }
    refreshMiJing(data: ConfigMiJingData) {
        this.ctrlState.selectedIndex = 2;
        this.TxtContent1.text = "Lv." + data.EnemyLevel + " " + data.Name;
        this.TxtContent3.text = `剩余次数：${playerData.base.getLeftCount(BattleType.MiJing,data.ID)}`;
    }
    refreshBoss(data: ConfigBossData) {
        this.ctrlState.selectedIndex = 3;
        this.TxtContent1.text = "Lv." + data.EnemyLevel + " " + data.Name;
        this.refreshBossCool(data.ID);
        Laya.timer.loop(1000, this, this.refreshBossCool, [data.ID]);
    }
    private refreshBossCool(id: number) {
        const coolTime = playerData.base.bossData.getCoolTime(id);
        this.TxtContent3.text = coolTime <= 0 ? "" : MathUtil.TimeFormat(coolTime);
        coolTime <= 0 && this.onRemoved();
        this.touchable = coolTime <= 0;
        this.grayed = coolTime > 0;
    }
    refreshCaiJi(data: ConfigCaiJiData) {
        this.ctrlState.selectedIndex = 4;
        this.TxtContent2.text = data.Name;
        this.BtnBreak.visible = false;
    }
}