/**The script is automatically generated by BatMain.bat , please do not modify */
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
import RenderText from "../ui/PkgMain/RenderText";
import UIBattle from "../ui/PkgBattle/UIBattle";
import UIChat from "../ui/PkgMain/UIChat";
import UIChooseBattle from "../ui/PkgBattle/UIChooseBattle";
import UIEquipmentInfo from "../ui/PkgMain/UIEquipmentInfo";
import UILoginMain from "../ui/PkgLogin/UILoginMain";
import UIMain from "../ui/PkgMain/UIMain";
import UIPlayerInfo from "../ui/PkgMain/UIPlayerInfo";
import UISect from "../ui/PkgMain/UISect";
import UISetting from "../ui/PkgMain/UISetting";
import UISphereTool from "../ui/PkgMain/UISphereTool";
import UITipConfirm from "../ui/PkgCommon/UITipConfirm";
import { ComDongFuCtrl } from "../viewCtrl/PkgMain/Coms/ComDongFuCtrl";
import { ComDongFuView } from "../view/PkgMain/Coms/ComDongFuView";
import { ComItemInfoCtrl } from "../viewCtrl/PkgMain/Coms/ComItemInfoCtrl";
import { ComItemInfoView } from "../view/PkgMain/Coms/ComItemInfoView";
import { ComJueSeCtrl } from "../viewCtrl/PkgMain/Coms/ComJueSeCtrl";
import { ComJueSeView } from "../view/PkgMain/Coms/ComJueSeView";
import { ComLiLianCtrl } from "../viewCtrl/PkgMain/Coms/ComLiLianCtrl";
import { ComLiLianView } from "../view/PkgMain/Coms/ComLiLianView";
import { ComNumInputCtrl } from "../viewCtrl/PkgCommon/Coms/ComNumInputCtrl";
import { ComNumInputView } from "../view/PkgCommon/Coms/ComNumInputView";
import { ComRenWuCtrl } from "../viewCtrl/PkgMain/Coms/ComRenWuCtrl";
import { ComRenWuView } from "../view/PkgMain/Coms/ComRenWuView";
import { ComShangChengCtrl } from "../viewCtrl/PkgMain/Coms/ComShangChengCtrl";
import { ComShangChengView } from "../view/PkgMain/Coms/ComShangChengView";
import { ComSkillCtrl } from "../viewCtrl/PkgMain/Coms/ComSkillCtrl";
import { ComSkillView } from "../view/PkgMain/Coms/ComSkillView";
import { ComTipInfoCtrl } from "../viewCtrl/PkgCommon/Coms/ComTipInfoCtrl";
import { ComTipInfoView } from "../view/PkgCommon/Coms/ComTipInfoView";
import { ComWuPinCtrl } from "../viewCtrl/PkgMain/Coms/ComWuPinCtrl";
import { ComWuPinView } from "../view/PkgMain/Coms/ComWuPinView";
import { ComXinFaCtrl } from "../viewCtrl/PkgMain/Coms/ComXinFaCtrl";
import { ComXinFaView } from "../view/PkgMain/Coms/ComXinFaView";
import { ComZhiZuoCtrl } from "../viewCtrl/PkgMain/Coms/ComZhiZuoCtrl";
import { ComZhiZuoView } from "../view/PkgMain/Coms/ComZhiZuoView";
import { IViewCtrl_Class, IView_Class } from "./interfaces";
import { Logger } from "../../libs/utils/Logger";
import { RenderBagView } from "../view/PkgMain/Renders/RenderBagView";
import { RenderChatMsgView } from "../view/PkgMain/Renders/RenderChatMsgView";
import { RenderChooseBattleView } from "../view/PkgBattle/Renders/RenderChooseBattleView";
import { RenderTextView } from "../view/PkgMain/Renders/RenderTextView";
import { UIBattleCtrl } from "../viewCtrl/PkgBattle/UIBattleCtrl";
import { UIBattleView } from "../view/PkgBattle/UIBattleView";
import { UIChatCtrl } from "../viewCtrl/PkgMain/UIChatCtrl";
import { UIChatView } from "../view/PkgMain/UIChatView";
import { UIChooseBattleCtrl } from "../viewCtrl/PkgBattle/UIChooseBattleCtrl";
import { UIChooseBattleView } from "../view/PkgBattle/UIChooseBattleView";
import { UIEquipmentInfoCtrl } from "../viewCtrl/PkgMain/UIEquipmentInfoCtrl";
import { UIEquipmentInfoView } from "../view/PkgMain/UIEquipmentInfoView";
import { UILoginMainCtrl } from "../viewCtrl/PkgLogin/UILoginMainCtrl";
import { UILoginMainView } from "../view/PkgLogin/UILoginMainView";
import { UIMainCtrl } from "../viewCtrl/PkgMain/UIMainCtrl";
import { UIMainView } from "../view/PkgMain/UIMainView";
import { UIPlayerInfoCtrl } from "../viewCtrl/PkgMain/UIPlayerInfoCtrl";
import { UIPlayerInfoView } from "../view/PkgMain/UIPlayerInfoView";
import { UISectCtrl } from "../viewCtrl/PkgMain/UISectCtrl";
import { UISectView } from "../view/PkgMain/UISectView";
import { UISettingCtrl } from "../viewCtrl/PkgMain/UISettingCtrl";
import { UISettingView } from "../view/PkgMain/UISettingView";
import { UISphereToolCtrl } from "../viewCtrl/PkgMain/UISphereToolCtrl";
import { UISphereToolView } from "../view/PkgMain/UISphereToolView";
import { UITipConfirmCtrl } from "../viewCtrl/PkgCommon/UITipConfirmCtrl";
import { UITipConfirmView } from "../view/PkgCommon/UITipConfirmView";
import { ViewClass, CtrlClass } from "./UIGlobal";
import { ViewID } from "./ViewID";

