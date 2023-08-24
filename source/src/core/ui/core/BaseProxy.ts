import { Notifier } from "../../libs/event/Notifier";

/** 控制器网络回包代理 */
export abstract class BaseProxy<T extends IViewCtrl = IViewCtrl> extends Notifier implements IViewProxy<T> {
    /** 代理的控制器，只读 */
    viewCtrl: T;

    sendMessage(type: string, data?: any) {
        this.viewCtrl.sendMessage(type, data);
    }

    destroy() {
        this.viewCtrl = null;
        this.onDestroy();
    }

    protected onDestroy() {

    }
}