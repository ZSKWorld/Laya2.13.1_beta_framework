import { NotifyConst } from "../common/NotifyConst";
import { InsertNotify } from "../libs/event/EventMgr";
import { Observer } from "../libs/event/Observer";
import { storage } from "../libs/localStorage/LocalStorage";
import { LocalStorageKey } from "../libs/localStorage/LocalStorageKey";
import { MathUtil } from "../libs/math/MathUtil";
import { GetColorStr } from "../libs/utils/Util";
import { LangCode } from "../table/LangCode";
import { tableMgr } from "../table/TableManager";
import { ViewID } from "../ui/core/ViewID";
import { AccountData } from "./AccountData";
import { BagData, EquipmentItem } from "./BagData";
import { BaseData } from "./BaseData";
import { Formula } from "./Formula";
import { AttributeType, BaseItemType, BattleType, DataType, EquipmentPart, FoodRecoverType } from "./Interface";


/**玩家属性 */
class Attribute extends Observer {
	//#region 字段属性
	/**战力 */
	get zhanLi() {
		return 0;
	}

	/**攻击 */
	get gongJi() {
		const { jingJie, cengJi } = playerData.base;
		const baseAtk = Formula.baseATK(jingJie, cengJi);
		return baseAtk;
	}

	/**防御 */
	get fangYu() {
		return 0;
	}

	/**生命 */
	get shengMing() {
		const { jingJie, cengJi } = playerData.base;
		const baseHp = Formula.baseHP(jingJie, cengJi);
		const equipHp = this.getEquipAddition(AttributeType.ShengMing);
		return baseHp + equipHp;
	}

	/**力量 */
	get liLiang() {
		return 0;
	}

	/**体力 */
	get tiLi() {
		return 0;
	}

	/**所有属性 */
	get suoYouShuXing() {
		return 0;
	}

	/**最终伤害 */
	get zuiZhongShangHai() {
		return 0;
	}

	/**暴伤 */
	get baoShang() {
		return 0;
	}

	/**金攻 */
	get jinGong() {
		return 0;
	}

	/**木攻 */
	get muGong() {
		return 0;
	}

	/**水攻 */
	get shuiGong() {
		return 0;
	}

	/**火攻 */
	get huoGong() {
		return 0;
	}

	/**土攻 */
	get tuGong() {
		return 0;
	}

	/**减五行攻防，百分比 */
	get jianWuXingGongFang() {
		return 0;
	}

	/**增加暴击，百分比 */
	get zengJiaBaoJi() {
		return 0;
	}

	/**增加命中，百分比 */
	get zengJiaMingZhong() {
		return 0;
	}

	/**命中 */
	get mingZhong() {
		return 0;
	}

	/**闪避 */
	get shanBi() {
		return 0;
	}

	/**暴击 */
	get baoJi() {
		return 0;
	}

	/**暴抗 */
	get baoKang() {
		return 0;
	}

	/**身法 */
	get shenFa() {
		return 0;
	}

	/**耐力 */
	get naiLi() {
		return 0;
	}

	/**减免伤害，百分比 */
	get jianMianShangHai() {
		return 0;
	}

	/**吸收 */
	get xiShou() {
		return 0;
	}

	/**金防 */
	get jinFang() {
		return 0;
	}

	/**木防 */
	get muFang() {
		return 0;
	}

	/**水防 */
	get shuiFang() {
		return 0;
	}

	/**火防 */
	get huoFang() {
		return 0;
	}

	/**土防 */
	get tuFang() {
		return 0;
	}

	/**经验上限，百分比 */
	get jingYanShangXian() {
		return 0;
	}

	//#endregion

	private getEquipAddition(type: AttributeType) {
		let result = 0;
		const { wuQi, touKui, xiangLian, yiFu, jieZhi, kuZi, huFu, xieZi, zuoQi, anQi, shiZhuang, faBao } = playerData.base;
		[ wuQi, touKui, xiangLian, yiFu, jieZhi, kuZi, huFu, xieZi, zuoQi, anQi, shiZhuang, faBao ].forEach(
			v1 => v1?.addition?.forEach(v2 => v2.type == type && (result += v2.value))
		);
		return result;
	}

	/**矫正数据 */
	@InsertNotify(NotifyConst.BaseDataChanged)
	rectify() {
		//this._zhanLi;
		//this._gongJi;
		//this._fangYu;
		//this._shengMing;
		//this._liLiang;
		//this._tiLi;
		//this._suoYouShuXing;
		//this._zuiZhongShangHai;
		//this._baoShang;
		//this._jinGong;
		//this._muGong;
		//this._shuiGong;
		//this._huoGong;
		//this._tuGong;
		//this._jianWuXingGongFang;
		//this._zengJiaBaoJi;
		//this._zengJiaMingZhong;
		//this._mingZhong;
		//this._shanBi;
		//this._baoJi;
		//this._baoKang;
		//this._shenFa;
		//this._naiLi;
		//this._jianMianShangHai;
		//this._xiShou;
		//this._jingLiHuiFu;
		//this._jinFang;
		//this._muFang;
		//this._shuiFang;
		//this._huoFang;
		//this._tuFang;
		//this._jingYanShangXian;
	}
}


