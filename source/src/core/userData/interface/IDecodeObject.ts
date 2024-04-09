declare interface IDecodeObject<T> {
    decode?(data: OriginData<T>): T;
}