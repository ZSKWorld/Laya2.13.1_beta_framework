declare interface IDecode<D, O> {
    encode?(): D;
    decode?(data: D): O;
}