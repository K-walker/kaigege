# apply 、call 和 bind

apply 和 call 用法相同，唯一的差别在于传参方式的不同：

## apply

第二个参数是一个类数组

> ` func.apply(this, [arg1,arg2,arg3,...,argn])`

## call

后面接受的参数是一个一个传入

> ` func.call(this, arg1,arg2,arg3,...,argn)`

## bind

`bind` 与 他们的区别在于,它调用的不是原函数（`func`），而是返回一个新的函数
手动实现 `bind` 方法:

```js
Function.prototype.bind = function (context, ...args) {
  var that = this;
  return function () {
    that.apply(context, args);
  };
};
```

通过 bind 返回一个新函数，我们可以再任何地方调用，且不用关心 this 的指向问题，如下：

```js
const name = "global name";

const a = {
  name: "haha",
  say: function () {
    console.log(this.name);
  },
};
const sayFunc = a.say;
sayFunc(); // 输出 global name

const sayFunc2 = sayFunc.bind(a);
sayFunc2(); // 输出 haha
```

通过 `bind` 绑定上下文，返回一个新函数 `sayFunc2` ,无论在何处调用 `sayFunc2` 函数，都不必去关心函数内部 `this` 的指向问题, 并且可以预先指定参数，再调用是无须再传入参数
