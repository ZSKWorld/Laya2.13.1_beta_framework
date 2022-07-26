import { NotifyConst } from "../../../../common/NotifyConst";
import { InsertNotify } from "../../../../libs/event/EventMgr";
import { GetColorStr, GetLang } from "../../../../libs/utils/Util";
import { tableMgr } from "../../../../table/TableManager";
import { BaseViewCtrl, InsertKeyEvent, KeyEventType } from "../../../core/BaseViewCtrl";
import { UIPoolKey } from "../../../tool/UIPoolKey";
import { UIUtility } from "../../../tool/UIUtility";
import { ComItemInfoMsg, ComItemInfoView } from "../../../view/PkgMain/Coms/ComItemInfoView";

export interface ComItemInfoData {
    id: number;
    buy?: boolean;
}

export class ComItemInfoCtrl extends BaseViewCtrl<ComItemInfoView, ComItemInfoData>{

    onAwake(): void {
        super.onAwake();
        this.addMessageListener(ComItemInfoMsg.OnBtnBgClick, this.ComItemInfo_OnBtnBgClick);
        this.addMessageListener(ComItemInfoMsg.OnBtnShouCangClick, this.ComItemInfo_OnBtnShouCangClick);
        this.addMessageListener(ComItemInfoMsg.OnBtnUseClick, this.ComItemInfo_OnBtnUseClick);
        this.addMessageListener(ComItemInfoMsg.OnBtnBuyClick, this.ComItemInfo_OnBtnBuyClick);
        this.addMessageListener(ComItemInfoMsg.OnBtnSellClick, this.ComItemInfo_OnBtnSellClick);
        this.addMessageListener(ComItemInfoMsg.OnNumInput, this.OnNumInput);
    }

    onEnable(): void {
        super.onEnable();
        this.refreshContent();
    }
    @InsertNotify(NotifyConst.BagDataChanged)
    private refreshContent() {
        this.view.setContent(this.data.id, this.data.buy);
    }

    private OnNumInput() {
        const text = this.view.TxtUseNum.text;
        const textNum = +text;
        if (Number.isNaN(textNum))
            this.view.setNumText(+text.substring(0, text.length - 1) || 1);
        else if (Number.isSafeInteger(textNum) == false)
            this.view.setNumText(Number.MAX_SAFE_INTEGER);
        else if (textNum < 0)
            this.view.setNumText(Math.abs(textNum));
        else
            this.view.setNumText(Math.max(textNum, 1));
    }

    @InsertKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.ESCAPE)
    private ComItemInfo_OnBtnBgClick(): void {
        this.view.removeFromParent();
    }

    private ComItemInfo_OnBtnShouCangClick(): void {
        const isCangPin = this.userData.changeCangPin(this.data.id);
        const { Name, Quality } = tableMgr.Item[this.data.id];
        if (isCangPin) UIUtility.ShowTipInfo(`添加收藏：${GetColorStr(Quality, Name)}`);
        else UIUtility.ShowTipInfo(`移除收藏：${GetColorStr(Quality, Name)}`);
    }

    private ComItemInfo_OnBtnUseClick(): void {
        const count = +this.view.TxtUseNum.text;
        const errorCode = this.userData.useBagItem(this.data.id, count);
        if (errorCode) UIUtility.ShowTipInfo(GetLang(errorCode));
        else this.ComItemInfo_OnBtnBgClick();
    }

    private ComItemInfo_OnBtnBuyClick(): void {
        const count = +this.view.TxtUseNum.text;
        const errorCode = this.userData.buyShopItem(this.data.id, count);
        if (errorCode) UIUtility.ShowTipInfo(GetLang(errorCode));
        else this.ComItemInfo_OnBtnBgClick();
    }

    private ComItemInfo_OnBtnSellClick(): void {
        const count = +this.view.TxtUseNum.text;
        const errorCode = this.userData.sellBagItem(this.data.id, count);
        if (errorCode) UIUtility.ShowTipInfo(GetLang(errorCode));
        else this.ComItemInfo_OnBtnBgClick();
    }

    onDisable(): void {
        super.onDisable();
        Laya.Pool.recover(UIPoolKey.ItemInfo, this.view);
    }

    onDestroy(): void {
        super.onDestroy();
    }
}