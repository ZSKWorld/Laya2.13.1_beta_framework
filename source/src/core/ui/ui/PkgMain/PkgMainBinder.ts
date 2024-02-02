/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComZhiZuo from "./ComZhiZuo";
import { ComZhiZuoView } from "../../view/PkgMain/view/coms/ComZhiZuoView";
import ComGoodsInfo from "./ComGoodsInfo";
import { ComGoodsInfoView } from "../../view/PkgMain/view/coms/ComGoodsInfoView";
import ComXinFa from "./ComXinFa";
import { ComXinFaView } from "../../view/PkgMain/view/coms/ComXinFaView";
import ItemXinFa from "./ItemXinFa";
import UISect from "./UISect";
import { UISectView } from "../../view/PkgMain/view/UISectView";
import UISphereTool from "./UISphereTool";
import { UISphereToolView } from "../../view/PkgMain/view/UISphereToolView";
import ComSetting from "./ComSetting";
import { ComSettingView } from "../../view/PkgMain/view/coms/ComSettingView";
import UIGoodsInfo from "./UIGoodsInfo";
import { UIGoodsInfoView } from "../../view/PkgMain/view/UIGoodsInfoView";
import RenderChatMsg from "./RenderChatMsg";
import { RenderChatMsgView } from "../../view/PkgMain/view/renders/RenderChatMsgView";
import BtnCheck from "./BtnCheck";
import { BtnCheckView } from "../../view/PkgMain/view/btns/BtnCheckView";
import UIChat from "./UIChat";
import { UIChatView } from "../../view/PkgMain/view/UIChatView";
import UIMain from "./UIMain";
import { UIMainView } from "../../view/PkgMain/view/UIMainView";
import RenderFriend from "./RenderFriend";
import { RenderFriendView } from "../../view/PkgMain/view/renders/RenderFriendView";
import ComSkill from "./ComSkill";
import { ComSkillView } from "../../view/PkgMain/view/coms/ComSkillView";
import ComTrain from "./ComTrain";
import { ComTrainView } from "../../view/PkgMain/view/coms/ComTrainView";
import UIPlayerInfo from "./UIPlayerInfo";
import { UIPlayerInfoView } from "../../view/PkgMain/view/UIPlayerInfoView";
import UIEquipmentInfo from "./UIEquipmentInfo";
import { UIEquipmentInfoView } from "../../view/PkgMain/view/UIEquipmentInfoView";
import ComGoods from "./ComGoods";
import { ComGoodsView } from "../../view/PkgMain/view/coms/ComGoodsView";
import ComShop from "./ComShop";
import { ComShopView } from "../../view/PkgMain/view/coms/ComShopView";
import ComChar from "./ComChar";
import { ComCharView } from "../../view/PkgMain/view/coms/ComCharView";
import ComAbode from "./ComAbode";
import { ComAbodeView } from "../../view/PkgMain/view/coms/ComAbodeView";
import RenderText from "./RenderText";
import { RenderTextView } from "../../view/PkgMain/view/renders/RenderTextView";
import CmbDongFu_item from "./CmbDongFu_item";
import CmbDongFu_popup from "./CmbDongFu_popup";
import CmbDongFu from "./CmbDongFu";
import UISetting from "./UISetting";
import { UISettingView } from "../../view/PkgMain/view/UISettingView";
import RenderGoods from "./RenderGoods";
import { RenderGoodsView } from "../../view/PkgMain/view/renders/RenderGoodsView";
import ComRenWu from "./ComRenWu";
import { ComRenWuView } from "../../view/PkgMain/view/coms/ComRenWuView";

export default class PkgMainBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(ComZhiZuo.URL, ComZhiZuoView);
		fgui.UIObjectFactory.setExtension(ComGoodsInfo.URL, ComGoodsInfoView);
		fgui.UIObjectFactory.setExtension(ComXinFa.URL, ComXinFaView);
		fgui.UIObjectFactory.setExtension(ItemXinFa.URL, ItemXinFa);
		fgui.UIObjectFactory.setExtension(UISect.URL, UISectView);
		fgui.UIObjectFactory.setExtension(UISphereTool.URL, UISphereToolView);
		fgui.UIObjectFactory.setExtension(ComSetting.URL, ComSettingView);
		fgui.UIObjectFactory.setExtension(UIGoodsInfo.URL, UIGoodsInfoView);
		fgui.UIObjectFactory.setExtension(RenderChatMsg.URL, RenderChatMsgView);
		fgui.UIObjectFactory.setExtension(BtnCheck.URL, BtnCheckView);
		fgui.UIObjectFactory.setExtension(UIChat.URL, UIChatView);
		fgui.UIObjectFactory.setExtension(UIMain.URL, UIMainView);
		fgui.UIObjectFactory.setExtension(RenderFriend.URL, RenderFriendView);
		fgui.UIObjectFactory.setExtension(ComSkill.URL, ComSkillView);
		fgui.UIObjectFactory.setExtension(ComTrain.URL, ComTrainView);
		fgui.UIObjectFactory.setExtension(UIPlayerInfo.URL, UIPlayerInfoView);
		fgui.UIObjectFactory.setExtension(UIEquipmentInfo.URL, UIEquipmentInfoView);
		fgui.UIObjectFactory.setExtension(ComGoods.URL, ComGoodsView);
		fgui.UIObjectFactory.setExtension(ComShop.URL, ComShopView);
		fgui.UIObjectFactory.setExtension(ComChar.URL, ComCharView);
		fgui.UIObjectFactory.setExtension(ComAbode.URL, ComAbodeView);
		fgui.UIObjectFactory.setExtension(RenderText.URL, RenderTextView);
		fgui.UIObjectFactory.setExtension(CmbDongFu_item.URL, CmbDongFu_item);
		fgui.UIObjectFactory.setExtension(CmbDongFu_popup.URL, CmbDongFu_popup);
		fgui.UIObjectFactory.setExtension(CmbDongFu.URL, CmbDongFu);
		fgui.UIObjectFactory.setExtension(UISetting.URL, UISettingView);
		fgui.UIObjectFactory.setExtension(RenderGoods.URL, RenderGoodsView);
		fgui.UIObjectFactory.setExtension(ComRenWu.URL, ComRenWuView);
	}
}