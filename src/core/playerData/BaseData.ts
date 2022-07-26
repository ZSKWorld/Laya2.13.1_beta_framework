import { NotifyConst } from "../common/NotifyConst";
import { Observer } from "../libs/event/Observer";
import { storage } from "../libs/localStorage/LocalStorage";
import { MathUtil } from "../libs/math/MathUtil";
import { jingJieToLevel } from "../libs/utils/Util";
import { tableMgr } from "../table/TableManager";
import { EquipmentItem, SpecialEquipmentItem } from "./BagData";
import { Formula } from "./Formula";
import { BaseItemType, BattleType, EquipmentPart } from "./Interface";
export abstract class LevelBaseData {
    /**通关次数 */
    protected _passCount: { [guanQiaID: string]: number } = {};
    /**获取通关次数 */
    getPassCount(id: number): number { return this._passCount[id] || 0; }
    /**通关 */
    passLevel(id: number) { this._passCount[id] = (this._passCount[id] || 0) + 1; }
    /**剩余次数 */
    abstract getLeftCount(id: number): number;
    /**开始战斗 */
    abstract startBattle(id: number): void;

    protected static CopyTo<T extends LevelBaseData>(target: T, source: T) {
        return Object.assign(target, source);
    }
}
export class GuanQiaData extends LevelBaseData {
    getLeftCount(id: number): number { return 1; }
    startBattle(id: number): void { }
    static Decode(data: GuanQiaData) { return this.CopyTo(new GuanQiaData(), data); }
}
export class FuBenData extends LevelBaseData {
    /**剩余次数 */
    private _leftCount: { [fuBenID: string]: number } = {};
    getLeftCount(id: number) { return this._leftCount[id] ?? tableMgr.FuBen[id].BattleCount; }
    startBattle(id: number) { this._leftCount[id] = this.getLeftCount(id) - 1; }
    reset() { this._leftCount = {}; }
    static Decode(data: FuBenData) { return this.CopyTo(new FuBenData(), data); }
}

export class MiJingData extends LevelBaseData {
    /**剩余次数 */
    private _leftCount: { [miJingID: string]: number } = {};
    getLeftCount(id: number) { return this._leftCount[id] ?? tableMgr.MiJing[id].BattleCount; }
    startBattle(id: number) { this._leftCount[id] = this.getLeftCount(id) - 1; }
    reset() { this._leftCount = {}; }
    static Decode(data: MiJingData) { return this.CopyTo(new MiJingData(), data); }
}

export class BossData extends LevelBaseData {
    /**开始时间 */
    private _startTime: { [bossID: string]: number } = {};
    getLeftCount(id: number): number {
        const startTime = this._startTime[id];
        return +(startTime == null || (Math.floor(Date.now() / 1000 - startTime) >= tableMgr.Boss[id].CoolTime));
    }
    /**获取剩余冷却时间 */
    getCoolTime(id: number) {
        return this._startTime[id] ? Math.max(tableMgr.Boss[id].CoolTime - Math.floor(Date.now() / 1000 - this._startTime[id])) : 0;
    }

    startBattle(id: number): void {
        this._startTime[id] = Math.floor(Date.now() / 1000);
    }
    reset() { this._startTime = {}; }
    static Decode(data: BossData) { return this.CopyTo(new BossData(), data); }
}

/**玩家基础信息 */
export class BaseData extends Observer {
    //#region 字段
    lastLoginTime: number = 0;
    private _xinFaData: { [key: string]: number } = {};
    private _skillData: number[] = [5000];
    private _normalSkills: number[] = [5000, 5000, 5000, 5000, 5000];

    private _jingJie: number = 1;
    private _cengJi: number = 1;
    private _exp: number = 0;
    private _moHe: number = 0;
    private _moBi: number = 0;
    private _lingShi: number = 0;
    private _chengHao: number = 0;
    private _bangHui: number = 0;
    private _sect: number = 0;
    private _hunPo: number = 0;
    private _gemScore: number = 0;
    private _yuanBao: number = 0;
    private _jinBi: number = 0;
    private _jingLi: number = this.maxJingLi;

    private _wuQi: EquipmentItem;
    private _touKui: EquipmentItem;
    private _xiangLian: EquipmentItem;
    private _yiFu: EquipmentItem;
    private _jieZhi: EquipmentItem;
    private _kuZi: EquipmentItem;
    private _huFu: EquipmentItem;
    private _xieZi: EquipmentItem;
    private _wuQiGem: number[] = [];
    private _touKuiGem: number[] = [];
    private _xiangLianGem: number[] = [];
    private _yiFuGem: number[] = [];
    private _jieZhiGem: number[] = [];
    private _kuZiGem: number[] = [];
    private _huFuGem: number[] = [];
    private _xieZiGem: number[] = [];

