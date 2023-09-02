declare interface ICitta extends ICittaData, IDecode<ICittaData, ICitta> {

}

declare interface IBase extends IBaseData, IDecode<IBaseData, IBase> {
    citta: ICitta;
    /** 今日是否已签到 */
    get signedIn():boolean;
    /** 获取最大精力值 */
    get maxVigro(): number;
    /** 获取精力回复速率 */
    get vigorRecover(): number;

    /** 获取物品数量 */
    getItemCount(id: number): number;

    /** 改变物品数量 */
    changeItemCount(id: number, count: number): void;
}