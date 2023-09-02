export abstract class Decode<D, O> implements IDecode<D, O> {

    encode?() {
        this.beginEncode();
        const result = {} as D;
        Object.keys(this).forEach(key => {
            //私有字段不保存
            if (key.startsWith("_")) return;
            result[ key ] = this.onEncode(key as any);
        });
        this.afterEncode();
        return result;
    }

    decode?(data: D) {
        if (!data) return this as unknown as O;
        this.beginDecode();
        Object.keys(data).forEach((key) => {
            this[ key ] = this.onDecode(data, key as any);
        });
        this.afterDecode();
        return this as unknown as O;
    }

    protected onEncode(key: keyof D) {
        return (<D><unknown>this)[ key ];
    }

    protected onDecode(data: D, key: keyof D) {
        return data[ key ];
    }

    protected beginEncode() { }

    protected afterEncode() { }

    protected beginDecode() { }

    protected afterDecode() { }

}