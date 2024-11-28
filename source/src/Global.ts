import { ResPath } from "./core/common/ResPath";
import { CfgManager } from "./core/config/CfgManager";
import { EventManager } from "./core/game/event/EventManager";
import { LoadManager } from "./core/game/LoadManager";
import { Logger } from "./core/game/Logger";
import { SkeletonMgr } from "./core/game/SkeletonMgr";
import { NetService } from "./core/net/NetService";
import { UIManager } from "./core/ui/core/UIManager";
import { ViewID } from "./core/ui/core/ViewID";
import { User } from "./core/userData/User";
import { GameConfig } from "./GameConfig";
import { PlatformType } from "./platform/PlatformDefine";
import { PlatformWeb } from "./platform/PlatformWeb";
import { PlatformWX } from "./platform/PlatformWX";

WindowImmit("ResPath", ResPath);
WindowImmit("ViewID", ViewID);
WindowImmit("Logger", Logger);
WindowImmit("loadMgr", new LoadManager());
WindowImmit("skeletonMgr", new SkeletonMgr());
WindowImmit("cfgMgr", new CfgManager());
WindowImmit("eventMgr", new EventManager());
WindowImmit("userData", new User());
WindowImmit("uiMgr", new UIManager());
WindowImmit("netService", NetService);

WindowImmit("ShowConfirm", (title: string, msg: string, cancel = true) => {
    if (fgui.UIPackage.getByName(ResPath.PkgName.PkgCommon)) {
        WindowImmit("ShowConfirm", (title: string, msg: string, cancel = true) => new Promise<boolean>(resolve => {
            uiMgr.showView(ViewID.UIConfirmView, {
                title,
                content: msg,
                cancel: cancel,
                onCancel: cancel ? Laya.Handler.create(null, resolve, [false]) : null,
                onConfirm: Laya.Handler.create(null, resolve, [true]),
            });
        }));
        return ShowConfirm(title, msg, cancel);
    } else
        return platform.showConfirm(title, msg);
});

export default class Global {
    static init() {
        let platform: IPlatform;
        switch (GameConfig.platform) {
            case PlatformType.Web: platform = new PlatformWeb(); break;
            case PlatformType.Wechat: platform = new PlatformWX(); break;
        }
        platform.init();
        WindowImmit("platform", platform);
    }
}