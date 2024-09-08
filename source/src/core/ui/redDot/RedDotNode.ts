import { RDTriggerType } from "./RedDotEnum";
import { IRedDotNode } from "./RedDotInterface";

export class RedDotNode implements IRedDotNode {
    static eventCenter: Laya.EventDispatcher;
    private static gid: number = 0;
    private _id: number = ++RedDotNode.gid;
    private _enable: boolean = false;
    private _names: string[];
    private _parent: RedDotNode;
    private _childs: RedDotNode[];
    private _triggers: RDTriggerType[];
    private _rdCount: number = 0;
    private _triggeredMap: KeyMap<number>;
    /** 红点组件 */
    private _comp: fgui.GComponent;

    get id() { return this._id; }
    get enable() { return this._enable && (this._parent ? this._parent.enable : true); }
    set enable(value: boolean) { this._enable = value; }
    get parent() { return this._parent; }
    set parent(parent: RedDotNode) { parent ? parent.addChild(this) : this.removeSelf(); }
    get childs() { return this._childs; }
    get hasTrigger() { return this._triggers && this._triggers.length > 0; }
    get triggers() { return this._triggers; }
    set triggers(value) {
        RedDotNode.eventCenter.offAllCaller(this);
        this._triggers = value;
        this._triggeredMap = value ? {} : null;
        if (this.hasTrigger)
            value.forEach(v => RedDotNode.eventCenter.on(v, this, this.onTrigger));
        this.doTrigger();
    }
    get comp() {
        if (this._comp && this._comp.isDisposed)
            this._comp = null;
        if (!this._comp) {
            const names = this._names;
            if (names && names.length) {
                let target: fgui.GComponent = fgui.GRoot.inst;
                for (let i = 0, cnt = names.length; i < cnt; i++) {
                    target = target.getChild(names[i]) as fgui.GComponent;
                    if (!target) break;
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
        this.doTrigger();
    }

    private constructor() { }

    static Create(parent: IRedDotNode, path: string, triggers?: RDTriggerType[]): IRedDotNode {
        const data = Laya.Pool.createByClass(RedDotNode as any) as RedDotNode;
        data._enable = true;
        data._childs = [];
        data._rdCount = 0;

        data._names = path ? path.split(".") : null;
        data.parent = parent as any;
        data.triggers = triggers;
        return data;
    }

    /** 触发当前节点红点检测事件 */
    doTrigger() {
        if (this.hasTrigger) {
            const id = this.id;
            this.triggers.forEach(v => {
                RedDotNode.eventCenter.event("Trigger" + v, id);
            });
        } else {
            this.calculateCountLater();
        }
    }

    refresh() {
        this.comp && (this.comp.visible = this._rdCount > 0 && this.enable);
    }

    addChild(child: RedDotNode) {
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
        let child: IRedDotNode;
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
        let child: RedDotNode;
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
        this._triggers = null;
        this._childs = null;
        this._triggeredMap = null;
        this._comp = null;
        Laya.Pool.recoverByClass(this);
        RedDotNode.eventCenter.offAllCaller(this);
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

    private calculateRD(force?: boolean) {
        const { hasTrigger, _triggeredMap, _rdCount, _childs } = this;
        let count = 0;
        if (hasTrigger) {
            for (const key in _triggeredMap) {
                count += _triggeredMap[key];
            }
        }
        _childs.forEach(v => count += Math.max(v._rdCount, 0));
        if (force || count != _rdCount) {
            this._rdCount = count;
            this.refresh();
            this._parent && this._parent.calculateCountLater();
        }
    }
}

