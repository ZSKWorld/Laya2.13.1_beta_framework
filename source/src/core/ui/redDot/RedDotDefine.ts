import { RedDotData } from "./RedDotData";
import { RDDisplayType, RDName, RDTriggerType } from "./RedDotEnum";
import { IRedDotData } from "./RedDotInterface";

const map: { [key in RDName]: IRedDotData } = {} as any;

const create = function (parent: IRedDotData, path: string, triggers?: RDTriggerType[], displayType = RDDisplayType.Normal) {
    return RedDotData.Create(parent, path, triggers, displayType);
}

export const RDDefineInit = function () {
    if (!map.Root) {
        map.Root = create(null, null);
        map.Train = create(map.Root, "Bottom.UIMainView.btn_train", [RDTriggerType.Test]);
        map.Character = create(map.Root, "Bottom.UIMainView.btn_char");
        map.Goods = create(map.Root, "Bottom.UIMainView.btn_goods");
        map.Shop = create(map.Root, "Bottom.UIMainView.btn_shop");
        map.Abode = create(map.Root, "Bottom.UIMainView.btn_abode");
        map.Friend = create(map.Root, "Bottom.UIMainView.btn_chat");
    }
}
export const RDMap = map;
windowImmit("RDMap", RDMap);
