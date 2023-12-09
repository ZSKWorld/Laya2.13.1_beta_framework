/** 大写首字母 */
export function UpperFirst(str: string, splits?: string[]) {
    if (!str) return str;
    if (str.length == 1) return str.toUpperCase();
    else {
        let temp = str[0].toUpperCase() + str.substring(1);
        if (splits && splits.length) {
            let resultArr = [temp];
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