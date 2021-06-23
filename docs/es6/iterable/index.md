# Iterable

**Iterable 是一种接口，可以为不同数据结构提供统一的访问机制**，而这个统一的访问机制就是 `for...of`.

目前我们可以通过 `for...of` 遍历 `Array, Map, Set` 等数据结构，
但是 对象(`Object`) 是不能被 `for...of` 遍历的，否则会报错:

```js
const obj = {
  name: "haha",
  age: 10,
};
for (let key of obj) {
  // Uncaught TypeError: Obj is not iterable
}
```

为了使对象 `obj` 可以被遍历，我们可以通过 `Iterable` 接口来实现：

```js
const Obj = {
  name: "haha",
  age: 10,
  [Symbol.iterator]: function () {
    // 获取当前对象的所有 key
    const keys = Object.keys(this);
    return {
      next: function () {
        // 遍历返回 key
        const key = keys.shift();
        return {
          value: key,
          done: !Boolean(key),
        };
      },
    };
  },
};

for (let key of Obj) {
  console.log(key); // name, age
}
```

注意 `Iterable` 接口都是部署在数据结构的 `Symbol.iterator` 属性上，一个数据接口
只要有 `Symbol.iterator` 属性，那么它就被认为是**可遍历**的

## Symbol.iterator

`Symbol.iterator` 是一个函数，返回一个名为 `next` 的函数，而 `next` 函数返回一个带有 `value` 和 `done` 结构的对象

```js
[Symbol.iterator]: function () {
  return function next () {
    return {
      value: any,
      done: boolean
    }
  }
}
```

当 `done` 为 `true` 时，表示遍历结束，否则将会一直无限遍历下去, 上面代码，通过实现
自定义 `Symbol.iterator` 方法，返回对象的所有 `key` 值，因此通过 `for...of` 可以遍历到 `obj` 的所有 `key`

通过 `Iterator` 我们就可以为很多自定义数据结构实现 `for...of` 的遍历，如下给 `Class` 设置可遍历:

```js
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    let value = this.value;
    if (value < this.stop) {
      this.value++;
      return { done: false, value };
    }
    return { done: true, value: undefined };
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (let value of range(0, 3)) {
  console.log(value); // 0,1,2
}
```

> 除了自己实现 Symbol.iterator 对于一些类数组的数据结构可以直接使用数组的 Symbol.iterator 方法
> `NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]` > `NodeList.prototype[Symbol.iterator] = [][Symbol.iterator]`

## 与 yield\* / Generator 结合使用

`yield*` 后面跟一个可遍历对象，它会调用该结构的遍历器接口；

```js
let generator = function* () {
  yield 1;
  yield* [2, 3, 4];
  yield 5;
};

let it = generator();
it.next(); // {value:1, done: false};
it.next(); // {value:2, done: false};
it.next(); // {value:3, done: false};
it.next(); // {value:4, done: false};
it.next(); // {value:5, done: false};
it.next(); // {value: undefined, done: true};
```

直接通过 generator 函数来实现 Symbol.interator 更为简单，直接使用 yield 即可

```js
let obj = {
  *[Symbol.interator]() {
    yield "hello";
    yield "world";
  },
};
for (let x of obj) {
  console.log(x); // hello, world
}
```

## return() / throw()

遍历器对象除了 `next()` 方法还有 `renturn()、throw()` 方法（这 2 个方法是可选实现的）;
`return()` 方法用于提前退出 `for...of` 循环，`throw()` 方法一般用不到

```js
let obj = {
  [Symbol.interator]() {
    next () {
      return {done: flase, value: 1}
    }
    return () {
      // 提前退出 for...of 循环,可以再这里处理一些清理或释放资源操作
      return {done: true}
    }
  }
}
```

## 异步迭代器参考 ES6 阮一峰 教程

上面讲的 `Interator` 是同步迭代器，遍历器接口部署在 `Symbol.interator` 上，
异步迭代器，遍历器几口部署在 `Symbol.asyncInterator` 上，且 `next` 方法返回的是一个 `Promise`

```js
let obj = {
  [Symbol.asyncInterator]() {
    let index = 0;
    return {
      next() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ value: index++, done: false });
          }, 1000);
        });
      },
    };
  },
};

const it = obj[Symbol.asyncInterator]();
it.next().then(({ value, done }) => console.log(value)); // 0
it.next().then(({ value, done }) => console.log(value)); // 1
it.next().then(({ value, done }) => console.log(value)); // 2

// or
console.log(await it.next()); // {value: 0, done: false}
console.log(await it.next()); // {value: 1, done: false}
console.log(await it.next()); // {value: 2, done: false}
```

其他具体案例，查看 [异步遍历器](https://es6.ruanyifeng.com/#docs/async-iterator)
