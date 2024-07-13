import { Observer } from "../../game/event/Observer";
import { RDTriggerType } from "./RedDotEnum";

function RedDotEvent(eventName: RDTriggerType) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const eventMap: KeyMap<Function[]> = target._triggerMap = target._triggerMap || {};
        const func = descriptor.value;
        if (eventMap[eventName])
            eventMap[eventName].push(func);
        else
            eventMap[eventName] = [func];
    }
}

export class RedDotTrigger extends Observer {
    private _triggerMap: KeyMap<Function[]>;
    private _eventCenter: Laya.EventDispatcher;
    constructor(event: Laya.EventDispatcher) {
        super();
        this._eventCenter = event;
        const triggerMap = this._triggerMap;
        for (const key in triggerMap) {
            triggerMap[key].forEach(func => event.on("Trigger" + key, this, func, [key]));
        }
    }

    @RedDotEvent(RDTriggerType.Test)
    private checkMainSkill(type: RDTriggerType, triggerId?: number) {
        const triggered = true;
        this.doTrigger(type, triggered, triggerId);
    }

    private doTrigger(type: RDTriggerType, triggered: boolean, triggerId?: number) {
        Logger.Error(type, triggered);
        this._eventCenter.event(type, [type, triggered, triggerId]);
    }
}