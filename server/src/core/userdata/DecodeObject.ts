export abstract class DecodeObject<D, O> implements IDecodeObject<D, O> {

    static encode<ED, EO>(data: DecodeObject<ED, EO>) {
        data.onBeginEncode();
        const result = {} as ED;
        Object.keys(data).forEach(key => {
            //私有字段不保存
            if (key.startsWith("_")) return;
            result[key] = data.onEncode(key as any);
        });
        data.onEndEncode();
        return result;
    }

    static decode<DD, DO>(source: DD, target: DecodeObject<DD, DO>) {
        if (!source) return target as unknown as DO;
        target.onBeginDecode();
        Object.keys(source).forEach((key) => {
            target[key] = target.onDecode(source, key as any);
        });
        target.onEndDecode();
        return target as unknown as DO;
    }

    encode?() { return DecodeObject.encode(this); }

    decode?(data: D) { return DecodeObject.decode(data, this); }

    protected onEncode(key: keyof D) { return (<D><unknown>this)[key]; }

    protected onDecode(data: D, key: keyof D) { return data[key]; }

    protected onBeginEncode() { }

    protected onEndEncode() { }

    protected onBeginDecode() { }

    protected onEndDecode() { }

}