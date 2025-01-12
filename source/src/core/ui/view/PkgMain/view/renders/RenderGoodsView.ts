import { UserUtil } from "../../../../../userData/UserUtil";
import RenderGoods from "../../../../ui/PkgMain/RenderGoods";

export const enum RenderGoodsMsg {

}

export class RenderGoodsView extends ExtensionClass<IView, RenderGoods>(RenderGoods) {
    static readonly pkgRes = ResPath.PkgPath.PkgMain;

    refreshShop(id: number) {
        const { txt_name, txt_count } = this;
        const { name, quality } = cfgMgr.Item[id];
        txt_name.text = name;
        txt_count.text = "";
        txt_name.color = cfgMgr.Color[quality].color;
        txt_count.color = txt_name.color;
    }

    refreshGoods(data: IGoods | IEquipment) {
        const { txt_name, txt_count, img_collect } = this;
        if (UserUtil.isEquip(data.id)) {
            data = <IEquipment>data;
            txt_name.text = data.name + " +" + data.level;
            txt_count.text = "";
        } else {
            data = <IGoods>data;
            txt_name.text = data.name;
            txt_count.text = "x" + data.count;
        }
        img_collect.visible = userData.bag.isCollect(data.id);
        txt_name.color = data.color;
        txt_count.color = data.color;
    }

    refreshSkill(skillID: number, unlock: boolean, sect: number) {
        const itemCfg = cfgMgr.Item[skillID];
        const skillCfg = cfgMgr.SkillBook[skillID];
        //#F48B59   #623E2E #474747
        const { txt_name, bg } = this;
        txt_name.text = itemCfg?.name.split("·")[1] || "0";

        const canUse = skillCfg && (skillCfg.sectRequire.length ? skillCfg.sectRequire.includes(sect) : true);
        this.touchable = unlock && canUse;
        bg.color = canUse ? (this.touchable ? "#F48B59" : "#623E2E") : "#474747";
    }

}
