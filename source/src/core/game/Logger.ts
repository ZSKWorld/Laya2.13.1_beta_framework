const enum LogLevel {
    Log = "Log",
    Warn = "Warn",
    Error = "Error",
    Assert = "Assert",
}

/** 日志打印工具 */
export class Logger {
    private static _consoleMap = {
        log: console.log,
        warn: console.warn,
        error: console.error,
    };
    /** 默认日志打印器 */
    private static readonly _default = new Logger("Default", true);
    private static _loggerMap: { [name: string]: Logger } = {};
    /** 是否开启日志打印，全局开关 */
    private static _enable: boolean = true;
    /** 各类型日志 字体颜色和背景色 */
    private static _color: { [key in LogLevel]: [string, string, string] } = {
        [LogLevel.Log]: ["#FFFFFF", "#00AAFF", "#FF0000"],
        [LogLevel.Warn]: ["#000080", "#FFC900", "#FF0000"],
        [LogLevel.Error]: ["#FF0000", "#FFC8C8", "#FF0000"],
        [LogLevel.Assert]: ["#FF0000", "#FFC8C8", "#FF0000"],
    }

    /**
     * 创建日志打印器
     * @param name 名称
     * @param enable 是否开启日志打印，默认true
     */
    static create(name: string, enable = true) {
        if (!this._enable) return this._default;
        let logger = Logger._loggerMap[name];
        if (!logger)
            Logger._loggerMap[name] = logger = new Logger(name);
        return logger.setEnable(enable);
    }

    /** 设置全局开关 */
    static setEnable(enable: boolean) { this._enable = enable; }

    static log(...args: any[]) { this._default.log(...args); }

    static warn(...args: any[]) { this._default.warn(...args); }

    static error(...args: any[]) { this._default.error(...args); }

    static assert(assert: boolean, tipText?: string) { this._default.assert(assert, tipText); }

    /** 处理日志参数
     * @param type 日志类型
     * @param name 名称
     * @param args 参数
     */
    private static processingLogParam(type: LogLevel, name: string, ...args: any[]) {
        return args;
        const borderRadius = 7;
        name += name ? ":" : "";
        const logParams = ["%c" + name + type, `color:${ this._color[type][0] };border-radius:${ borderRadius }px 0px 0px ${ borderRadius }px;background:#66CCFF;padding:5px;`];
        const len = args.length;
        let lastIsStr = false;
        let lastStrIndex = 1;
        for (let i = 0; i < len; i++) {
            const msg = args[i];
            if (typeof msg == "object") {
                logParams[0] += "%o";
                logParams.push(msg);
                lastIsStr = false;
            }
            else {
                logParams[0] += "%c" + String(msg);
                logParams.push(`color:${ this._color[type][0] };padding:5px;background:${ this._color[type][1] };font-weight:bold;${ lastIsStr ? "border-left:2px solid #ffffff;border-top:1px solid #ffffff;" : "" }`);
                lastIsStr = true;
                lastStrIndex = logParams.length - 1;
            }
        }
        if (lastStrIndex == 1) logParams[lastStrIndex] = logParams[lastStrIndex].replace(`border-radius:${ borderRadius }px 0px 0px ${ borderRadius }px`, `border-radius:${ borderRadius }px`);
        else logParams[lastStrIndex] += `border-radius:0px ${ borderRadius }px ${ borderRadius }px 0px;`;
        return logParams;
    }

    /** 打印日志
     * @param type 日志类型
     * @param name 名称
     * @param args 参数
     */
    private static doLog(type: LogLevel, name: string, ...args: any[]) {
        if (!this._enable) return;
        const logArr = Logger.processingLogParam(type, name, ...args);
        switch (type) {
            case LogLevel.Log: this._consoleMap.log.call(console, ...logArr); break;
            case LogLevel.Warn: this._consoleMap.warn.call(console, ...logArr); break;
            case LogLevel.Error: this._consoleMap.error.call(console, ...logArr); break;
            case LogLevel.Assert: this._consoleMap.error.call(console, ...logArr); break;
            default: break;
        }
    }

    private constructor(
        private _name: string,
        /** 是否开启打印日志，实例开关 */
        private _enable: boolean = true,
    ) { }

    log(...args: any[]) { this._enable && Logger.doLog(LogLevel.Log, this._name, ...args); }

    warn(...args: any[]) { this._enable && Logger.doLog(LogLevel.Warn, this._name, ...args); }

    error(...args: any[]) { this._enable && Logger.doLog(LogLevel.Error, this._name, ...args); }

    assert(assert: boolean, tipText?: string) { this._enable && !assert && Logger.doLog(LogLevel.Assert, this._name, tipText || "assert failed !"); }

    private setEnable(enable: boolean) { this._enable = enable; return this; }
}