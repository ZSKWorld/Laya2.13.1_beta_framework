import { tableMgr } from "../core/table/TableManager";

export class GameUtil {
    static isEquip(id: number) { return !!tableMgr.Equipment[ id ]; }
    static isProp(id: number) { return !!tableMgr.Props[ id ]; }
    static isFood(id: number) { return !!tableMgr.Food[ id ]; }
    static isSkillBook(id: number) { return !!tableMgr.SkillBook[ id ]; }
    static isXinFaBook(id: number) { return !!tableMgr.XinFaBook[ id ]; }

    /** 物品是否可以使用 */
    static canUseItem(id: number) {
        const [ prop, food, skillBook, xinFaBook ] = [
            tableMgr.Props[ id ], tableMgr.Food[ id ], tableMgr.SkillBook[ id ], tableMgr.XinFaBook[ id ],
        ];
        return prop || food || skillBook || xinFaBook;
    }
}