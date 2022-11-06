const enum LogLevel {
    Log = "Log",
    Warn = "Warn",
    Error = "Error",
    Assert = "Assert",
}

/** 日志打印工具 */
export class Logger {
    /** 默认日志打印器 */
    private static readonly default = new Logger("Default", true);
    private static loggerMap: { [ name: string ]: Logger } = {};
    /** 是否开启日志打印，全局开关 */
    private static enable: boolean = true;
    /** 各类型日志 字体颜色和背景色 */
    private static Color: { [ key in LogLevel ]: [ string, string, string ] } = {
        [ LogLevel.Log ]: [ "#FFFFFF", "#00AAFF", "#FF0000" ],
        [ LogLevel.Warn ]: [ "#000080", "#FFC900", "#FF0000" ],
        [ LogLevel.Error ]: [ "#FF0000", "#FFC8C8", "#FF0000" ],
        [ LogLevel.Assert ]: [ "#FF0000", "#FFC8C8", "#FF0000" ],
    }

    /** 设置全局开关 */
    static SetEnable(enable: boolean) { this.enable = enable; }

    /** 创建日志打印器 */
    static Create(name: string, enable = true) {
        if (!this.enable) return this.default;
        let logger = Logger.loggerMap[ name ];
        if (!logger)
            Logger.loggerMap[ name ] = logger = new Logger(name);
        return logger.setEnable(enable);
    }

    /** 处理日志参数
     * @param type 日志类型
     * @param name 名称
     * @param args 参数
     */
    private static ProcessingLogParam(type: LogLevel, name: string, ...args: any[]) {
        const borderRadius = 7;
        name += name ? ":" : "";
        const logParams = [ "%c" + name + type, `color:${ this.Color[ type ][ 0 ] };border-radius:${ borderRadius }px 0px 0px ${ borderRadius }px;background:#66CCFF;padding:5px;` ];
        const len = args.length;
        let lastIsStr = false;
        let lastStrIndex = 1;
        for (let i = 0; i < len; i++) {
            const msg = args[ i ];
            if (typeof msg == "object") {
                logParams[ 0 ] += "%o";
                logParams.push(msg);
                lastIsStr = false;
            }
            else {
                logParams[ 0 ] += "%c" + String(msg);
                logParams.push(`color:${ this.Color[ type ][ 0 ] };padding:5px;background:${ this.Color[ type ][ 1 ] };font-weight:bold;${ lastIsStr ? "border-left:2px solid #ffffff;border-top:1px solid #ffffff;" : "" }`);
                lastIsStr = true;
                lastStrIndex = logParams.length - 1;
            }
        }
        if (lastStrIndex == 1) logParams[ lastStrIndex ] = logParams[ lastStrIndex ].replace(`border-radius:${ borderRadius }px 0px 0px ${ borderRadius }px`, `border-radius:${ borderRadius }px`);
        else logParams[ lastStrIndex ] += `border-radius:0px ${ borderRadius }px ${ borderRadius }px 0px;`;
        return logParams;
    }

    /** 打印日志
     * @param type 日志类型
     * @param name 名称
     * @param args 参数
     */
    private static DoLog(type: LogLevel, name: string, ...args: any[]) {
        if (!this.enable) return;
        const logArr = Logger.ProcessingLogParam(type, name, ...args);
        switch (type) {
            case LogLevel.Log: console.log(...logArr); break;
            case LogLevel.Warn: console.warn(...logArr); break;
            case LogLevel.Error: console.error(...logArr); break;
            case LogLevel.Assert: console.error(...logArr); break;
            default: break;
        }
    }

    private constructor(
        private _name: string,
        /** 是否开启打印日志，实例开关 */
        private _enable: boolean = true,
    ) { }

    log(...message: any[]) { this._enable && Logger.DoLog(LogLevel.Log, this._name, ...message); }

    warn(...message: any[]) { this._enable && Logger.DoLog(LogLevel.Warn, this._name, ...message); }

    error(...message: any[]) { this._enable && Logger.DoLog(LogLevel.Error, this._name, ...message); }

    assert(assert: boolean, tipText?: string) { this._enable && !assert && Logger.DoLog(LogLevel.Assert, this._name, tipText || "assert failed !"); }

    private setEnable(enable: boolean) { this._enable = enable; return this; }
}

windowImmit("Logger", Logger)