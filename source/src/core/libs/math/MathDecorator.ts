/** 各种数学装饰器 */

import { MathUtil } from "./MathUtil";

/**
 * number类型字段数值限制
 * @param min 最小值
 * @param max 最大值
 * @param defaultValue 默认值，为空时使用min
 * @returns 
 */
export function Clamp(min: number, max: number, defaultValue?: number) {
    return function (target: Object, propertyKey: string) {
        if (typeof target[ propertyKey ] == "function") return;
        if (Reflect.has(target, propertyKey) == false && Reflect.has(target, propertyKey + "_ClampValue") == false) {
            Reflect.defineProperty(target, propertyKey + "_ClampValue", {
                value: MathUtil.Clamp(defaultValue ?? min, min, max),
                writable: true,
                enumerable: true,
            });
            Reflect.defineProperty(target, propertyKey, {
                get() { return Reflect.get(target, propertyKey + "_ClampValue"); },
                set(value: number) {
                    value = Number.isSafeInteger(value) ? value : min;
                    Reflect.set(target, "$" + propertyKey, MathUtil.Clamp(value, min, max));
                }
            });
        }
    }
}