import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/interfaces";
import { ViewID } from "../../../core/ViewID";
import ComJueSe from "../../../ui/PkgMain/ComJueSe";

export const enum ComJueSeMsg {

}

export class ComJueSeView extends ExtensionClass<ViewExtension, ComJueSe>(ComJueSe) {
	static PkgRes = ResPath.Ui_PkgMain;

	onCreate(): void {
		const { listener, ComRenWu, ComXinFa, ComSkill } = this;

		this.initView(ViewID.ComRenWuView, ComRenWu, listener);
		this.initView(ViewID.ComXinFaView, ComXinFa, listener);
		this.initView(ViewID.ComSkillView, ComSkill, listener);
	}

}
