(function () {

    if (!Array.from) {
        Array.from = (function () {
            let toStr = Object.prototype.toString;
            let isCallable = function (fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            let toInteger = function (value) {
                let number = Number(value);
                if (isNaN(number)) { return 0; }
                if (number === 0 || !isFinite(number)) { return number; }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            let maxSafeInteger = Math.pow(2, 53) - 1;
            let toLength = function (value) {
                let len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };
            return function from(arrayLike) {
                let C = this;
                let items = Object(arrayLike);
                if (arrayLike == null) {
                    throw new TypeError('Array.from requires an array-like object - not null or undefined');
                }
                let mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                let T;
                if (typeof mapFn !== 'undefined') {
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }
                let len = toLength(items.length);
                let A = isCallable(C) ? Object(new C(len)) : new Array(len);
                let k = 0;
                let kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                A.length = len;
                return A;
            };
        } ());
    }
    
    if (!Array.prototype.fill) {
        Object.defineProperty(Array.prototype, 'fill', {
            value: function (value) {
                if (this == null) {
                    throw new TypeError('this is null or not defined');
                }
                let O = Object(this);
                let len = O.length >>> 0;
                let start = arguments[1];
                let relativeStart = start >> 0;
                let k = relativeStart < 0 ?
                    Math.max(len + relativeStart, 0) :
                    Math.min(relativeStart, len);
                let end = arguments[2];
                let relativeEnd = end === undefined ?
                    len : end >> 0;
                let final = relativeEnd < 0 ?
                    Math.max(len + relativeEnd, 0) :
                    Math.min(relativeEnd, len);
                while (k < final) {
                    O[k] = value;
                    k++;
                }
                return O;
            }
        });
    }
    
    if (!String.prototype.startsWith) {
        Object.defineProperty(Array.prototype, 'startsWith', {
            value: function (search, pos) {
                return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
            }
        });
    }
    
    if (!String.prototype.endsWith) {
        Object.defineProperty(Array.prototype, 'endsWith', {
            value: function (search, pos) {
                if (pos === undefined || pos > this.length) {
                    pos = this.length;
                }
                return this.substring(pos - search.length, pos) === search;
            }
        });
    }
    


    let f, p;

    p = Object.prototype;
    Object.defineProperties(p, {
        getPropertyDescriptor: {
            value: function (property) {
                let pd = Object.getOwnPropertyDescriptor(this, property);
                if (pd) {
                    return pd;
                }
                let prototype = Object.getPrototypeOf(this);
                if (prototype) {
                    return prototype.getPropertyDescriptor(property);
                }
                return undefined;
            },
            enumerable: false
        },
        shallowClone: {
            value: function () {
                let result = {};
                this.shallowCloneTo(result);
                return result;
            },
            enumerable: false
        },
        shallowCloneTo: {
            value: function (target) {
                for (let key in this) {
                    if (key in target) {
                        let pd = target.getPropertyDescriptor(key);
                        if (pd && (pd.set || pd.writable)) {
                            target[key] = this[key];
                        }
                    } else {
                        target[key] = this[key];
                    }
                }
            },
            enumerable: false
        },
        deepClone: {
            value: function () {
                let jsonStr = JSON.stringify(this);
                return JSON.parse(jsonStr);
            },
            enumerable: false
        },
        deepCloneTo: {
            value: function (target) {
                let obj = this.deepClone();
                for (let key in obj) {
                    if (key in target) {
                        let pd = target.getPropertyDescriptor(key);
                        if (pd && (pd.set || pd.writable)) {
                            target[key] = obj[key];
                        }
                    } else {
                        target[key] = obj[key];
                    }
                }
            },
            enumerable: false
        },
        clearAllProperty: {
            value: function () {
                for (let key in this) {
                    delete this[key];
                }
            },
            enumerable: false
        }
    });

    p = Number.prototype;
    Object.defineProperties(p, {
        toFormat: {
            value: function () {
                let num = this.valueOf();
                if (num >= 10E11) {
                    return `${~~(num / 10E11)}兆`;
                }
                if (num >= 10E7) {
                    return `${~~(num / 10E7)}亿`;
                }
                if (num >= 10E3) {
                    return `${~~(num / 10E3)}万`;
                }
                return num.toString();
            },
            enumerable: false
        },
    });

    p = String.prototype;
    Object.defineProperties(p, {
        splitNum: {
            /**
             * @param {string | RegExp} separator 
             * @param {number} limit 
             */
            value: function (separator, limit) {
                let arr = this.split(separator, limit);
                for (let i = 0, len = arr.length; i < len; i++) {
                    arr[i] = parseFloat(arr[i]);
                }
                return arr;
            },
            enumerable: false
        },
    });

    f = Array;
    f.NORMAL = 0;
    f.CASEINSENSITIVE = 1;
    f.DESCENDING = 2;
    f.RETURNINDEXEDARRAY = 4;
    f.NUMERIC = 8;

    p = Array.prototype;
    Object.defineProperties(p, {
        pushUnique: {
            /**
             * 
             * @param  {...any} args 
             */
            value: function (...args) {
                for (let v of args) {
                    if (this.indexOf(v) == -1) {
                        this[this.length] = v;
                    }
                }
                return this.length;
            },
            enumerable: false
        },
        sortOn: {
            /**
             * 
             * @param {string | string[]} fieldNames 
             * @param {number | number[]} options 
             */
            value: function (fieldNames, options) {
                let array = this;
                if (!Array.isArray(fieldNames)) {
                    fieldNames = [fieldNames];
                }
                if (!Array.isArray(options)) {
                    options = [options];
                }
                if (fieldNames.length !== options.length) {
                    options = new Array(fieldNames.length).fill(0);
                }
                let returnIndexedArray = options[0] & Array.RETURNINDEXEDARRAY;
                if (returnIndexedArray) {
                    array = Array.from(array);
                }
                let functions = fieldNames.map(function (fieldName, index) {
                    return createComparisonFn(fieldName, options[index]);
                });
                let sorted = array.sort(function (a, b) {
                    return functions.reduce(function (result, fn) {
                        return result || fn(a, b);
                    }, 0);
                });
                return returnIndexedArray ? sorted : undefined;
                function createComparisonFn(fieldName, options) {
                    options = options || 0;
                    let transformations = [];
                    if (fieldName) {
                        transformations.push(
                            function () {
                                return this[fieldName];
                            }
                        );
                    }
                    transformations.push(
                        (options & Array.NUMERIC)
                            ? function () {
                                return parseFloat(this);
                            }
                            : function () {
                                return (typeof this === 'string' && this)
                                    || (typeof this === 'number' && '' + this)
                                    || (this && this.toString())
                                    || this;
                            }
                    );
                    if (options & Array.CASEINSENSITIVE) {
                        transformations.push(String.prototype.toLowerCase);
                    }
                    transformations.apply = Array.prototype.reduce.bind(
                        transformations,
                        function (value, transformation) {
                            return transformation.apply(value);
                        }
                    );
                    let AGreaterThanB = (options & Array.DESCENDING) ? -1 : 1;
                    let ALessThanB = -AGreaterThanB;
                    return function (a, b) {
                        a = transformations.apply(a);
                        b = transformations.apply(b);
                        if (a > b || (a != null && b == null)) {
                            return AGreaterThanB;
                        }
                        if (a < b || (a == null && b != null)) {
                            return ALessThanB;
                        }
                        return 0;
                    }
                }
            },
            enumerable: false
        },
        remove: {
            /**
             * @param {any} item 
             */
            value: function (item) {
                let index = this.indexOf(item);
                if (index > -1) {
                    this.splice(index, 1);
                    return true;
                }
                return false;
            },
            enumerable: false
        },
        upset: {
            value: function () {
                let i = this.length;
                while (i) {
                    let j = Math.floor(Math.random() * i--);
                    [this[i], this[j]] = [this[j], this[i]];
                }
                return true;
            },
            enumerable: false
        }
    });


    p = Date.prototype;
    Object.defineProperties(p, {
        format: {
            /**
             * @param {string} template 
             */
            value: function (template) {
                let map = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds()
                };
                if (/(y+)/.test(template)) {
                    template = template.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in map) {
                    if (new RegExp("(" + k + ")").test(template)) {
                        template = template.replace(RegExp.$1, (RegExp.$1.length == 1) ? (map[k]) : (("00" + map[k]).substr(("" + map[k]).length)));
                    }
                }
                return template;
            },
            enumerable: false
        },
    });

    

})();
