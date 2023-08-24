import { RDDisplayType, RDTriggerType } from "./RedDotConst";
import { RedDotNode } from "./RedDotNode";

export interface IRedDotData {
    readonly id: number;
    enable: boolean;
    readonly names: string[];
    readonly node: RedDotNode;
    parent: IRedDotData;
    readonly childs: IRedDotData[];
    readonly hasTrigger: boolean;
    readonly triggers: RDTriggerType[];
    readonly displayType: RDDisplayType;
    readonly rdCount: number;

    doTrigger(): void;

    /** 计算红点数量 */
    calculateRD(force?: boolean): void;

    addChild(child: IRedDotData): void;

    getChild(id: number): IRedDotData;

    removeChild(id: number): IRedDotData;

    removeSelf(): void;

    recover(): void;
}