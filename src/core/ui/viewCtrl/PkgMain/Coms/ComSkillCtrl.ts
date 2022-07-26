import { InsertNotify } from "../../../../libs/event/EventMgr";
import { tableMgr } from "../../../../table/TableManager";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComSkillMsg, ComSkillView } from "../../../view/PkgMain/Coms/ComSkillView";
import { RenderBagView } from "../../../view/PkgMain/Renders/RenderBagView";

export interface ComSkillData {

}

export class ComSkillCtrl extends BaseViewCtrl<ComSkillView, ComSkillData>{

	private _normalSelectIndex: number;

	private _xianSelectIndex: number;
	private _skills: number[] = [];
	onAwake(): void {
		super.onAwake();
		this.addMessageListener(ComSkillMsg.OnBtnNormal0Click, this.onNormalSkillClick, [0]);
		this.addMessageListener(ComSkillMsg.OnBtnNormal1Click, this.onNormalSkillClick, [1]);
		this.addMessageListener(ComSkillMsg.OnBtnNormal2Click, this.onNormalSkillClick, [2]);
		this.addMessageListener(ComSkillMsg.OnBtnNormal3Click, this.onNormalSkillClick, [3]);
		this.addMessageListener(ComSkillMsg.OnBtnNormal4Click, this.onNormalSkillClick, [4]);
		this.addMessageListener(ComSkillMsg.OnBtnXian0Click, this.onXianSkillClick, [0]);
		this.addMessageListener(ComSkillMsg.OnBtnXian1Click, this.onXianSkillClick, [1]);
		this.addMessageListener(ComSkillMsg.OnBtnXian2Click, this.onXianSkillClick, [2]);
		this.addMessageListener(ComSkillMsg.OnBtnXian3Click, this.onXianSkillClick, [3]);
		this.addMessageListener(ComSkillMsg.OnBtnXian4Click, this.onXianSkillClick, [4]);
		Object.keys(tableMgr.XinFaBook).forEach(v => {
			const skills = tableMgr.XinFaBook[v].Skills;
			if (skills.length > 4) console.error(v + ":技能大于4个");
			this._skills.push(...skills);
			if (skills.length < 4) {
				for (let i = 4 - skills.length; i > 0; i--) {
					this._skills.push(0);
				}
			}
		});
	}

	onEnable(): void {
		super.onEnable();
		this.view.refreshSelectSkill();
		UIUtility.SetList(this.view.ListSkill, this._skills.length, this, this.listSkillRenderer, this.listSkillClick);
	}

	private onNormalSkillClick(index: number) {
		this._normalSelectIndex = index;
	}

	private onXianSkillClick(index: number) {
		this._xianSelectIndex = index;
	}

	private listSkillRenderer(index: number, item: RenderBagView) {
		const skillID = this._skills[index];
		const { sect, skillData } = this.userData.base;
		item.refreshSkill(skillID, skillData.includes(skillID), sect);
	}
	
	private listSkillClick(_, __, index: number) {
		const itemCfg = tableMgr.Item[this._skills[index]];
		UIUtility.ShowTipConfirm(itemCfg.Description, itemCfg.Name).then(v => {
			if (v) {
				this.userData.base.normalSkills[this._normalSelectIndex] = itemCfg.ID;
				this.view.refreshSelectSkill();
				this.view.showMain();
			}
		});
	}

	onDisable(): void {
		super.onDisable();
	}

	onDestroy(): void {
		super.onDestroy();
		this._skills.length = 0;
	}
}