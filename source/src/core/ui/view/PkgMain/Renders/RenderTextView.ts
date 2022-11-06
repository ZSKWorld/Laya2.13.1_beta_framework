import RenderText from "../../../ui/PkgMain/RenderText";
import { ExtensionClass } from "../../../../libs/utils/Util";
import { GComponentExtend } from "../../../core/Interfaces";

export class RenderTextView extends ExtensionClass<GComponentExtend, RenderText>(RenderText) {
    protected override onConstruct(): void {
        super.onConstruct();
        this.touchable = false;
    }

    setText(text: string) {
        this.title.text = text;
    }
}