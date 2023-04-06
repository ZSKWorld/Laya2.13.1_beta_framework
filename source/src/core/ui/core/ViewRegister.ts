/**The script is automatically generated by BatMain.bat , please do not modify */
import BtnCheck from "../ui/PkgMain/BtnCheck";
import BtnCornerTxt from "../ui/PkgCommon/BtnCornerTxt";
import ComDongFu from "../ui/PkgMain/ComDongFu";
import ComItemInfo from "../ui/PkgMain/ComItemInfo";
import ComJueSe from "../ui/PkgMain/ComJueSe";
import ComLiLian from "../ui/PkgMain/ComLiLian";
import ComNumInput from "../ui/PkgCommon/ComNumInput";
import ComRenWu from "../ui/PkgMain/ComRenWu";
import ComShangCheng from "../ui/PkgMain/ComShangCheng";
import ComSkill from "../ui/PkgMain/ComSkill";
import ComTipInfo from "../ui/PkgCommon/ComTipInfo";
import ComWuPin from "../ui/PkgMain/ComWuPin";
import ComXinFa from "../ui/PkgMain/ComXinFa";
import ComZhiZuo from "../ui/PkgMain/ComZhiZuo";
import PkgBattleBinder from "../ui/PkgBattle/PkgBattleBinder";
import PkgCommonBinder from "../ui/PkgCommon/PkgCommonBinder";
import PkgLoginBinder from "../ui/PkgLogin/PkgLoginBinder";
import PkgMainBinder from "../ui/PkgMain/PkgMainBinder";
import RenderBag from "../ui/PkgMain/RenderBag";
import RenderChatMsg from "../ui/PkgMain/RenderChatMsg";
import RenderChooseBattle from "../ui/PkgBattle/RenderChooseBattle";
import RenderFriend from "../ui/PkgMain/RenderFriend";
import RenderText from "../ui/PkgMain/RenderText";
import UIBattle from "../ui/PkgBattle/UIBattle";
import UIChat from "../ui/PkgMain/UIChat";
import UIChooseBattle from "../ui/PkgBattle/UIChooseBattle";
import UIEquipmentInfo from "../ui/PkgMain/UIEquipmentInfo";
import UILoading1 from "../ui/PkgCommon/UILoading1";
import UILoading2 from "../ui/PkgCommon/UILoading2";
import UILoginMain from "../ui/PkgLogin/UILoginMain";
import UIMain from "../ui/PkgMain/UIMain";
import UIPlayerInfo from "../ui/PkgMain/UIPlayerInfo";
import UISect from "../ui/PkgMain/UISect";
import UISetting from "../ui/PkgMain/UISetting";
import UISphereTool from "../ui/PkgMain/UISphereTool";
import UITipConfirm from "../ui/PkgCommon/UITipConfirm";
import UIWaiting from "../ui/PkgCommon/UIWaiting";
import { BtnCheckCtrl } from "../viewCtrl/PkgMain/Btns/BtnCheckCtrl";
import { BtnCheckView } from "../view/PkgMain/Btns/BtnCheckView";
import { BtnCornerTxtCtrl } from "../viewCtrl/PkgCommon/Btns/BtnCornerTxtCtrl";
import { BtnCornerTxtView } from "../view/PkgCommon/Btns/BtnCornerTxtView";
import { ComDongFuCtrl } from "../viewCtrl/PkgMain/Coms/ComDongFuCtrl";
import { ComDongFuProxy } from "../viewProxy/PkgMain/Coms/ComDongFuProxy";
import { ComDongFuView } from "../view/PkgMain/Coms/ComDongFuView";
import { ComItemInfoCtrl } from "../viewCtrl/PkgMain/Coms/ComItemInfoCtrl";
import { ComItemInfoProxy } from "../viewProxy/PkgMain/Coms/ComItemInfoProxy";
import { ComItemInfoView } from "../view/PkgMain/Coms/ComItemInfoView";
import { ComJueSeCtrl } from "../viewCtrl/PkgMain/Coms/ComJueSeCtrl";
import { ComJueSeProxy } from "../viewProxy/PkgMain/Coms/ComJueSeProxy";
import { ComJueSeView } from "../view/PkgMain/Coms/ComJueSeView";
import { ComLiLianCtrl } from "../viewCtrl/PkgMain/Coms/ComLiLianCtrl";
import { ComLiLianProxy } from "../viewProxy/PkgMain/Coms/ComLiLianProxy";
import { ComLiLianView } from "../view/PkgMain/Coms/ComLiLianView";
import { ComNumInputCtrl } from "../viewCtrl/PkgCommon/Coms/ComNumInputCtrl";
import { ComNumInputProxy } from "../viewProxy/PkgCommon/Coms/ComNumInputProxy";
import { ComNumInputView } from "../view/PkgCommon/Coms/ComNumInputView";
import { ComRenWuCtrl } from "../viewCtrl/PkgMain/Coms/ComRenWuCtrl";
import { ComRenWuProxy } from "../viewProxy/PkgMain/Coms/ComRenWuProxy";
import { ComRenWuView } from "../view/PkgMain/Coms/ComRenWuView";
import { ComShangChengCtrl } from "../viewCtrl/PkgMain/Coms/ComShangChengCtrl";
import { ComShangChengProxy } from "../viewProxy/PkgMain/Coms/ComShangChengProxy";
import { ComShangChengView } from "../view/PkgMain/Coms/ComShangChengView";
import { ComSkillCtrl } from "../viewCtrl/PkgMain/Coms/ComSkillCtrl";
import { ComSkillProxy } from "../viewProxy/PkgMain/Coms/ComSkillProxy";
import { ComSkillView } from "../view/PkgMain/Coms/ComSkillView";
import { ComTipInfoCtrl } from "../viewCtrl/PkgCommon/Coms/ComTipInfoCtrl";
import { ComTipInfoProxy } from "../viewProxy/PkgCommon/Coms/ComTipInfoProxy";
import { ComTipInfoView } from "../view/PkgCommon/Coms/ComTipInfoView";
import { ComWuPinCtrl } from "../viewCtrl/PkgMain/Coms/ComWuPinCtrl";
import { ComWuPinProxy } from "../viewProxy/PkgMain/Coms/ComWuPinProxy";
import { ComWuPinView } from "../view/PkgMain/Coms/ComWuPinView";
import { ComXinFaCtrl } from "../viewCtrl/PkgMain/Coms/ComXinFaCtrl";
import { ComXinFaProxy } from "../viewProxy/PkgMain/Coms/ComXinFaProxy";
import { ComXinFaView } from "../view/PkgMain/Coms/ComXinFaView";
import { ComZhiZuoCtrl } from "../viewCtrl/PkgMain/Coms/ComZhiZuoCtrl";
import { ComZhiZuoProxy } from "../viewProxy/PkgMain/Coms/ComZhiZuoProxy";
import { ComZhiZuoView } from "../view/PkgMain/Coms/ComZhiZuoView";
import { Logger } from "../../libs/utils/Logger";
import { RenderBagCtrl } from "../viewCtrl/PkgMain/Renders/RenderBagCtrl";
import { RenderBagView } from "../view/PkgMain/Renders/RenderBagView";
import { RenderChatMsgCtrl } from "../viewCtrl/PkgMain/Renders/RenderChatMsgCtrl";
import { RenderChatMsgView } from "../view/PkgMain/Renders/RenderChatMsgView";
import { RenderChooseBattleCtrl } from "../viewCtrl/PkgBattle/Renders/RenderChooseBattleCtrl";
import { RenderChooseBattleView } from "../view/PkgBattle/Renders/RenderChooseBattleView";
import { RenderFriendCtrl } from "../viewCtrl/PkgMain/Renders/RenderFriendCtrl";
import { RenderFriendView } from "../view/PkgMain/Renders/RenderFriendView";
import { RenderTextCtrl } from "../viewCtrl/PkgMain/Renders/RenderTextCtrl";
import { RenderTextView } from "../view/PkgMain/Renders/RenderTextView";
import { UIBattleCtrl } from "../viewCtrl/PkgBattle/UIBattleCtrl";
import { UIBattleProxy } from "../viewProxy/PkgBattle/UIBattleProxy";
import { UIBattleView } from "../view/PkgBattle/UIBattleView";
import { UIChatCtrl } from "../viewCtrl/PkgMain/UIChatCtrl";
import { UIChatProxy } from "../viewProxy/PkgMain/UIChatProxy";
import { UIChatView } from "../view/PkgMain/UIChatView";
import { UIChooseBattleCtrl } from "../viewCtrl/PkgBattle/UIChooseBattleCtrl";
import { UIChooseBattleProxy } from "../viewProxy/PkgBattle/UIChooseBattleProxy";
import { UIChooseBattleView } from "../view/PkgBattle/UIChooseBattleView";
import { UIEquipmentInfoCtrl } from "../viewCtrl/PkgMain/UIEquipmentInfoCtrl";
import { UIEquipmentInfoProxy } from "../viewProxy/PkgMain/UIEquipmentInfoProxy";
import { UIEquipmentInfoView } from "../view/PkgMain/UIEquipmentInfoView";
import { UILoading1Ctrl } from "../viewCtrl/PkgCommon/UILoading1Ctrl";
import { UILoading1Proxy } from "../viewProxy/PkgCommon/UILoading1Proxy";
import { UILoading1View } from "../view/PkgCommon/UILoading1View";
import { UILoading2Ctrl } from "../viewCtrl/PkgCommon/UILoading2Ctrl";
import { UILoading2Proxy } from "../viewProxy/PkgCommon/UILoading2Proxy";
import { UILoading2View } from "../view/PkgCommon/UILoading2View";
import { UILoginMainCtrl } from "../viewCtrl/PkgLogin/UILoginMainCtrl";
import { UILoginMainProxy } from "../viewProxy/PkgLogin/UILoginMainProxy";
import { UILoginMainView } from "../view/PkgLogin/UILoginMainView";
import { UIMainCtrl } from "../viewCtrl/PkgMain/UIMainCtrl";
import { UIMainProxy } from "../viewProxy/PkgMain/UIMainProxy";
import { UIMainView } from "../view/PkgMain/UIMainView";
import { UIPlayerInfoCtrl } from "../viewCtrl/PkgMain/UIPlayerInfoCtrl";
import { UIPlayerInfoProxy } from "../viewProxy/PkgMain/UIPlayerInfoProxy";
import { UIPlayerInfoView } from "../view/PkgMain/UIPlayerInfoView";
import { UISectCtrl } from "../viewCtrl/PkgMain/UISectCtrl";
import { UISectProxy } from "../viewProxy/PkgMain/UISectProxy";
import { UISectView } from "../view/PkgMain/UISectView";
import { UISettingCtrl } from "../viewCtrl/PkgMain/UISettingCtrl";
import { UISettingProxy } from "../viewProxy/PkgMain/UISettingProxy";
import { UISettingView } from "../view/PkgMain/UISettingView";
import { UISphereToolCtrl } from "../viewCtrl/PkgMain/UISphereToolCtrl";
import { UISphereToolProxy } from "../viewProxy/PkgMain/UISphereToolProxy";
import { UISphereToolView } from "../view/PkgMain/UISphereToolView";
import { UITipConfirmCtrl } from "../viewCtrl/PkgCommon/UITipConfirmCtrl";
import { UITipConfirmProxy } from "../viewProxy/PkgCommon/UITipConfirmProxy";
import { UITipConfirmView } from "../view/PkgCommon/UITipConfirmView";
import { UIWaitingCtrl } from "../viewCtrl/PkgCommon/UIWaitingCtrl";
import { UIWaitingProxy } from "../viewProxy/PkgCommon/UIWaitingProxy";
import { UIWaitingView } from "../view/PkgCommon/UIWaitingView";
import { ViewID } from "./ViewID";
import { uiMgr } from "./UIManager";

