class RichStr {
    private str: string = "";

    start(text: string = "") {
        this.str = text;
        return this;
    }

    /** 添加空格 */
    space(num: number) {
        this.str += new Array(num).fill("&nbsp;").join("");
        return this;
    }

    /** 添加换行 */
    break(num: number = 1) {
        this.str += new Array(num).fill("<br>").join("");
        return this;
    }

    /** 设置大小 */
    size(size: number) {
        this.str = `[size=${ size }]${ this.str }[/size]`;
        return this;
    }

    /** 设置颜色 */
    color(color: string) {
        this.str = `[color=${ color }]${ this.str }[/color]`;
        return this;
    }

    combineSpace(str: string, num: number = 1) {
        this.str += str + new Array(num).fill("&nbsp;").join("");
        return this;
    }

    combineBreak(str: string, num: number = 1) {
        this.str += str + new Array(num).fill("<br>").join("");
        return this;
    }

    combineSize(str: string, size: number) {
        this.str += `[size=${ size }]${ str }[/size]`;
        return this;
    }

    combineColor(str: string, color: string) {
        this.str += `[color=${ color }]${ str }[/color]`;
        return this;
    }

    end() {
        Laya.Pool.recoverByClass(this);
        return this.str;
    }
}
export class RichStrMgr {

    static start(text: string = "") {
        const richStr = Laya.Pool.createByClass(RichStr);
        richStr.start(text);
        return richStr;
    }
}