declare interface ICitta extends ICittaData, IDecode<ICittaData, ICitta> {

}

declare interface IBase extends IBaseData, IDecode<IBaseData, IBase> {
    /**心法数据 */
    citta: ICitta;

    /** 升级经验 */
    get upgradeExp(): number;
    /** 获取最大精力 */
    get maxVigro(): number;
    /** 获取精力恢复 */
    get vigorRecover(): number;
}