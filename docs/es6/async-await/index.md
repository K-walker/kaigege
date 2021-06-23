# async/await 和 generator

## 示例

异步请求

```js
const getData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("good"), 1000);
  });
```

## async/await

```js
async function asyncTestG () {
    console.log('start');
    const data1 = await getData();
    console.log('data1', data1)
    const data2 = await getData();
    console.log('data2', data2)
    return 'end'
}
asyncTestG().then( res => console.log(res))

打印结果:
> start
> data1 good
> data2 good
> end
```

## Generator

```js
function* testG() {
  console.log("start"); // ①
  const data1 = yield getData(); // ②
  console.log("data1", data1); // ③
  const data2 = yield getData(); // ④
  console.log("data2", data2); // ⑤
  return "end"; // ⑥
}
```

调用 Generator 函数，返回一个可迭代的对象，注意，此时还没有执行 testG 里面的代码

> `const gen = testG();`

第一次调用 next 方法，开始执行 Generator 函数，直到遇到第一个 yield 表达式停止所以停在 ② 处

> `const g1 = gen.next()`

继续执行 next 方法，从 ② 处继续往下执行，碰到下一个 yield 时停止，此时停在 ④ 处

> `const g2 = gen.next()`

继续执行，碰到 return 语句，函数执行结束

> `const g3 = gen.next()`

next 函数调用后返回一个对象 {value: any, done: boolean}
value 是 yield 后面表达式的返回值，这里也就是一个 Promise 对象,
done 表示生成器后续是否还有 yield 语句,即生成器函数是否已经执行完毕并返回

如果在调用 next 函数的时候传入了参数，那么这个参数会赋值给上一条执行的 yield 语句左边定义的变量，比如 const g2 = gen.next('hello') ，此时 data1 = 'hello'
当生成器执行遇到 return 时，会导致生成器立刻变为完成状态，即调用 next 函数返回对象中 done 为 true，value 则是 return 的值, 如果执行到最后没有 return，则 value 为 undefined

现在知道了 Generator 函数的调用原理，如果想打印出和 async/await 一样的结果,如下:

```js
const g1 = gen.next();
g1.value.then((res) => {
  const g2 = gen.next(res);
  g2.value.then((r) => {
    const g3 = gen.next(r);
    console.log(g3.value);
  });
});
```

## 通过 Generator 来实现 async 的用法

根据 `async/await` 的用法，它返回的是一个 Promise 对象，而且我们需要传入 生成器函数作为参数，因此 `asyncToGenerator` 函数大体结构如下:

```js
function asyncToGenerator(genFunc) {
  return function () {
    return new Promise((resolve, reject) => {});
  };
}
```

下面是完整代码:

```js
function asyncToGenerator(genFunc) {
  return function () {
    // 调用 Generator 函数，生成迭代器对象
    const gen = genFunc.apply(this, arguments);
    return new Promise((resolve, reject) => {
      /**
       * 递归执行迭代器对象的 next 方法
       * @param key 迭代器的方法名 next or throw
       * @param arg 执行next 或者 throw 方法时传入的参数
       */
      function step(key, arg) {
        let genResult;
        try {
          genResult = gen[key](arg);
        } catch (err) {
          return reject(err);
        }

        const { value, done } = genResult;
        if (done) {
          // 只有当迭代器执行完毕，最后一次调用next方法的时候
          // done 才会为 true，而此时的 value 也就是 生成器函数的返回值，
          // 若没有return，则是 undefined, 因此直接 resolve 返回
          return resolve(value);
        } else {
          // 此处的 value 一般来说是 Promise 对象
          // 但如果 yield 后面是一个常量 '你好世界'
          // 此时 value 就是一个字符串
          // 所以用 Promise.resolve 包一下,解析value的值
          // 如果报错通过catch捕获，执行 gen.throw
          return Promise.resolve(value)
            .then((val) => {
              step("next", val);
            })
            .catch((err) => {
              step("throw", err);
            });
        }
      }
      step("next");
    });
  };
}

const func = asyncToGenerator(generatorFunc);
func()
  .then((res) => console.log(res))
  .catch((e) => console.log("e", e));
```
