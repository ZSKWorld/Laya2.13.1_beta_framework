import { Observer } from "../../libs/event/Observer";
import { RedDotCheckType } from "./RedDotConst";

function RegisterCheckEvent(eventName: RedDotCheckType) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const eventMap: KeyMap<Function[]> = target._eventMap = target._eventMap || {};
        const func = descriptor.value;
        if (eventMap[ eventName ])
            eventMap[ eventName ].push(func);
        else
            eventMap[ eventName ] = [ func ];
    }
}

export class RedDotChecker extends Observer {
    private _eventMap: KeyMap<Function[]>;
    private _eventCenter: Laya.EventDispatcher;
    
    constructor(event: Laya.EventDispatcher) {
        super();
        this._eventCenter = event;
        const eventMap = this._eventMap;
        for (const key in eventMap) {
            eventMap[ key ].forEach(func => event.on("Trigger" + key, this, func, [ key ]));
        }
        // Laya.timer.loop(5000, this, () => {
        //     for (const key in eventMap) {
        //         event.event("Trigger" + key, key);
        //     }
        // });
    }

    @RegisterCheckEvent(RedDotCheckType.Check1)
    private check1(type: RedDotCheckType, triggerId?: number) {
        let checked = false;
        this.doCheck(type, checked, triggerId);
    }

    @RegisterCheckEvent(RedDotCheckType.Check2)
    private check2(type: RedDotCheckType, triggerId?: number) {
        let checked = false;
        this.doCheck(type, checked, triggerId);
    }

    @RegisterCheckEvent(RedDotCheckType.Check3)
    private check3(type: RedDotCheckType, triggerId?: number) {
        let checked = false;
        this.doCheck(type, checked, triggerId);
    }

    @RegisterCheckEvent(RedDotCheckType.Check4)
    private check4(type: RedDotCheckType, triggerId?: number) {
        let checked = false;
        this.doCheck(type, checked, triggerId);
    }

    @RegisterCheckEvent(RedDotCheckType.Check5)
    private check5(type: RedDotCheckType, triggerId?: number) {
        let checked = false;
        this.doCheck(type, checked, triggerId);
    }

    private doCheck(type: RedDotCheckType, checked: boolean, triggerId?: number) {
        this._eventCenter.event(type, [ type, checked, triggerId ]);
    }
}