import UIGoodsInfo from "../../../ui/PkgMain/UIGoodsInfo";

export const enum UIGoodsInfoMsg {
}

export class UIGoodsInfoView extends ExtensionClass<IView, UIGoodsInfo>(UIGoodsInfo) {
	static readonly pkgRes = ResPath.PkgPath.PkgMain;

	override onCreate() {
		const { graph_bg } = this;
		graph_bg.onClick(this, this.removeSelf);
	}

}
