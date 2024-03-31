import { NetNotify } from "../../../enum/NetNotify";
import { NotifyController } from "../NotifyController";

export class NotifyAccount extends NotifyController {
    private _delta: number = 0;

    override update(delta: number) {
        this._delta += delta;
        if (this._delta >= 60000) {
            this._delta = 0;
            if (this.connection.logined) {
                if (this.user.checkOnlineNextDay())
                    this.notify<INotifyOnlineNextDay>(NetNotify.NotifyOnlineNextDay);
            }
        }
    }
}