    private _zuoQi: SpecialEquipmentItem;
    private _anQi: SpecialEquipmentItem;
    private _shiZhuang: SpecialEquipmentItem;
    private _faBao: SpecialEquipmentItem;

    private _guanQiaData: GuanQiaData = new GuanQiaData();
    private _fuBenData: FuBenData = new FuBenData();
    private _miJingData: MiJingData = new MiJingData();
    private _bossData: BossData = new BossData();
    //#endregion
    //#region 属性
    /**境界 */
    get jingJie() { return this._jingJie; }
    /**层数 */
    get cengJi() { return this._cengJi; }
    /**经验 */
    get exp() { return this._exp; }
    /**魔核 */
    get moHe() { return this._moHe; }
    /**魔币 */
    get moBi() { return this._moBi; }
    /**灵石 */
    get lingShi() { return this._lingShi; }
    /**称号id */
    get chengHao() { return this._chengHao; }
    /**帮会id */
    get bangHui() { return this._bangHui; }
    /**门派id */
    get sect() { return this._sect; }
    /**魂魄 */
    get hunPo() { return this._hunPo; }
    /**宝石积分 */
    get gemScore() { return this._gemScore; }
    /**元宝 */
    get yuanBao() { return this._yuanBao; }
    /**金币 */
    get jinBi() { return this._jinBi; }
    /**精力 */
    get jingLi() { return this._jingLi; }

    /**武器 */
    get wuQi() { return this._wuQi; }
    /**头盔 */
    get touKui() { return this._touKui; }
    /**项链 */
    get xiangLian() { return this._xiangLian; }
    /**衣服 */
    get yiFu() { return this._yiFu; }
    /**戒指 */
    get jieZhi() { return this._jieZhi; }
    /**裤子 */
    get kuZi() { return this._kuZi; }
    /**护符 */
    get huFu() { return this._huFu; }
    /**鞋子 */
    get xieZi() { return this._xieZi; }

    /**坐骑 */
    get zuoQi() { return this._zuoQi; }
    /**暗器 */
    get anQi() { return this._anQi; }
    /**时装 */
    get shiZhuang() { return this._shiZhuang; }
    /**法宝 */
    get faBao() { return this._faBao; }

    /**关卡数据 */
    get guanQiaData() { return this._guanQiaData; }
    /**副本数据 */
    get fuBenData() { return this._fuBenData; }
    /**秘境数据 */
    get miJingData() { return this._miJingData; }
    /**boss数据 */
    get bossData() { return this._bossData; }
    /**心法数据 */
    get xinFaData(): ReadOnlyObject<number> { return this._xinFaData; }
    /**技能数据 */
    get skillData() { return this._skillData; }
    /**出战技能 */
    get normalSkills() { return this._normalSkills; }
    //#endregion


