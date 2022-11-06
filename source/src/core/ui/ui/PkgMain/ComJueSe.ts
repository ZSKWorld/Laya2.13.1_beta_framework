/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ComRenWu from "./ComRenWu";
import ComXinFa from "./ComXinFa";
import ComSkill from "./ComSkill";

export default class ComJueSe extends fgui.GComponent {

	public c1:fgui.Controller;
	public ComRenWu:ComRenWu;
	public ComXinFa:ComXinFa;
	public ComSkill:ComSkill;
	public t0:fgui.Transition;
	public RenWuIn:fgui.Transition;
	public RenWuOut:fgui.Transition;
	public XinFaIn:fgui.Transition;
	public XinFaOut:fgui.Transition;
	public SkillIn:fgui.Transition;
	public SkillOut:fgui.Transition;
	public static URL:string = "ui://vith2b66sbd04";

	public static createInstance():ComJueSe {
		return <ComJueSe>(fgui.UIPackage.createObject("PkgMain", "ComJueSe"));
	}

	protected override onConstruct():void {
		this.c1 = this.getControllerAt(0);
		this.ComRenWu = <ComRenWu>(this.getChildAt(9));
		this.ComXinFa = <ComXinFa>(this.getChildAt(10));
		this.ComSkill = <ComSkill>(this.getChildAt(11));
		this.t0 = this.getTransitionAt(0);
		this.RenWuIn = this.getTransitionAt(1);
		this.RenWuOut = this.getTransitionAt(2);
		this.XinFaIn = this.getTransitionAt(3);
		this.XinFaOut = this.getTransitionAt(4);
		this.SkillIn = this.getTransitionAt(5);
		this.SkillOut = this.getTransitionAt(6);
	}
}