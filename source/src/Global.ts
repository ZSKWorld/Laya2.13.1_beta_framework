import { ResPath as ResPathEnum } from "./core/common/ResPath";
import { CfgManager } from "./core/config/CfgManager";
import { Logger } from "./core/game/Logger";
import { uiMgr } from "./core/ui/core/UIManager";
import { ViewID as ViewIDEnum } from "./core/ui/core/ViewID";
import { User } from "./core/userData/User";
import { platformMgr } from "./platform/PlatformManager";

WindowImmit("ResPath", ResPathEnum);
WindowImmit("ViewID", ViewIDEnum);

WindowImmit("ShowConfirm", (title: string, msg: string, cancel = true) => {
    if (Laya.loader.getRes(ResPath.PkgPath.PkgCommon + ".zip")) {
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
        return platformMgr.showConfirm(title, msg);
});

/**
 * @description: 添加全局事件监听
 * @param eventName 事件名
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
function RegisterEvent(eventName: string, once?: boolean, args?: any[]): MethodDecorator {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.__eventMap) target.__eventMap = {};
        if (!target.__eventMap[eventName]) target.__eventMap[eventName] = [];

        const func = descriptor.value;
        const list: Function[] = target.__eventMap[eventName];
        if (list.indexOf(func) == -1) {
            list.push(func);
            if (once) {
                func[eventName] = func[eventName] || {};
                func[eventName].__once = once;
            }
            if (args) {
                func[eventName] = func[eventName] || {};
                func[eventName].__args = args;
            }
        }
    };
}
WindowImmit("RegisterEvent", RegisterEvent);

/** 按键事件类型 */
enum KeyEventType {
    KeyDown = "keydown",
    KeyPress = "keypress",
    KeyUp = "keyup",
}
WindowImmit("KeyEventType", KeyEventType);

/** 鼠标事件类型 */
enum MouseEventType {
    MouseOver = "mouseover",
    MouseDown = "mousedown",
    MouseMove = "mousemove",
    MouseUp = "mouseup",
    MouseOut = "mouseout",
    DoubleClick = "doubleclick",
    RightClick = "rightclick",
    Click = "click",
    StageMouseDown = "stagemousedown",
    StageMouseMove = "stagemousemove",
    StageMouseUp = "stagemouseup",
    StageClick = "stageclick",
}
WindowImmit("MouseEventType", MouseEventType);

/**
 * 页面控制器键盘事件装饰器工厂
 * @param keyEventType {@link KeyEventType} 事件类型
 * @param key 触发事件的键值，-1 所有键都可以触发
 * @param once 是否只监听一次
 * @return MethodDecorator
 */
function ViewKeyEvent(keyEventType: KeyEventType, key: number = -1, once?: boolean, args?: any[]): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        if (!target.__keyEventList) target.__keyEventList = {};
        if (!target.__keyEventList[keyEventType]) target.__keyEventList[keyEventType] = {};
        if (!target.__keyEventList[keyEventType][key]) target.__keyEventList[keyEventType][key] = [];

        const func = descriptor.value;
        const list = target.__keyEventList[keyEventType][key];
        if (list.indexOf(func) < 0) {
            list.push(func);
            if (once) {
                func[key] = func[key] || {};
                func[key].__once = true;
            }
            if (args) {
                func[key] = func[key] || {};
                func[key].__args = args;
            }
        }
    }
}
WindowImmit("ViewKeyEvent", ViewKeyEvent);

/**
 * 页面控制器鼠标事件装饰器工厂
 * @param mouseEventType 事件类型
 * @param once 是否只监听一次
 * @return MethodDecorator
 */
function ViewMouseEvent(mouseEventType: MouseEventType, once?: boolean, args?: any[]): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        if (!target.__mouseEventList) target.__mouseEventList = {};
        if (!target.__mouseEventList[mouseEventType]) target.__mouseEventList[mouseEventType] = [];

        const func = descriptor.value;
        const list = target.__mouseEventList[mouseEventType];
        if (list.indexOf(func) < 0) {
            list.push(func);
            if (once) {
                func[mouseEventType] = func[mouseEventType] || {};
                func[mouseEventType].__once = once;
            }
            if (args) {
                func[mouseEventType] = func[mouseEventType] || {};
                func[mouseEventType].__args = args;
            }
        }
    }
}
WindowImmit("ViewMouseEvent", ViewMouseEvent);

/**
 * 页面控制器消息装饰器工厂
 * @param name 消息名称
 * @param once 是否只监听一次
 * @param args  参数
 * @returns MethodDecorator
 */
function ViewMessage(name: string, once?: boolean, args?: any[]): MethodDecorator {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.__messageMap) target.__messageMap = {};
        if (!target.__messageMap[name]) target.__messageMap[name] = [];

        const func = descriptor.value;
        const list: Function[] = target.__messageMap[name];
        if (list.indexOf(func) == -1) {
            list.push(func);
            if (once) {
                func[name] = func[name] || {};
                func[name].__once = once;
            }
            if (args) {
                func[name] = func[name] || {};
                func[name].__args = args;
            }
        }
    }
}
WindowImmit("ViewMessage", ViewMessage);

export default class Global {
    static Init() {
        WindowImmit("Logger", Logger);
        WindowImmit("cfgMgr", new CfgManager());
        WindowImmit("userData", new User());
        platformMgr.init();
    }
}