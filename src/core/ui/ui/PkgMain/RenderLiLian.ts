/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderLiLian extends fgui.GComponent {

	public title:fgui.GRichTextField;
	public static URL:string = "ui://vith2b66sbd0j";

	public static createInstance():RenderLiLian {
		return <RenderLiLian>(fgui.UIPackage.createObject("PkgMain", "RenderLiLian"));
	}

	protected onConstruct():void {
		this.title = <fgui.GRichTextField>(this.getChildAt(0));
	}
}