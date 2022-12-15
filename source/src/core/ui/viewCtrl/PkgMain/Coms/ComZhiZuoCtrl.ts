import { GameUtil } from "../../../../common/GameUtil";
import { ItemHandleService } from "../../../../net/Services";
import { tableMgr } from "../../../../table/TableManager";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UIUtility } from "../../../tool/UIUtility";
import { ComZhiZuoMsg, ComZhiZuoView } from "../../../view/PkgMain/Coms/ComZhiZuoView";

export interface ComZhiZuoData {

}

export class ComZhiZuoCtrl extends BaseViewCtrl<ComZhiZuoView, ComZhiZuoData>{

	override onAwake(): void {
		this.addMessage(ComZhiZuoMsg.OnBtnFJZBClick, this.onBtnFJZBClick);
		this.addMessage(ComZhiZuoMsg.OnBtnFJBSClick, this.onBtnFJBSClick);
		this.addMessage(ComZhiZuoMsg.OnBtnYJHCClick, this.onBtnYJHCClick);
		this.addMessage(ComZhiZuoMsg.OnBtnJPYLClick, this.onBtnJPYLClick);
		this.addMessage(ComZhiZuoMsg.OnBtnDZZBClick, this.onBtnDZZBClick);
		this.addMessage(ComZhiZuoMsg.OnBtnZJZBClick, this.onBtnZJZBClick);
		this.addMessage(ComZhiZuoMsg.OnBtnCZZBClick, this.onBtnCZZBClick);
		this.addMessage(ComZhiZuoMsg.OnBtnBSHCClick, this.onBtnBSHCClick);
		this.addMessage(ComZhiZuoMsg.OnBtnZZTZClick, this.onBtnZZTZClick);

		const fjzbArr: string[] = [];//this._fjzbArr.map(v => GetColorStr(v, `${v}星装备`));
		for (let i = 1, max = +tableMgr.Const[ 1010 ].Value; i <= max; i++)
			fjzbArr.push(GameUtil.getColorStr(i, `${ i }星装备`));
		UIUtility.setCombox(this.view.CmbFJZBDJ, fjzbArr, fjzbArr, this, null, fjzbArr[ 0 ]);
	}

	override onEnable(): void {

	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

	private onBtnFJZBClick(): void {
		ItemHandleService.Inst.decomposeEquip({ star: this.view.CmbFJZBDJ.selectedIndex + 1 });
	}

	private onBtnFJBSClick(): void {

	}

	private onBtnYJHCClick(): void {

	}

	private onBtnJPYLClick(): void {

	}

	private onBtnDZZBClick(): void {

	}

	private onBtnZJZBClick(): void {

	}

	private onBtnCZZBClick(): void {

	}

	private onBtnBSHCClick(): void {

	}

	private onBtnZZTZClick(): void {

	}

}