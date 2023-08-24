const enum LogLevel {
    Log = "Log",
    Warn = "Warn",
    Error = "Error",
    Assert = "Assert",
}

/** 日志打印工具 */
export class Logger {
    private static consoleMap = {
        log: console.log,
        warn: console.warn,
        error: console.error,
    };
    /** 默认日志打印器 */
    private static readonly default = new Logger("Default", true);
    private static loggerMap: { [ name: string ]: Logger } = {};
    /** 是否开启日志打印，全局开关 */
    private static enable: boolean = true;
    /** 各类型日志 字体颜色和背景色 */
    private static color: { [ key in LogLevel ]: [ string, string, string ] } = {
        [ LogLevel.Log ]: [ "#FFFFFF", "#00AAFF", "#FF0000" ],
        [ LogLevel.Warn ]: [ "#000080", "#FFC900", "#FF0000" ],
        [ LogLevel.Error ]: [ "#FF0000", "#FFC8C8", "#FF0000" ],
        [ LogLevel.Assert ]: [ "#FF0000", "#FFC8C8", "#FF0000" ],
    }

    /**
     * 创建日志打印器
     * @param name 名称
     * @param enable 是否开启日志打印，默认true
     */
    static Create(name: string, enable = true) {
        if (!this.enable) return this.default;
        let logger = Logger.loggerMap[ name ];
        if (!logger)
            Logger.loggerMap[ name ] = logger = new Logger(name);
        return logger.setEnable(enable);
    }

    /** 设置全局开关 */
    static SetEnable(enable: boolean) { this.enable = enable; }

    static Log(...args: any[]) { this.default.log(...args); }

    static Warn(...args: any[]) { this.default.warn(...args); }

    static Error(...args: any[]) { this.default.error(...args); }

    static Assert(assert: boolean, tipText?: string) { this.default.assert(assert, tipText); }

    /** 处理日志参数
     * @param type 日志类型
     * @param name 名称
     * @param args 参数
     */
    private static ProcessingLogParam(type: LogLevel, name: string, ...args: any[]) {
        const borderRadius = 7;
        name += name ? ":" : "";
        const logParams = [ "%c" + name + type, `color:${ this.color[ type ][ 0 ] };border-radius:${ borderRadius }px 0px 0px ${ borderRadius }px;background:#66CCFF;padding:5px;` ];
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
                logParams.push(`color:${ this.color[ type ][ 0 ] };padding:5px;background:${ this.color[ type ][ 1 ] };font-weight:bold;${ lastIsStr ? "border-left:2px solid #ffffff;border-top:1px solid #ffffff;" : "" }`);
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
            case LogLevel.Log: this.consoleMap.log.call(console, ...logArr); break;
            case LogLevel.Warn: this.consoleMap.warn.call(console, ...logArr); break;
            case LogLevel.Error: this.consoleMap.error.call(console, ...logArr); break;
            case LogLevel.Assert: this.consoleMap.error.call(console, ...logArr); break;
            default: break;
        }
    }

    private constructor(
        private _name: string,
        /** 是否开启打印日志，实例开关 */
        private _enable: boolean = true,
    ) { }

    log(...args: any[]) { this._enable && Logger.DoLog(LogLevel.Log, this._name, ...args); }

    warn(...args: any[]) { this._enable && Logger.DoLog(LogLevel.Warn, this._name, ...args); }

    error(...args: any[]) { this._enable && Logger.DoLog(LogLevel.Error, this._name, ...args); }

    assert(assert: boolean, tipText?: string) { this._enable && !assert && Logger.DoLog(LogLevel.Assert, this._name, tipText || "assert failed !"); }

    private setEnable(enable: boolean) { this._enable = enable; return this; }
}

windowImmit("Logger", Logger);
