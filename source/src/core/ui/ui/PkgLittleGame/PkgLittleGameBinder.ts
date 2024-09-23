/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UISnake from "./UISnake";
import { UISnakeView } from "../../view/PkgLittleGame/view/UISnakeView";
import UI2048 from "./UI2048";
import { UI2048View } from "../../view/PkgLittleGame/view/UI2048View";
import ComItem2048 from "./ComItem2048";
import { ComItem2048View } from "../../view/PkgLittleGame/view/coms/ComItem2048View";
import UILittleGame from "./UILittleGame";
import { UILittleGameView } from "../../view/PkgLittleGame/view/UILittleGameView";

export default class PkgLittleGameBinder {
	public static bindAll(): void {
		fgui.UIObjectFactory.setExtension(UISnake.URL, UISnakeView);
		fgui.UIObjectFactory.setExtension(UI2048.URL, UI2048View);
		fgui.UIObjectFactory.setExtension(ComItem2048.URL, ComItem2048View);
		fgui.UIObjectFactory.setExtension(UILittleGame.URL, UILittleGameView);
	}
}