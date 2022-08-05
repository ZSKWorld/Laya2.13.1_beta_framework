import { NotifyConst } from "../../../common/NotifyConst";
import { Logger } from "../../../libs/utils/Logger";
import { GetColorStr } from "../../../libs/utils/Util";
import { tableMgr } from "../../../table/TableManager";
import { BaseViewCtrl, InsertKeyEvent, KeyEventType } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { UISphereToolMsg, UISphereToolView } from "../../view/PkgMain/UISphereToolView";

export interface UISphereToolData {

}

interface AddType {
    id: number;
    count: number;
}

const logger = Logger.Create("UISphereToolCtrl").setEnable(true);

export class UISphereToolCtrl extends BaseViewCtrl<UISphereToolView, UISphereToolData>{

    private _adds: AddType[] = [];

    private _items: ConfigItemData[] = Object.keys(tableMgr.Item).map(v => tableMgr.Item[ v ]);

    onAwake(): void {
        super.onAwake();
        this.addMessageListener(UISphereToolMsg.OnBtnBgClick, this.UISphereTool_OnBtnBgClick);
        this.addMessageListener(UISphereToolMsg.OnBtnClearLogClick, this.UISphereTool_OnBtnClearLogClick);
        this.addMessageListener(UISphereToolMsg.OnBtnHFJLClick, this.UISphereTool_OnBtnHFJLClick);
        this.addMessageListener(UISphereToolMsg.OnBtnCreateClick, this.UISphereTool_OnBtnCreateClick);
        this.addMessageListener(UISphereToolMsg.OnBtnClearClick, this.UISphereTool_OnBtnClearClick);
        this.addMessageListener(UISphereToolMsg.OnBtnAddClick, this.UISphereTool_OnBtnAddClick);
        this.addMessageListener(UISphereToolMsg.OnBtnSubmitClick, this.UISphereTool_OnBtnSubmitClick);
        this.addMessageListener(UISphereToolMsg.OnBtnRemoveClick, this.UISphereTool_OnBtnRemoveClick);
        this.addMessageListener(UISphereToolMsg.OnBtnRemoveAllClick, this.UISphereTool_OnBtnRemoveAllClick);
        this.addMessageListener(UISphereToolMsg.OnIpt29Input, this.UISphereTool_OnIpt29Input);
        this.addMessageListener(UISphereToolMsg.OnCmbItemDropDownDisplay, this.UISphereTool_OnCmbItemDropDownDisplay);
        UIUtility.SetCombox(this.view.CmbItem, this._items.map(v => GetColorStr(v.Quality, v.Name)), this._items, null, null, null, 25);
    }

    onEnable(): void {
        super.onEnable();
        this.UISphereTool_OnBtnClearClick();
        this.UISphereTool_OnBtnRemoveAllClick();
    }