    /**升级经验 ，没有为0*/
    get upgradeExp() {
        if (!tableMgr.JingJie[this._jingJie + 1]) return 0;
        else return Formula.exp(this._jingJie, this._cengJi);

    }
    /**最大精力 */
    get maxJingLi() {
        let xinFaJL = 0;
        Object.keys(this._xinFaData).forEach(v => xinFaJL += (this._xinFaData[v] * tableMgr.XinFaBook[v].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }
    /**精力恢复 */
    get jingLiHuiFu() {
        let xinFaJLHF = 0;
        Object.keys(this._xinFaData).forEach(v => xinFaJLHF += (this._xinFaData[v] * tableMgr.XinFaBook[v].JLHFAdd));
        return 1 + xinFaJLHF;
    }

    private addExp(num: number) {
        if (this.upgradeExp == 0) return;
        this._exp = Math.max(this._exp + num, 0);
        let upgrade = false;
        const addExp2 = () => {
            //升层级
            if (this._exp >= this.upgradeExp) {
                this._exp -= this.upgradeExp;
                this._cengJi++;
                upgrade = true;
            };
            const maxCengji = +tableMgr.Const[1005].Value;
            if (tableMgr.JingJie[this._jingJie + 1]) {
                //升境界
                if (this._cengJi > maxCengji) {
                    this._cengJi -= maxCengji;
                    this._jingJie++;
                    upgrade = true;
                }
            }
            if (this.upgradeExp != 0) this._exp >= this.upgradeExp && addExp2();
            else (this._exp = 0) && (this._cengJi = 0);
        }
        addExp2();
        upgrade && this.dispatch(NotifyConst.Upgrade, jingJieToLevel(this._jingJie, this._cengJi));
    }
    /**更改物品数量 */
    changeItemCount(id: number, num: number) {
        switch (id) {
            case BaseItemType.JingYan: this.addExp(num); break;
            case BaseItemType.JinBi: this._jinBi = Math.max(this._jinBi + num, 0); break;
            case BaseItemType.YuanBao: this._yuanBao = Math.max(this._yuanBao + num, 0); break;
            case BaseItemType.MoHe: this._moHe = Math.max(this._moHe + num, 0); break;
            case BaseItemType.MoBi: this._moBi = Math.max(this._moBi + num, 0); break;
            case BaseItemType.LingShi: this._lingShi = Math.max(this._lingShi + num, 0); break;
            case BaseItemType.HunPo: this._hunPo = Math.max(this._hunPo + num, 0); break;
            case BaseItemType.GemScore: this._gemScore = Math.max(this._gemScore + num, 0); break;
            case BaseItemType.JingLi: this._jingLi = MathUtil.Clamp(this._jingLi + num, 0, this.maxJingLi); break;
            default: break;
        }
    }
    /**获取物品数量 */
    getItemCount(id: number) {
        switch (id) {
            case BaseItemType.JingYan: return this._exp;
            case BaseItemType.JinBi: return this._jinBi;
            case BaseItemType.YuanBao: return this._yuanBao;
            case BaseItemType.MoHe: return this._moHe;
            case BaseItemType.MoBi: return this._moBi;
            case BaseItemType.LingShi: return this._lingShi;
            case BaseItemType.HunPo: return this._hunPo;
            case BaseItemType.GemScore: return this._gemScore;
            case BaseItemType.JingLi: return this._jingLi;
            default: return 0;
        }
    }
    /**获取装备 */
    getEquipmentByType(type: EquipmentPart) {
        switch (type) {
            case EquipmentPart.WuQi: return this._wuQi;
            case EquipmentPart.TouKui: return this._touKui;
            case EquipmentPart.XiangLian: return this._xiangLian;
            case EquipmentPart.YiFu: return this._yiFu;
            case EquipmentPart.JieZhi: return this._jieZhi;
            case EquipmentPart.KuZi: return this._kuZi;
            case EquipmentPart.HuFu: return this._huFu;
            case EquipmentPart.XieZi: return this._xieZi;

            case EquipmentPart.ZuoQi: return this._zuoQi;
            case EquipmentPart.AnQi: return this._anQi;
            case EquipmentPart.FaBao: return this._faBao;
            case EquipmentPart.ShiZhuang: return this._shiZhuang;
            default: return null;
        }
    }
    /**穿戴装备 */
    dressEquipment(equip: EquipmentItem) {
        const equipCfg = tableMgr.Equipment[equip.id];
        let takeOff: EquipmentItem;
        switch (equipCfg.Part) {
            case EquipmentPart.WuQi: takeOff = this._wuQi; this._wuQi = equip; break;
            case EquipmentPart.TouKui: takeOff = this._touKui; this._touKui = equip; break;
            case EquipmentPart.XiangLian: takeOff = this._xiangLian; this._xiangLian = equip; break;
            case EquipmentPart.YiFu: takeOff = this._yiFu; this._yiFu = equip; break;
            case EquipmentPart.JieZhi: takeOff = this._jieZhi; this._jieZhi = equip; break;
            case EquipmentPart.KuZi: takeOff = this._kuZi; this._kuZi = equip; break;
            case EquipmentPart.HuFu: takeOff = this._huFu; this._huFu = equip; break;
            case EquipmentPart.XieZi: takeOff = this._xieZi; this._xieZi = equip; break;

            // case EquipmentPart.ZuoQi: takeOff = this._zuoQi; this._zuoQi = equip; break;
            // case EquipmentPart.AnQi: takeOff = this._anQi; this._anQi = equip; break;
            // case EquipmentPart.FaBao: takeOff = this._faBao; this._faBao = equip; break;
            // case EquipmentPart.ShiZhuang: takeOff = this._shiZhuang; this._shiZhuang = equip; break;
            default: break;
        }
        return takeOff;
    }
    /**获取装备宝石 */
    getEquipGemByType(type: EquipmentPart) {
        switch (type) {
            case EquipmentPart.WuQi: return this._wuQiGem;
            case EquipmentPart.TouKui: return this._touKuiGem;
            case EquipmentPart.XiangLian: return this._xiangLianGem;
            case EquipmentPart.YiFu: return this._yiFuGem;
            case EquipmentPart.JieZhi: return this._jieZhiGem;
            case EquipmentPart.KuZi: return this._kuZiGem;
            case EquipmentPart.HuFu: return this._huFuGem;
            case EquipmentPart.XieZi: return this._xieZiGem;
            default: return null;
        }
    }
    /**获取通关次数 */
    getPassCount(type: BattleType, id: number) {
        switch (type) {
            case BattleType.GuanQia: return this._guanQiaData.getPassCount(id);
            case BattleType.FuBen: return this._fuBenData.getPassCount(id);
            case BattleType.MiJing: return this._miJingData.getPassCount(id);
            case BattleType.Boss: return this._bossData.getPassCount(id);
            default: return 0;
        }
    }
    /**获取剩余次数 */
    getLeftCount(type: BattleType, id: number) {
        switch (type) {
            case BattleType.GuanQia: return this._guanQiaData.getLeftCount(id);
            case BattleType.FuBen: return this._fuBenData.getLeftCount(id);
            case BattleType.MiJing: return this._miJingData.getLeftCount(id);
            case BattleType.Boss: return this._bossData.getLeftCount(id);
            default: return 0;
        }
    }
    /**开始战斗 */
    startBattle(type: BattleType, id: number) {
        switch (type) {
            case BattleType.GuanQia: this._guanQiaData.startBattle(id); break;
            case BattleType.FuBen: this._fuBenData.startBattle(id); break;
            case BattleType.MiJing: this._miJingData.startBattle(id); break;
            case BattleType.Boss: this._bossData.startBattle(id); break;
            default: break;
        }
    }
    /**通关 */
    passLevel(type: BattleType, id: number) {
        switch (type) {
            case BattleType.GuanQia: this._guanQiaData.passLevel(id); break;
            case BattleType.FuBen: this._fuBenData.passLevel(id); break;
            case BattleType.MiJing: this._miJingData.passLevel(id); break;
            case BattleType.Boss: this._bossData.passLevel(id); break;
            default: break;
        }
    }
    /**学习心法 */
    learnXinFa(id: number) {
        if (this._xinFaData[id] != null) return false;
        this._xinFaData[id] = 0;
        return true;
    }
    /**升级心法 */
    upgradeXinFa(id: number, count: number = 1) {
        if (this._xinFaData[id] == null) return false;
        this._xinFaData[id] = (this._xinFaData[id] || 0) + count;
        return true;
    }
    /**学习技能 */
    learnSkill(id: number) {
        if (this._skillData.indexOf(id) != -1) return false;
        this._skillData.push(id);
        return true;
    }
    /**更换门派 */
    translatorMenPai(id: number) {
        this._sect = id;
    }

    Encode() { return this; }

    static Decode(key: string, returnNew?: boolean) {
        const data = storage.get<BaseData>(key);
        if (!data && !returnNew) return null;
        const result = new BaseData();
        if (data) {
            Object.keys(data).forEach((v) => result[v] = data[v]);
            result._wuQi = EquipmentItem.Clone(data._wuQi);
            result._touKui = EquipmentItem.Clone(data._touKui);
            result._xiangLian = EquipmentItem.Clone(data._xiangLian);
            result._yiFu = EquipmentItem.Clone(data._yiFu);
            result._jieZhi = EquipmentItem.Clone(data._jieZhi);
            result._kuZi = EquipmentItem.Clone(data._kuZi);
            result._huFu = EquipmentItem.Clone(data._huFu);
            result._xieZi = EquipmentItem.Clone(data._xieZi);

            result._zuoQi = SpecialEquipmentItem.Clone(data._zuoQi);
            result._anQi = SpecialEquipmentItem.Clone(data._anQi);
            result._shiZhuang = SpecialEquipmentItem.Clone(data._shiZhuang);
            result._faBao = SpecialEquipmentItem.Clone(data._faBao);

            result._guanQiaData = GuanQiaData.Decode(data._guanQiaData);
            result._fuBenData = FuBenData.Decode(data._fuBenData);
            result._miJingData = MiJingData.Decode(data._miJingData);
            result._bossData = BossData.Decode(data._bossData);
        }
        return result;
    }
}
