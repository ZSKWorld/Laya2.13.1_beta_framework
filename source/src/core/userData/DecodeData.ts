import { Observer } from "../libs/event/Observer";

/** 基本数据 */
export abstract class DecodeData<T> extends Observer implements IDecode<T> {
    private static dispatchArr: Set<string> = new Set();

    decode(data: PartialAll<T>): T {
        if (!data) return this as unknown as T;
        Object.keys(data).forEach((key) => {
            //规定__开头的私有变量不进行decode
            if (key.startsWith("__")) return;
            this[ key ] = this.onDecode(data, key as any);
            const clsName = this[ "constructor" ][ "ClassName" ];
            DecodeData.dispatchArr.add(clsName.toLocaleLowerCase() + "_" + key.toLocaleLowerCase() + "_changed");
        });
        Laya.timer.callLater(DecodeData, DecodeData.dispatchEvent);
        this.afterDecode();
        return this as unknown as T;
    }

    protected onDecode(data: PartialAll<T>, key: keyof T): any {
        return data[ key ];
    }

    protected afterDecode() { }

    private static dispatchEvent() {
        this.dispatchArr.forEach(v => this.dispatch(v));
        this.dispatchArr.clear();
    }
}