    @InsertKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.ESCAPE)
    private UISphereTool_OnBtnBgClick(): void {
        this.removeTop();
    }

    private UISphereTool_OnBtnClearLogClick(): void {
        this.dispatch(NotifyConst.ClearMainLog);
    }

    private UISphereTool_OnBtnHFJLClick(): void {
    }

    @InsertKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.ENTER)
    private UISphereTool_OnBtnCreateClick(): void {
        const { Ipt0, Ipt1, Ipt2, Ipt3, Ipt4, Ipt5, Ipt6, Ipt7, Ipt8, Ipt9, Ipt10, Ipt11, Ipt12, Ipt13, Ipt14, Ipt15, Ipt16, Ipt17, Ipt18, Ipt19, Ipt20, Ipt21, Ipt22, Ipt23, Ipt24, Ipt25, Ipt26, Ipt27, Ipt28, Ipt31, Ipt32 } = this.view;
        const { BtnCheck0, BtnCheck1, BtnCheck2, BtnCheck3, BtnCheck4, BtnCheck5, BtnCheck6, BtnCheck7, BtnCheck8, BtnCheck9, BtnCheck10, BtnCheck11, BtnCheck12, BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck16, BtnCheck17, BtnCheck18, BtnCheck19, BtnCheck20, BtnCheck21, BtnCheck22, BtnCheck23, BtnCheck24, BtnCheck25, BtnCheck26, BtnCheck27, BtnCheck28, BtnCheck31, BtnCheck32 } = this.view;
        const inputs = [ Ipt0, Ipt1, Ipt2, Ipt3, Ipt4, Ipt5, Ipt6, Ipt7, Ipt8, Ipt9, Ipt10, Ipt11, Ipt12, Ipt13, Ipt14, Ipt15, Ipt16, Ipt17, Ipt18, Ipt19, Ipt20, Ipt21, Ipt22, Ipt23, Ipt24, Ipt25, Ipt26, Ipt27, Ipt28, Ipt31, Ipt32 ];
        const checkBtns = [ BtnCheck0, BtnCheck1, BtnCheck2, BtnCheck3, BtnCheck4, BtnCheck5, BtnCheck6, BtnCheck7, BtnCheck8, BtnCheck9, BtnCheck10, BtnCheck11, BtnCheck12, BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck16, BtnCheck17, BtnCheck18, BtnCheck19, BtnCheck20, BtnCheck21, BtnCheck22, BtnCheck23, BtnCheck24, BtnCheck25, BtnCheck26, BtnCheck27, BtnCheck28, BtnCheck31, BtnCheck32 ];
        let str = "";
        let percent = !!this.view.BtnPercent.selected;
        inputs.forEach((v, index) => str += (+v.text ? `|${ index + 1 }-${ v.text }${ percent ? (`-${ +(!!checkBtns[ index ].selected) }`) : "" }` : ""));
        logger.log(str ? str.substring(1) : "无");
    }
    private UISphereTool_OnBtnClearClick() {
        const { Ipt0, Ipt1, Ipt2, Ipt3, Ipt4, Ipt5, Ipt6, Ipt7, Ipt8, Ipt9, Ipt10, Ipt11, Ipt12, Ipt13, Ipt14, Ipt15, Ipt16, Ipt17, Ipt18, Ipt19, Ipt20, Ipt21, Ipt22, Ipt23, Ipt24, Ipt25, Ipt26, Ipt27, Ipt28, Ipt31, Ipt32 } = this.view;
        const { BtnCheck0, BtnCheck1, BtnCheck2, BtnCheck3, BtnCheck4, BtnCheck5, BtnCheck6, BtnCheck7, BtnCheck8, BtnCheck9, BtnCheck10, BtnCheck11, BtnCheck12, BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck16, BtnCheck17, BtnCheck18, BtnCheck19, BtnCheck20, BtnCheck21, BtnCheck22, BtnCheck23, BtnCheck24, BtnCheck25, BtnCheck26, BtnCheck27, BtnCheck28, BtnCheck31, BtnCheck32 } = this.view;
        const inputs = [ Ipt0, Ipt1, Ipt2, Ipt3, Ipt4, Ipt5, Ipt6, Ipt7, Ipt8, Ipt9, Ipt10, Ipt11, Ipt12, Ipt13, Ipt14, Ipt15, Ipt16, Ipt17, Ipt18, Ipt19, Ipt20, Ipt21, Ipt22, Ipt23, Ipt24, Ipt25, Ipt26, Ipt27, Ipt28, Ipt31, Ipt32 ];
        const checkBtns = [ BtnCheck0, BtnCheck1, BtnCheck2, BtnCheck3, BtnCheck4, BtnCheck5, BtnCheck6, BtnCheck7, BtnCheck8, BtnCheck9, BtnCheck10, BtnCheck11, BtnCheck12, BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck16, BtnCheck17, BtnCheck18, BtnCheck19, BtnCheck20, BtnCheck21, BtnCheck22, BtnCheck23, BtnCheck24, BtnCheck25, BtnCheck26, BtnCheck27, BtnCheck28, BtnCheck31, BtnCheck32 ];

        inputs.forEach(v => v.text = "0");
        checkBtns.forEach(v => v.selected = false);
        [ BtnCheck13, BtnCheck14, BtnCheck15, BtnCheck22 ].forEach(v => v.selected = true);
    }
    private UISphereTool_OnIpt29Input() {
        const id = +this.view.Ipt29.text;
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[ i ].ID == id) {
                this.view.CmbItem.selectedIndex = i;
                return;
            }
        }
    }
    private UISphereTool_OnCmbItemDropDownDisplay(): void {
        const { selectedIndex, dropdown } = this.view.CmbItem;
        const list = dropdown.getChild("list").asList;
        list._children.forEach(
            (v, index) => v.asCom.getController("ctrlSelected").selectedIndex = Number(selectedIndex == index)
        );
        list.scrollToView(selectedIndex);
    }
    private UISphereTool_OnBtnAddClick(): void {
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
    private UISphereTool_OnBtnSubmitClick() {
        let str = "";
        this._adds.forEach(v => str += `|${ v.id }-${ v.count }`);
        logger.log(str ? str.substring(1) : "无");
    }
    private UISphereTool_OnBtnRemoveClick(): void {
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

    private UISphereTool_OnBtnRemoveAllClick() {
        this._adds.length = 0;
        this.view.refreshAdds(this._adds);
    }

    onDisable(): void {
        super.onDisable();
    }

    onDestroy(): void {
        super.onDestroy();
    }
}
