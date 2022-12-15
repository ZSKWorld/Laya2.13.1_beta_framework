import { ResPath } from "../../../../common/ResPath";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComJueSe from "../../../ui/PkgMain/ComJueSe";

export const enum ComJueSeMsg {

}

export class ComJueSeView extends ExtensionClass<ViewExtension, ComJueSe>(ComJueSe) {
	static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
		const { ComRenWu, ComXinFa, ComSkill } = this;

		this.initView(ComRenWu);
		this.initView(ComXinFa);
		this.initView(ComSkill);
	}

}
