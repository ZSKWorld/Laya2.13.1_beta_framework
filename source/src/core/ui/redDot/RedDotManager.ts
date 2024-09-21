import { GameEvent } from "../../common/GameEvent";
import { RDDefineInit, RDMap } from "./RedDotDefine";
import { IRedDotNode, RedDotNode } from "./RedDotNode";
import { RedDotTrigger } from "./RedDotTrigger";

class RedDotManager extends Laya.EventDispatcher {
    private _trigger: RedDotTrigger;

    init() {
        RedDotNode.eventCenter = this;
        this._trigger = new RedDotTrigger(this);
        RDDefineInit();
        eventMgr.on(GameEvent.RedDotCompAwake, this, this.onRedDotCompAwake);
        eventMgr.on(GameEvent.RedDotCompDestroy, this, this.onRedDotCompDestroy);
    }

    private onRedDotCompAwake(comp: fgui.GComponent) {
        const data = this.getRDByComp(RDMap.Root, comp);
        data && data.refresh();
    }

    private onRedDotCompDestroy(comp: fgui.GComponent) {
        const data = this.getRDByComp(RDMap.Root, comp);
        data && data.recover();
    }

    private getRDByComp(data: IRedDotNode, comp: fgui.GComponent): IRedDotNode {
        if (!data || !comp) return null;
        if (data.comp == comp) return data;
        const childs = data.childs;
        for (let i = 0, cnt = childs.length; i < cnt; i++) {
            const result = this.getRDByComp(childs[i], comp);
            if (result) return result;
        }
        return null;
    }
}
export const redDotMgr = new RedDotManager();
WindowImmit("redDotMgr", redDotMgr);