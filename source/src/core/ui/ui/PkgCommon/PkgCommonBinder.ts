/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComWaiting from "./ComWaiting";
import { ComWaitingView } from "../../view/PkgCommon/view/coms/ComWaitingView";
import UIWaiting from "./UIWaiting";
import { UIWaitingView } from "../../view/PkgCommon/view/UIWaitingView";
import UILoading1 from "./UILoading1";
import { UILoading1View } from "../../view/PkgCommon/view/UILoading1View";
import UILoading2 from "./UILoading2";
import { UILoading2View } from "../../view/PkgCommon/view/UILoading2View";
import ComTipInfo from "./ComTipInfo";
import { ComTipInfoView } from "../../view/PkgCommon/view/coms/ComTipInfoView";
import BtnTxt from "./BtnTxt";
import { BtnTxtView } from "../../view/PkgCommon/view/btns/BtnTxtView";
import Pro1 from "./Pro1";
import UIConfirm from "./UIConfirm";
import { UIConfirmView } from "../../view/PkgCommon/view/UIConfirmView";
import ComConfirm from "./ComConfirm";
import { ComConfirmView } from "../../view/PkgCommon/view/coms/ComConfirmView";
import ComRedDot from "./ComRedDot";
import { ComRedDotView } from "../../view/PkgCommon/view/coms/ComRedDotView";

export default class PkgCommonBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(ComWaiting.URL, ComWaitingView);
		fgui.UIObjectFactory.setExtension(UIWaiting.URL, UIWaitingView);
		fgui.UIObjectFactory.setExtension(UILoading1.URL, UILoading1View);
		fgui.UIObjectFactory.setExtension(UILoading2.URL, UILoading2View);
		fgui.UIObjectFactory.setExtension(ComTipInfo.URL, ComTipInfoView);
		fgui.UIObjectFactory.setExtension(BtnTxt.URL, BtnTxtView);
		fgui.UIObjectFactory.setExtension(Pro1.URL, Pro1);
		fgui.UIObjectFactory.setExtension(UIConfirm.URL, UIConfirmView);
		fgui.UIObjectFactory.setExtension(ComConfirm.URL, ComConfirmView);
		fgui.UIObjectFactory.setExtension(ComRedDot.URL, ComRedDotView);
	}
}