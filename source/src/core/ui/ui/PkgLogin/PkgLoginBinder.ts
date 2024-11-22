/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UILogin from "./UILogin";
import { UILoginView } from "../../view/PkgLogin/view/UILoginView";

export default class PkgLoginBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UILogin.url, UILoginView);
	}
}