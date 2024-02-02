import { Observer } from "../libs/event/Observer";

const ClassNameTag = "__className";
const DontDispatchTag = "__dontDispatch";

/** 基本数据 */
export abstract class Decode<D> extends Observer implements IDecode<D, any> {
    private static dispatchArr = new Set<string>();

    decode(data: D) {
        if (!data) return this;
        Object.keys(data).forEach((key) => {
            //规定__开头的私有变量不进行decode
            if (key.startsWith("__")) return;
            this[key] = this.onDecode(data, key as any);
            const clsName = this.constructor[ClassNameTag];
            if (!this.constructor[DontDispatchTag])
                Decode.dispatchArr.add(`${ clsName }_${ key }_changed`.toLocaleLowerCase());
        });
        Laya.timer.callLater(Decode, Decode.dispatchEvent);
        this.afterDecode();
        return this;
    }

    protected onDecode(data: D, key: keyof D) {
        return data[key];
    }

    protected afterDecode() { }

    private static dispatchEvent() {
        this.dispatchArr.forEach(v => this.dispatch(v));
        this.dispatchArr.clear();
    }
}

export function ClassName(className: string) {
    return function (target: Function) {
        target[ClassNameTag] = className;
    };
}

export function ClassDontDispatch(target: Function) {
    target[DontDispatchTag] = true;
}