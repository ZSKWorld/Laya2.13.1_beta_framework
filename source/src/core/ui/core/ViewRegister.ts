/**The script is automatically generated by BatMain.bat , please do not modify */
import PkgBattleBinder from "../ui/PkgBattle/PkgBattleBinder";
import PkgCommonBinder from "../ui/PkgCommon/PkgCommonBinder";
import PkgLittleGameBinder from "../ui/PkgLittleGame/PkgLittleGameBinder";
import PkgLoginBinder from "../ui/PkgLogin/PkgLoginBinder";
import PkgMainBinder from "../ui/PkgMain/PkgMainBinder";
import { BtnTxtView } from "../view/PkgCommon/view/btns/BtnTxtView";
import { BtnTxtCtrl } from "../view/PkgCommon/controller/btns/BtnTxtCtrl";
import { BtnCheckView } from "../view/PkgMain/view/btns/BtnCheckView";
import { BtnCheckCtrl } from "../view/PkgMain/controller/btns/BtnCheckCtrl";
import { BtnMainKindView } from "../view/PkgMain/view/btns/BtnMainKindView";
import { BtnMainKindCtrl } from "../view/PkgMain/controller/btns/BtnMainKindCtrl";
import { RenderChooseBattleView } from "../view/PkgBattle/view/renders/RenderChooseBattleView";
import { RenderChooseBattleCtrl } from "../view/PkgBattle/controller/renders/RenderChooseBattleCtrl";
import { RenderChatMsgView } from "../view/PkgMain/view/renders/RenderChatMsgView";
import { RenderChatMsgCtrl } from "../view/PkgMain/controller/renders/RenderChatMsgCtrl";
import { RenderFriendView } from "../view/PkgMain/view/renders/RenderFriendView";
import { RenderFriendCtrl } from "../view/PkgMain/controller/renders/RenderFriendCtrl";
import { RenderGoodsView } from "../view/PkgMain/view/renders/RenderGoodsView";
import { RenderGoodsCtrl } from "../view/PkgMain/controller/renders/RenderGoodsCtrl";
import { RenderTextView } from "../view/PkgMain/view/renders/RenderTextView";
import { RenderTextCtrl } from "../view/PkgMain/controller/renders/RenderTextCtrl";
import { ComBattleConfirmView } from "../view/PkgBattle/view/coms/ComBattleConfirmView";
import { ComBattleConfirmCtrl } from "../view/PkgBattle/controller/coms/ComBattleConfirmCtrl";
import { ComConfirmView } from "../view/PkgCommon/view/coms/ComConfirmView";
import { ComConfirmCtrl } from "../view/PkgCommon/controller/coms/ComConfirmCtrl";
import { ComRedDotView } from "../view/PkgCommon/view/coms/ComRedDotView";
import { ComRedDotCtrl } from "../view/PkgCommon/controller/coms/ComRedDotCtrl";
import { ComTipInfoView } from "../view/PkgCommon/view/coms/ComTipInfoView";
import { ComTipInfoCtrl } from "../view/PkgCommon/controller/coms/ComTipInfoCtrl";
import { ComWaitingView } from "../view/PkgCommon/view/coms/ComWaitingView";
import { ComWaitingCtrl } from "../view/PkgCommon/controller/coms/ComWaitingCtrl";
import { ComItem2048View } from "../view/PkgLittleGame/view/coms/ComItem2048View";
import { ComItem2048Ctrl } from "../view/PkgLittleGame/controller/coms/ComItem2048Ctrl";
import { ComTenWaterView } from "../view/PkgLittleGame/view/coms/ComTenWaterView";
import { ComTenWaterCtrl } from "../view/PkgLittleGame/controller/coms/ComTenWaterCtrl";
import { ComAbodeView } from "../view/PkgMain/view/coms/ComAbodeView";
import { ComAbodeCtrl } from "../view/PkgMain/controller/coms/ComAbodeCtrl";
import { ComCharView } from "../view/PkgMain/view/coms/ComCharView";
import { ComCharCtrl } from "../view/PkgMain/controller/coms/ComCharCtrl";
import { ComGoodsView } from "../view/PkgMain/view/coms/ComGoodsView";
import { ComGoodsCtrl } from "../view/PkgMain/controller/coms/ComGoodsCtrl";
import { ComGoodsInfoView } from "../view/PkgMain/view/coms/ComGoodsInfoView";
import { ComGoodsInfoCtrl } from "../view/PkgMain/controller/coms/ComGoodsInfoCtrl";
import { ComRenWuView } from "../view/PkgMain/view/coms/ComRenWuView";
import { ComRenWuCtrl } from "../view/PkgMain/controller/coms/ComRenWuCtrl";
import { ComSettingView } from "../view/PkgMain/view/coms/ComSettingView";
import { ComSettingCtrl } from "../view/PkgMain/controller/coms/ComSettingCtrl";
import { ComShopView } from "../view/PkgMain/view/coms/ComShopView";
import { ComShopCtrl } from "../view/PkgMain/controller/coms/ComShopCtrl";
import { ComSkillView } from "../view/PkgMain/view/coms/ComSkillView";
import { ComSkillCtrl } from "../view/PkgMain/controller/coms/ComSkillCtrl";
import { ComTrainView } from "../view/PkgMain/view/coms/ComTrainView";
import { ComTrainCtrl } from "../view/PkgMain/controller/coms/ComTrainCtrl";
import { ComXinFaView } from "../view/PkgMain/view/coms/ComXinFaView";
import { ComXinFaCtrl } from "../view/PkgMain/controller/coms/ComXinFaCtrl";
import { ComZhiZuoView } from "../view/PkgMain/view/coms/ComZhiZuoView";
import { ComZhiZuoCtrl } from "../view/PkgMain/controller/coms/ComZhiZuoCtrl";
import { UIBattleView } from "../view/PkgBattle/view/UIBattleView";
import { UIBattleCtrl } from "../view/PkgBattle/controller/UIBattleCtrl";
import { UIBattleProxy } from "../view/PkgBattle/proxy/UIBattleProxy";
import { UIBattleConfirmView } from "../view/PkgBattle/view/UIBattleConfirmView";
import { UIBattleConfirmCtrl } from "../view/PkgBattle/controller/UIBattleConfirmCtrl";
import { UIBattleConfirmProxy } from "../view/PkgBattle/proxy/UIBattleConfirmProxy";
import { UIChooseBattleView } from "../view/PkgBattle/view/UIChooseBattleView";
import { UIChooseBattleCtrl } from "../view/PkgBattle/controller/UIChooseBattleCtrl";
import { UIConfirmView } from "../view/PkgCommon/view/UIConfirmView";
import { UIConfirmCtrl } from "../view/PkgCommon/controller/UIConfirmCtrl";
import { UILoading1View } from "../view/PkgCommon/view/UILoading1View";
import { UILoading1Ctrl } from "../view/PkgCommon/controller/UILoading1Ctrl";
import { UILoading2View } from "../view/PkgCommon/view/UILoading2View";
import { UILoading2Ctrl } from "../view/PkgCommon/controller/UILoading2Ctrl";
import { UIWaitingView } from "../view/PkgCommon/view/UIWaitingView";
import { UIWaitingCtrl } from "../view/PkgCommon/controller/UIWaitingCtrl";
import { UI2048View } from "../view/PkgLittleGame/view/UI2048View";
import { UI2048Ctrl } from "../view/PkgLittleGame/controller/UI2048Ctrl";
import { UILittleGameView } from "../view/PkgLittleGame/view/UILittleGameView";
import { UILittleGameCtrl } from "../view/PkgLittleGame/controller/UILittleGameCtrl";
import { UISnakeView } from "../view/PkgLittleGame/view/UISnakeView";
import { UISnakeCtrl } from "../view/PkgLittleGame/controller/UISnakeCtrl";
import { UITenWaterView } from "../view/PkgLittleGame/view/UITenWaterView";
import { UITenWaterCtrl } from "../view/PkgLittleGame/controller/UITenWaterCtrl";
import { UITest3DView } from "../view/PkgLittleGame/view/UITest3DView";
import { UITest3DCtrl } from "../view/PkgLittleGame/controller/UITest3DCtrl";
import { UILoginView } from "../view/PkgLogin/view/UILoginView";
import { UILoginCtrl } from "../view/PkgLogin/controller/UILoginCtrl";
import { UILoginProxy } from "../view/PkgLogin/proxy/UILoginProxy";
import { UIChatView } from "../view/PkgMain/view/UIChatView";
import { UIChatCtrl } from "../view/PkgMain/controller/UIChatCtrl";
import { UIEquipmentInfoView } from "../view/PkgMain/view/UIEquipmentInfoView";
import { UIEquipmentInfoCtrl } from "../view/PkgMain/controller/UIEquipmentInfoCtrl";
import { UIEquipmentInfoProxy } from "../view/PkgMain/proxy/UIEquipmentInfoProxy";
import { UIGoodsInfoView } from "../view/PkgMain/view/UIGoodsInfoView";
import { UIGoodsInfoCtrl } from "../view/PkgMain/controller/UIGoodsInfoCtrl";
import { UIGoodsInfoProxy } from "../view/PkgMain/proxy/UIGoodsInfoProxy";
import { UIMainView } from "../view/PkgMain/view/UIMainView";
import { UIMainCtrl } from "../view/PkgMain/controller/UIMainCtrl";
import { UIMainProxy } from "../view/PkgMain/proxy/UIMainProxy";
import { UIPlayerInfoView } from "../view/PkgMain/view/UIPlayerInfoView";
import { UIPlayerInfoCtrl } from "../view/PkgMain/controller/UIPlayerInfoCtrl";
import { UISectView } from "../view/PkgMain/view/UISectView";
import { UISectCtrl } from "../view/PkgMain/controller/UISectCtrl";
import { UISettingView } from "../view/PkgMain/view/UISettingView";
import { UISettingCtrl } from "../view/PkgMain/controller/UISettingCtrl";
import { UISettingProxy } from "../view/PkgMain/proxy/UISettingProxy";
import { UISphereToolView } from "../view/PkgMain/view/UISphereToolView";
import { UISphereToolCtrl } from "../view/PkgMain/controller/UISphereToolCtrl";

