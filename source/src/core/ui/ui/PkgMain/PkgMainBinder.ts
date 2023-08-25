/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComZhiZuo from "./ComZhiZuo";
import ComXinFa from "./ComXinFa";
import ItemXinFa from "./ItemXinFa";
import UISect from "./UISect";
import UISphereTool from "./UISphereTool";
import UIItemInfo from "./UIItemInfo";
import RenderChatMsg from "./RenderChatMsg";
import BtnCheck from "./BtnCheck";
import UIChat from "./UIChat";
import UIMain from "./UIMain";
import RenderFriend from "./RenderFriend";
import ComSkill from "./ComSkill";
import ComTrain from "./ComTrain";
import UIPlayerInfo from "./UIPlayerInfo";
import UIEquipmentInfo from "./UIEquipmentInfo";
import ComGoods from "./ComGoods";
import ComShop from "./ComShop";
import ComChar from "./ComChar";
import ComAbode from "./ComAbode";
import RenderText from "./RenderText";
import CmbDongFu_item from "./CmbDongFu_item";
import CmbDongFu_popup from "./CmbDongFu_popup";
import CmbDongFu from "./CmbDongFu";
import UISetting from "./UISetting";
import RenderBag from "./RenderBag";
import ComRenWu from "./ComRenWu";

export default class PkgMainBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(ComZhiZuo.URL, ComZhiZuo);
		fgui.UIObjectFactory.setExtension(ComXinFa.URL, ComXinFa);
		fgui.UIObjectFactory.setExtension(ItemXinFa.URL, ItemXinFa);
		fgui.UIObjectFactory.setExtension(UISect.URL, UISect);
		fgui.UIObjectFactory.setExtension(UISphereTool.URL, UISphereTool);
		fgui.UIObjectFactory.setExtension(UIItemInfo.URL, UIItemInfo);
		fgui.UIObjectFactory.setExtension(RenderChatMsg.URL, RenderChatMsg);
		fgui.UIObjectFactory.setExtension(BtnCheck.URL, BtnCheck);
		fgui.UIObjectFactory.setExtension(UIChat.URL, UIChat);
		fgui.UIObjectFactory.setExtension(UIMain.URL, UIMain);
		fgui.UIObjectFactory.setExtension(RenderFriend.URL, RenderFriend);
		fgui.UIObjectFactory.setExtension(ComSkill.URL, ComSkill);
		fgui.UIObjectFactory.setExtension(ComTrain.URL, ComTrain);
		fgui.UIObjectFactory.setExtension(UIPlayerInfo.URL, UIPlayerInfo);
		fgui.UIObjectFactory.setExtension(UIEquipmentInfo.URL, UIEquipmentInfo);
		fgui.UIObjectFactory.setExtension(ComGoods.URL, ComGoods);
		fgui.UIObjectFactory.setExtension(ComShop.URL, ComShop);
		fgui.UIObjectFactory.setExtension(ComChar.URL, ComChar);
		fgui.UIObjectFactory.setExtension(ComAbode.URL, ComAbode);
		fgui.UIObjectFactory.setExtension(RenderText.URL, RenderText);
		fgui.UIObjectFactory.setExtension(CmbDongFu_item.URL, CmbDongFu_item);
		fgui.UIObjectFactory.setExtension(CmbDongFu_popup.URL, CmbDongFu_popup);
		fgui.UIObjectFactory.setExtension(CmbDongFu.URL, CmbDongFu);
		fgui.UIObjectFactory.setExtension(UISetting.URL, UISetting);
		fgui.UIObjectFactory.setExtension(RenderBag.URL, RenderBag);
		fgui.UIObjectFactory.setExtension(ComRenWu.URL, ComRenWu);
	}
}