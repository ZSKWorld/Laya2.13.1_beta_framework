import RenderLiLian from "../../../ui/PkgMain/RenderLiLian";

export class RenderLiLianView extends RenderLiLian {
    protected onConstruct(): void {
        super.onConstruct();
        // this.touchable = false;
    }

    setText(text: string) {
        this.title.text = text;
    }
}