/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComRenWuView } from "../../view/PkgMain/view/coms/ComRenWuView";
import { ComXinFaView } from "../../view/PkgMain/view/coms/ComXinFaView";
import { ComSkillView } from "../../view/PkgMain/view/coms/ComSkillView";

export default class ComChar extends fgui.GComponent {

	public c1: fgui.Controller;
	public com_renWu: ComRenWuView;
	public com_xinFa: ComXinFaView;
	public com_skill: ComSkillView;
	public RenWuIn: fgui.Transition;
	public RenWuOut: fgui.Transition;
	public XinFaIn: fgui.Transition;
	public XinFaOut: fgui.Transition;
	public SkillIn: fgui.Transition;
	public SkillOut: fgui.Transition;
	public static URL: string = "ui://vith2b66sbd04";

	public static createInstance(): ComChar {
		return <ComChar>(fgui.UIPackage.createObject("PkgMain", "ComChar"));
	}

	protected override onConstruct(): void {
		this.c1 = this.getControllerAt(0);
		this.com_renWu = <ComRenWuView>(this.getChildAt(9));
		this.com_xinFa = <ComXinFaView>(this.getChildAt(10));
		this.com_skill = <ComSkillView>(this.getChildAt(11));
		this.RenWuIn = this.getTransitionAt(0);
		this.RenWuOut = this.getTransitionAt(1);
		this.XinFaIn = this.getTransitionAt(2);
		this.XinFaOut = this.getTransitionAt(3);
		this.SkillIn = this.getTransitionAt(4);
		this.SkillOut = this.getTransitionAt(5);
	}
}