/**The script is automatically generated by BatMain.bat , please do not modify */
import BtnCheck from "../ui/PkgMain/BtnCheck";
import BtnCornerTxt from "../ui/PkgCommon/BtnCornerTxt";
import ComAbode from "../ui/PkgMain/ComAbode";
import ComBattleConfirm from "../ui/PkgBattle/ComBattleConfirm";
import ComChar from "../ui/PkgMain/ComChar";
import ComConfirm from "../ui/PkgCommon/ComConfirm";
import ComGoods from "../ui/PkgMain/ComGoods";
import ComGoodsInfo from "../ui/PkgMain/ComGoodsInfo";
import ComRenWu from "../ui/PkgMain/ComRenWu";
import ComShop from "../ui/PkgMain/ComShop";
import ComSkill from "../ui/PkgMain/ComSkill";
import ComTipInfo from "../ui/PkgCommon/ComTipInfo";
import ComTrain from "../ui/PkgMain/ComTrain";
import ComXinFa from "../ui/PkgMain/ComXinFa";
import ComZhiZuo from "../ui/PkgMain/ComZhiZuo";
import PkgBattleBinder from "../ui/PkgBattle/PkgBattleBinder";
import PkgCommonBinder from "../ui/PkgCommon/PkgCommonBinder";
import PkgLoginBinder from "../ui/PkgLogin/PkgLoginBinder";
import PkgMainBinder from "../ui/PkgMain/PkgMainBinder";
import RenderChatMsg from "../ui/PkgMain/RenderChatMsg";
import RenderChooseBattle from "../ui/PkgBattle/RenderChooseBattle";
import RenderFriend from "../ui/PkgMain/RenderFriend";
import RenderGoods from "../ui/PkgMain/RenderGoods";
import RenderText from "../ui/PkgMain/RenderText";
import UIBattle from "../ui/PkgBattle/UIBattle";
import UIBattleConfirm from "../ui/PkgBattle/UIBattleConfirm";
import UIChat from "../ui/PkgMain/UIChat";
import UIChooseBattle from "../ui/PkgBattle/UIChooseBattle";
import UIChooseNum from "../ui/PkgCommon/UIChooseNum";
import UIConfirm from "../ui/PkgCommon/UIConfirm";
import UIEquipmentInfo from "../ui/PkgMain/UIEquipmentInfo";
import UIGoodsInfo from "../ui/PkgMain/UIGoodsInfo";
import UILoading1 from "../ui/PkgCommon/UILoading1";
import UILoading2 from "../ui/PkgCommon/UILoading2";
import UILogin from "../ui/PkgLogin/UILogin";
import UIMain from "../ui/PkgMain/UIMain";
import UIPlayerInfo from "../ui/PkgMain/UIPlayerInfo";
import UISect from "../ui/PkgMain/UISect";
import UISetting from "../ui/PkgMain/UISetting";
import UISphereTool from "../ui/PkgMain/UISphereTool";
import UIWaiting from "../ui/PkgCommon/UIWaiting";
import { BtnCheckCtrl } from "../view/PkgMain/controller/btns/BtnCheckCtrl";
import { BtnCheckView } from "../view/PkgMain/view/btns/BtnCheckView";
import { BtnCornerTxtCtrl } from "../view/PkgCommon/controller/btns/BtnCornerTxtCtrl";
import { BtnCornerTxtView } from "../view/PkgCommon/view/btns/BtnCornerTxtView";
import { ComAbodeCtrl } from "../view/PkgMain/controller/coms/ComAbodeCtrl";
import { ComAbodeView } from "../view/PkgMain/view/coms/ComAbodeView";
import { ComBattleConfirmCtrl } from "../view/PkgBattle/controller/coms/ComBattleConfirmCtrl";
import { ComBattleConfirmView } from "../view/PkgBattle/view/coms/ComBattleConfirmView";
import { ComCharCtrl } from "../view/PkgMain/controller/coms/ComCharCtrl";
import { ComCharView } from "../view/PkgMain/view/coms/ComCharView";
import { ComConfirmCtrl } from "../view/PkgCommon/controller/coms/ComConfirmCtrl";
import { ComConfirmView } from "../view/PkgCommon/view/coms/ComConfirmView";
import { ComGoodsCtrl } from "../view/PkgMain/controller/coms/ComGoodsCtrl";
import { ComGoodsInfoCtrl } from "../view/PkgMain/controller/coms/ComGoodsInfoCtrl";
import { ComGoodsInfoView } from "../view/PkgMain/view/coms/ComGoodsInfoView";
import { ComGoodsView } from "../view/PkgMain/view/coms/ComGoodsView";
import { ComRenWuCtrl } from "../view/PkgMain/controller/coms/ComRenWuCtrl";
import { ComRenWuView } from "../view/PkgMain/view/coms/ComRenWuView";
import { ComShopCtrl } from "../view/PkgMain/controller/coms/ComShopCtrl";
import { ComShopView } from "../view/PkgMain/view/coms/ComShopView";
import { ComSkillCtrl } from "../view/PkgMain/controller/coms/ComSkillCtrl";
import { ComSkillView } from "../view/PkgMain/view/coms/ComSkillView";
import { ComTipInfoCtrl } from "../view/PkgCommon/controller/coms/ComTipInfoCtrl";
import { ComTipInfoView } from "../view/PkgCommon/view/coms/ComTipInfoView";
import { ComTrainCtrl } from "../view/PkgMain/controller/coms/ComTrainCtrl";
import { ComTrainView } from "../view/PkgMain/view/coms/ComTrainView";
import { ComXinFaCtrl } from "../view/PkgMain/controller/coms/ComXinFaCtrl";
import { ComXinFaView } from "../view/PkgMain/view/coms/ComXinFaView";
import { ComZhiZuoCtrl } from "../view/PkgMain/controller/coms/ComZhiZuoCtrl";
import { ComZhiZuoView } from "../view/PkgMain/view/coms/ComZhiZuoView";
import { RenderChatMsgCtrl } from "../view/PkgMain/controller/renders/RenderChatMsgCtrl";
import { RenderChatMsgView } from "../view/PkgMain/view/renders/RenderChatMsgView";
import { RenderChooseBattleCtrl } from "../view/PkgBattle/controller/renders/RenderChooseBattleCtrl";
import { RenderChooseBattleView } from "../view/PkgBattle/view/renders/RenderChooseBattleView";
import { RenderFriendCtrl } from "../view/PkgMain/controller/renders/RenderFriendCtrl";
import { RenderFriendView } from "../view/PkgMain/view/renders/RenderFriendView";
import { RenderGoodsCtrl } from "../view/PkgMain/controller/renders/RenderGoodsCtrl";
import { RenderGoodsView } from "../view/PkgMain/view/renders/RenderGoodsView";
import { RenderTextCtrl } from "../view/PkgMain/controller/renders/RenderTextCtrl";
import { RenderTextView } from "../view/PkgMain/view/renders/RenderTextView";
import { UIBattleConfirmCtrl } from "../view/PkgBattle/controller/UIBattleConfirmCtrl";
import { UIBattleConfirmProxy } from "../view/PkgBattle/proxy/UIBattleConfirmProxy";
import { UIBattleConfirmView } from "../view/PkgBattle/view/UIBattleConfirmView";
import { UIBattleCtrl } from "../view/PkgBattle/controller/UIBattleCtrl";
import { UIBattleProxy } from "../view/PkgBattle/proxy/UIBattleProxy";
import { UIBattleView } from "../view/PkgBattle/view/UIBattleView";
import { UIChatCtrl } from "../view/PkgMain/controller/UIChatCtrl";
import { UIChatProxy } from "../view/PkgMain/proxy/UIChatProxy";
import { UIChatView } from "../view/PkgMain/view/UIChatView";
import { UIChooseBattleCtrl } from "../view/PkgBattle/controller/UIChooseBattleCtrl";
import { UIChooseBattleProxy } from "../view/PkgBattle/proxy/UIChooseBattleProxy";
import { UIChooseBattleView } from "../view/PkgBattle/view/UIChooseBattleView";
import { UIChooseNumCtrl } from "../view/PkgCommon/controller/UIChooseNumCtrl";
import { UIChooseNumProxy } from "../view/PkgCommon/proxy/UIChooseNumProxy";
import { UIChooseNumView } from "../view/PkgCommon/view/UIChooseNumView";
import { UIConfirmCtrl } from "../view/PkgCommon/controller/UIConfirmCtrl";
import { UIConfirmProxy } from "../view/PkgCommon/proxy/UIConfirmProxy";
import { UIConfirmView } from "../view/PkgCommon/view/UIConfirmView";
import { UIEquipmentInfoCtrl } from "../view/PkgMain/controller/UIEquipmentInfoCtrl";
import { UIEquipmentInfoProxy } from "../view/PkgMain/proxy/UIEquipmentInfoProxy";
import { UIEquipmentInfoView } from "../view/PkgMain/view/UIEquipmentInfoView";
import { UIGoodsInfoCtrl } from "../view/PkgMain/controller/UIGoodsInfoCtrl";
import { UIGoodsInfoProxy } from "../view/PkgMain/proxy/UIGoodsInfoProxy";
import { UIGoodsInfoView } from "../view/PkgMain/view/UIGoodsInfoView";
import { UILoading1Ctrl } from "../view/PkgCommon/controller/UILoading1Ctrl";
import { UILoading1Proxy } from "../view/PkgCommon/proxy/UILoading1Proxy";
import { UILoading1View } from "../view/PkgCommon/view/UILoading1View";
import { UILoading2Ctrl } from "../view/PkgCommon/controller/UILoading2Ctrl";
import { UILoading2Proxy } from "../view/PkgCommon/proxy/UILoading2Proxy";
import { UILoading2View } from "../view/PkgCommon/view/UILoading2View";
import { UILoginCtrl } from "../view/PkgLogin/controller/UILoginCtrl";
import { UILoginProxy } from "../view/PkgLogin/proxy/UILoginProxy";
import { UILoginView } from "../view/PkgLogin/view/UILoginView";
import { UIMainCtrl } from "../view/PkgMain/controller/UIMainCtrl";
import { UIMainProxy } from "../view/PkgMain/proxy/UIMainProxy";
import { UIMainView } from "../view/PkgMain/view/UIMainView";
import { UIPlayerInfoCtrl } from "../view/PkgMain/controller/UIPlayerInfoCtrl";
import { UIPlayerInfoProxy } from "../view/PkgMain/proxy/UIPlayerInfoProxy";
import { UIPlayerInfoView } from "../view/PkgMain/view/UIPlayerInfoView";
import { UISectCtrl } from "../view/PkgMain/controller/UISectCtrl";
import { UISectProxy } from "../view/PkgMain/proxy/UISectProxy";
import { UISectView } from "../view/PkgMain/view/UISectView";
import { UISettingCtrl } from "../view/PkgMain/controller/UISettingCtrl";
import { UISettingProxy } from "../view/PkgMain/proxy/UISettingProxy";
import { UISettingView } from "../view/PkgMain/view/UISettingView";
import { UISphereToolCtrl } from "../view/PkgMain/controller/UISphereToolCtrl";
import { UISphereToolProxy } from "../view/PkgMain/proxy/UISphereToolProxy";
import { UISphereToolView } from "../view/PkgMain/view/UISphereToolView";
import { UIWaitingCtrl } from "../view/PkgCommon/controller/UIWaitingCtrl";
import { UIWaitingProxy } from "../view/PkgCommon/proxy/UIWaitingProxy";
import { UIWaitingView } from "../view/PkgCommon/view/UIWaitingView";
import { ViewID } from "./ViewID";
import { uiMgr } from "./UIManager";


