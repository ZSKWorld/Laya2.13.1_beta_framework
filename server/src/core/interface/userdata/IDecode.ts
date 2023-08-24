declare interface IDecode<T>{
    encode(): T;
    decode(data:T): T;
}