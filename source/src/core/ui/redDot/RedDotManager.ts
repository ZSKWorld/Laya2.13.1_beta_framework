import { GameEvent } from "../../common/GameEvent";
import { eventMgr } from "../../game/event/EventManager";
import { RedDotData } from "./RedDotData";
import { RDDefineInit, RDMap } from "./RedDotDefine";
import { IRedDotData } from "./RedDotInterface";
import { RedDotTrigger } from "./RedDotTrigger";

class RedDotManager extends Laya.EventDispatcher {
    private _trigger: RedDotTrigger;

    init() {
        RedDotData.eventCenter = this;
        this._trigger = new RedDotTrigger(this);
        RDDefineInit();
        eventMgr.on(GameEvent.RedDotCompAwake, this, this.onRedDotCompAwake);
        eventMgr.on(GameEvent.RedDotCompDestroy, this, this.onRedDotCompDestroy);
    }

    private onRedDotCompAwake(comp: fgui.GComponent) {
        const data = this.getRDByComp(RDMap.Root, comp);
        data && data.doTrigger();
    }

    private onRedDotCompDestroy(comp: fgui.GComponent) {
        const data = this.getRDByComp(RDMap.Root, comp);
        data && data.recover();
    }

    private getRDByComp(data: IRedDotData, comp: fgui.GComponent): IRedDotData {
        if (!data || !comp) return null;
        if (data.node.comp == comp) return data;
        const childs = data.childs;
        for (let i = 0, cnt = childs.length; i < cnt; i++) {
            const result = this.getRDByComp(childs[i], comp);
            if (result) return result;
        }
        return null;
    }
}
export const redDotMgr = new RedDotManager();