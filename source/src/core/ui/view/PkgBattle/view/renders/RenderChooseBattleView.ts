import { MathUtil } from "../../../../../game/math/MathUtil";
import { BattleType } from "../../../../../userData/const/BattleEnums";
import RenderChooseBattle from "../../../../ui/PkgBattle/RenderChooseBattle";

export const enum RenderChooseBattleMsg {
    OnGraphTouchClick = "RenderChooseBattle_OnGraphTouchClick",
    OnBtnBreakClick = "RenderChooseBattle_OnBtnBreakClick",
}

export class RenderChooseBattleView extends ExtensionClass<IView, RenderChooseBattle>(RenderChooseBattle) {
    static readonly PkgRes = ResPath.PkgPath.PkgBattle;

    override onCreate() {
        const { graph_touch, btn_break } = this;
        graph_touch.onClick(this, this.sendMessage, [RenderChooseBattleMsg.OnGraphTouchClick]);
        btn_break.onClick(this, this.sendMessage, [RenderChooseBattleMsg.OnBtnBreakClick]);
    }

    refreshByType(type: BattleType, data: BattleCfgData) {
        const { txt_content1, txt_content2, txt_content3, ctrlState, graph_touch, graph_light } = this;
        ctrlState.selectedIndex = type - 1;
        switch (type) {
            case BattleType.Level:
                txt_content1.text = data.name;
                txt_content3.text = "怪物等级：" + data.enemyLevel;
                break;
            case BattleType.Copy:
                txt_content1.text = data.name;
                txt_content3.text = `剩余次数：${ userData.battle.copy.getLastCount(data.id) }`;
                break;
            case BattleType.Secret:
                txt_content1.text = data.name;
                txt_content3.text = `剩余次数：${ userData.battle.secret.getLastCount(data.id) }`;
                break;
            case BattleType.Boss:
                txt_content1.text = data.name;
                this.refreshBossCool(data as CfgBossData);
                return;
            case BattleType.Gather:
                txt_content2.text = data.name;
                this.refreshGatherCool(data as CfgGatherData);
                return;
        }
        txt_content1.grayed = false;
        graph_touch.grayed = false;
        graph_touch.touchable = true;
        graph_light.visible = true;
    }

    refreshBossCool(data: CfgBossData) {
        const coolTime = userData.battle.boss.lastCoolTime(data.id);
        const isEnd = coolTime <= 0;
        const { graph_light, graph_touch, txt_content1, txt_content5 } = this;
        graph_touch.touchable = isEnd;
        graph_touch.grayed = !isEnd;
        graph_light.visible = isEnd;
        txt_content1.grayed = !isEnd;
        txt_content5.grayed = !isEnd;
        txt_content5.text = isEnd ? "" : MathUtil.TimeFormat(coolTime);
    }

    refreshGatherCool(data: CfgGatherData) {
        const isEnd = !userData.battle.gather.startTimeMap[data.id];
        const lastTime = userData.battle.gather.remainTime(data.id);
        const { txt_content2, txt_content3, txt_content4, btn_break, graph_touch, graph_light } = this;
        graph_light.visible = isEnd;
        graph_touch.touchable = isEnd;
        graph_touch.grayed = !isEnd;
        txt_content2.grayed = !isEnd;
        txt_content3.text = "";
        txt_content4.visible = !isEnd;
        txt_content4.grayed = !isEnd;
        !isEnd && (txt_content4.text = `采集中：${ MathUtil.TimeFormat(lastTime) }`);
        btn_break.visible = !isEnd;
    }
}
