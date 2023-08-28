declare interface IDecode<D, O> {
    decode?(data: D): O;
}