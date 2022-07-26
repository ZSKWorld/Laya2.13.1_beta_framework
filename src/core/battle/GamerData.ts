import { playerData } from "../playerData/PlayerData";
import { HurtValue } from "./Interface";

export class GamerData {
    private _gongJi: number;
    private _fangYu: number;
    private _shengMing: number;
    private _shengMingMax: number;
    private _suoYouShuXing: number;
    private _zuiZhongShangHai: number;
    private _baoShang: number;
    private _jinGong: number;
    private _muGong: number;
    private _shuiGong: number;
    private _huoGong: number;
    private _tuGong: number;
    private _jianWuXingGongFang: number;
    private _zengJiaBaoJi: number;
    private _zengJiaMingZhong: number;
    private _mingZhong: number;
    private _shanBi: number;
    private _baoJi: number;
    private _baoKang: number;
    private _jianMianShangHai: number;
    private _xiShou: number;
    private _jinFang: number;
    private _muFang: number;
    private _shuiFang: number;
    private _huoFang: number;
    private _tuFang: number;
    private _hurtCri: boolean;
    private _hurtValue = new HurtValue();
    get curHp() { return this._shengMing; }
    get maxHP() { return this._shengMingMax; }
    get isDead() { return this._shengMing <= 0; }
    get hurtCri() { return this._hurtCri; }
    get hurtValue() { return this._hurtValue; }
    constructor() {
        this.resetData();
    }
    getHurt(hurt: HurtValue) {
        this._shengMing = Math.max(this._shengMing - hurt.atkHurt, 0);
        this._hurtCri = Math.random() < 0.5;
        return hurt.atkHurt;
    }
    xiShou(hurt: number) {

    }
    resetData() {
        const data = playerData.attribute;
        this._gongJi = data.gongJi;
        this._fangYu = data.fangYu;
        this._shengMingMax = data.shengMing || 300000;
        this._shengMing = this._shengMingMax;
        this._suoYouShuXing = data.suoYouShuXing;
        this._zuiZhongShangHai = data.zuiZhongShangHai;
        this._baoShang = data.baoShang;
        this._jinGong = data.jinGong;
        this._muGong = data.muGong;
        this._shuiGong = data.shuiGong;
        this._huoGong = data.huoGong;
        this._tuGong = data.tuGong;
        this._jianWuXingGongFang = data.jianWuXingGongFang;
        this._zengJiaBaoJi = data.zengJiaBaoJi;
        this._zengJiaMingZhong = data.zengJiaMingZhong;
        this._mingZhong = data.mingZhong;
        this._shanBi = data.shanBi;
        this._baoJi = data.baoJi;
        this._baoKang = data.baoKang;
        this._jianMianShangHai = data.jianMianShangHai;
        this._xiShou = data.xiShou;
        this._jinFang = data.jinFang;
        this._muFang = data.muFang;
        this._shuiFang = data.shuiFang;
        this._huoFang = data.huoFang;
        this._tuFang = data.tuFang;

        this._hurtValue.atkHurt = data.gongJi || 10;
        this._hurtValue.jinHurt = data.jinGong;
        this._hurtValue.muHurt = data.muGong;
        this._hurtValue.shuiHurt = data.shuiGong;
        this._hurtValue.huoHurt = data.huoGong;
        this._hurtValue.tuHurt = data.tuGong;
        this._hurtValue.cri = data.baoJi;
        this._hurtValue.hit = data.mingZhong;
        this._hurtValue.dodge = data.shanBi;
    }
}