import { Observer } from "../game/event/Observer";

const ClassNameTag = "__className";
const DontDispatchTag = "__dontDispatch";

/** 基本数据 */
export abstract class DecodeObject<T> extends Observer implements IDecodeObject<T> {
    private static _dispatchArr = new Set<string>();

    decode(data: OriginData<T>) {
        if (!data) return this as unknown as T;
        Object.keys(data).forEach((key) => {
            //规定__开头的私有变量不进行decode
            if (key.startsWith("__")) return;
            this[key] = this.onDecode(data, key as any);
            const clsName = this.constructor[ClassNameTag];
            if (!this.constructor[DontDispatchTag])
                DecodeObject._dispatchArr.add(`${ clsName }_${ key }_changed`.toLocaleLowerCase());
        });
        Laya.timer.callLater(DecodeObject, DecodeObject.dispatchEvent);
        this.afterDecode();
        return this as unknown as T;
    }

    protected onDecode(data: OriginData<T>, key: OriginDataKeys<T>) {
        return data[key];
    }

    protected afterDecode() { }

    private static dispatchEvent() {
        this._dispatchArr.forEach(v => this.dispatch(v));
        this._dispatchArr.clear();
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