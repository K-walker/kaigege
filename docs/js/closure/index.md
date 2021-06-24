# 闭包与高阶函数

## 什么是闭包

> 指有权访问另一个函数作用域中的变量的函数

如下：一般来说，函数在调用结束之后，其内部定义的变量就会被销毁，但是执行下面这段代码，你会发现明明 `aFunc` 函数已经先被执行了，但还是会打印出 `name ` 的值，那是因为当执行 `var myFunc = aFunc()` 时，myFunc 被返回一个函数（即内部函数 `inner`）的引用，而这个 `inner` 函数可以访问 `aFunc` 函数被调用时的产生的环境，而变量 `name` 在这个环境当中，且能被 `inner` 访问，因此`name` 也就没有被销毁，从而还能通过调用 `myFunc` 函数来访问到，**这里就形成了一个闭包的结构**。

```javascript
function aFunc() {
  var name = "aaa";
  function inner() {
    console.log(name);
  }
  return inner;
}
var myFunc = aFunc();
myFunc();
```

其实一般的闭包结构，简单点说，就是在**一个函数内部创建另一个函数，然后去访问父类函数的变量**，因为我这里在父类函数里返回了内部函数的引用，因此通过这个引用仍可以访问父类函数中的变量。

通常我们会经常看到这个例子：

```javascript
var doms = document.querySelectorAll("div");
for (var i = 0; i < doms.length; i++) {
  doms[i].onclick = function () {
    alert(i);
  };
}
```

我们都知道，由于 `onclick ` 事件是异步执行的，所以弹框中显示的值总是等于 ` doms.length`， 于是我们通过闭包来解决，如下：

```javascript
var doms = document.querySelectorAll("div");
for (var i = 0; i < doms.length; i++) {
  (function (i) {
    doms[i].onclick = function () {
      alert(i);
    };
  })(i);
}
```

起初我乍一看，这不就包了一个自执行的匿名函数嘛，怎么就是闭包了呢 ？ 现在通过上面的介绍，会发现，目前这个结构就是上面所说的，**一个函数内部创建另一个函数，然后去访问父类函数的变量**，
`onclick` 就是这个内部函数，而它访问的就是父类匿名函数的变量 `i`，之前看这个总是让我感觉所有匿名函数就是等于闭包，只不过叫法不同而已，其实，闭包只是一个代码结构的组合（个人理解，有误勿喷）

### 示例

使用闭包实现单例模式

```javascript
function EventGlobal() {}
var getInstance = (function () {
  var instance = null;
  return function () {
    if (!instance) {
      instance = new EventGlobal();
    }
    return instance;
  };
})();

var a = getInstance();
var b = getInstance();

console.log(a === b); // true
```

## 高阶函数

> 一个函数接收另一个函数作为参数，那么此函数则为高阶函数

```javascript
function add(x, y, f) {
  return f(x) + f(y);
}
function func(x) {
  return Math.abs(x);
}
// add 方法此时可以称为一个高阶函数
add(4, 9, func);
```

以上代码展示了一个简单的高阶函数的使用，函数 `add` 就是高阶函数，其接收函数 `func` 作为参数，然后在内部进行调用而已，这很简单，在此就不多说了。
