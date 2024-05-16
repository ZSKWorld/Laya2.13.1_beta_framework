import { NetNotify } from "../../../enum/NetNotify";
import { CtrlLoop } from "../../Controller";
import { NotifyController } from "../NotifyController";

export class NotifyAccount extends NotifyController {

    @CtrlLoop(60000)
    private checkOnlineNextDay() {
        if (!this.connection.logined) return;
        if (this.user.checkOnlineNextDay())
            this.notify<INotifyOnlineNextDay>(NetNotify.NotifyOnlineNextDay);
    }
}