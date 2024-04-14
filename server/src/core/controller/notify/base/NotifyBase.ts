import { BaseDataType } from "../../../enum/ItemEnum";
import { NetNotify } from "../../../enum/NetNotify";
import { NotifyController } from "../NotifyController";

export class NotifyBase extends NotifyController {
    private _delta: number = 0;

    override update(delta: number) {
        if (!this.connection.logined) return;
        this._delta += delta;
        if (this._delta < 10000) return;
        this._delta = 0;
        const base = this.user.base;
        const { vigor, maxVigro, vigorRecover } = base;
        if (vigor >= maxVigro) return;
        const recover = Math.min(Math.floor(vigorRecover * 10), maxVigro - vigor);
        base.changeItemCount(BaseDataType.Vigor, recover);
        this.notify<INotifyVigorRecover>(NetNotify.NotifyVigorRecover);
    }
}