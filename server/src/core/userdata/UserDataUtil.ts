import { tableMgr } from "../table/TableManager";

export class UserDataUtil {
    /** 获取对应境界最大精力 */
    static getMaxVigro(citta: KeyData) {
        let xinFaJL = 0;
        Object.keys(citta).forEach(v => xinFaJL += (citta[ v ] * tableMgr.XinFaBook[ v ].JLAdd));
        return Math.floor(86400 + xinFaJL);
    }

    /** 获取精力恢复速率 */
    static getVigorRecoveryRate(citta: KeyData) {
        let xinFaJLHF = 0;
        Object.keys(citta).forEach(v => xinFaJLHF += (citta[ v ] * tableMgr.XinFaBook[ v ].JLHFAdd));
        return 1 + xinFaJLHF;
    }
}