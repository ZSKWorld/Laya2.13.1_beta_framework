import { RedDotCheckType, RedDotDisplayType } from "./RedDotConst";
import { IRedDotData } from "./RedDotInterface";
import { RedDotNode } from "./RedDotNode";

class RedDotData implements IRedDotData {
    private static _gid: number = 0;
    private _id: number = ++RedDotData._gid;
    private _parent: IRedDotData;
    private _owner: RedDotNode;
    private _name: string;
    private _checkType: RedDotCheckType[];
    private _displayType: RedDotDisplayType;
    get id() { return this._id; }
    get parent() { return this._parent; }
    get owner() { return this._owner; }
    get name() { return this._name; }
    get checkType() { return this._checkType; }
    get displayType() { return this._displayType; }

    static Create(): IRedDotData {
        return Laya.Pool.createByClass(RedDotData);
    }

    setOwner(owner: RedDotNode): void {
        this._owner = owner;
    }

    setData(
        parent: IRedDotData,
        name: string,
        checkType?: RedDotCheckType[],
        displayType = RedDotDisplayType.RedDot
    ) {
        this._parent = parent;
        this._name = name;
        this._checkType = checkType;
        this._displayType = displayType;
    }

    recover(): void {
        this._parent = null;
        this._owner = null;
        this._checkType = null;
        Laya.Pool.recoverByClass(this);
    }
}

export class RedDotMap {
    private static _map: IRedDotData[] = [];
    static get map(): IRedDotData[] { return this._map; }
    //---------------Root---------------
    static readonly Root = RedDotMap.CreateRedDotData(null, "GRoot");
    static readonly Game = RedDotMap.CreateData(RedDotMap.Root, "Game");
    static readonly Bottom = RedDotMap.CreateData(RedDotMap.Root, "Bottom");
    static readonly Middle = RedDotMap.CreateData(RedDotMap.Root, "Middle");
    static readonly Top = RedDotMap.CreateData(RedDotMap.Root, "Top");
    static readonly Dialog = RedDotMap.CreateData(RedDotMap.Root, "Dialog");
    static readonly Alert = RedDotMap.CreateData(RedDotMap.Root, "Alert");
    static readonly Lock = RedDotMap.CreateData(RedDotMap.Root, "Lock");
    //---------------Game---------------
    //---------------Bottom---------------
    static readonly MainView = RedDotMap.CreateData(RedDotMap.Bottom, "MainView");
    static readonly MainView1 = RedDotMap.CreateData(RedDotMap.MainView, "btn_ShengChan", [ RedDotCheckType.Check1 ]);
    static readonly MainView2 = RedDotMap.CreateData(RedDotMap.MainView, "btn_HuoJi", [ RedDotCheckType.Check2 ], RedDotDisplayType.Number);
    static readonly MainView3 = RedDotMap.CreateData(RedDotMap.MainView, "btn_ShengJi", [ RedDotCheckType.Check3 ]);
    static readonly MainView4 = RedDotMap.CreateData(RedDotMap.MainView, "btn_ZhuanShi", [ RedDotCheckType.Check4 ], RedDotDisplayType.Number);
    static readonly MainView5 = RedDotMap.CreateData(RedDotMap.MainView, "btn_ShangDian", [ RedDotCheckType.Check5 ]);
    //---------------Middle---------------
    //---------------Top---------------
    //---------------Dialog---------------
    //---------------Alert---------------
    //---------------Lock---------------

    static CreateRedDotData(
        parent: IRedDotData,
        name: string,
        checkType?: RedDotCheckType[],
        displayType = RedDotDisplayType.RedDot,
    ) {
        const result = RedDotData.Create();
        result.setData(parent, name, checkType, displayType);
        return result;
    }

    private static CreateData(
        parent: IRedDotData,
        name: string,
        checkType?: RedDotCheckType[],
        displayType = RedDotDisplayType.RedDot,
    ) {
        const result = this.CreateRedDotData(parent, name, checkType, displayType);
        this._map.push(result);
        return result;
    }
}