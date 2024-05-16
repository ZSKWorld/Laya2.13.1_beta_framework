import { Logger } from "../../../../utils/Logger";
import { TimeUtil } from "../../../../utils/TimeUtil";
import { NetNotify } from "../../../enum/NetNotify";
import { CtrlLoop } from "../../Controller";
import { NotifyController } from "../NotifyController";

export class NotifyHeart extends NotifyController {

    @CtrlLoop(10000)
    private heartBeat() {
        if (!this.connection.logined) return;
        this.notify<INotifyHeart>(NetNotify.NotifyHeart, { timeStamp: TimeUtil.milliSeconds() });
    }
}