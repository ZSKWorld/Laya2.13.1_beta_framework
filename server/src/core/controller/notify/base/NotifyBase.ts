import { BaseDataType } from "../../../enum/ItemEnum";
import { NetNotify } from "../../../enum/NetNotify";
import { NotifyController } from "../NotifyController";

export class NotifyBase extends NotifyController {
    private _delta: number = 0;

    override update(delta: number) {
        this._delta += delta;
        if (this._delta >= 10000) {
            this._delta = 0;
            if (this.connection.logined) {
                const base = this.user.base;
                if (base.vigor < base.maxVigro) {
                    const recover = Math.min((base.vigorRecover * 10) << 0, base.maxVigro - base.vigor);
                    base.changeItemCount(BaseDataType.Vigor, recover);
                    this.notify<INotifyVigorRecover>(NetNotify.NotifyVigorRecover);
                }
            }
        }
    }
}