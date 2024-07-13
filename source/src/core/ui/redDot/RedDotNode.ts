import { RDDisplayType } from "./RedDotEnum";
import { IRedDotData, IRedDotNode } from "./RedDotInterface";

export class RedDotNode implements IRedDotNode {
    /** 红点数据 */
    data: IRedDotData;
    /** 红点组件 */
    private _comp: fgui.GComponent;
    /** 红点文本 */
    private _text: fgui.GTextField;

    get comp() {
        if (!this._comp) {
            const names = this.data.names;
            if (names && names.length) {
                let target: fgui.GComponent = fgui.GRoot.inst;
                for (let i = 0, cnt = names.length; i < cnt; i++) {
                    if (target) target = target.getChild(names[i]) as fgui.GComponent;
                    else break;
                }
                if (target) {
                    this._comp = <fgui.GComponent>target.getChild("com_redDot");
                }
            }
        }
        return this._comp;
    }

    set comp(value: fgui.GComponent) {
        if (this._comp == value) return;
        this._comp = value;
        this._text = null;
        this.data.doTrigger();
    }

    get text() {
        if (!this._text && this.comp) {
            this._text = <fgui.GTextField>this.comp.getChild("txt_count");
        }
        return this._text;
    }

    private constructor() { }

    refresh() {
        const { comp, text, data } = this;
        comp && (comp.visible = data.rdCount > 0 && data.displayType != RDDisplayType.None && data.enable);
        text && (text.visible = data.displayType == RDDisplayType.Number);
        text && text.visible && (text.text = data.rdCount.toString());
    }

    recover() {
        this.data = null;
        this._comp = null;
        this._text = null;
        Laya.Pool.recoverByClass(this);
    }
}
