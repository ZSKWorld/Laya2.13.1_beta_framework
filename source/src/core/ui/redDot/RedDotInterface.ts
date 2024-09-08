import { RDTriggerType } from "./RedDotEnum";

export interface IRedDotNode {
    readonly id: number;
    enable: boolean;
    parent: IRedDotNode;
    readonly childs: IRedDotNode[];
    readonly hasTrigger: boolean;
    triggers: RDTriggerType[];
    comp: fgui.GComponent;

    doTrigger(): void;
    refresh(): void;
    addChild(child: IRedDotNode): void;
    getChild(id: number): IRedDotNode;
    removeChild(id: number): IRedDotNode;
    removeSelf(): void;
    recover(): void;
}