const logger = Logger.Create("ViewRegister", true);

class ViewRegister {

    Init() {
        this.pkgBind();
        this.viewBind();
        this.registerView();
    }

    /**包bind */
    private pkgBind() {
		PkgBattleBinder.bindAll();
		PkgCommonBinder.bindAll();
		PkgLoginBinder.bindAll();
		PkgMainBinder.bindAll();
	}

    /**页面替换bind */
    private viewBind() {
		//Btns
		fgui.UIObjectFactory.setExtension(BtnCornerTxt.URL, BtnCornerTxtView);
		fgui.UIObjectFactory.setExtension(BtnCheck.URL, BtnCheckView);

		//Renders
		fgui.UIObjectFactory.setExtension(RenderChooseBattle.URL, RenderChooseBattleView);
		fgui.UIObjectFactory.setExtension(RenderBag.URL, RenderBagView);
		fgui.UIObjectFactory.setExtension(RenderChatMsg.URL, RenderChatMsgView);
		fgui.UIObjectFactory.setExtension(RenderFriend.URL, RenderFriendView);
		fgui.UIObjectFactory.setExtension(RenderText.URL, RenderTextView);

		//Coms
		fgui.UIObjectFactory.setExtension(ComNumInput.URL, ComNumInputView);
		fgui.UIObjectFactory.setExtension(ComTipInfo.URL, ComTipInfoView);
		fgui.UIObjectFactory.setExtension(ComDongFu.URL, ComDongFuView);
		fgui.UIObjectFactory.setExtension(ComItemInfo.URL, ComItemInfoView);
		fgui.UIObjectFactory.setExtension(ComJueSe.URL, ComJueSeView);
		fgui.UIObjectFactory.setExtension(ComLiLian.URL, ComLiLianView);
		fgui.UIObjectFactory.setExtension(ComRenWu.URL, ComRenWuView);
		fgui.UIObjectFactory.setExtension(ComShangCheng.URL, ComShangChengView);
		fgui.UIObjectFactory.setExtension(ComSkill.URL, ComSkillView);
		fgui.UIObjectFactory.setExtension(ComWuPin.URL, ComWuPinView);
		fgui.UIObjectFactory.setExtension(ComXinFa.URL, ComXinFaView);
		fgui.UIObjectFactory.setExtension(ComZhiZuo.URL, ComZhiZuoView);

		//UIs
		fgui.UIObjectFactory.setExtension(UIBattle.URL, UIBattleView);
		fgui.UIObjectFactory.setExtension(UIChooseBattle.URL, UIChooseBattleView);
		fgui.UIObjectFactory.setExtension(UILoading1.URL, UILoading1View);
		fgui.UIObjectFactory.setExtension(UILoading2.URL, UILoading2View);
		fgui.UIObjectFactory.setExtension(UITipConfirm.URL, UITipConfirmView);
		fgui.UIObjectFactory.setExtension(UIWaiting.URL, UIWaitingView);
		fgui.UIObjectFactory.setExtension(UILoginMain.URL, UILoginMainView);
		fgui.UIObjectFactory.setExtension(UIChat.URL, UIChatView);
		fgui.UIObjectFactory.setExtension(UIEquipmentInfo.URL, UIEquipmentInfoView);
		fgui.UIObjectFactory.setExtension(UIMain.URL, UIMainView);
		fgui.UIObjectFactory.setExtension(UIPlayerInfo.URL, UIPlayerInfoView);
		fgui.UIObjectFactory.setExtension(UISect.URL, UISectView);
		fgui.UIObjectFactory.setExtension(UISetting.URL, UISettingView);
		fgui.UIObjectFactory.setExtension(UISphereTool.URL, UISphereToolView);
	}

