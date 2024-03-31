declare interface IDecodeObject<D, O> {
    decode?(data: D): O;
}