class RichText {
    private _text: string = "";

    get text() { return this._text; }

    start(text: string = "") {
        this._text = text;
        return this;
    }

    /** 添加超链接 */
    href(url: string) {
        this._text = `[url=${ url }]${ this._text }[/url]`;
        return this;
    }

    /** 添加图片 */
    img(url: string, width?: number, height?: number) {
        if (width && height)
            this._text += `<img src="${ url }" width="${ width }" height="${ height }">`;
        else
            this._text += `<img src="${ url }">`;
        return this;
    }

    /** 粗体 */
    bold() {
        this._text = `[b]${ this._text }[/b]`;
        return this;
    }

    /** 斜体 */
    italic() {
        this._text = `[i]${ this._text }[/i]`;
        return this;
    }

    /** 下划线 */
    underline() {
        this._text = `[u]${ this._text }[/u]`;
        return this;
    }

    /** 添加空格 */
    space(num: number = 1) {
        if (num > 0)
            this._text += new Array(num).fill("&nbsp;").join("");
        return this;
    }

    /** 添加换行 */
    break(num: number = 1) {
        if (num > 0)
            this._text += new Array(num).fill("<br/>").join("");
        return this;
    }

    /** 设置大小 */
    size(size: number) {
        this._text = `[size=${ size }]${ this._text }[/size]`;
        return this;
    }

    /** 设置颜色 */
    color(color: string) {
        this._text = `[color=${ color }]${ this._text }[/color]`;
        return this;
    }

    /** 追加文本 */
    append(text: string) {
        this._text += text;
        return this;
    }

    end() {
        Laya.Pool.recoverByClass(this);
        const str = this._text;
        this._text = "";
        return str;
    }
}
class RichTextManager {
    start(text: string = "") {
        return Laya.Pool.createByClass(RichText).start(text);
    }
}

export const richTextMgr = new RichTextManager();