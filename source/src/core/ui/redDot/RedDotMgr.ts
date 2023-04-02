import { GameEvent } from "../../common/GameEvent";
import { eventMgr } from "../../libs/event/EventMgr";
import { RedDotChecker } from "./RedDotChecker";
import { IRedDotData } from "./RedDotInterface";
import { RedDotMap } from "./RedDotMap";
import { RedDotNode } from "./RedDotNode";

class RedDotMgr extends Laya.EventDispatcher {
    private _checker: RedDotChecker;
    private _root: RedDotNode;
    private _allLeftNode: RedDotNode[] = [];
    init() {
        if (!this._root) {
            RedDotNode.eventCenter = this;
            this._checker = new RedDotChecker(this);
            this._root = this.createNode(RedDotMap.Root, fgui.GRoot.inst);
            let node: RedDotNode;
            RedDotMap.map.forEach(v => {
                node = this.createNode(v);
                v.parent.owner.addChild(node);
                if (node.isLeafNoe)
                    this._allLeftNode.push(node);
            });
            eventMgr.on(GameEvent.RedDotCompAwake, this, this.onRedDotCompAwake);
        }
    }

    createNode(data: IRedDotData, owner?: fgui.GComponent) {
        return RedDotNode.createNode(data, owner);
    }

    getNode(id: number) { return this._root?.getChild(id); }

    private onRedDotCompAwake(comp: fgui.GComponent) {
        if (!comp) return;
        const allLeftNode = this._allLeftNode;
        for (let i = allLeftNode.length - 1; i >= 0; i--) {
            const node = allLeftNode[ i ];
            if (node.comp == comp) {
                node.triggerCheck();
                break;
            }
        }
    }
}
export const redDotMgr = new RedDotMgr();
windowImmit("RedDotMgr", redDotMgr);