class PlayerData extends Observer {
	//#region 字段属性
	private _account: AccountData;
	private _base: BaseData;
	private _bag: BagData;
	private _attribute = new Attribute();

	get account() {
		return this._account;
	}

	get base() {
		return this._base;
	}

	get bag() {
		return this._bag;
	}

	get attribute() {
		return this._attribute;
	}

	private secondUpdate() {
		if (this._base.jingLi < this._base.maxJingLi) this.changeItemCount(BaseItemType.JingLi, this._base.jingLiHuiFu);
	}

	//#endregion
	/**获取数据存储key */
	private getDataKey(type: DataType) {
		return type + "_" + this._account.account + this._account.password;
	}

	private saveBaseData() {
		storage.set(this.getDataKey(DataType.Base), this._base.Encode());
		this.dispatch(NotifyConst.BaseDataChanged);
	}

	private saveBagData() {
		storage.set(this.getDataKey(DataType.Bag), this._bag.Encode());
		this.dispatch(NotifyConst.BagDataChanged);
	}

	private saveBaseDataCallLater() {
		Laya.timer.callLater(this, this.saveBaseData);
	}

	private saveBagDataCallLater() {
		Laya.timer.callLater(this, this.saveBagData);
	}

	private checkJingJie(require: UseRequireType) {
		if (!require) return true;
		const [ jingJie, cengJi ] = [ this._base.jingJie, this._base.cengJi ];
		if (jingJie < require.jingJie || (jingJie == require.jingJie && cengJi < require.cengJi)) return false;
		return true;
	}

	/**变更物品数量 */
	changeItemCount(id: number, count: number, uid?: string) {
		const type = tableMgr.Item[ id ]?.DataType;
		if (count < 0 && this.getItemCount(id, uid) < Math.abs(count)) return LangCode._1005;
		switch (type) {
			case DataType.Base:
				this._base.changeItemCount(id, count);
				this.saveBaseDataCallLater();
				break;
			case DataType.Bag:
				this._bag.changeItemCount(id, count, uid);
				this.saveBagDataCallLater();
				break;
			default:
				return LangCode._1014;
		}
		return LangCode.None;
	}

	/**获取物品数量 */
	getItemCount(id: number, uid?: string) {
		const type = tableMgr.Item[ id ]?.DataType;
		switch (type) {
			case DataType.Base:
				return this._base.getItemCount(id);
			case DataType.Bag:
				return this._bag.getItem(id, uid)?.count || 0;
			default:
				return 0;
		}
	}

	/**使用背包物品 */
	useBagItem(id: number, count: number, uid?: string) {
		if (count <= 0) return LangCode._1010;
		const item = this._bag.getItem(id, uid);
		if (!item) return LangCode._1004;
		if (this.checkJingJie(item.useRequire) == false) return LangCode._1018;
		count = Math.min(item.count, count);
		const [ prop, food, skillBook, xinFaBook ] = [
			tableMgr.Props[ id ], tableMgr.Food[ id ], tableMgr.SkillBook[ id ], tableMgr.XinFaBook[ id ],
		];
		let log = GetColorStr(item.quality, item.name);
		if (prop) {
			let subLog = "";
			switch (id) {
				case 2007:
					this._base.fuBenData.reset();
					count = 1;
					subLog = "，副本次数已重置";
					break;
				case 2008:
					this._base.miJingData.reset();
					count = 1;
					subLog = "，秘境次数已重置";
					break;
				case 2009:
					this._base.bossData.reset();
					count = 1;
					subLog = "，BOSS刷新时间已重置";
					break;
				case 2010:
					this.dispatch(NotifyConst.AddView, [ ViewID.SectView ]);
					count = 1;
					break;
				default:
					prop.Rewards.forEach(v => {
						this.changeItemCount(v.id, v.count * count);
						subLog += `<br>获得&nbsp;${ GetColorStr(tableMgr.Item[ v.id ].Quality, tableMgr.Item[ v.id ].Name) }x${ v.count * count }`;
					});
					break;
			}
			log = `使用&nbsp;${ log }x${ count }` + subLog;
		} else if (food) {
			if (this._base.jingLi >= this._base.maxJingLi) return LangCode._1016;
			let singleRecover = 0;
			switch (food.RecoverType) {
				case FoodRecoverType.NumberRecover:
					singleRecover = food.RecoverValue;
					break;
				case FoodRecoverType.TimeRecover:
					singleRecover = food.RecoverValue * this._base.jingLiHuiFu;
					break;
				case FoodRecoverType.PercentRecover:
					singleRecover = food.RecoverValue * this._base.maxJingLi;
					break;
				default:
					return LangCode._1014;
			}
			const subJingLi = this._base.maxJingLi - this._base.jingLi;
			if (subJingLi <= singleRecover) count = 1;
			else if (subJingLi % singleRecover == 0) count = Math.min(subJingLi / singleRecover, count);
			else count = Math.min(Math.floor(subJingLi / singleRecover) + 1, count);
			this.changeItemCount(BaseItemType.JingLi, singleRecover * count);
			log = `使用&nbsp;${ log }x${ count }，恢复精力${ Math.floor(singleRecover * count) }点`;
		} else if (skillBook) {
			const SectRequire = tableMgr.SkillBook[ id ].SectRequire;
			if (SectRequire.length && SectRequire.indexOf(this._base.sect) == -1) return LangCode._1020;
			if (this._base.learnSkill(id)) count = 1;
			else return LangCode._1019;
			log = `使用&nbsp;${ log }x${ count }<br>恭喜你学会了&nbsp;${ log }`;
		} else if (xinFaBook) {
			if (this._base.learnXinFa(id)) count = 1;
			else return LangCode._1017;
			log = `使用&nbsp;${ log }x${ count }<br>恭喜你学会了&nbsp;${ log }`;
		} else return LangCode._1014;
		this.changeItemCount(id, -count);
		this.dispatch(NotifyConst.AddMainLog, log);
		return LangCode.None;
	}

