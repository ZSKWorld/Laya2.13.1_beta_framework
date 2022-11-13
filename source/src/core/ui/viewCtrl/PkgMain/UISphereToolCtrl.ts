import { GameEvent } from "../../../common/GameEvent";
import { GameUtil } from "../../../common/GameUtil";
import { Logger } from "../../../libs/utils/Logger";
import { tableMgr } from "../../../table/TableManager";
import { BaseViewCtrl, InsertKeyEvent, KeyEvent } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UISphereToolMsg, UISphereToolView } from "../../view/PkgMain/UISphereToolView";

export interface UISphereToolData {

}

interface AddType {
    id: number;
    count: number;
}

const logger = Logger.Create("UISphereToolCtrl", true);

export class UISphereToolCtrl extends BaseViewCtrl<UISphereToolView, UISphereToolData>{

    private _adds: AddType[] = [];

    private _items: ConfigItemData[] = Object.keys(tableMgr.Item).map(v => tableMgr.Item[ v ]);

	override onAwake(): void {
		this.addMessageListener(UISphereToolMsg.OnBtnBgClick, this.onBtnBgClick);
		this.addMessageListener(UISphereToolMsg.OnBtnClearLogClick, this.onBtnClearLogClick);
		this.addMessageListener(UISphereToolMsg.OnBtnHFJLClick, this.onBtnHFJLClick);
		this.addMessageListener(UISphereToolMsg.OnBtnCreateClick, this.onBtnCreateClick);
		this.addMessageListener(UISphereToolMsg.OnBtnClearClick, this.onBtnClearClick);
		this.addMessageListener(UISphereToolMsg.OnBtnAddClick, this.onBtnAddClick);
		this.addMessageListener(UISphereToolMsg.OnBtnSubmitClick, this.onBtnSubmitClick);
		this.addMessageListener(UISphereToolMsg.OnBtnRemoveClick, this.onBtnRemoveClick);
		this.addMessageListener(UISphereToolMsg.OnBtnRemoveAllClick, this.onBtnRemoveAllClick);
        this.addMessageListener(UISphereToolMsg.OnIpt29Input, this.onIpt29Input);
        this.addMessageListener(UISphereToolMsg.OnCmbItemDropDownDisplay, this.onCmbItemDropDownDisplay);
        UIUtility.setCombox(this.view.CmbItem, this._items.map(v => GameUtil.getColorStr(v.Quality, v.Name)), this._items, null, null, null, 25);
	}

	override onEnable(): void {
        this.onBtnClearClick();
        this.onBtnRemoveAllClick();
	}

	override onDisable(): void {

	}

	override onDestroy(): void {

	}

    @InsertKeyEvent(KeyEvent.KeyUp, Laya.Keyboard.ESCAPE)
	private onBtnBgClick(): void {
		this.removeTopView();
	}

	private onBtnClearLogClick(): void {
        this.dispatch(GameEvent.ClearExperienceLog);
	}

	private onBtnHFJLClick(): void {

	}

    @InsertKeyEvent(KeyEvent.KeyUp, Laya.Keyboard.ENTER)
	private onBtnCreateClick(): void {
        const { Ipt0, Ipt1, Ipt2, Ipt3, Ipt4, Ipt5, Ipt6, Ipt7, Ipt8, Ipt9, Ipt10, Ipt11, Ipt12, Ipt13, Ipt14, Ipt15, Ipt16, Ipt17, Ipt18, Ipt19, Ipt20, Ipt21, Ipt22, Ipt23, Ipt24, Ipt25, Ipt26, Ipt27, Ipt28, Ipt31, Ipt32 } = this.view;
        const { BtnCheck0, BtnCheck1, BtnCheck2, BtnCheck3, BtnCheck4, BtnCheck5, BtnCheck6, BtnCheck7, BtnCheck8, BtnCheck9, BtnCheck10, BtnCheck11, BtnCheck12, BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck16, BtnCheck17, BtnCheck18, BtnCheck19, BtnCheck20, BtnCheck21, BtnCheck22, BtnCheck23, BtnCheck24, BtnCheck25, BtnCheck26, BtnCheck27, BtnCheck28, BtnCheck31, BtnCheck32 } = this.view;
        const inputs = [ Ipt0, Ipt1, Ipt2, Ipt3, Ipt4, Ipt5, Ipt6, Ipt7, Ipt8, Ipt9, Ipt10, Ipt11, Ipt12, Ipt13, Ipt14, Ipt15, Ipt16, Ipt17, Ipt18, Ipt19, Ipt20, Ipt21, Ipt22, Ipt23, Ipt24, Ipt25, Ipt26, Ipt27, Ipt28, Ipt31, Ipt32 ];
        const checkBtns = [ BtnCheck0, BtnCheck1, BtnCheck2, BtnCheck3, BtnCheck4, BtnCheck5, BtnCheck6, BtnCheck7, BtnCheck8, BtnCheck9, BtnCheck10, BtnCheck11, BtnCheck12, BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck16, BtnCheck17, BtnCheck18, BtnCheck19, BtnCheck20, BtnCheck21, BtnCheck22, BtnCheck23, BtnCheck24, BtnCheck25, BtnCheck26, BtnCheck27, BtnCheck28, BtnCheck31, BtnCheck32 ];
        let str = "";
        let percent = !!this.view.BtnPercent.selected;
        inputs.forEach((v, index) => str += (+v.text ? `|${ index + 1 }-${ v.text }${ percent ? (`-${ +(!!checkBtns[ index ].selected) }`) : "" }` : ""));
        logger.log(str ? str.substring(1) : "无");
	}

