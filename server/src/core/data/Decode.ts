export abstract class Decode<D, O> implements IDecode<D, O> {
    encode?(): D {
        const result = {} as D;
        Object.keys(this).forEach(key => {
            result[ key ] = this.onEncode(key as any);
        });
        this.afterDecode();
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

    protected onEncode(key: keyof this): any {
        return this[ key ];
    }

    protected onDecode(data: D, key: keyof D): any {
        return data[ key ];
    }

    protected afterEncode() {

    }

    protected afterDecode() {

    }

}