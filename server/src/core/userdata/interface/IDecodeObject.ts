declare interface IDecodeObject<D, O> {
    encode?(): D;

    decode?(data: D): O;
}