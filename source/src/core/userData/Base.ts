import { GameUtil } from "../common/GameUtil";
import { BaseDataType, DataType } from "../net/enum/ItemEnum";
import { Decode } from "./Decode";

export class Base extends Decode<IBase> implements IBase {
    private static readonly ClassName = "BaseData";
    //#region 字段
    coin: number;
    vcoin: number;
    vigor: number;
    jingJie: number;
    cengJi: number;
    exp: number;
    moHe: number;
    moBi: number;
    spiritStones: number;
    title: number;
    society: number;
    sect: number;
    soul: number;
    gemScore: number;
    citta: ICittaData;
    skill: number[];
    usingSkill: number[];
    //#endregion

    get upgradeExp() { return GameUtil.GetUpgradExp(this.jingJie, this.cengJi); }

    get maxVigro() {
        let xinFaJL = 0;
        const citta = this.citta;
        Object.keys(citta).forEach(v => xinFaJL += (citta[ v ] * cfgMgr.XinFaBook[ v ].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }

    get vigorRecover() {
        let xinFaJLHF = 0;
        const citta = this.citta;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[ v ] * cfgMgr.XinFaBook[ v ].JLHFAdd));
        return 1 + xinFaJLHF;
    }

    getItemCount(id: number): number {
        const item = cfgMgr.Item[ id ];
        if (!item) return 0;
        if (item.dataType != DataType.BaseData) return 0;
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
            default: return 0;
        }
    }

}