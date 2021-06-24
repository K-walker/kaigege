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

## 函数、函数原型和函数实例

记得我在学习 JS 继承的时候，对于函数、函数原型和函数实例这几个概念理解的比较模糊，因此在看原型链继承的时候，脑袋犯晕，不知道大家有没有这个感受，我是很苦恼的，为此，我专门花时间去理解他们之间的关系，并画了一张图，给大家来理清楚这三者之间的关系：
![函数、函数原型和函数实例之间关系图](https://img-blog.csdnimg.cn/20190109163510767.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTAyOTg1NzY=,size_16,color_FFFFFF,t_70)

如图所示：函数 `Personal` 包含 3 个部分，转换为代码如下：

```javascript
// 函数对象(构造函数)
function Personal() {}
// 函数原型对象
Personal.prototype = {
  constructor: Personal,
  name: "hwk",
  sayName: function () {},
};
// p : 函数实例
var p = new Personal();
p.name; // 访问函数原型对象上的属性
p.sayName(); // 调用函数原型对象上的方法
```

### 1.函数

所谓 **函数** 也就是 函数 `Personal ` 其本身，也叫作**构造函数** ，当一个函数被创建的同时，也会为其创建一个 `prototype` 属性，而这个属性，就是用来指向 **函数原型**，的我们可以把 `prototype` 理解为 `Personal `的一个属性，保存着**函数原型**的引用

### 2.函数实例

**函数实例** 很好理解，就是上面代码中通过 `new Personal()` 得到的实例 p，于此同时函数实例 `p` 内部会包含一个指向 **函数原型**的指针`[[Prototype]]`，因此我们通过 `p` 可以去调用 **函数原型** 上的属性和方法，但是由于`[[Prototype]]` 是内部属性，无法直接访问，但是可以通过一下方式进行获取：

> 1.  `__proto__` : 部分浏览器提供了此属性去访问`[[Prototype]] `属性的值
> 2.  通过`Object.getPrototypeOf` 去获取

### 3.函数原型

顾名思义，**函数原型**其实也是一个对象，它通过其`constructor` 属性与函数 `Personal ` 进行关联，上面的代码中，我通过重新赋值的方式定义了 **Personal 的原型** 的属性和方法:

```javascript
Personal.prototype = {
  constructor: Personal,
  name: "hwk",
  sayName: function () {},
};
```

这里大家注意一下，因为这种方式定义属性和方法，会打断 **函数 （Personal）** 和 **函数原型（Personal.prototype）** 之间的关系,因此需要重新将`constructor` 属性赋值为 `Personal` 函数本身，与其建立联系。

其实我们把 **函数原型** 看做一个独立的对象即可，它与其 **函数** 通过`constructor` 属性关联，上面说的**函数（Personal）** 有个`prototype` 属性是指向**函数原型（Personal.prototype）** ，如下表示：

```javascript
Personal.prototype === Personal.prototype;
```

这里的代码我们把等号后面的 `Personal.prototype` 理解成一个单独的对象即可，而等号前面我们理解成 `Personal` 调用 `prototype` 属性，因为函数原型对象我们一般用这样 **Personal.prototype** 来表示而已，这里可能会稍微绕一点，不知道大家能否理解我的意思哈。其实我上面的图已经画的很明白了，我觉得看图更能理解，感觉我讲的有点绕，嘻嘻！

好了，以上是个人对于它们三者之间关系的理解，如果你理解了，再去看 js 原型链继承应该就不难懂了，希望能帮助到大家，如果有讲的不对的地方，欢迎指正！
