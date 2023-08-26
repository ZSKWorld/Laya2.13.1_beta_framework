declare interface IBase extends IBaseData, IDecode<IBaseData, IBase> {

    /** 获取最大精力值 */
    getMaxVigro(): number;

    /** 获取精力回复速率 */
    getVigorRecoveryRate(): number;

    /** 获取物品数量 */
    getItemCount(id: number): number;

    /** 改变物品数量 */
    changeItemCount(id: number, count: number): void;
}