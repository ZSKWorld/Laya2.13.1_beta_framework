import { ExtensionClass } from "../../../../libs/utils/Util";
import { ViewExtension } from "../../../core/Interfaces";
import ComJueSe from "../../../ui/PkgMain/ComJueSe";
import { ResPath } from "../../../../common/ResPath";
import { ViewID } from "../../../core/ViewID";

export const enum ComJueSeMsg {

}

export class ComJueSeView extends ExtensionClass<ViewExtension, ComJueSe>(ComJueSe) {
    static readonly PkgRes = ResPath.UIPath.PkgMain;

	override onCreate(): void {
        const { listener, ComRenWu, ComXinFa, ComSkill } = this;

		this.initView(ComRenWu, listener);
		this.initView(ComXinFa, listener);
		this.initView(ComSkill, listener);
    }

}
