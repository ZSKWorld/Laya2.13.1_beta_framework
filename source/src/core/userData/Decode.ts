import { Observer } from "../libs/event/Observer";

/** 基本数据 */
export abstract class Decode<D> extends Observer implements IDecode<D, any> {
    private static dispatchArr: Set<string> = new Set();

    decode(data: PartialAll<D>): D {
        if (!data) return this as unknown as D;
        Object.keys(data).forEach((key) => {
            //规定__开头的私有变量不进行decode
            if (key.startsWith("__")) return;
            this[ key ] = this.onDecode(data, key as any);
            const clsName = this[ "constructor" ][ "ClassName" ];
            if (!this[ "constructor" ][ "DontDispatch" ])
                Decode.dispatchArr.add(`${clsName}_${key}_changed`.toLocaleLowerCase());
        });
        Laya.timer.callLater(Decode, Decode.dispatchEvent);
        this.afterDecode();
        return this as unknown as D;
    }

    protected onDecode(data: PartialAll<D>, key: keyof D): any {
        return data[ key ];
    }

    protected afterDecode() { }

    private static dispatchEvent() {
        this.dispatchArr.forEach(v =>this.dispatch(v));
        this.dispatchArr.clear();
    }
}