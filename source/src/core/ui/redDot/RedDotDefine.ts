import { RDName, RDTriggerType } from "./RedDotEnum";
import { IRedDotNode } from "./RedDotInterface";
import { RedDotNode } from "./RedDotNode";

const map: { [key in RDName]: IRedDotNode } = {} as any;

const create = function (parent: IRedDotNode, path: string, triggers?: RDTriggerType[]) {
    return RedDotNode.Create(parent, path, triggers);
}

export const RDDefineInit = function () {
    if (!map.Root) {
        map.Root = create(null, null);
        map.Train = create(map.Root, "UIBottom.UIMainView.btn_train");
        map.Character = create(map.Root, "UIBottom.UIMainView.btn_char");
        map.Goods = create(map.Root, "UIBottom.UIMainView.btn_goods");
        map.Goods_Equip = create(map.Goods, "UIBottom.UIMainView.com_goods.btn_equip", [RDTriggerType.EquipCanWear]);
        map.Shop = create(map.Root, "UIBottom.UIMainView.btn_shop");
        map.Abode = create(map.Root, "UIBottom.UIMainView.btn_abode");
        map.Friend = create(map.Root, "UIBottom.UIMainView.btn_chat");
    }
}
export const RDMap = map;
WindowImmit("RDMap", RDMap);
