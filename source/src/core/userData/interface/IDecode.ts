declare interface IDecode<T>{
    decode(data:PartialAll<T>): T;
}