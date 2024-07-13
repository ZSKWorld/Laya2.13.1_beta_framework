import { RDDisplayType, RDTriggerType } from "./RedDotEnum";
import { IRedDotData, IRedDotNode } from "./RedDotInterface";
import { RedDotNode } from "./RedDotNode";

export class RedDotData implements IRedDotData {
    static eventCenter: Laya.EventDispatcher;
    private static gid: number = 0;
    private _id: number = ++RedDotData.gid;
    private _enable: boolean;
    private _path: string;
    private _names: string[];
    private _node: IRedDotNode;
    private _parent: RedDotData;
    private _childs: RedDotData[];
    private _triggers: RDTriggerType[];
    private _displayType: RDDisplayType;

    private _rdCount: number;
    private _triggeredMap: KeyMap<number>;

    get id() { return this._id; }
    get enable() {
        return this._enable && (this._parent ? this._parent.enable : true);
    }
    set enable(value: boolean) { this._enable = value; }
    get path() { return this._path; }
    get names() { return this._names; }
    get node() { return this._node; }
    get parent() { return this._parent; }
    set parent(parent: RedDotData) {
        if (parent) parent.addChild(this);
        else this.removeSelf();
    }
    get childs() { return this._childs; }
    get hasTrigger() { return this._triggers && this._triggers.length > 0; }
    get triggers() { return this._triggers; }
    get displayType() { return this._displayType; }
    get rdCount() { return this._rdCount; }

    private constructor() { }

    static Create(parent: IRedDotData, path: string, triggers?: RDTriggerType[], displayType = RDDisplayType.Normal): IRedDotData {
        const data = Laya.Pool.createByClass(RedDotData as any) as RedDotData;
        data._enable = true;
        data._childs = [];
        data._rdCount = 0;
        data._node = Laya.Pool.createByClass(RedDotNode as any) as IRedDotNode;
        data._node.data = data;

        data._path = path;
        data._names = path ? path.split(".") : null;
        data._triggers = triggers;
        data._displayType = displayType;
        if (data.hasTrigger) {
            data._triggeredMap = {};
            data.triggers.forEach(type => {
                RedDotData.eventCenter.on(type, data, data.onTrigger);
            });
        }
        data.parent = parent as any;
        return data;
    }

    calculateRD(force?: boolean) {
        const { hasTrigger, _triggeredMap, _rdCount, _childs, node, _parent } = this;
        let count = 0;
        if (hasTrigger) {
            for (const key in _triggeredMap) {
                count += _triggeredMap[key];
            }
        }
        _childs.forEach(v => count += Math.max(v.rdCount, 0));
        if (force || count != _rdCount) {
            this._rdCount = count;
            node.refresh();
            _parent && _parent.calculateCountLater();
        }
    }

    /** 触发当前节点红点检测事件 */
    doTrigger() {
        if (this.hasTrigger) {
            const id = this.id;
            this.triggers.forEach(v => {
                RedDotData.eventCenter.event("Trigger" + v, id);
            });
        } else {
            this.calculateCountLater();
        }
    }

    addChild(child: RedDotData) {
        if (!child) return;
        if (child._parent == this) return;
        child.removeSelf();
        child._parent = this;
        this._childs.push(child);
        child.calculateCountLater(true);
    }

    /**
     * 获取子节点
     * @param id 子节点id
     * @returns
     */
    getChild(id: number) {
        const { _childs } = this;
        let child: IRedDotData;
        for (let i = 0, cnt = _childs.length; i < cnt; i++) {
            child = _childs[i];
            if (child.id == id) break;
        }
        return child;
    }

    /**
     * 移除子节点
     * @param id 子节点id
     */
    removeChild(id: number) {
        const { _childs } = this;
        let child: RedDotData;
        for (let i = _childs.length - 1; i >= 0; i--) {
            child = _childs[i];
            if (child.id == id) {
                child._parent = null;
                _childs.splice(i, 1);
                break;
            }
        }
        if (child) {
            child.calculateCountLater(true);
            this.calculateCountLater();
        }
        return child;
    }

    removeSelf() {
        if (this._parent) {
            this._parent.removeChild(this.id);
        }
    }

    recover() {
        this.removeSelf();
        this._rdCount = 0;
        this._enable = false;
        this._parent = null;
        this._node && this._node.recover();
        this._node = null;
        this._triggers = null;
        this._childs = null;
        this._triggeredMap = null;
        Laya.Pool.recoverByClass(this);
        RedDotData.eventCenter.offAllCaller(this);
    }

    /**
     * 红点事件触发回调
     * @param type 事件类型
     * @param triggered 是否检测出了红点
     * @param id 触发事件的node id，不为空时只触发对应id的node的刷新
     */
    private onTrigger(type: RDTriggerType, triggered: boolean, id?: number) {
        if (!this.hasTrigger) return;
        if (id == this.id || this.triggers.indexOf(type) >= 0) {
            this._triggeredMap[type] = +!!triggered;
            this.calculateCountLater(id == this.id);
        }
    }

    private calculateCountLater(force?: boolean) {
        Laya.timer.callLater(this, this.calculateRD, [force]);
    }
}

