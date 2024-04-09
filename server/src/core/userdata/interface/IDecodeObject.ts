declare interface IDecodeObject<T> {
    encode?(): T;

    decode?(data: OriginData<T>): T;
}