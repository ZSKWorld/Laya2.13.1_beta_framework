declare interface Object {
    /**
     * 获取属性描述
     */
    getPropertyDescriptor(property: string): PropertyDescriptor;

    /**
     * 浅拷贝当前对象
     * 注意: 仅浅拷贝属性, 继承原型链和方法等均会丢失
     */
    shallowClone(): Object;

    /**
     * 浅拷贝所有属性
     * 注意: 仅浅拷贝属性, 继承原型链和方法等均会丢失
     */
    shallowCloneTo(target: Object): void;

    /**
     * 深拷贝当前对象
     * 注意: 仅深拷贝属性, 继承原型链和方法等均会丢失
     */
    deepClone(): Object;

    /**
     * 深拷贝所有属性
     * 注意: 仅深拷贝属性, 继承原型链和方法等均会丢失
     */
    deepCloneTo(target: Object): void;

    /**
     * 清除所有属性
     */
    clearAllProperty(): void;
}

declare interface Number {
    /**
     * 格式化为用于显示的字符串
     */
    toFormat(): string;
}

declare interface String {
    /**
     * 根据分割符拆分字符串为数组且元素转换为数字
     */
    splitNum(separator: string, limit?: number): number[];
    splitNum(separator: RegExp, limit?: number): number[];
}

declare interface ArrayConstructor {
    /**
     * 默认的排序规则
     */
    readonly NORMAL: number;

    /**
     * 排序时字符串不区分大小写
     */
    readonly CASEINSENSITIVE: number;

    /**
     * 降序
     */
    readonly DESCENDING: number;

    /**
     * 返回包含已经排序完毕的索引数组
     */
    readonly RETURNINDEXEDARRAY: number;

    /**
     * 按数字而非字符串排序
     */
    readonly NUMERIC: number;
}

declare interface Array<T> {
    /**
     * 添加唯一数据
     */
    pushUnique(...args: T[]): number;

    /**
     * 按数组元素的字段进行排序, 支持多字段
     */
    sortOn(fieldNames: string | string[], options?: number | number[]): void | this;

    /**
     * 移除指定元素
     */
    remove(item: T): boolean;
    /**
     * 随机打乱数组
     */
    upset(): void | this;

}

declare class Date {
    /**
     * 格式化当前日期
     * 月(M), 日(d), 小时(h), 分(m), 秒(s), 季度(q)可以用 1-2 个占位符, 年(y)可以用 1-4 个占位符, 毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     */
    format(template: string): string;
}

declare interface ArrayConstructor {
    from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;
    from<T>(arrayLike: ArrayLike<T>): Array<T>;
}

declare interface Array<T> {
    fill(value: T, start?: number, end?: number): this;
}

declare interface String {
    startsWith(searchString: string, position?: number): boolean;
    endsWith(searchString: string, endPosition?: number): boolean;
}