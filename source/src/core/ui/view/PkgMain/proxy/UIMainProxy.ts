import { GameUtil } from "../../../../common/GameUtil";
import { trainLogMgr } from "../../../../game/TrainLogManager";
import { NetMessage } from "../../../../net/enum/NetMessage";
import { BaseProxy } from "../../../core/BaseProxy";
import { richStrMgr } from "../../../tool/RichStrManager";
import { tipMgr } from "../../../tool/TipManager";
import { UIMainCtrl } from "../controller/UIMainCtrl";

export class UIMainProxy extends BaseProxy<UIMainCtrl> {
    @RegisterEvent(NetMessage.DecomposeGem)
    decomposeGem(output: IDecomposeGemOutput, input: IDecomposeGemInput) {
        if (output.rewards?.length) {
            let logStr = richStrMgr.start(`分解${ input.level }级宝石获得`).break();
            output.rewards.forEach(v => {
                const str = GameUtil.GetItemCountStr(v.id, v.count);
                tipMgr.showTip(`恭喜获得${ str }`);
                logStr.combineBreak(str);
            });
            trainLogMgr.addLog(logStr.end());
        }
    }

    @RegisterEvent(NetMessage.DecomposeEquip)
    decomposeEquip(output: IDecomposeEquipOutput, input: IDecomposeEquipInput) {
        if (output.rewards?.length) {
            let logStr = richStrMgr.start(`分解${ input.star }星装备获得`).break();
            output.rewards?.forEach(v => {
                const str = GameUtil.GetItemCountStr(v.id, v.count);
                tipMgr.showTip(`恭喜获得${ str }`);
                logStr.combineBreak(str);
            });
            trainLogMgr.addLog(logStr.end());
        }
    }
}