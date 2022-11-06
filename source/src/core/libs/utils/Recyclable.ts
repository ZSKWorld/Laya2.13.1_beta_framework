/**
 * 获取一个可回收的对象
 */
export function recyclable<T>(creator: Class<T>): Recyclable<T> {
    const result = Laya.Pool.createByClass(creator) as Recyclable<T> & RecycleMethod;
    if (!result.recycle) {
        result.recycle = function () {
            this.onRecycle?.();
            Laya.Pool.recoverByClass(this);
        }
    }
    result.onReuse?.();
    return result;
}
/** 回收对象 */
export function recycleItems(...args: (Recycle | Recycle[])[]) {
    for (let i = args.length - 1; i >= 0; i--) {
        const temp = args[ i ];
        if (Array.isArray(temp)) {
            temp.forEach((v) => v.recycle());
            temp.length = 0;
        } else if (temp) {
            temp.recycle();
        }
    }
}

const tempRecycleArr: Recyclable<any>[] = [];
function getRecyclables<T>(creator: Class<T>, count: number = 1) {
    tempRecycleArr.length = 0;
    for (let i = 0; i < count; i++) {
        tempRecycleArr.push(recyclable(creator));
    }
    return tempRecycleArr as Recyclable<T>[];
}
/**获取可回收Vector2 */
export const recyclableV2 = (count = 1) => getRecyclables(Laya.Vector2, count);
/**获取可回收Point */
export const recyclablePoint = (count = 1) => getRecyclables(Laya.Point, count);
