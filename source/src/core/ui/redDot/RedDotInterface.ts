import { RedDotCheckType, RedDotDisplayType } from "./RedDotConst";
import { RedDotNode } from "./RedDotNode";

export interface IRedDotData {
    readonly id: number;

    readonly name: string;

    readonly parent: IRedDotData;

    readonly owner: RedDotNode;

    /**
     * {@link RedDotCheckType }[] 检测类型，仅叶子节点有效
     * @see 为空即为非叶子节点，否则为叶子节点
     */
    readonly checkType?: RedDotCheckType[];

    /**
     * {@link RedDotDisplayType } 红点显示类型，默认 RedDotDisplayType.RedDot
     */
    readonly displayType?: RedDotDisplayType;

    setOwner(owner: RedDotNode): void;

    /**
     * @param parent 
     * @param name 
     * @param checkType {@link RedDotCheckType}[]
     * @param displayType {@link RedDotDisplayType} 默认 RedDotDisplayType.RedDot
     */
    setData(parent: IRedDotData, name: string, checkType?: RedDotCheckType[], displayType?: RedDotDisplayType): void;

    /** 回收节点 */
    recover(): void;
}