const logger = Logger.Create("ViewRegister").setEnable(true);

export class ViewRegister {

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
		//Coms
		fairygui.UIObjectFactory.setExtension(ComNumInput.URL, ComNumInputView);
		fairygui.UIObjectFactory.setExtension(ComTipInfo.URL, ComTipInfoView);
		fairygui.UIObjectFactory.setExtension(ComDongFu.URL, ComDongFuView);
		fairygui.UIObjectFactory.setExtension(ComItemInfo.URL, ComItemInfoView);
		fairygui.UIObjectFactory.setExtension(ComJueSe.URL, ComJueSeView);
		fairygui.UIObjectFactory.setExtension(ComLiLian.URL, ComLiLianView);
		fairygui.UIObjectFactory.setExtension(ComRenWu.URL, ComRenWuView);
		fairygui.UIObjectFactory.setExtension(ComShangCheng.URL, ComShangChengView);
		fairygui.UIObjectFactory.setExtension(ComSkill.URL, ComSkillView);
		fairygui.UIObjectFactory.setExtension(ComWuPin.URL, ComWuPinView);
		fairygui.UIObjectFactory.setExtension(ComXinFa.URL, ComXinFaView);
		fairygui.UIObjectFactory.setExtension(ComZhiZuo.URL, ComZhiZuoView);

		//Renders
		fairygui.UIObjectFactory.setExtension(RenderChooseBattle.URL, RenderChooseBattleView);
		fairygui.UIObjectFactory.setExtension(RenderBag.URL, RenderBagView);
		fairygui.UIObjectFactory.setExtension(RenderChatMsg.URL, RenderChatMsgView);
		fairygui.UIObjectFactory.setExtension(RenderText.URL, RenderTextView);

		//Views
		fairygui.UIObjectFactory.setExtension(UIBattle.URL, UIBattleView);
		fairygui.UIObjectFactory.setExtension(UIChooseBattle.URL, UIChooseBattleView);
		fairygui.UIObjectFactory.setExtension(UITipConfirm.URL, UITipConfirmView);
		fairygui.UIObjectFactory.setExtension(UILoginMain.URL, UILoginMainView);
		fairygui.UIObjectFactory.setExtension(UIChat.URL, UIChatView);
		fairygui.UIObjectFactory.setExtension(UIEquipmentInfo.URL, UIEquipmentInfoView);
		fairygui.UIObjectFactory.setExtension(UIMain.URL, UIMainView);
		fairygui.UIObjectFactory.setExtension(UIPlayerInfo.URL, UIPlayerInfoView);
		fairygui.UIObjectFactory.setExtension(UISect.URL, UISectView);
		fairygui.UIObjectFactory.setExtension(UISetting.URL, UISettingView);
		fairygui.UIObjectFactory.setExtension(UISphereTool.URL, UISphereToolView);
	}

    /**页面注册 */
    private registerView() {
		const register = this.registView;
		//Coms
		register(ViewID.ComNumInputView, ComNumInputView, ComNumInputCtrl);
		register(ViewID.ComTipInfoView, ComTipInfoView, ComTipInfoCtrl);
		register(ViewID.ComDongFuView, ComDongFuView, ComDongFuCtrl);
		register(ViewID.ComItemInfoView, ComItemInfoView, ComItemInfoCtrl);
		register(ViewID.ComJueSeView, ComJueSeView, ComJueSeCtrl);
		register(ViewID.ComLiLianView, ComLiLianView, ComLiLianCtrl);
		register(ViewID.ComRenWuView, ComRenWuView, ComRenWuCtrl);
		register(ViewID.ComShangChengView, ComShangChengView, ComShangChengCtrl);
		register(ViewID.ComSkillView, ComSkillView, ComSkillCtrl);
		register(ViewID.ComWuPinView, ComWuPinView, ComWuPinCtrl);
		register(ViewID.ComXinFaView, ComXinFaView, ComXinFaCtrl);
		register(ViewID.ComZhiZuoView, ComZhiZuoView, ComZhiZuoCtrl);

		//Views
		register(ViewID.BattleView, UIBattleView, UIBattleCtrl);
		register(ViewID.ChooseBattleView, UIChooseBattleView, UIChooseBattleCtrl);
		register(ViewID.TipConfirmView, UITipConfirmView, UITipConfirmCtrl);
		register(ViewID.LoginMainView, UILoginMainView, UILoginMainCtrl);
		register(ViewID.ChatView, UIChatView, UIChatCtrl);
		register(ViewID.EquipmentInfoView, UIEquipmentInfoView, UIEquipmentInfoCtrl);
		register(ViewID.MainView, UIMainView, UIMainCtrl);
		register(ViewID.PlayerInfoView, UIPlayerInfoView, UIPlayerInfoCtrl);
		register(ViewID.SectView, UISectView, UISectCtrl);
		register(ViewID.SettingView, UISettingView, UISettingCtrl);
		register(ViewID.SphereToolView, UISphereToolView, UISphereToolCtrl);
	}

	private registView(viewId: ViewID, viewCls: IView_Class, ctrlCls?: IViewCtrl_Class) {
		if (!viewCls) throw new Error("参数不能为空！");
		if (!ViewClass[viewId]) {
			(ViewClass as any)[viewId] = viewCls;
			(CtrlClass as any)[viewId] = ctrlCls;
		} else {
			logger.warn(`重复添加映射 => ${viewId}`);
		}
	}
}
export const uiRegister = new ViewRegister();