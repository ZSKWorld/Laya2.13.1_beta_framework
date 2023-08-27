export abstract class Decode<D, O> implements IDecode<D, O> {
    encode?(): D {
        this.beginEncode();
        const result = {} as D;
        Object.keys(this).forEach(key => {
            result[ key ] = this.onEncode(key as any);
        });
        return result;
    }

    decode(data: D): O {
        if (!data) return this as unknown as O;
        Object.keys(data).forEach((key) => {
            this[ key ] = this.onDecode(data, key as any);
        });
        this.afterDecode();
        return this as unknown as O;
    }

    protected onEncode(key: keyof D): any {
        return this[ key as string ];
    }

    protected onDecode(data: D, key: keyof D): any {
        return data[ key ];
    }

    protected beginEncode() {

    }

    protected afterDecode() {

    }

}