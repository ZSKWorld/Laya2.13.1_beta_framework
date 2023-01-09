const enum Status {
    Pending = "pending",
    Fulfilled = "fulfilled",
    Rejected = "rejected",
}

type PromiseValue<T> = T | MyPromise<T>;

export class MyPromise<T> {
    private status = Status.Pending;   //初始状态
    private value: any;  //接收成功函数值
    private reason: any;    //失败函数值
    private successCallback: Function[] = [];  //成功函数列表
    private failCallback: Function[] = [];     //失败函数列表

    constructor(executor: (resolve: (value: PromiseValue<T>) => void, reject: (reason?: any) => void) => void) {
        //try catch 用来捕获执行器执行时候报错
        try {
            executor((value) => this.resolve(value), (reason) => this.reject(reason))
        } catch (e) {
            this.reject(e)
        }
    }

    private resolve(value: PromiseValue<T>) {
        //先判断状态是否为 PENDING  如果不是  说明状态以及改变 直接返回
        //如果 不是  就将当前状态 改为FULFILLED
        //将值传进来的值  赋值给this.value
        //通过while循环 将成功回调函数依次执行 去除第一个函数执行完毕之后 就从数组里删除 依次执行
        if (this.status !== Status.Pending) return
        this.status = Status.Fulfilled;
        this.value = value;
        while (this.successCallback.length) {
            this.successCallback.shift()();
        }
    }

    private reject(reason: any) {
        //先判断状态是否为 PENDING  如果不是  说明状态以及改变 直接返回
        //如果 不是  就将当前状态 改为REJECTED
        //将值传进来的值  赋值给this.reason
        //通过while循环 将失败回调函数依次执行 去除第一个函数执行完毕之后 就从数组里删除 依次执行
        if (this.status !== Status.Pending) return;
        this.status = Status.Rejected;
        this.reason = reason;
        while (this.failCallback.length) {
            this.failCallback.shift()();
        }
    }

    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | MyPromise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | MyPromise<TResult2>) | undefined | null) {
        //then方法 接收两个参数  一个成功 一个失败
        let promise2 = new Promise<TResult1 | TResult2>((resolve, reject) => {
            const callFulfilled = () => {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };
            const callRejected = () => {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };
            if (this.status === Status.Fulfilled) {
                //当状态为FULFILLED 时 就直接执行
                //加上定时器是为了能够获取到promise2
                //将成功函数处理完的值  以及promise2 resolve reject  传给resolvePromise 同一处理
                callFulfilled();
            } else if (this.status === Status.Rejected) {
                //当状态为REJECTED 时 就直接执行
                //加上定时器是为了能够获取到promise2
                //将失败函数处理完的值  以及promise2 resolve reject  传给resolvePromise 同一处理
                callRejected();
            } else {
                //当状态为PENDING的时候 说明函数是异步的
                //所以我们将成功函数 加入成功函数列表
                this.successCallback.push(callFulfilled);
                //当状态为PENDING的时候 说明函数是异步的
                //所以我们将失败函数 加入失败函数列表
                this.failCallback.push(callRejected);
            }
        });
        //返回一个promise2
        return promise2;
    }

    finally(onfinally?: (() => void) | undefined | null) {
        // 如何拿到当前的promise的状态，使用then方法，而且不管怎样都返回callback
        // 而且then方法就是返回一个promise对象，那么我们直接返回then方法调用之后的结果即可
        // 我们需要在回调之后拿到成功的回调，所以需要把value也return
        // 失败的回调也抛出原因
        // 如果callback是一个异步的promise对象，我们还需要等待其执行完毕，所以需要用到静态方法resolve
        return this.then(value => {
            // 把callback调用之后返回的promise传递过去，并且执行promise，且在成功之后返回value
            return MyPromise.resolve(onfinally()).then(() => value);
        }, reason => {
            // 失败之后调用的then方法，然后把失败的原因返回出去。
            return MyPromise.resolve(onfinally()).then(() => { throw reason });
        })
    }

    catch<TResult = never>(onrejected?: ((reason: any) => TResult | MyPromise<TResult>) | undefined | null) {
        //catch方法 用来捕获promise执行中的错误 可以直接调用then方法来执行  因为then方法接收两个参数 而我们是为了捕获错误，所以第一个参数传递一个undefined
        return this.then<T, TResult>(undefined, onrejected);
    }

    static all<T extends readonly unknown[] | []>(array: T) {
        //all方法是所有的执行完毕之后 执行 定义一个数组来接收处理过的结果  index用来判断是否全部执行完毕
        let result = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            //定义一个add函数  用来添加处理之后的结果  保证结果数组的顺序 跟调用顺序一致
            let addData = (key, value) => {
                result[ key ] = value;
                index++;
                //当result数组长度  跟传进来的数组长度一致时候  说明执行完毕  就直接调用resolve方法 将处理完的结果数组返回
                if (index === array.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < array.length; i++) {
                let current = array[ i ];
                //遍历传进来的数组  如果是promise对象  就直接调用then方法 将函数处理过后的结果返回
                //如果是普通值就直接添加到结果数组里面
                if (current instanceof MyPromise) {
                    current.then(value => addData(i, value), reason => reject(reason));
                } else {
                    addData(i, array[ i ]);
                }
            }
        })
    }

    static resolve<T>(value: T | MyPromise<T>) {
        //静态resolve方法  如果是promise就直接返回
        if (value instanceof MyPromise<T>) return value;
        //普通的就直接返回一个promise对象 并传递一个resolve函数 将参数放到resolve里面
        return new MyPromise<T>(resolve => resolve(value));
    }

    static reject<T>(reson: T | MyPromise<T>) {
        if (reson instanceof MyPromise<T>) return reson;
        else return new MyPromise<T>((resolve, reject) => reject(reson));
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {  //如果是返回了本身 就会死循环 这时候就抛出一个类型错误
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    if (x instanceof MyPromise) {  //如果返回的是一个promise ，那我们就可以直接调用本身的then方法 把参数resolve，和reject穿进去执行
        x.then(resolve, reject);
    } else {
        //如果是普通值  我们就调用resolve方法  将值传进去
        resolve(x);
    }
}