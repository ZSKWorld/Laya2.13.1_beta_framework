/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import WaitingItem from "./WaitingItem";
import UIWaiting from "./UIWaiting";
import UILoading1 from "./UILoading1";
import UILoading2 from "./UILoading2";
import ComTipInfo from "./ComTipInfo";
import BtnCornerTxt from "./BtnCornerTxt";
import UITipConfirm from "./UITipConfirm";
import Pro1 from "./Pro1";
import ComNumInput from "./ComNumInput";

export default class PkgCommonBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(WaitingItem.URL, WaitingItem);
		fgui.UIObjectFactory.setExtension(UIWaiting.URL, UIWaiting);
		fgui.UIObjectFactory.setExtension(UILoading1.URL, UILoading1);
		fgui.UIObjectFactory.setExtension(UILoading2.URL, UILoading2);
		fgui.UIObjectFactory.setExtension(ComTipInfo.URL, ComTipInfo);
		fgui.UIObjectFactory.setExtension(BtnCornerTxt.URL, BtnCornerTxt);
		fgui.UIObjectFactory.setExtension(UITipConfirm.URL, UITipConfirm);
		fgui.UIObjectFactory.setExtension(Pro1.URL, Pro1);
		fgui.UIObjectFactory.setExtension(ComNumInput.URL, ComNumInput);
	}
}