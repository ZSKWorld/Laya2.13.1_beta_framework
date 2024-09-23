import { GameUtil } from "../../../../common/GameUtil";
import { trainLogMgr } from "../../../../game/TrainLogManager";
import { NetCMD } from "../../../../net/enum/NetCMD";
import { BaseProxy } from "../../../core/BaseProxy";
import { richTextMgr } from "../../../tool/RichStrManager";
import { tipMgr } from "../../../tool/TipManager";
import { UIMainCtrl } from "../controller/UIMainCtrl";

export class UIMainProxy extends BaseProxy<UIMainCtrl> {
    @RegisterEvent(NetCMD.DecomposeGem)
    decomposeGem(output: IDecomposeGemOutput, input: IDecomposeGemInput) {
        if (output.rewards?.length) {
            let logStr = richTextMgr.start(`分解${ input.level }级宝石获得`).break();
            output.rewards.forEach(v => {
                const str = GameUtil.GetItemCountStr(v.id, v.count);
                tipMgr.showTip(`恭喜获得${ str }`);
                logStr.append(str).break();
            });
            trainLogMgr.addLog(logStr.end());
        }
    }

    @RegisterEvent(NetCMD.DecomposeEquip)
    decomposeEquip(output: IDecomposeEquipOutput, input: IDecomposeEquipInput) {
        if (output.rewards?.length) {
            let logStr = richTextMgr.start(`分解${ input.star }星装备获得`).break();
            output.rewards?.forEach(v => {
                const str = GameUtil.GetItemCountStr(v.id, v.count);
                tipMgr.showTip(`恭喜获得${ str }`);
                logStr.append(str).break();
            });
            trainLogMgr.addLog(logStr.end());
        }
    }
}