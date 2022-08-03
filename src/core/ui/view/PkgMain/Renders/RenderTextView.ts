import RenderText from "../../../ui/PkgMain/RenderText";

export class RenderTextView extends RenderText {
    protected onConstruct(): void {
        super.onConstruct();
        this.touchable = false;
    }

    setText(text: string) {
        this.title.text = text;
    }
}