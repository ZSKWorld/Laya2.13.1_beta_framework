import { Observer } from "../../game/event/Observer";
import { EquipmentPart } from "../../userData/const/ItemEnum";
import { UserDataEvent } from "../../userData/UserDataEvent";
import { RDTriggerType } from "./RedDotEnum";

function RDTriggerEvent(eventName: RDTriggerType) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const eventMap: KeyMap<Function[]> = target._triggerEventMap = target._triggerEventMap || {};
        const func = descriptor.value;
        if (eventMap[eventName])
            eventMap[eventName].push(func);
        else
            eventMap[eventName] = [func];
    }
}

export class RedDotTrigger extends Observer {
    private _equipMap: { [key in RDTriggerType]?: EquipmentPart } = {
        [RDTriggerType.WeaponCanWear]: EquipmentPart.Weapon,
        [RDTriggerType.HelmetCanWear]: EquipmentPart.Helmet,
        [RDTriggerType.NecklaceCanWear]: EquipmentPart.Necklace,
        [RDTriggerType.ClothesCanWear]: EquipmentPart.Clothes,
        [RDTriggerType.RingCanWear]: EquipmentPart.Ring,
        [RDTriggerType.TrousersCanWear]: EquipmentPart.Trousers,
        [RDTriggerType.AmuletCanWear]: EquipmentPart.Amulet,
        [RDTriggerType.ShoesCanWear]: EquipmentPart.Shoes,
        [RDTriggerType.MountCanWear]: EquipmentPart.Mount,
        [RDTriggerType.FashionCanWear]: EquipmentPart.Fashion,
        [RDTriggerType.HiddenWeeaponCanWear]: EquipmentPart.HiddenWeeapon,
        [RDTriggerType.MagicWeaponCanWear]: EquipmentPart.MagicWeapon,
    };
    private _triggers: (RDTriggerType | boolean)[] = [];
    private _triggereds: RDTriggerType[] = [];
    private _triggerEventMap: KeyMap<Function[]>;
    private _eventCenter: Laya.EventDispatcher;
    constructor(event: Laya.EventDispatcher) {
        super();
        this._eventCenter = event;
        const triggerEventMap = this._triggerEventMap;
        for (const key in triggerEventMap) {
            triggerEventMap[key].forEach(func => event.on("Trigger" + key, this, func, [key]));
        }
    }
    @RDTriggerEvent(RDTriggerType.AmuletCanWear)
    @RDTriggerEvent(RDTriggerType.WeaponCanWear)
    @RDTriggerEvent(RDTriggerType.HelmetCanWear)
    @RDTriggerEvent(RDTriggerType.NecklaceCanWear)
    @RDTriggerEvent(RDTriggerType.ClothesCanWear)
    @RDTriggerEvent(RDTriggerType.RingCanWear)
    @RDTriggerEvent(RDTriggerType.TrousersCanWear)
    @RDTriggerEvent(RDTriggerType.AmuletCanWear)
    @RDTriggerEvent(RDTriggerType.ShoesCanWear)
    @RDTriggerEvent(RDTriggerType.MountCanWear)
    @RDTriggerEvent(RDTriggerType.FashionCanWear)
    @RDTriggerEvent(RDTriggerType.HiddenWeeaponCanWear)
    @RDTriggerEvent(RDTriggerType.MagicWeaponCanWear)
    @RDTriggerEvent(RDTriggerType.EquipCanWear)
    @RegisterEvent(UserDataEvent.Bag_Equipment_Changed, false, [RDTriggerType.EquipCanWear])
    private checkAnyEquipCanWear(type: RDTriggerType) {
        if (this.hadTriggered(type)) return;
        let triggered = false;
        if (type == RDTriggerType.EquipCanWear) {
            for (const triggerType in this._equipMap) {
                const part = <EquipmentPart>this._equipMap[triggerType];
                const triggered2 = this.checkEquipCanWear(part);
                triggered ||= triggered2;
                this.addTrigger(<RDTriggerType>triggerType, triggered2);
            }
        } else {
            triggered = this.checkEquipCanWear(this._equipMap[type]);
        }
        this.addTrigger(type, triggered);
    }

    private checkEquipCanWear(part: EquipmentPart) {
        const wearedEquip = userData.body.getDressedEquip(part);
        const equips = userData.bag.equipment.filter(v => v.part == part);
        if (wearedEquip) {
            if (equips.length == 0) return false;
            else return equips.find(v => v.score > wearedEquip.score) != null;
        } else {
            return equips.length > 0;
        }
    }

    private hadTriggered(type: RDTriggerType) {
        const index = this._triggereds.findIndex(v => v == type);
        if (index > -1) return true;
        this._triggereds.push(type);
        Laya.timer.callLater(this, this.clearTrigger);
        return false;
    }

    private addTrigger(type: RDTriggerType, triggered: boolean) {
        this._triggers.push(type, triggered);
        Laya.timer.callLater(this, this.callTrigger);
    }

    private clearTrigger() { this._triggereds.length = 0; }

    private callTrigger() {
        const { _triggers, _eventCenter } = this;
        for (let i = 0, n = _triggers.length; i < n; i += 2) {
            _eventCenter.event(_triggers[i] as RDTriggerType, [_triggers[i], _triggers[i + 1]]);
        }
        _triggers.length = 0;
    }
}