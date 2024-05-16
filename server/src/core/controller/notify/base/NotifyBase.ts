import { BaseDataType } from "../../../enum/ItemEnum";
import { NetNotify } from "../../../enum/NetNotify";
import { CtrlLoop } from "../../Controller";
import { NotifyController } from "../NotifyController";

export class NotifyBase extends NotifyController {

    @CtrlLoop(10000)
    private vigorRecover() {
        if (!this.connection.logined) return;
        const base = this.user.base;
        const { vigor, maxVigro, vigorRecover } = base;
        if (vigor >= maxVigro) return;
        const recover = Math.min(Math.floor(vigorRecover * 10), maxVigro - vigor);
        base.changeItemCount(BaseDataType.Vigor, recover);
        this.notify<INotifyVigorRecover>(NetNotify.NotifyVigorRecover);
    }
}