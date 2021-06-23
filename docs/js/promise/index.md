# Promise

## Promise 一些特性

[图解 Promise 实现原理](https://zhuanlan.zhihu.com/p/58428287)

在 fetchData 异步函数运行完之前,回调函数式不会被调用的，即使异步函数完成或失败，在这之后通过 then() 添加的回调函数，还是会被调用，通过多次调用 then() 可以添加多个回调函数，它们会按插入循序执行，如果 then 中的回调函数没有返回值，则下一个 then 的回调中将接收不到值，第一个 catch 捕捉到错误之后，还是会继续执行下面的代码,直到链式调用结束为止，且 catch 只会捕捉其前面回调中的报错

## 手写实现 Promise

> Promise 的 then 方法实际是用来注册回调方法的，实际调用还是在 resolve 中执行的，
> 并且 then 方法会返回一个新的 Promise 对象,

```js
class MyPromise {
  callbacks = [];
  value = null;
  state = "pending";

  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this));
  }

  // 有时候 then 方法回调中可能会返回一个 promise
  // 而根据 Promise/A+ 规范定义的 promise 是一个拥有 then 方法的对象或函数
  _resolve(value) {
    if (value && (typeof value === "object" || typeof value === "function")) {
      const then = value.then;
      if (typeof then === "function") {
        // 此处的 value 是 then方法调用时的环境,因为 then 方法属于 value
        then.call(value, this._resolve.bind(this), this._reject.bind(this));
        return;
      }
    }
    this.state = "fulfilled";
    this.value = value;
    this.callbacks.forEach((cb) => this._handle(cb));
  }

  _reject(err) {
    this.state = "rejected";
    this.value = err;
    this.callbacks.forEach((cb) => this._handle(cb));
  }

  _handle(cb) {
    // 等待态
    if (this.state === "pending") {
      this.callbacks.push(cb);
      return;
    }

    // 执行态
    if (this.state === "fulfilled") {
      if (!cb.onFulfilled) {
        cb.resolve(this.value);
        return;
      }

      try {
        const ret = cb.onFulfilled(this.value);
        cb.resolve(ret);
      } catch (e) {
        cb.reject(e);
      }
      return;
    }

    // 拒绝态
    if (this.state === "rejected") {
      if (!cb.onRejected) {
        cb.reject(this.value);
        return;
      }

      try {
        // catch 捕获到错误之后，如果后面还有then方法，则应该执行 resolve
        const ret = cb.onRejected(this.value);
        cb.resolve(ret);
      } catch (e) {
        cb.reject(e);
      }

      return;
    }
  }

  // ① 当参数是一个 promise 对象时，直接返回这个 promise
  // ② 如果参数是其他类型的值，则返回一个新的 promise 包装下这个参数
  // ③ 如果 value 为 null,直接返回一个新的 promise
  // ④ value 是一个 thenable 的对象: 定义了 then 方法的对象或函数
  static resolve(value) {
    if (!value) return new MyPromise((resolve) => resolve());
    if (value instanceof MyPromise) return value;
    if (typeof value === "object" && typeof value.then === "function") {
      return new MyPromise((resolve) => value.then(resolve));
    }
    return new MyPromise((resolve) => resolve(value));
  }

  // Promise.reject 始终返回一个 拒绝态 的 Promise 的实例
  static reject(value) {
    if (!value) return new MyPromise((resolve, reject) => reject());
    if (typeof value === "object" && typeof value.then === "function") {
      return new MyPromise((resolve, reject) => value.then(reject));
    }
    return new MyPromise((resolve, reject) => reject(value));
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected,
        resolve: resolve,
        reject: reject,
      });
    });
  }

  catch(onError) {
    return this.then(null, onError);
  }

  finally(onDone) {}
}
```

## 手动实现 Promise.retry 方法

```js
Promise.retry = function (fn , count) {
  return new Promise( async (resolve, reject) => {
    while (count > 0) {
      try {
        const res = await fn();
        resolve(res);
        return;
      } catch () {
        if(count) reject();
        count--;
      }
    }
  })
}
```
