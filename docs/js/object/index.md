# 什么是对象

是一组无序的键值对集合，值可以是基本数据，对象或函数；

## 创建对象的几种方式

### 工厂模式

直接调用函数，传入参数，返回一个对象，跟构造函数模式有点类似

```js
function createPerson(name, age, obj) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.obj = obj;
  return o;
}
```

### 构造函数模式

```js
function Person(name) {
  this.name = name;
  this.say = function () {
    console.log(this.name);
  };
}
var p1 = new Person("p1");
var p2 = new Person("p2");
```

构造函数的有个问题：每个方法都要在每个实例上重新定义一遍，函数完成的任务是一样的，
没必要多次定义，而且函数调用可以指定 `this` ，所以 `say` 方法完全可以抽离出来复用（参考原型模式）

### 原型模式

直接在原型上定义属性和方法, 其实例共享所有属性，如果是引用类型的属性，其中一个实例修改了
则会影响到其他实例

```js
function Person() {}

Person.prototype.name = "king";
Person.prototype.age = 10;
Person.prototype.list = [];

var p1 = new Person();
var p2 = new Person();

p1.name = "kai";
p1.list.push("a");

console.log(p1, p2);
// p1.list ['a']
// p2.list ['a']
```

当修改 name 属性时，实际上是给实例 p1 添加了一个 name 属性，
此时原型和实例中各有一个 name 的属性

### 组合使用构造函数和原型模式（最常用自定义类型的方法）

属性定义在构造函数中，方法定义在原型上，每个对象实例可以有自己私有的属性和公共的方法

### 寄生构造函数

用构造函数封装创建对象的代码，使用的时候还是像构造函数那样使用

```js
function SpecialArray() {
  var arr = new Array();
  arr.push.call(arr, arguments);
  arr.toPipedString = function () {
    return this.join("|");
  };
  return arr;
}
var arr = new SpecialArray([1, 2, 3]);
arr.toPipedString();
```

有时候不可直接在某些对象上添加方法和属性，通过这种方式，可以很方便的添加额外的一些特殊方法

> 注意方式创建的实例 arr 与构造函数 SpecialArray 没有任何关系，通过
> `arr instanceof SpecialArray` 是无法来确定对象类型的
