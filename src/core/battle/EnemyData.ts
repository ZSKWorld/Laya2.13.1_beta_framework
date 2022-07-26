import { HurtValue } from "./Interface";

export class EnemyData {
    private _name: string;
    private _level: number;
    private _HP: number;
    private _HPMax: number;
    private _ATK: number;
    private _attackName: string;
    private _defense: number;
    private _criRate: number;
    private _hitRate: number;
    private _dodRate: number;
    private _jinATK: number;
    private _jinDef: number;
    private _muATK: number;
    private _muDef: number;
    private _shuiATK: number;
    private _shuiDef: number;
    private _huoATK: number;
    private _huoDef: number;
    private _tuATK: number;
    private _tuDef: number;

    private _hurtCri: boolean;
    private _hurtValue = new HurtValue();
    get name() { return this._name; }
    get level() { return this._level; }
    get curHp() { return this._HP; }
    get maxHP() { return this._HPMax; }
    get attackName() { return this._attackName; }
    get hurtValue() { return this._hurtValue; }
    get hurtCri() { return this._hurtCri; }
    get isDead() { return this._HP <= 0; }

    setData(cfg: ConfigEnemyData) {
        this._name = cfg.Name;
        this._level = cfg.EnemyLevel;
        this._HP = cfg.HP;
        this._HPMax = cfg.HP;
        this._ATK = cfg.ATK;
        this._attackName = cfg.AttackName;
        this._defense = cfg.Defense;
        this._criRate = cfg.CriRate;
        this._hitRate = cfg.HitRate;
        this._dodRate = cfg.DodRate;
        this._jinATK = cfg.JinATK;
        this._jinDef = cfg.JinDef;
        this._muATK = cfg.MuATK;
        this._muDef = cfg.MuDef;
        this._shuiATK = cfg.ShuiATK;
        this._shuiDef = cfg.ShuiDef;
        this._huoATK = cfg.HuoATK;
        this._huoDef = cfg.HuoDef;
        this._tuATK = cfg.TuATK;
        this._tuDef = cfg.TuDef;

        this._hurtValue.atkHurt = this._ATK || 2;
        this._hurtValue.jinHurt = this._jinATK;
        this._hurtValue.muHurt = this._muATK;
        this._hurtValue.shuiHurt = this._shuiATK;
        this._hurtValue.huoHurt = this._huoATK;
        this._hurtValue.tuHurt = this._tuATK;
        this._hurtValue.cri = 0;
        this._hurtValue.hit = 0;
        this._hurtValue.dodge = 0;
    }
    getHurt(hurt: HurtValue) {
        this._HP = Math.max(this._HP - hurt.atkHurt, 0);
        this._hurtCri = Math.random() < 0.5;
        return hurt.atkHurt;
    }
}