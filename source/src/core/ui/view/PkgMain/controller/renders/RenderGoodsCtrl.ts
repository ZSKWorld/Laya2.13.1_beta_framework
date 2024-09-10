import { EquipmentPart } from "../../../../../userData/const/ItemEnum";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { RDMap } from "../../../../redDot/RedDotDefine";
import { RDTriggerType } from "../../../../redDot/RedDotEnum";
import { IRedDotNode } from "../../../../redDot/RedDotInterface";
import { RedDotNode } from "../../../../redDot/RedDotNode";
import { RenderGoodsView } from "../../view/renders/RenderGoodsView";

export interface RenderGoodsData {

}

export class RenderGoodsCtrl extends BaseViewCtrl<RenderGoodsView, RenderGoodsData> {
    private _redDot: IRedDotNode;

    refreshShop(id: number) {
        this.view.refreshShop(id);
        this.refreshRedDot(false);
    }

    refreshGoods(data: IGoods | IEquipment, isEquip: boolean) {
        this.view.refreshGoods(data);
        this.refreshRedDot(isEquip, (<IEquipment>data).part);
    }

    refreshSkill(skillID: number, unlock: boolean, sect: number) {
        this.view.refreshSkill(skillID, unlock, sect);
        this.refreshRedDot(false);
    }

    override onDisable() {
        if (this._redDot) {
            this._redDot.recover();
            this._redDot = null;
        }
    }

    private refreshRedDot(show: boolean, part?: EquipmentPart) {
        if (show) {
            const triggers = this._redDot ? this._redDot.triggers : [];
            triggers.length = 0;
            switch (part) {
                case EquipmentPart.Weapon: triggers.push(RDTriggerType.WeaponCanWear); break;
                case EquipmentPart.Helmet: triggers.push(RDTriggerType.HelmetCanWear); break;
                case EquipmentPart.Necklace: triggers.push(RDTriggerType.NecklaceCanWear); break;
                case EquipmentPart.Clothes: triggers.push(RDTriggerType.ClothesCanWear); break;
                case EquipmentPart.Ring: triggers.push(RDTriggerType.RingCanWear); break;
                case EquipmentPart.Trousers: triggers.push(RDTriggerType.TrousersCanWear); break;
                case EquipmentPart.Amulet: triggers.push(RDTriggerType.AmuletCanWear); break;
                case EquipmentPart.Shoes: triggers.push(RDTriggerType.ShoesCanWear); break;
                case EquipmentPart.Mount: triggers.push(RDTriggerType.MountCanWear); break;
                case EquipmentPart.Fashion: triggers.push(RDTriggerType.FashionCanWear); break;
                case EquipmentPart.HiddenWeeapon: triggers.push(RDTriggerType.HiddenWeeaponCanWear); break;
                case EquipmentPart.MagicWeapon: triggers.push(RDTriggerType.MagicWeaponCanWear); break;
            }
            if (!this._redDot) {
                this._redDot = RedDotNode.Create(RDMap.Goods_Equip, "", triggers);
                this._redDot.comp = this.view.com_redDot;
            } else this._redDot.triggers = triggers;
        } else this.view.com_redDot.visible = false;
    }
}