	/**出售背包物品 */
	sellBagItem(id: number, count: number, uid?: string) {
		if (count <= 0) return LangCode._1010;
		const item = this._bag.getItem(id, uid);
		if (!item) return LangCode._1004;
		count = Math.min(item.count, count);
		if (!item.sellReward) return LangCode._1007;
		this.changeItemCount(id, -count, uid);
		let log = `出售&nbsp;${ GetColorStr(item.quality, item.name) }x${ count }，获得&nbsp;`;
		item.sellReward.forEach((v, index) => {
			log += `${ GetColorStr(tableMgr.Item[ v.id ].Quality, tableMgr.Item[ v.id ].Name) }x${ v.count * count }${ index == item.sellReward.length - 1 ? "" : "、" }`;
			this.changeItemCount(v.id, v.count * count);
		});
		this.dispatch(NotifyConst.AddMainLog, log);
		return LangCode.None;
	}

	/**购买商店物品 */
	buyShopItem(id: number, count: number) {
		if (count <= 0) return LangCode._1010;
		const item = tableMgr.Shop[ id ];
		if (!item) return LangCode._1008;
		for (let i = 0, n = item.SellPrice.length; i < n; i++) {
			const element = item.SellPrice[ i ];
			if (this.getItemCount(element.id) < element.count * count) return LangCode._1009;
		}
		let log = "消耗&nbsp;";
		item.SellPrice.forEach((v, index) => {
			this.changeItemCount(v.id, -v.count * count);
			log += `${ GetColorStr(tableMgr.Item[ v.id ].Quality, tableMgr.Item[ v.id ].Name) }x${ v.count * count }
                ${ index == item.SellPrice.length - 1 ? "" : "、" }`;
		});
		log = `购买&nbsp;${ GetColorStr(tableMgr.Item[ item.SellID ].Quality, tableMgr.Item[ item.SellID ].Name) }x${ count }，${ log }`;
		this.changeItemCount(item.SellID, count);
		this.dispatch(NotifyConst.AddMainLog, log);
		return LangCode.None;
	}

	/**穿戴装备 */
	dressEquipment(equip: EquipmentItem) {
		if (this.checkJingJie(equip.useRequire) == false) return LangCode._1011;
		const takeOff = this._base.dressEquipment(equip);
		this.saveBaseDataCallLater();

		this._bag.addEquipment(takeOff);
		this.changeItemCount(equip.id, -1, equip.uid);
		return LangCode.None;
	}

	/**强化装备 */
	intensifyEquipment(part: EquipmentPart) {
		this._base.getEquipmentByType(part).intensify();
		this.saveBaseDataCallLater();
		return LangCode.None;
	}

	/**脱下装备 */
	takeOffEquipment() {

	}

	/**升级心法 */
	upgradeXinFa(id: number, count: number = 1) {
		this._base.upgradeXinFa(id, count);
		this.saveBaseDataCallLater();
		return LangCode.None;
	}

