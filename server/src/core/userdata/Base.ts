import { Formula } from "../../utils/Formula";
import { TimeUtil } from "../../utils/TimeUtil";
import { cfgMgr } from "../config/CfgManager";
import { BaseDataType } from "../enum/ItemEnum";
import { CantSyncObject } from "./CantSyncObject";
import { DecodeObject } from "./DecodeObject";
class Citta extends CantSyncObject<ICitta> implements ICitta {

}

export class Base extends DecodeObject<IBase> implements IBase {
    /**签到时间 */
    signedInTime: number = 0;
    /** 金币 */
    coin: number = 0;
    /** 元宝 */
    vcoin: number = 0;
    /** 精力 */
    vigor: number = 24 * 60 * 60;
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
    /**心法数据 */
    citta: ICitta = new Citta();
    /**技能数据 */
    skill: number[] = [5000];
    /**出战技能 */
    usingSkill: number[] = [5000, 5000, 5000, 5000, 5000];

    get signedIn() {
        return TimeUtil.checkNextDay(this.signedInTime, TimeUtil.milliSeconds());
    }

    get maxVigro(): number {
        const { citta } = this;
        let xinFaJL = 0;
        Object.keys(citta).forEach(v => xinFaJL += (citta[v] * cfgMgr.XinFaBook[v].vigorAddition));
        return Math.floor(86400 + xinFaJL);
    }

    get vigorRecover(): number {
        const { citta } = this;
        let xinFaJLHF = 0;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[v] * cfgMgr.XinFaBook[v].vigorRecoverAddition));
        return 1 + xinFaJLHF;
    }

    getItemCount(id: number): number {
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

    changeItemCount(id: number, count: number): void {
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

    protected override onDecode(data: OriginData<IBase>, key: OriginDataKeys<IBase>) {
        switch (key) {
            case "citta": return this[key].decode(data[key]);;
            case "skill":
            case "usingSkill":
                const skillArr = this[key];
                skillArr.length = 0;
                skillArr.push(...data[key]);
                return skillArr;

            default: return data[key];
        }
    }

    private getUpgradeExp(): number {
        if (!cfgMgr.JingJie[this.jingJie + 1]) return 0;
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
            const maxCengji = +cfgMgr.Const[1005].value;
            if (cfgMgr.JingJie[this.jingJie + 1]) {
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