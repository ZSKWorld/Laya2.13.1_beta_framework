import { BaseDataType } from "../enum/ItemEnum";
import { tableMgr } from "../table/TableManager";
import { Formula } from "./Formula";

export class Base implements IBase {
    /** 金币 */
    coin: number = 0;
    /** 元宝 */
    vcoin: number = 0;
    /** 精力 */
    vigor: number = 0;
    /** 境界 */
    jingJie: number = 1;
    /** 层数 */
    cengJi: number = 1;
    /** 经验 */
    exp: number = 0;
    /** 魔核 */
    moHe: number = 0;
    /** 魔币 */
    moBi: number = 0;
    /** 灵石 */
    spiritStones: number = 0;
    /** 称号id */
    title: number = 0;
    /** 帮会id */
    society: number = 0;
    /** 门派id */
    sect: number = 0;
    /** 魂魄 */
    soul: number = 0;
    /** 宝石积分 */
    gemScore: number = 0;
    constructor() {
    }
    
    getItemCount(id: number): number{
        switch (id) {
            case BaseDataType.Coin: return this.coin;
            case BaseDataType.Vcoin: return this.vcoin;
            case BaseDataType.Exp: return this.exp;
            case BaseDataType.MoHe: return this.moHe;
            case BaseDataType.MoBi: return this.moBi;
            case BaseDataType.SpiritStones: return this.spiritStones;
            case BaseDataType.Soul: return this.soul;
            case BaseDataType.GemScore: return this.gemScore;
            case BaseDataType.Vigor: return this.vigor;
            default: throw new Error("未知基础数据类型" + id);
        }
    }
    
    changeItemCount(id: number, count: number): void{
        switch (id) {
            case BaseDataType.Coin: this.coin = Math.max(this.coin + count, 0); break;
            case BaseDataType.Vcoin: this.vcoin = Math.max(this.vcoin + count, 0); break;
            case BaseDataType.Exp: this.addExp(count); break;
            case BaseDataType.MoHe: this.moHe = Math.max(this.moHe + count, 0); break;
            case BaseDataType.MoBi: this.moBi = Math.max(this.moBi + count, 0); break;
            case BaseDataType.SpiritStones: this.spiritStones = Math.max(this.spiritStones + count, 0); break;
            case BaseDataType.Soul: this.soul = Math.max(this.soul + count, 0); break;
            case BaseDataType.GemScore: this.gemScore = Math.max(this.gemScore + count, 0); break;
            case BaseDataType.Vigor: this.vigor = Math.max(this.vigor + count, 0); break;
            default: throw new Error("未知基础数据类型" + id);
        }
    }

    getUpgradeExp(): number {
        if (!tableMgr.JingJie[ this.jingJie + 1 ]) return 0;
        else return Formula.exp(this.jingJie, this.cengJi);
    }

    private addExp(num: number) {
        if (this.getUpgradeExp() == 0) return;
        this.exp = Math.max(this.exp + num, 0);
        const addExp2 = () => {
            //升层级
            if (this.exp >= this.getUpgradeExp()) {
                this.exp -= this.getUpgradeExp();
                this.cengJi++;
            };
            const maxCengji = +tableMgr.Const[ 1005 ].Value;
            if (tableMgr.JingJie[ this.jingJie + 1 ]) {
                //升境界
                if (this.cengJi > maxCengji) {
                    this.cengJi -= maxCengji;
                    this.jingJie++;
                }
            }
            if (this.getUpgradeExp() != 0) this.exp >= this.getUpgradeExp() && addExp2();
            else (this.exp = 0) && (this.cengJi = 0);
        }
        addExp2();
    }
}