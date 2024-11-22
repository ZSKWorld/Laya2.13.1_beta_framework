/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderText extends fgui.GComponent {

	public title: fgui.GRichTextField;
	public static url: string = "ui://vith2b66sbd0j";

	public static createInstance(): RenderText {
		return <RenderText>(fgui.UIPackage.createObject("PkgMain", "RenderText"));
	}

	protected override onConstruct(): void {
		this.title = <fgui.GRichTextField>(this.getChildAt(0));
	}
}