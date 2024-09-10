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