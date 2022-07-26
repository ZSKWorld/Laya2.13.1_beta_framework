/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import LoadingItem from "./LoadingItem";
import ComTipInfo from "./ComTipInfo";
import BtnCornerTxt from "./BtnCornerTxt";
import UITipConfirm from "./UITipConfirm";
import ProgressBar1 from "./ProgressBar1";
import ComNumInput from "./ComNumInput";

export default class PkgCommonBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(LoadingItem.URL, LoadingItem);
		fgui.UIObjectFactory.setExtension(ComTipInfo.URL, ComTipInfo);
		fgui.UIObjectFactory.setExtension(BtnCornerTxt.URL, BtnCornerTxt);
		fgui.UIObjectFactory.setExtension(UITipConfirm.URL, UITipConfirm);
		fgui.UIObjectFactory.setExtension(ProgressBar1.URL, ProgressBar1);
		fgui.UIObjectFactory.setExtension(ComNumInput.URL, ComNumInput);
	}
}