# Object.create 和 New

## Object.create

创建一个新对象，根据给定的参数作为新对象的原型（**proto**）

```js
const person = {
  name: "haha",
  say: function () {
    console.log("hello");
  },
};

const o = Object.create(person);
console.log(o.name); // haha
o.say(); // hello
```

person 上的属性和方法将会作为对象 o 原型上的属性和方法

### 参数

- **proto ：** 新创建对象的原型对象
- **propertiesObject ：** 可选，添加到新对象上 **不可枚举** 的属性对象的描述（**自身属性，非原型上的属性**）

```js
const o = Object.create(person, {
  age: {
    value: 23,
    writable: true,
    configurable: true,
    enumerable: true,
  },
});
console.log(o.age); // 24
o.age = 10;
console.log(o.age); // 10
```

虽说是添加不可枚举的属性对象，但是可以通过配置 `enumerable` 描述来让其可被枚举

### 实现继承

```js
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
}

// 父类的方法
Shape.prototype.add = function(x) {
  this.x += x;
  console.info('Shape add);
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();
rect.add(2) // 输出 Shape add
console.log(rect instanceof Shape) // 输出 true
console.log(rect instanceof Rectangle) // 输出 true
```

如果不调用 `Shape.call(this)`，则无法访问 `rect.x`, 当调用时，Shape 对象构造函数里的 `this` 则指向的是 `Rectangle` , 因此 `this.x = 0`; 是定义在 `Rectangle` 上
但是一般，我们不这样去实现继承，关于继承，会有单独的介绍，此处不做扩展

### 兼容

由于有些浏览器可能不支持 Object.create 方法，因此我们根据它的定义，自己实现：

```js
Object.create =
  Object.create ||
  function (proto) {
    function F() {} // 1. 创建一个对象
    F.prototype = proto; // 2. 修改这个对象的原型
    return new F(); // 3. 通过这个对象的构造函数去创建一个新实例返回
  };

// 其他实现方式
Object.create =
  Object.create ||
  function (proto) {
    const o = {}; // or const o = new Object();
    o.__proto__ = proto;
    return o;
  };
```

以上 2 种方式,达到的效果都是一样的

## new 关键字

使用 new 关键字如何创建一个对象的实例:

```js
function Foo (name) {
  this.name = name;
}
Foo.prototype.say = function () {
  console.log('say '+this.name)
}

const foo = new Foo(‘hello’);
```

new Foo('hello') 这句代码， new 到底做了什么操作？根据 MDN 的说明, new 关键字做了下面几件事：

> 1. 创建一个空对象(即 `{}` )
> 2. 将目标函数（就是 new 后面跟的函数）的原型作为该对象的原型
> 3. 将步骤 1 中创建对象，作为目标函数 this 的上下文
> 4. 如果目标函数没有返回值，则返回步骤 1 创建的对象，否则返回目标函数的返回值

下面我们用代码来实现上面这段描述:

```js
/**
 * @param F 目标函数
 * @param args 调用构造函数时传入的参数
 */
function New (F, ...args) {
  const o = {};
  o.__proto__ = F.prototype;
  const obj = F.apply(o, args);
  // 如果函数 F 返回非对象值，则返回 o 对象
  return obj instanceof Object ？ obj : o;
}
// 根据 Foo 函数创建它的实例
const foo = New(Foo, 'hello');
// 使用 new 关键字创建实例
const boo = new Foo('wrold');

foo.say();  // say wrold
console.log(foo.name) // wrold

boo.say();  // say hello
console.log(boo.name) // hello

```

如上，通过 New 函数创建的实例与 new 关键字创建的实例都可访问函数的属性和原型上的方法

注意，一些 **native** 的对象无法使用 `New` 函数来创建实例比如 `Date` 等
