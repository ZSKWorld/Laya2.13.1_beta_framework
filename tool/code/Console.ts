import * as colors from "colors";
export class Logger {
    static log(message: string) {
        console.log(colors.white(message));
    }

    static warn(message: string) {
        console.log(colors.yellow(message));
    }

    static error(message: string) {
        console.log(colors.red(message));
    }

    static green(message: string) {
        console.log(colors.green(message));
    }

}