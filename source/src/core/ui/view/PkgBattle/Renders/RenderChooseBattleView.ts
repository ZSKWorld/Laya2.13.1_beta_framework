import { MathUtil } from "../../../../libs/math/MathUtil";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { GComponentExtend } from "../../../core/Interfaces";
import RenderChooseBattle from "../../../ui/PkgBattle/RenderChooseBattle";

export class RenderChooseBattleView extends ExtensionClass<GComponentExtend, RenderChooseBattle>(RenderChooseBattle) {
    private _bossCoolDown: number;
    protected override onConstruct() {
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
    refreshFuBen(data: ConfigFuBenData, lastTime: number) {
        this.ctrlState.selectedIndex = 1;
        this.TxtContent1.text = "Lv." + data.EnemyLevel + " " + data.Name;
        this.TxtContent3.text = `剩余次数：${ lastTime }`;
    }
    refreshMiJing(data: ConfigMiJingData, lastTime: number) {
        this.ctrlState.selectedIndex = 2;
        this.TxtContent1.text = "Lv." + data.EnemyLevel + " " + data.Name;
        this.TxtContent3.text = `剩余次数：${ lastTime }`;
    }
    refreshBoss(data: ConfigBossData, coolDownTime: number) {
        this._bossCoolDown = coolDownTime;
        this.ctrlState.selectedIndex = 3;
        this.TxtContent1.text = "Lv." + data.EnemyLevel + " " + data.Name;
        this.refreshBossCool();
        Laya.timer.loop(1000, this, this.refreshBossCool);
    }
    private refreshBossCool() {
        const coolTime = this._bossCoolDown;
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