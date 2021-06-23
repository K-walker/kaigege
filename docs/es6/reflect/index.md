# Reflect

将 `Object` 对象的一些明显于语言内部的方法（比如：`Object.defineProperty, name in obj`）放到 `Reflect`
对象上,如下:

```js
Object.defineProperty(target, property, attributes);
Reflect.defineProperty(target, property, attributes);

key in obj;
Reflect.has(obj, key);

delete obj[key];
Reflect.deleteProperty(obj, key);
```

## Reflect.get / Reflect.set

如果对象的属性部署了 `setter` 或 `getter` 函数，则读取函数的 `this` 绑定 `receiver` 如下:

```js
let myobj = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};
let myReciverObj = {
  foo: 2,
  bar: 2,
};
// baz 函数中的 this 绑定了 myReciverObj，因此 输出 4
Reflect.get(myobj, "baz", myReciverObj);
```

## Reflect 其他方法查询 ES6 教程

[ES6](http://es6.ruanyifeng.com/)
