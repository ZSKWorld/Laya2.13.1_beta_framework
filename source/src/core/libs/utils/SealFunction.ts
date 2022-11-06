/**
 * 密封类方法装饰器工厂
 * @param funcName 方法名或方法名数组
 * @example 
 * # 使用示例
 * ```ts
 * //密封BaseClass中的destroy方法
 * -@SealFunction("destroy")
 * class BaseClass {
 *      public destroy(){
 *      
 *      }
 * }
 * class ChildClass extends BaseClass{
 *      public destroy(){
 *          //这里重写父类方法，运行时会报错
 *      }
 * }
 * ```
 */
export function SealFunction(funcName: string | string[]) {
    return function (target: any): any {
        return class NewClass extends target {
            constructor() {
                super();
                if (Array.isArray(funcName)) {
                    const len = funcName.length;
                    for (let i = 0; i < len; i++) {
                        if (this[ funcName[ i ] ] !== NewClass.prototype[ funcName[ i ] ])
                            throw ("密封方法不能重写=>" + funcName[ i ]);
                    }
                }
                else {
                    if (this[ funcName ] !== NewClass.prototype[ funcName ])
                        throw ("密封方法不能重写=>" + funcName);
                }
            }
        }
    }
}