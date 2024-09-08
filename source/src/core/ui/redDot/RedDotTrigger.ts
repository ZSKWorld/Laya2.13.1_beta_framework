import { Observer } from "../../game/event/Observer";
import { EquipmentPart } from "../../userData/const/ItemEnum";
import { UserDataEvent } from "../../userData/UserDataEvent";
import { RDTriggerType } from "./RedDotEnum";

function RDTriggerEvent(eventName: RDTriggerType) {
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

    @RDTriggerEvent(RDTriggerType.EquipCanWear)
    @RegisterEvent(UserDataEvent.Bag_Equipment_Changed)
    private checkAnyEquipCanWear(type: RDTriggerType = RDTriggerType.EquipCanWear, triggerId?: number) {
        let triggered = false;
        if (type == RDTriggerType.EquipCanWear) {
            triggered = this.checkEquipCanWear(EquipmentPart.Weapon) ||
                this.checkEquipCanWear(EquipmentPart.Helmet) ||
                this.checkEquipCanWear(EquipmentPart.Necklace) ||
                this.checkEquipCanWear(EquipmentPart.Clothes) ||
                this.checkEquipCanWear(EquipmentPart.Ring) ||
                this.checkEquipCanWear(EquipmentPart.Trousers) ||
                this.checkEquipCanWear(EquipmentPart.Amulet) ||
                this.checkEquipCanWear(EquipmentPart.Shoes) ||
                this.checkEquipCanWear(EquipmentPart.Mount) ||
                this.checkEquipCanWear(EquipmentPart.Fashion) ||
                this.checkEquipCanWear(EquipmentPart.HiddenWeeapon) ||
                this.checkEquipCanWear(EquipmentPart.MagicWeapon);
        } else {
            switch (type) {
                case RDTriggerType.AmuletCanWear: triggered = this.checkEquipCanWear(EquipmentPart.Amulet); break;
                case RDTriggerType.WeaponCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.Weapon); break;
                case RDTriggerType.HelmetCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.Helmet); break;
                case RDTriggerType.NecklaceCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.Necklace); break;
                case RDTriggerType.ClothesCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.Clothes); break;
                case RDTriggerType.RingCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.Ring); break;
                case RDTriggerType.TrousersCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.Trousers); break;
                case RDTriggerType.AmuletCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.Amulet); break;
                case RDTriggerType.ShoesCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.Shoes); break;
                case RDTriggerType.MountCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.Mount); break;
                case RDTriggerType.FashionCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.Fashion); break;
                case RDTriggerType.HiddenWeeaponCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.HiddenWeeapon); break;
                case RDTriggerType.MagicWeaponCanWear:  triggered = this.checkEquipCanWear(EquipmentPart.MagicWeapon); break;
                default: break;
            }
        }
        this.doTrigger(type, triggered, triggerId);
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

    private doTrigger(type: RDTriggerType, triggered: boolean, triggerId?: number) {
        Logger.Error(type, triggered);
        this._eventCenter.event(type, [type, triggered, triggerId]);
    }
}