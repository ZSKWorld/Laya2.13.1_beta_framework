import { Notifier } from "../../libs/event/Notifier";
import { Logger } from "../../libs/utils/Logger";
import { IViewCtrl } from "./Interfaces";

const logger = Logger.Create("BaseProxy", true);

/** 控制器网络回包代理 */
export abstract class BaseProxy<T extends IViewCtrl = IViewCtrl> extends Notifier {
    /** 代理的控制器，只读 */
    viewCtrl: T;

    sendMessage(type: string, data?: any): void {
        this.viewCtrl.sendMessage(type, data);
    }

    destroy() {
        this.viewCtrl = null;
        this.onDestroy();
    }

    protected onDestroy() {

    }
}