	/**开始战斗 */
	startBattle(type: BattleType, id: number) {
		let vigorCost: number;
		switch (type) {
			case BattleType.GuanQia:
				vigorCost = tableMgr.Level[ id ].VigorCost;
				break;
			case BattleType.FuBen:
				vigorCost = tableMgr.FuBen[ id ].VigorCost;
				break;
			case BattleType.MiJing:
				vigorCost = tableMgr.MiJing[ id ].VigorCost;
				break;
			case BattleType.Boss:
				vigorCost = tableMgr.Boss[ id ].VigorCost;
				break;
			default:
				return LangCode._1014;
		}
		if (this.getItemCount(BaseItemType.JingLi) < vigorCost) return LangCode._1013;
		if (this._base.getLeftCount(type, id) <= 0) return LangCode._1015;
		this._base.startBattle(type, id);
		this.changeItemCount(BaseItemType.JingLi, -vigorCost);
		return LangCode.None;
	}

	battleWaveSuccess(type: BattleType, id: number) {
		let baseDropOut: BaseDropOutType[];
		let randomDropOut: RandomDropOutType[];
		let rewards: (BaseDropOutType & { special: boolean })[] = [];
		switch (type) {
			case BattleType.GuanQia:
				({ BaseDropOut: baseDropOut, RandomDropOut: randomDropOut } = tableMgr.Level[ id ]);
				break;
			case BattleType.FuBen:
				({ BaseDropOut: baseDropOut, RandomDropOut: randomDropOut } = tableMgr.FuBen[ id ]);
				break;
			case BattleType.MiJing:
				({ BaseDropOut: baseDropOut, RandomDropOut: randomDropOut } = tableMgr.MiJing[ id ]);
				break;
			case BattleType.Boss:
				({ BaseDropOut: baseDropOut, RandomDropOut: randomDropOut } = tableMgr.Boss[ id ]);
				break;
			default:
				return rewards;
		}
		baseDropOut.forEach(v => {
			rewards.push({ id: v.id, count: v.count, special: false });
			this.changeItemCount(v.id, v.count);
		});
		randomDropOut?.forEach(v => {
			if (MathUtil.RandomInt(1, v.probBase) <= v.probability) {
				rewards.push({ id: v.id, count: v.count, special: true });
				this.changeItemCount(v.id, v.count);
			}
		});
		return rewards;
	}

	/**通关 */
	passLevel(type: BattleType, id: number) {
		this._base.passLevel(type, id);
		this.saveBaseDataCallLater();
		return LangCode.None;
	}

	/**更换门派 */
	translatorSect(id: number) {
		if (tableMgr.Sect[ id ] == null) return LangCode._1014;
		this._base.translatorMenPai(id);
		this.saveBaseDataCallLater();
		return LangCode.None;
	}

	/**增删藏品 */
	changeCangPin(id: number) {
		this._bag.changeCangPin(id);
		this.saveBagDataCallLater();
		return this._bag.getIsCangPin(id);
	}

	/**结算离线奖励 */
	calOfflineReward() {
		if (this._base.lastLoginTime) {
			const offlineSec = Math.min(Math.floor((Date.now() - this._base.lastLoginTime) / 1000), 24 * 60 * 60);
			const jingli = offlineSec * this._base.jingLiHuiFu;
			this.changeItemCount(BaseItemType.JingLi, jingli);
			return Math.floor(jingli);
		} else return 0;
	}

	/**登录，dev平台专用 */
	loginData(account: string, password: string) {
		const accountKey = "_" + account;
		const accountData = AccountData.getLocalData(accountKey);
		// if (accountData?.loginning) return LangCode._1021;
		if (accountData) {
			if (accountData.password == password) {
				this._account = accountData;
				this._base = BaseData.Decode(this.getDataKey(DataType.Base), true);
				this._bag = BagData.Decode(this.getDataKey(DataType.Bag), true);
				storage.set(LocalStorageKey.LastLoginAccount, this._account);
				Laya.timer.loop(1000, this, this.secondUpdate, null, true, true);
				this._account.loginning = true;
				storage.set(accountKey, this._account);
				window.onbeforeunload = () => {
					this._base.lastLoginTime = Date.now();
					this.saveBaseData();
					this._account.loginning = false;
					storage.set(accountKey, this._account);
				};
				return LangCode.None;
			} else return LangCode._1003;
		} else return LangCode._1002;
	}

	/**注册，dev平台专用 */
	register(account: string, password: string, nickName: string) {
		const accountKey = "_" + account;
		const accountData = storage.get<AccountData>(accountKey);
		if (accountData) return LangCode._1001;
		this._account = new AccountData(account, password, nickName)
		storage.set(accountKey, this._account);
		return this.loginData(account, password);
	}

	/**清号，dev平台专用 */
	clear() {
		storage.remove("_" + this._account.account);
		storage.remove(this.getDataKey(DataType.Base));
		storage.remove(this.getDataKey(DataType.Bag));
		this.register(this._account.account, this._account.password, this._account.nickName);
	}
}

export const playerData = new PlayerData();
export type IPlayerData = PlayerData;
windowImmit("playerData", playerData);