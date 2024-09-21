class RichStr {
    private _str: string = "";

    start(text: string = "") {
        this._str = text;
        return this;
    }

    getStr() { return this._str; }

    /** 添加空格 */
    space(num: number = 1) {
        this._str += new Array(num).fill("&nbsp;").join("");
        return this;
    }

    /** 添加换行 */
    break(num: number = 1) {
        this._str += new Array(num).fill("<br/>").join("");
        return this;
    }

    /** 设置大小 */
    size(size: number) {
        this._str = `[size=${ size }]${ this._str }[/size]`;
        return this;
    }

    /** 设置颜色 */
    color(color: string) {
        this._str = `[color=${ color }]${ this._str }[/color]`;
        return this;
    }

    combineSpace(str: string, num: number = 1) {
        this._str += str + new Array(num).fill("&nbsp;").join("");
        return this;
    }

    combineBreak(str: string, num: number = 1) {
        this._str += str + new Array(num).fill("<br/>").join("");
        return this;
    }

    combineSize(str: string, size: number) {
        this._str += `[size=${ size }]${ str }[/size]`;
        return this;
    }

    combineColor(str: string, color: string) {
        this._str += `[color=${ color }]${ str }[/color]`;
        return this;
    }

    end() {
        Laya.Pool.recoverByClass(this);
        return this._str;
    }
}
class RichStrManager {

    start(text: string = "") {
        const richStr = Laya.Pool.createByClass(RichStr);
        richStr.start(text);
        return richStr;
    }
}

export const richStrMgr = new RichStrManager();