    /**页面注册 */
    private registerView() {
		const register = uiMgr.registView.bind(uiMgr);
		//Btns
		register(ViewID.BtnCornerTxtView, BtnCornerTxtView, BtnCornerTxtCtrl);
		register(ViewID.BtnCheckView, BtnCheckView, BtnCheckCtrl);

		//Renders
		register(ViewID.RenderChooseBattleView, RenderChooseBattleView, RenderChooseBattleCtrl);
		register(ViewID.RenderBagView, RenderBagView, RenderBagCtrl);
		register(ViewID.RenderChatMsgView, RenderChatMsgView, RenderChatMsgCtrl);
		register(ViewID.RenderFriendView, RenderFriendView, RenderFriendCtrl);
		register(ViewID.RenderTextView, RenderTextView, RenderTextCtrl);

		//Coms
		register(ViewID.ComNumInputView, ComNumInputView, ComNumInputCtrl, ComNumInputProxy);
		register(ViewID.ComTipInfoView, ComTipInfoView, ComTipInfoCtrl, ComTipInfoProxy);
		register(ViewID.ComDongFuView, ComDongFuView, ComDongFuCtrl, ComDongFuProxy);
		register(ViewID.ComItemInfoView, ComItemInfoView, ComItemInfoCtrl, ComItemInfoProxy);
		register(ViewID.ComJueSeView, ComJueSeView, ComJueSeCtrl, ComJueSeProxy);
		register(ViewID.ComLiLianView, ComLiLianView, ComLiLianCtrl, ComLiLianProxy);
		register(ViewID.ComRenWuView, ComRenWuView, ComRenWuCtrl, ComRenWuProxy);
		register(ViewID.ComShangChengView, ComShangChengView, ComShangChengCtrl, ComShangChengProxy);
		register(ViewID.ComSkillView, ComSkillView, ComSkillCtrl, ComSkillProxy);
		register(ViewID.ComWuPinView, ComWuPinView, ComWuPinCtrl, ComWuPinProxy);
		register(ViewID.ComXinFaView, ComXinFaView, ComXinFaCtrl, ComXinFaProxy);
		register(ViewID.ComZhiZuoView, ComZhiZuoView, ComZhiZuoCtrl, ComZhiZuoProxy);

		//UIs
		register(ViewID.UIBattleView, UIBattleView, UIBattleCtrl, UIBattleProxy);
		register(ViewID.UIChooseBattleView, UIChooseBattleView, UIChooseBattleCtrl, UIChooseBattleProxy);
		register(ViewID.UILoading1View, UILoading1View, UILoading1Ctrl, UILoading1Proxy);
		register(ViewID.UILoading2View, UILoading2View, UILoading2Ctrl, UILoading2Proxy);
		register(ViewID.UITipConfirmView, UITipConfirmView, UITipConfirmCtrl, UITipConfirmProxy);
		register(ViewID.UIWaitingView, UIWaitingView, UIWaitingCtrl, UIWaitingProxy);
		register(ViewID.UILoginMainView, UILoginMainView, UILoginMainCtrl, UILoginMainProxy);
		register(ViewID.UIChatView, UIChatView, UIChatCtrl, UIChatProxy);
		register(ViewID.UIEquipmentInfoView, UIEquipmentInfoView, UIEquipmentInfoCtrl, UIEquipmentInfoProxy);
		register(ViewID.UIMainView, UIMainView, UIMainCtrl, UIMainProxy);
		register(ViewID.UIPlayerInfoView, UIPlayerInfoView, UIPlayerInfoCtrl, UIPlayerInfoProxy);
		register(ViewID.UISectView, UISectView, UISectCtrl, UISectProxy);
		register(ViewID.UISettingView, UISettingView, UISettingCtrl, UISettingProxy);
		register(ViewID.UISphereToolView, UISphereToolView, UISphereToolCtrl, UISphereToolProxy);
	}
}
export const uiRegister = new ViewRegister();