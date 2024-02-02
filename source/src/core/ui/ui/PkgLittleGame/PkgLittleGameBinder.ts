/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UITenWater from "./UITenWater";
import { UITenWaterView } from "../../view/PkgLittleGame/view/UITenWaterView";
import ComTenWater from "./ComTenWater";
import { ComTenWaterView } from "../../view/PkgLittleGame/view/coms/ComTenWaterView";
import UILittleGame from "./UILittleGame";
import { UILittleGameView } from "../../view/PkgLittleGame/view/UILittleGameView";

export default class PkgLittleGameBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UITenWater.URL, UITenWaterView);
		fgui.UIObjectFactory.setExtension(ComTenWater.URL, ComTenWaterView);
		fgui.UIObjectFactory.setExtension(UILittleGame.URL, UILittleGameView);
	}
}