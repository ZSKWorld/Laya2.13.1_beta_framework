import { EquipmentPart } from "../enum/ItemEnum";

export const EquipmentsSign = "$equipments";

export const DressedEquipMap: { readonly [ key in EquipmentPart ]: string } = {
    1: "weapon",
    2: "helmet",
    3: "necklace",
    4: "clothes",
    5: "ring",
    6: "trousers",
    7: "amulet",
    8: "shoes",
    9: "mount",
    10: "fashion",
    11: "hiddenWeeapon",
    12: "magicWeapon"
};

export const BaseDataKeyMap: { [ key: string ]: string } = {
    1001: "coin",
    1002: "vcoin",
    1003: "exp",
    1004: "moHe",
    1005: "moBi",
    1006: "spiritStones",
    1007: "soul",
    1008: "gemScore",
    1009: "vigor",
}