import { RedDotCheckType, RedDotDisplayType } from "./RedDotConst";
import { IRedDotData } from "./RedDotInterface";

export class RedDotNode {
    static eventCenter: Laya.EventDispatcher;
    private static __pool: RedDotNode[] = [];
    private _inPool: boolean;
    private _enable: boolean;
    /** 红点信息 */
    private _data: IRedDotData;
    /** 红点组件父节点 */
    private _owner: fgui.GComponent;
    /** 红点组件 */
    private _comp: fgui.GComponent;
    /** 红点文本 */
    private _text: fgui.GTextField;
    /** 父节点 */
    private _parent: RedDotNode;
    /** 子节点 */
    private _childs: RedDotNode[] = [];
    /** 红点数量 */
    private _count: number = -1;
    /** 红点检测映射 */
    private _checkedMap: KeyMap<boolean>;

    get enable() { return this._enable && (this._parent?.enable ?? true); }

    get owner() {
        if (!this._owner) {
            if (this._parent) {
                const pTarget = this._parent.owner;
                if (pTarget) {
                    this._owner = <fgui.GComponent>pTarget.getChild(this._data.name);
                }
            }
        }
        return this._owner;
    }

    get comp() {
        if (this.owner) {
            this._comp = <fgui.GComponent>this.owner.getChild("com_RedDot");
        }
        return this._comp;
    }

    get text() {
        if (this.comp) {
            this._text = <fgui.GTextField>this.comp.getChild("txt_Count");
        }
        return this._text;
    }

    /** 是否是叶子节点 */
    get isLeafNoe() {
        return !!this._data.checkType;
    }

    private constructor() { }

    static createNode(data: IRedDotData, owner?: fgui.GComponent) {
        const node = RedDotNode.__pool.pop() || new RedDotNode();
        node._inPool = false;
        node._enable = true;
        node._data = data;
        node._owner = owner;
        data.setOwner(node);
        if (node.isLeafNoe) {
            data.checkType.forEach(type => {
                RedDotNode.eventCenter.on(type, node, node.onChecked);
            });
            node.triggerCheck();
        }
        return node;
    }

    /** 触发当前节点所检测的红点事件 */
    triggerCheck() {
        const { isLeafNoe, _data } = this;
        isLeafNoe && _data.checkType.forEach(v => {
            RedDotNode.eventCenter.event("Trigger" + v, _data.id);
        });
    }

    addChild(node: RedDotNode) {
        if (!node) return;
        if (this.getChild(node._data.id)) {
            return console.error("重复添加子节点");
        }
        node.removeSelf();
        node._parent = this;
        this._childs.push(node);
        Laya.timer.callLater(this, this.calculateCount, [true]);
    }

    /**
     * 获取子节点
     * @param id 子节点id
     * @returns
     */
    getChild(id: number) {
        const { _childs } = this;
        let child: RedDotNode;
        for (let i = 0, cnt = _childs.length; i < cnt; i++) {
            child = _childs[ i ];
            if (child._data.id == id) return child;
            child = child.getChild(id);
            if (child) return child;
        }
        return null;
    }

    /**
     * 移除子节点
     * @param id 子节点id
     */
    removeChild(id: number) {
        const { _childs } = this;
        let child: RedDotNode;
        for (let i = _childs.length - 1; i >= 0; i--) {
            child = _childs[ i ];
            if (child._data.id == id) {
                child._parent = null;
                _childs.splice(i, 1);
                break
            }
            child = child.removeChild(id);
            if (child) break;
            child = null;
        }
        Laya.timer.callLater(this, this.calculateCount, [true]);
        return child;
    }

    removeSelf() {
        if (this._parent) {
            this._parent.removeChild(this._data.id);
        }
    }

    recover() {
        this.removeSelf();
        this._enable = false;
        this._data?.recover();
        this._data = null;
        this._owner = null;
        this._comp = null;
        this._text = null;
        this._childs.forEach(v => v.recover());
        this._childs.length = 0;
        this._count = -1;
        this._checkedMap = null;
        RedDotNode.eventCenter.offAllCaller(this);
        if (this._inPool) return;
        this._inPool = true;
        RedDotNode.__pool.push(this);
    }

    /**
     * 红点事件回调函数
     * @param type 事件类型
     * @param checked 是否检测出了红点
     * @param id 触发事件的node id，不为空时只触发对应id的node的刷新
     */
    private onChecked(type: RedDotCheckType, checked: boolean, id?: number) {
        if (id == this._data.id || this._data.checkType.indexOf(type) >= 0) {
            if (!this._checkedMap) this._checkedMap = {};
            this._checkedMap[ type ] = checked;
            Laya.timer.callLater(this, this.calculateCount, [ id == this._data.id ]);
        }
    }

    /** 计算当前节点的红点数量 */
    private calculateCount(force: boolean = false) {
        const { isLeafNoe, _checkedMap, _childs, _count, _parent } = this;
        let count = 0;
        if (isLeafNoe) {
            for (const key in _checkedMap) {
                count += +_checkedMap[ key ];
            }
        } else {
            _childs.forEach(v => count += v._count);
        }
        if (force || count != _count) {
            this._count = count;
            this.onCountChanged();
            if (_parent)
                Laya.timer.callLater(_parent, _parent.calculateCount);
        }
    }

    /** 红点数量变化 */
    private onCountChanged() {
        const { comp, text } = this;
        comp && (comp.visible = this._count > 0 && this._data.displayType != RedDotDisplayType.None && this.enable);
        text && (text.visible = this._data.displayType == RedDotDisplayType.Number);
        text && text.visible && (text.text = this._count.toString());
    }
}
