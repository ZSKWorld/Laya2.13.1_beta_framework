import { RDTriggerType } from "./RedDotEnum";

export interface IRedDotNode {
    readonly id: number;
    enable: boolean;
    parent: IRedDotNode;
    readonly childs: IRedDotNode[];
    triggers: RDTriggerType[];
    comp: fgui.GComponent;

    refresh(): void;
    trigger(): void;
    addChild(child: IRedDotNode): void;
    getChild(id: number): IRedDotNode;
    removeChild(id: number): IRedDotNode;
    removeSelf(): void;
    recover(): void;
}

export class RedDotNode implements IRedDotNode {
    static eventCenter: Laya.EventDispatcher;
    private static _gid: number = 0;
    private _id: number = ++RedDotNode._gid;
    private _enable: boolean = false;
    private _nameList: string[];
    private _parent: RedDotNode;
    private _childs: RedDotNode[] = [];
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
    private get hasTrigger() { return this._triggers && this._triggers.length > 0; }
    get triggers() { return this._triggers; }
    set triggers(value) {
        RedDotNode.eventCenter.offAllCaller(this);
        this._triggers = value;
        this._triggeredMap = value ? {} : null;
        if (this.hasTrigger)
            value.forEach(v => RedDotNode.eventCenter.on(v, this, this.onTrigger));
        this.trigger();
    }
    get comp() {
        if (this._comp && this._comp.isDisposed) this._comp = null;
        if (!this._comp) {
            const nameList = this._nameList;
            if (nameList && nameList.length) {
                let target: fgui.GComponent = fgui.GRoot.inst;
                for (let i = 0, cnt = nameList.length; i < cnt; i++) {
                    target = <fgui.GComponent>target.getChild(nameList[i]);
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
        this.trigger();
    }

    private constructor() { }

    static create(parent?: IRedDotNode, path: string = "", triggers?: RDTriggerType[]) {
        const data = Laya.Pool.createByClass(RedDotNode as any) as RedDotNode;
        data._enable = true;

        data._nameList = path ? path.split(".") : null;
        data.parent = parent as any;
        data.triggers = triggers;
        return data as IRedDotNode;
    }

    refresh() {
        this.comp && (this.comp.visible = this._rdCount > 0 && this.enable);
    }

    /** 触发当前节点红点检测事件 */
    trigger() {
        if (this.hasTrigger) {
            this.triggers.forEach(v => {
                RedDotNode.eventCenter.event("Trigger" + v);
            });
        } else {
            this.calculateCountLater();
        }
    }

    addChild(child: RedDotNode) {
        if (!child) return;
        if (child._parent == this) return;
        child.removeSelf();
        child._parent = this;
        this._childs.push(child);
        child.calculateCountLater();
    }

    /**
     * 获取子节点
     * @param id 子节点id
     * @returns
     */
    getChild(id: number) {
        return this._childs.find(v => v.id == id);
    }

    /**
     * 移除子节点
     * @param id 子节点id
     */
    removeChild(id: number) {
        const { _childs } = this;
        const index = _childs.findIndex(v => v.id == id);
        const child = _childs[index];
        if (child) {
            child._parent = null;
            _childs.splice(index, 1);
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
        this._childs.length = 0;
        this._triggeredMap = null;
        this._comp = null;
        Laya.Pool.recoverByClass(this);
        RedDotNode.eventCenter.offAllCaller(this);
    }

    /**
     * 红点事件触发回调
     * @param type 事件类型
     * @param triggered 是否检测出了红点
     */
    private onTrigger(type: RDTriggerType, triggered: boolean) {
        if (!this.hasTrigger) return;
        if (this.triggers.indexOf(type) >= 0) {
            this._triggeredMap[type] = +!!triggered;
            this.calculateCountLater();
        }
    }

    private calculateCountLater() {
        Laya.timer.callLater(this, this.calculateRD);
    }

    private calculateRD() {
        const { hasTrigger, _triggeredMap, _rdCount, _childs } = this;
        let count = 0;
        if (hasTrigger && _childs.length == 0) {
            for (const key in _triggeredMap) {
                count += _triggeredMap[key];
            }
        }
        _childs.forEach(v => count += Math.max(v._rdCount, 0));
        this._rdCount = count;
        this.refresh();
        this._parent && this._parent.calculateCountLater();
    }
}

