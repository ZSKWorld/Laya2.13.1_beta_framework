import { RDDisplayType, RDTriggerType } from "./RedDotEnum";

export interface IRedDotData {
    readonly id: number;
    enable: boolean;
    readonly path: string;
    readonly names: string[];
    readonly node: IRedDotNode;
    parent: IRedDotData;
    readonly childs: IRedDotData[];
    readonly hasTrigger: boolean;
    readonly triggers: RDTriggerType[];
    readonly displayType: RDDisplayType;
    readonly rdCount: number;

    doTrigger(): void;

    addChild(child: IRedDotData): void;

    getChild(id: number): IRedDotData;

    removeChild(id: number): IRedDotData;

    removeSelf(): void;

    recover(): void;
}

export interface IRedDotNode {
    data: IRedDotData;
    comp: fgui.GComponent;
    refresh(): void;
    recover(): void;
}