class ViewRegister {

    init() {
        this.pkgBind();
        this.registerView();
    }

    /**包bind */
    private pkgBind() {
		PkgBattleBinder.bindAll();
		PkgCommonBinder.bindAll();
		PkgLittleGameBinder.bindAll();
		PkgLoginBinder.bindAll();
		PkgMainBinder.bindAll();
	}

    /**页面注册 */
    private registerView() {
		const register = uiMgr.registView.bind(uiMgr);
		//Btns
		register(ViewID.BtnTxtView, BtnTxtView, BtnTxtCtrl);
		register(ViewID.BtnCheckView, BtnCheckView, BtnCheckCtrl);
		register(ViewID.BtnMainKindView, BtnMainKindView, BtnMainKindCtrl);

		//Renders
		register(ViewID.RenderChooseBattleView, RenderChooseBattleView, RenderChooseBattleCtrl);
		register(ViewID.RenderChatMsgView, RenderChatMsgView, RenderChatMsgCtrl);
		register(ViewID.RenderFriendView, RenderFriendView, RenderFriendCtrl);
		register(ViewID.RenderGoodsView, RenderGoodsView, RenderGoodsCtrl);
		register(ViewID.RenderTextView, RenderTextView, RenderTextCtrl);

		//Coms
		register(ViewID.ComBattleConfirmView, ComBattleConfirmView, ComBattleConfirmCtrl);
		register(ViewID.ComConfirmView, ComConfirmView, ComConfirmCtrl);
		register(ViewID.ComRedDotView, ComRedDotView, ComRedDotCtrl);
		register(ViewID.ComTipInfoView, ComTipInfoView, ComTipInfoCtrl);
		register(ViewID.ComWaitingView, ComWaitingView, ComWaitingCtrl);
		register(ViewID.ComItem2048View, ComItem2048View, ComItem2048Ctrl);
		register(ViewID.ComTenWaterView, ComTenWaterView, ComTenWaterCtrl);
		register(ViewID.ComAbodeView, ComAbodeView, ComAbodeCtrl);
		register(ViewID.ComCharView, ComCharView, ComCharCtrl);
		register(ViewID.ComGoodsView, ComGoodsView, ComGoodsCtrl);
		register(ViewID.ComGoodsInfoView, ComGoodsInfoView, ComGoodsInfoCtrl);
		register(ViewID.ComRenWuView, ComRenWuView, ComRenWuCtrl);
		register(ViewID.ComSettingView, ComSettingView, ComSettingCtrl);
		register(ViewID.ComShopView, ComShopView, ComShopCtrl);
		register(ViewID.ComSkillView, ComSkillView, ComSkillCtrl);
		register(ViewID.ComTrainView, ComTrainView, ComTrainCtrl);
		register(ViewID.ComXinFaView, ComXinFaView, ComXinFaCtrl);
		register(ViewID.ComZhiZuoView, ComZhiZuoView, ComZhiZuoCtrl);

		//UIs
		register(ViewID.UIBattleView, UIBattleView, UIBattleCtrl, UIBattleProxy);
		register(ViewID.UIBattleConfirmView, UIBattleConfirmView, UIBattleConfirmCtrl, UIBattleConfirmProxy);
		register(ViewID.UIChooseBattleView, UIChooseBattleView, UIChooseBattleCtrl);
		register(ViewID.UIConfirmView, UIConfirmView, UIConfirmCtrl);
		register(ViewID.UILoading1View, UILoading1View, UILoading1Ctrl);
		register(ViewID.UILoading2View, UILoading2View, UILoading2Ctrl);
		register(ViewID.UIWaitingView, UIWaitingView, UIWaitingCtrl);
		register(ViewID.UI2048View, UI2048View, UI2048Ctrl);
		register(ViewID.UILittleGameView, UILittleGameView, UILittleGameCtrl);
		register(ViewID.UISnakeView, UISnakeView, UISnakeCtrl);
		register(ViewID.UITenWaterView, UITenWaterView, UITenWaterCtrl);
		register(ViewID.UITest3DView, UITest3DView, UITest3DCtrl);
		register(ViewID.UILoginView, UILoginView, UILoginCtrl, UILoginProxy);
		register(ViewID.UIChatView, UIChatView, UIChatCtrl);
		register(ViewID.UIEquipmentInfoView, UIEquipmentInfoView, UIEquipmentInfoCtrl, UIEquipmentInfoProxy);
		register(ViewID.UIGoodsInfoView, UIGoodsInfoView, UIGoodsInfoCtrl, UIGoodsInfoProxy);
		register(ViewID.UIMainView, UIMainView, UIMainCtrl, UIMainProxy);
		register(ViewID.UIPlayerInfoView, UIPlayerInfoView, UIPlayerInfoCtrl);
		register(ViewID.UISectView, UISectView, UISectCtrl);
		register(ViewID.UISettingView, UISettingView, UISettingCtrl, UISettingProxy);
		register(ViewID.UISphereToolView, UISphereToolView, UISphereToolCtrl);
	}
}
export const viewRegister = new ViewRegister();