import { DecodeData } from "./DecodeData";

export class BaseData extends DecodeData<IBase> implements IBase {
    private static readonly ClassName = "BaseData";
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

}