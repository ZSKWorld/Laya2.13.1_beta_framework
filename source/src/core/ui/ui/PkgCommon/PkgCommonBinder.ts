/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComWaiting from "./ComWaiting";
import UIWaiting from "./UIWaiting";
import UILoading1 from "./UILoading1";
import UILoading2 from "./UILoading2";
import ComTipInfo from "./ComTipInfo";
import BtnTxt from "./BtnTxt";
import Pro1 from "./Pro1";
import UIConfirm from "./UIConfirm";
import ComConfirm from "./ComConfirm";

export default class PkgCommonBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(ComWaiting.URL, ComWaiting);
		fgui.UIObjectFactory.setExtension(UIWaiting.URL, UIWaiting);
		fgui.UIObjectFactory.setExtension(UILoading1.URL, UILoading1);
		fgui.UIObjectFactory.setExtension(UILoading2.URL, UILoading2);
		fgui.UIObjectFactory.setExtension(ComTipInfo.URL, ComTipInfo);
		fgui.UIObjectFactory.setExtension(BtnTxt.URL, BtnTxt);
		fgui.UIObjectFactory.setExtension(Pro1.URL, Pro1);
		fgui.UIObjectFactory.setExtension(UIConfirm.URL, UIConfirm);
		fgui.UIObjectFactory.setExtension(ComConfirm.URL, ComConfirm);
	}
}