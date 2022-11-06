import { Notifier } from "../../libs/event/Notifier";
import { Logger } from "../../libs/utils/Logger";
import { SealFunction } from "../../libs/utils/SealFunction";
import { IViewCtrl } from "./Interfaces";

const logger = Logger.Create("BaseNetProcessor", true);

/** 控制器网络回包处理器 */
export abstract class BaseNetProcessor<T extends IViewCtrl = IViewCtrl> extends Notifier {
    /** 代理的控制器，只读 */
    viewCtrl: T;

    sendMessage(type: string, data?: any): void {
        this.viewCtrl.listener.event(type, data);
    }

    destroy() {
        this.viewCtrl = null;
        this.onDestroy();
    }

    protected onDestroy() {

    }
}