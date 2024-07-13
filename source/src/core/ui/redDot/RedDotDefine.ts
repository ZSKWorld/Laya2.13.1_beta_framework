import { RedDotData } from "./RedDotData";
import { RDDisplayType, RDName, RDTriggerType } from "./RedDotEnum";
import { IRedDotData } from "./RedDotInterface";

const map: { [key in RDName]: IRedDotData } = {} as any;

const create = function (parent: IRedDotData, path: string, triggers?: RDTriggerType[], displayType = RDDisplayType.Normal) {
    return RedDotData.Create(parent, path, triggers, displayType);
}

export const RDDefineInit = function () {
    if (!map.Faction) {
        map.Root = create(null, null);
        map.Faction = create(map.Root, "Bottom.UIMainView.btn_faction");
        map.Puppet = create(map.Root, "Bottom.UIMainView.btn_puppet");
        map.Technology = create(map.Root, "Bottom.UIMainView.btn_technology");
        map.Rebirth = create(map.Root, "Bottom.UIMainView.btn_rebirth");
        map.Shop = create(map.Root, "Bottom.UIMainView.btn_shop");

        map.UnlockFaction = create(map.Faction, null, [RDTriggerType.UnlockFaction]);
        map.UnlockPuppet = create(map.Puppet, null, [RDTriggerType.UnlockPuppet]);

        map.MainSkill1Upgrade = create(map.Shop, "Bottom.UIMainView.com_shop.com_item10", [RDTriggerType.UpgradeMainSkill1]);
        map.MainSkill2Upgrade = create(map.Shop, "Bottom.UIMainView.com_shop.com_item11", [RDTriggerType.UpgradeMainSkill2]);
        map.MainSkill3Upgrade = create(map.Shop, "Bottom.UIMainView.com_shop.com_item12", [RDTriggerType.UpgradeMainSkill3]);
        map.MainSkill4Upgrade = create(map.Shop, "Bottom.UIMainView.com_shop.com_item13", [RDTriggerType.UpgradeMainSkill4]);
    }
}
export const RDMap = map;
