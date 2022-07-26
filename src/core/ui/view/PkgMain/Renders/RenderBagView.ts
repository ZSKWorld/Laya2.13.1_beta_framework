import { BagItem, EquipmentItem } from "../../../../playerData/BagData";
import { tableMgr } from "../../../../table/TableManager";
import RenderBag from "../../../ui/PkgMain/RenderBag";

export class RenderBagView extends RenderBag {

    refreshShangCheng(id: number) {
        const { TxtName, TxtCount } = this;
        const { Name, Quality } = tableMgr.Item[id];
        TxtName.text = Name;
        TxtCount.text = "";
        TxtName.color = tableMgr.Color[Quality].Color;
        TxtCount.color = TxtName.color;
    }

    refreshWuPin(item: BagItem) {
        const { TxtName, TxtCount } = this;
        if (item instanceof EquipmentItem) {
            TxtName.text = item.name + " +" + item.level;
            TxtCount.text = "";
        } else {
            TxtName.text = item.name;
            TxtCount.text = item.count.toString();
        }
        TxtName.color = item.qualityColor;
        TxtCount.color = item.qualityColor;
    }

    refreshSkill(skillID: number, unlock: boolean, sect: number) {
        const itemCfg = tableMgr.Item[skillID];
        const skillCfg = tableMgr.SkillBook[skillID];
        //#F48B59   #623E2E #474747
        const { TxtName, bg } = this;
        TxtName.text = itemCfg?.Name.split("·")[1] || "0";

        const canUse = skillCfg && (skillCfg.SectRequire.length ? skillCfg.SectRequire.includes(sect) : true);
        this.touchable = unlock && canUse;
        bg.color = canUse ? (this.touchable ? "#F48B59" : "#623E2E") : "#474747";
    }
}