# 执行上下文

## 什么叫执行上下文

当执行一个函数的时候，会进行准备工作，这里的**准备工作**，就叫做 **执行上下文**

先看下面代码的执行栈

```js
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}
checkscope()();
```

模拟栈堆

```js
ECSTack.push(<checkscope> functionContenxt)
ECSTack.pop();
ECSTack.push(<f> functionContenxt)
ECSTack.pop();
```

首先调用 `checkscope()` 完成 `checkscope` 的入栈和出栈操作，然后得到 `f` 函数，执行 `f()`,
进行 `f` 的入栈和出栈

另外一种情况:

```js
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f();
}
checkscope();
```

首先调用 `checkscope()` 完成 `checkscope` 的入栈,由于 `checkscope` 内部又定义了函数 `f` ，
再执行 f 的入栈，然后 `checkscope` 和 `f` 先后执行结束，完成出栈

## 具体分析执行上下文

```js
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f();
}
checkscope();
```

1.执行全局代码: 创建全局上下文并入栈

```js
ECSTack = [globalContext];
```

2.初始化 全局执行上下文

```js
globalContext = {
  VO:{
    scope: undefined,
    checkscope: Reference to function checkscope() {}
  },
  Scope:[globalContext.VO],
  this: globalContext.VO
}
```

3.初始化同时， checkscope 函数被创建,保存作用域链到函数内部属性[[scope]]

```js
checkscope[[scope]] = [globalContext.VO];
```

4.执行函数，创建 checkscope 执行上下文，并入栈:

```js
ECSTack = [checkscopeContext, globalContext];
```

5. checkscope 函数执行上下文初始化过程：

- 复制函数[[scope]]属性，初始化作用域链
- 用 arguments 对象初始化活动对象
- 初始化活动对象，即加入形参、函数申明、变量申明
- 将活动对象放入 checkscope 作用域链的顶端

6.同时 f 函数被创建，保存作用域到函数内部属性[[scope]]

```js
checkscopeContext = {
  AO: {
    arguments:{
      length:0
    },
    scope: undefined,
    f: Reference to function f() {}
  },
  Scope: [AO,globalContext.VO],
  this: undefined
}
```

7.执行函数 f ，创建函数 f 的执行上下文并入栈

```js
ECSTack = [fContext, checkscopeContext, globalContext];
```

8. f 函数执行上下文初始化，此步骤同第 5 步一样

```js
fContext = {
  AO:{
    arguments {
      length:0
    }
  },
  Scope: [AO, checkscopeContext.AO, globalContext.AO],
  this: undefined
}
```

9. f 函数执行，延这作用域查找 scope 的值并返回
10. 函数执行完毕，出栈

```js
ECSTack = [checkscopeContext, globalContext];
```

11.checkscope 函数执行结束，再出栈

```js
ECSTack = [globalContext];
```

## 总结

1. 函数被创建，首先保存作用域到内部属性[[scope]]
2. 执行函数时，才会创建执行上下文，并入栈
3. 初始化执行上下文
   1. 复制函数[[scope]]到创建作用域链
   2. 用 arguments 对象创建活动对象: 形参、函数申明、变量申明
   3. 将活动对象放入作用域链顶端
4. 函数执行，根据作用域链查找所需变量，并返回
5. 函数返回后，出栈

t.AO = {
n: undefined,
t2: Referench to function t2(){},
Scope:[AO, globalContext.VO]
}
