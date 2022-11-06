import * as colors from "colors";
export const enum Color {
    strip = "strip",
    stripColors = "stripColors",
    black = "black",
    red = "red",
    green = "green",
    yellow = "yellow",
    blue = "blue",
    magenta = "magenta",
    cyan = "cyan",
    white = "white",
    gray = "gray",
    grey = "grey",
    bgBlack = "bgBlack",
    bgRed = "bgRed",
    bgGreen = "bgGreen",
    bgYellow = "bgYellow",
    bgBlue = "bgBlue",
    bgMagenta = "bgMagenta",
    bgCyan = "bgCyan",
    bgWhite = "bgWhite",
    reset = "reset",
    bold = "bold",
    dim = "dim",
    italic = "italic",
    underline = "underline",
    inverse = "inverse",
    hidden = "hidden",
    strikethrough = "strikethrough",
    rainbow = "rainbow",
    zebra = "zebra",
    america = "america",
    trap = "trap",
    random = "random",
    zalgo = "zalgo",
}
export class Logger {
    private static _enable: boolean = true;
    static setEnable(enable: boolean) { this._enable = enable; }

    static log(txt: string, color: Color = Color.white) {
        if (!this._enable) return;
        console.log(colors[ color ](txt));
    }
}