/** 工具方法集合 */

/**
 * 扩展类字段，用于在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
 * @param clsT 要扩展的类
 * @returns
 */
export function ExtensionClass<E, T>(clsT: Class<T>) {
    return clsT as Class<T & E>;
}


/** 大写首字母 */
export function UpperFirst(str: string, splits?: string[]) {
    if (!str) return str;
    if (str.length == 1) return str.toUpperCase();
    else {
        let temp = str[ 0 ].toUpperCase() + str.substring(1);
        if (splits && splits.length) {
            let resultArr = [ temp ];
            splits.forEach(v => {
                let count = resultArr.length;
                while (count--) {
                    resultArr.push(...resultArr.shift().split(v).map(v1 => UpperFirst(v1)));
                }
            });
            return resultArr.join("_");
        } else {
            return temp;
        }
    }
}