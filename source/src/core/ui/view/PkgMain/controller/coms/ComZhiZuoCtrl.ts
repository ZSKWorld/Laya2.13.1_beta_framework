import { GameUtil } from "../../../../../common/GameUtil";
import { BaseViewCtrl } from "../../../../core/BaseViewCtrl";
import { UIUtil } from "../../../../tool/UIUtil";
import { ComZhiZuoMsg, ComZhiZuoView } from "../../view/coms/ComZhiZuoView";

export interface ComZhiZuoData {

}

export class ComZhiZuoCtrl extends BaseViewCtrl<ComZhiZuoView, ComZhiZuoData> {

	override onAdded() {
		this.addMessage(ComZhiZuoMsg.OnBtnJpylClick, this.onBtnJpylClick);
		this.addMessage(ComZhiZuoMsg.OnBtnDzzbClick, this.onBtnDzzbClick);
		this.addMessage(ComZhiZuoMsg.OnBtnZjzbClick, this.onBtnZjzbClick);
		this.addMessage(ComZhiZuoMsg.OnBtnCzzbClick, this.onBtnCzzbClick);
		this.addMessage(ComZhiZuoMsg.OnBtnBshcClick, this.onBtnBshcClick);
		this.addMessage(ComZhiZuoMsg.OnBtnZztzClick, this.onBtnZztzClick);
		this.addMessage(ComZhiZuoMsg.OnBtnFjzbClick, this.onBtnFjzbClick);
		this.addMessage(ComZhiZuoMsg.OnBtnFjbsClick, this.onBtnFjbsClick);
		this.addMessage(ComZhiZuoMsg.OnBtnYjhcClick, this.onBtnYjhcClick);

		const fjzbArr: string[] = [];//this._fjzbArr.map(v => GetColorStr(v, `${v}星装备`));
		for (let i = 1, max = +cfgMgr.Const[1010].value; i <= max; i++)
			fjzbArr.push(GameUtil.getColorStr(i, `${ i }星装备`));
		UIUtil.setCombox(this.view.cmb_fjzbdj, fjzbArr, fjzbArr, this, null, fjzbArr[0]);
	}

	private onBtnJpylClick() {

	}

	private onBtnDzzbClick() {

	}

	private onBtnZjzbClick() {

	}

	private onBtnCzzbClick() {

	}

	private onBtnBshcClick() {

	}

	private onBtnZztzClick() {

	}

	private onBtnFjzbClick() {
		netService.decomposeEquip({ star: this.view.cmb_fjzbdj.selectedIndex + 1 });
	}

	private onBtnFjbsClick() {
		netService.decomposeGem({ level: this.view.cmb_fjbsdj.selectedIndex + 1 });
	}

	private onBtnYjhcClick() {

	}

}