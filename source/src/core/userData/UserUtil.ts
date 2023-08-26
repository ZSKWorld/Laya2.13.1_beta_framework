import { GameUtil } from "../common/GameUtil";
import { MathUtil } from "../libs/math/MathUtil";

export class UserUtil {

    static getEquipInfoStr(equip: IEquipment, hasGem: boolean) {
        let str = "";
        if (equip) {
            const dressed = userData.body.getDressedEquip(equip.part) == equip;
            str = `
                ${ equip.colorLevelName }${ dressed ? "&nbsp;(已装备)" : "" }<br>
			    ${ this.getEquipStartStr(equip.star) }<br>
                ${ equip.infoStr }
            `;
            const gems = hasGem ? userData.body.getEquipGems(equip.part) : null;
            if (gems) {
                const tableItem = cfgMgr.Item;
                const [ gem0, gem1, gem2, gem3 ] = gems;
                const { Quality: quality0, Name: name0 } = gem0 ? tableItem[ gem0 ] : {} as any;
                const { Quality: quality1, Name: name1 } = gem1 ? tableItem[ gem1 ] : {} as any;
                const { Quality: quality2, Name: name2 } = gem2 ? tableItem[ gem2 ] : {} as any;
                const { Quality: quality3, Name: name3 } = gem3 ? tableItem[ gem3 ] : {} as any;
                str += `
                    孔1:${ gem0 ? GameUtil.GetColorStr(quality0, name0) : "空" }<br>
                    孔2:${ gem1 ? GameUtil.GetColorStr(quality1, name1) : "空" }<br>
                    孔3:${ gem2 ? GameUtil.GetColorStr(quality2, name2) : "空" }<br>
                    孔4:${ gem3 ? GameUtil.GetColorStr(quality3, name3) : "空" }<br>
                `;
            }
            str += "评分:2.5万";
        }
        return str;
    }

    private static getEquipStartStr(star: number) {
        const maxStar = +cfgMgr.Const[ 1010 ].Value;
        star = MathUtil.Clamp(star, 0, maxStar);
        let result = "";
        for (let i = 1; i <= maxStar; i++) {
            result += (star >= i ? "✭" : "✩");
        }
        return result;
    }
}