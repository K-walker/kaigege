# 函数的定义

函数由 函数名、参数、函数体构成

## 语法

> new Function([arg1[, arg2[, ...argN]]],[functionBody])

参数必须是 JavaScript 有效的字符串，或者是一个用逗号分隔的字符串列表，如： 'a,b,c'

## Function 构造函数

使用 new 或者直接调用构造函数是一样的，

```js
var f = new Function("a", "b", "return a + b");
// or var f = Function('a,b' ,  'return a + b');
```

Function 创建的函数只能在全局作用域中运行，所以不能通过它来实现闭包

```js
var x = 10;
function foo() {
  var x = 20;
  return new Function("return x"); // 这里的 x 指向的是全局作用域中的 x
}
var f = foo();
f(); // 输出 10 不是 20
```

## 函数声明 与 函数表达式

解析器会优先读取**函数声明**(不是函数表达式)，并让其在执行任何代码之前可以被访问

```js
foo(); // 打印 foo
bar(); // TypeError: bar is not a function

// 函数表达式
var bar = function () {
  console.log("bar");
};

// 函数声明 （优先解析）
function foo() {
  console.log("foo");
}
```

## 函数的属性和方法

- Fnction.length 函数的参数个数
- Function.name 函数名称
- Function.prototype.constructor
- Function.prototype.call
- Function.prototype.apply
- Function.prototype.toString
- Function.prototype.toString
- Function.prototype.toSource 获取函数的实现源码的字符串 覆盖了 Object.prototype.toSource

## 箭头函数

- 语法更加简洁
- 没有 this、arguments、super、new.target
- 因为没有 this 所有不能用作构造函数， new 一起使用会报错
- 使用 call 和 apply 调用自身时，只能传参数，无法传入 this,且第一个参数会被忽略
- 没有 prototype 属性
- yield 不能再箭头函数中使用，所以箭头函数不能用作 Generator 函数
- 不能简单的返回对象字面量，需要用（）包裹起来，{} 会被解析成代码块
  > var f = () => ({age : 10} )
- 严格模式中与 this 相关的规则都会被忽略，因为 this 只是词法层面上的一种定义

### 没有自己的 this

箭头函数不会创建自己的 this，它只会从自己的作用域链的上一层继承 this （所在的上下文的 this）

```js
function Person() {
  this.age = 10;
  setTimeout(function fn() {
    console.log(this);
  }, 1000);
}
```

非箭头函数下，fn 函数中的 this 指向全局对象

```js
function Person() {
  this.age = 10;
  setTimeout(() => {
    console.log(this);
  }, 1000);
}
```

由于箭头函数没有自己的 this ，所以 setTimeout 中的 this 指向其作用域链上一层 Person 中的 this

## call、 apply 和 bind

因为箭头函数没有自己的 this，所以传入 this 无效，且第一个参数会被忽略

```js
var fn = (x, y) => x + y;

console.log(fn.call(this, 2, 3));
console.log(fn.apply(this, [2, 3]));

var newFn = fn.bind(this, 2, 3);
console.log(newFn());
// 都输出 5
```

## 不绑定 arguments

```js
function foo(n) {
  var f = () => arguments[0] + n;
  return f();
}
foo(1); // 2
foo(2); // 4
foo(3, 4); // 6
```

这里的 arguments[0] 是 foo 函数的第一个参数，也就是 n ，并不是箭头函数 f 的第一个参数

## 箭头函数与普通函数的区别

如上所述
