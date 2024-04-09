export abstract class DecodeObject<T> implements IDecodeObject<T> {
    encode() {
        this.onBeginEncode();
        const result = {} as T;
        Object.keys(this).forEach(key => {
            //私有字段不保存
            if (key.startsWith("_")) return;
            result[key] = this.onEncode(key as any);
        });
        this.onEndEncode();
        return result;
    }

    decode(data: OriginData<T>) {
        if (!data) return <T><unknown>this;
        this.onBeginDecode();
        Object.keys(data).forEach((key) => {
            this[key] = this.onDecode(data, key as any);
        });
        this.onEndDecode();
        return <T><unknown>this;
    }

    protected onEncode(key: OriginDataKeys<T>) { return (<T><unknown>this)[key]; }

    protected onDecode(data: OriginData<T>, key: OriginDataKeys<T>) { return data[key]; }

    protected onBeginEncode() { }

    protected onEndEncode() { }

    protected onBeginDecode() { }

    protected onEndDecode() { }

}