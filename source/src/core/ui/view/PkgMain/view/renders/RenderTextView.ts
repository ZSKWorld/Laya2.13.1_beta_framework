import RenderText from "../../../../ui/PkgMain/RenderText";

export const enum RenderTextMsg {

}

export class RenderTextView extends ExtensionClass<IView, RenderText>(RenderText) {
    static readonly PkgRes = ResPath.PkgPath.PkgMain;
	override onCreate() {
        this.touchable = false;
    }

    setText(text: string) {
        this.title.text = text;
    }

}