	private onBtnClearClick(): void {
        const { Ipt0, Ipt1, Ipt2, Ipt3, Ipt4, Ipt5, Ipt6, Ipt7, Ipt8, Ipt9, Ipt10, Ipt11, Ipt12, Ipt13, Ipt14, Ipt15, Ipt16, Ipt17, Ipt18, Ipt19, Ipt20, Ipt21, Ipt22, Ipt23, Ipt24, Ipt25, Ipt26, Ipt27, Ipt28, Ipt31, Ipt32 } = this.view;
        const { BtnCheck0, BtnCheck1, BtnCheck2, BtnCheck3, BtnCheck4, BtnCheck5, BtnCheck6, BtnCheck7, BtnCheck8, BtnCheck9, BtnCheck10, BtnCheck11, BtnCheck12, BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck16, BtnCheck17, BtnCheck18, BtnCheck19, BtnCheck20, BtnCheck21, BtnCheck22, BtnCheck23, BtnCheck24, BtnCheck25, BtnCheck26, BtnCheck27, BtnCheck28, BtnCheck31, BtnCheck32 } = this.view;
        const inputs = [ Ipt0, Ipt1, Ipt2, Ipt3, Ipt4, Ipt5, Ipt6, Ipt7, Ipt8, Ipt9, Ipt10, Ipt11, Ipt12, Ipt13, Ipt14, Ipt15, Ipt16, Ipt17, Ipt18, Ipt19, Ipt20, Ipt21, Ipt22, Ipt23, Ipt24, Ipt25, Ipt26, Ipt27, Ipt28, Ipt31, Ipt32 ];
        const checkBtns = [ BtnCheck0, BtnCheck1, BtnCheck2, BtnCheck3, BtnCheck4, BtnCheck5, BtnCheck6, BtnCheck7, BtnCheck8, BtnCheck9, BtnCheck10, BtnCheck11, BtnCheck12, BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck16, BtnCheck17, BtnCheck18, BtnCheck19, BtnCheck20, BtnCheck21, BtnCheck22, BtnCheck23, BtnCheck24, BtnCheck25, BtnCheck26, BtnCheck27, BtnCheck28, BtnCheck31, BtnCheck32 ];

        inputs.forEach(v => v.text = "0");
        checkBtns.forEach(v => v.selected = false);
        [ BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck22 ].forEach(v => v.selected = true);
	}

	private onIpt29Input(){
        const id = +this.view.Ipt29.text;
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[ i ].ID == id) {
                this.view.CmbItem.selectedIndex = i;
                return;
            }
        }
	}

	private onCmbItemDropDownDisplay(){
        const { selectedIndex, dropdown } = this.view.CmbItem;
        const list = dropdown.getChild("list").asList;
        list._children.forEach(
            (v, index) => v.asCom.getController("ctrlSelected").selectedIndex = Number(selectedIndex == index)
        );
        list.scrollToView(selectedIndex);
	}

	private onBtnAddClick(): void {
        const item = this._items[ this.view.CmbItem.selectedIndex ];
        const count = +this.view.Ipt30.text;
        if (count > 0) {
            let exist: AddType;
            for (let i = 0; i < this._adds.length; i++) {
                if (this._adds[ i ].id == item.ID) {
                    exist = this._adds[ i ];
                    exist.count += count;
                    break;
                }
            }
            !exist && this._adds.push({ id: item.ID, count });
            this.view.refreshAdds(this._adds);
        }
	}

	private onBtnSubmitClick(): void {
        let str = "";
        this._adds.forEach(v => str += `|${ v.id }-${ v.count }`);
        logger.log(str ? str.substring(1) : "无");
	}

	private onBtnRemoveClick(): void {
        const item = this._items[ this.view.CmbItem.selectedIndex ];
        const count = +this.view.Ipt30.text;
        if (count > 0) {
            for (let i = 0; i < this._adds.length; i++) {
                if (this._adds[ i ].id == item.ID) {
                    this._adds[ i ].count -= count;
                    this._adds[ i ].count <= 0 && this._adds.splice(i, 1);
                    break;
                }
            }
            this.view.refreshAdds(this._adds);
        }
	}

	private onBtnRemoveAllClick(): void {
        this._adds.length = 0;
        this.view.refreshAdds(this._adds);
	}

}