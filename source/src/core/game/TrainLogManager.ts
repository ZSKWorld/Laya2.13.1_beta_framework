import { GameEvent } from "../common/GameEvent";
import { Observer } from "./event/Observer";
import { MathUtil } from "./math/MathUtil";

/** 历练日志管理器 */
class TrainLogManager extends Observer {
    private static constLogs = [
        "[color=#FF0000]欢迎回来~[/color]",
        "[color=#FF0000]签到送V零充满V不是梦[/color]",
        "[color=#FF0000]★帮会跑商★宝石合成★[/color]",
        "[color=#FF0000]★套装打造★神装兑换★[/color]",
        "[color=#FF0000]★手工装备★时装坐骑★[/color]",
        "[color=#FF0000]★法宝暗器★良心放置★[/color]",
        "[color=#FF0000]副本通关三次无条件扫荡[/color]",
        "[color=#FF0000]我们的口号是：[/color]<br>[color=#FF0000]上线10分钟，挂机24小时[/color]",
        "[color=#FF0000]一时修仙一爽，一直修仙一直爽[/color]",
    ];
    private _logs: string[] = [];
    get logs() { return this._logs; }

    /** 随机一条历练日志 */
    randomLog() {
        const logs = TrainLogManager.constLogs;
        this.addLog(logs[MathUtil.RandomInt(0, logs.length - 1)]);
    }

    /**
     * 添加历练日志
     * @param log 
     */
    addLog(log: string | string[]) {
        if (Array.isArray(log)) this._logs.push(...log);
        else this._logs.push(log);
        Laya.timer.callLater(this, this.dispatch, [GameEvent.RefreshExperienceLog]);
    }

    /** 清空历练日志 */
    clearLog() {
        this._logs.length = 0;
        Laya.timer.callLater(this, this.dispatch, [GameEvent.RefreshExperienceLog]);
    }
}
export const trainLogMgr = new TrainLogManager();
WindowImmit("trainLogMgr", trainLogMgr);