class ViewRegister {

    init() {
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
		fgui.UIObjectFactory.setExtension(RenderChatMsg.URL, RenderChatMsgView);
		fgui.UIObjectFactory.setExtension(RenderFriend.URL, RenderFriendView);
		fgui.UIObjectFactory.setExtension(RenderGoods.URL, RenderGoodsView);
		fgui.UIObjectFactory.setExtension(RenderText.URL, RenderTextView);

		//Coms
		fgui.UIObjectFactory.setExtension(ComBattleConfirm.URL, ComBattleConfirmView);
		fgui.UIObjectFactory.setExtension(ComConfirm.URL, ComConfirmView);
		fgui.UIObjectFactory.setExtension(ComTipInfo.URL, ComTipInfoView);
		fgui.UIObjectFactory.setExtension(ComAbode.URL, ComAbodeView);
		fgui.UIObjectFactory.setExtension(ComChar.URL, ComCharView);
		fgui.UIObjectFactory.setExtension(ComGoods.URL, ComGoodsView);
		fgui.UIObjectFactory.setExtension(ComGoodsInfo.URL, ComGoodsInfoView);
		fgui.UIObjectFactory.setExtension(ComRenWu.URL, ComRenWuView);
		fgui.UIObjectFactory.setExtension(ComShop.URL, ComShopView);
		fgui.UIObjectFactory.setExtension(ComSkill.URL, ComSkillView);
		fgui.UIObjectFactory.setExtension(ComTrain.URL, ComTrainView);
		fgui.UIObjectFactory.setExtension(ComXinFa.URL, ComXinFaView);
		fgui.UIObjectFactory.setExtension(ComZhiZuo.URL, ComZhiZuoView);

		//UIs
		fgui.UIObjectFactory.setExtension(UIBattle.URL, UIBattleView);
		fgui.UIObjectFactory.setExtension(UIBattleConfirm.URL, UIBattleConfirmView);
		fgui.UIObjectFactory.setExtension(UIChooseBattle.URL, UIChooseBattleView);
		fgui.UIObjectFactory.setExtension(UIChooseNum.URL, UIChooseNumView);
		fgui.UIObjectFactory.setExtension(UIConfirm.URL, UIConfirmView);
		fgui.UIObjectFactory.setExtension(UILoading1.URL, UILoading1View);
		fgui.UIObjectFactory.setExtension(UILoading2.URL, UILoading2View);
		fgui.UIObjectFactory.setExtension(UIWaiting.URL, UIWaitingView);
		fgui.UIObjectFactory.setExtension(UILogin.URL, UILoginView);
		fgui.UIObjectFactory.setExtension(UIChat.URL, UIChatView);
		fgui.UIObjectFactory.setExtension(UIEquipmentInfo.URL, UIEquipmentInfoView);
		fgui.UIObjectFactory.setExtension(UIGoodsInfo.URL, UIGoodsInfoView);
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
		register(ViewID.RenderChatMsgView, RenderChatMsgView, RenderChatMsgCtrl);
		register(ViewID.RenderFriendView, RenderFriendView, RenderFriendCtrl);
		register(ViewID.RenderGoodsView, RenderGoodsView, RenderGoodsCtrl);
		register(ViewID.RenderTextView, RenderTextView, RenderTextCtrl);

		//Coms
		register(ViewID.ComBattleConfirmView, ComBattleConfirmView, ComBattleConfirmCtrl);
		register(ViewID.ComConfirmView, ComConfirmView, ComConfirmCtrl);
		register(ViewID.ComTipInfoView, ComTipInfoView, ComTipInfoCtrl);
		register(ViewID.ComAbodeView, ComAbodeView, ComAbodeCtrl);
		register(ViewID.ComCharView, ComCharView, ComCharCtrl);
		register(ViewID.ComGoodsView, ComGoodsView, ComGoodsCtrl);
		register(ViewID.ComGoodsInfoView, ComGoodsInfoView, ComGoodsInfoCtrl);
		register(ViewID.ComRenWuView, ComRenWuView, ComRenWuCtrl);
		register(ViewID.ComShopView, ComShopView, ComShopCtrl);
		register(ViewID.ComSkillView, ComSkillView, ComSkillCtrl);
		register(ViewID.ComTrainView, ComTrainView, ComTrainCtrl);
		register(ViewID.ComXinFaView, ComXinFaView, ComXinFaCtrl);
		register(ViewID.ComZhiZuoView, ComZhiZuoView, ComZhiZuoCtrl);

		//UIs
		register(ViewID.UIBattleView, UIBattleView, UIBattleCtrl, UIBattleProxy);
		register(ViewID.UIBattleConfirmView, UIBattleConfirmView, UIBattleConfirmCtrl, UIBattleConfirmProxy);
		register(ViewID.UIChooseBattleView, UIChooseBattleView, UIChooseBattleCtrl, UIChooseBattleProxy);
		register(ViewID.UIChooseNumView, UIChooseNumView, UIChooseNumCtrl, UIChooseNumProxy);
		register(ViewID.UIConfirmView, UIConfirmView, UIConfirmCtrl, UIConfirmProxy);
		register(ViewID.UILoading1View, UILoading1View, UILoading1Ctrl, UILoading1Proxy);
		register(ViewID.UILoading2View, UILoading2View, UILoading2Ctrl, UILoading2Proxy);
		register(ViewID.UIWaitingView, UIWaitingView, UIWaitingCtrl, UIWaitingProxy);
		register(ViewID.UILoginView, UILoginView, UILoginCtrl, UILoginProxy);
		register(ViewID.UIChatView, UIChatView, UIChatCtrl, UIChatProxy);
		register(ViewID.UIEquipmentInfoView, UIEquipmentInfoView, UIEquipmentInfoCtrl, UIEquipmentInfoProxy);
		register(ViewID.UIGoodsInfoView, UIGoodsInfoView, UIGoodsInfoCtrl, UIGoodsInfoProxy);
		register(ViewID.UIMainView, UIMainView, UIMainCtrl, UIMainProxy);
		register(ViewID.UIPlayerInfoView, UIPlayerInfoView, UIPlayerInfoCtrl, UIPlayerInfoProxy);
		register(ViewID.UISectView, UISectView, UISectCtrl, UISectProxy);
		register(ViewID.UISettingView, UISettingView, UISettingCtrl, UISettingProxy);
		register(ViewID.UISphereToolView, UISphereToolView, UISphereToolCtrl, UISphereToolProxy);
	}
}
export const viewRegister = new ViewRegister();
windowImmit("viewRegister", viewRegister);