import { GameUtil } from "../../../../common/GameUtil";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { tableMgr } from "../../../../table/TableManager";
import { Equipment, ItemBase } from "../../../../userData/proxy/ItemData";
import { GComponentExtend } from "../../../core/Interfaces";
import RenderBag from "../../../ui/PkgMain/RenderBag";

export class RenderBagView extends ExtensionClass<GComponentExtend, RenderBag>(RenderBag) {

    refreshShangCheng(id: number) {
        const { TxtName, TxtCount } = this;
        const { Name, Quality } = tableMgr.Item[ id ];
        TxtName.text = Name;
        TxtCount.text = "";
        TxtName.color = tableMgr.Color[ Quality ].Color;
        TxtCount.color = TxtName.color;
    }

    refreshWuPin(data: ItemBase) {
        const { TxtName, TxtCount } = this;
        if (GameUtil.isEquip(data.id)) {
            TxtName.text = data.name + " +" + (<Equipment>data).level;
            TxtCount.text = "";
        } else {
            TxtName.text = data.name;
            TxtCount.text = data.count.toString();
        }
        TxtName.color = data.color;
        TxtCount.color = data.color;
    }

    refreshSkill(skillID: number, unlock: boolean, sect: number) {
        const itemCfg = tableMgr.Item[ skillID ];
        const skillCfg = tableMgr.SkillBook[ skillID ];
        //#F48B59   #623E2E #474747
        const { TxtName, bg } = this;
        TxtName.text = itemCfg?.Name.split("·")[ 1 ] || "0";

        const canUse = skillCfg && (skillCfg.SectRequire.length ? skillCfg.SectRequire.includes(sect) : true);
        this.touchable = unlock && canUse;
        bg.color = canUse ? (this.touchable ? "#F48B59" : "#623E2E") : "#474747";
    }
}