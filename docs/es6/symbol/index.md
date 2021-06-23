# Symbol

`Symbol` 是一个新的原始数据类型，它是一个函数 `Symbol()`，但是不能使用 `new` 命令，
`Symbol()` 返回的是一个值，不是对象，所以不能给其返回值添加属性,且每次都返回一个独一无二的值

```js
let s1 = Symbol();
let s2 = Symbol();
s1 === s2; // false

// or
let s1 = Symbol("foo");
let s2 = Symbol("foo");
s1 === s2; // false
```

> 字符串 `foo` 是 `s1` 的描述，可以通过 `Symbol.prototype.description` 获取到

## 1.唯一性

由于每一个 `Symbol` 值都不相等，可以作为标识符，因此在给一个模块添加属性时，可以防止模块有同名的属性被覆盖和篡改；
假如 `obj` 模块有个 `name` 属性，但是外部使用者不清楚，此时我们创建一个同名属性 `name` 变回被覆盖，而用 `Symbol` 就不存在这个问题

```js
let obj = {
  name: 'king'
}
let name = Symbol();
obj[name] = 'hello';

console.log(obj.name)    // 打印 king
console.log(obj[name])   // 打印 hello
console.log(obj[‘name’]) // 打印 king
```

> 注意：`Symbol` 值作为属性时，不能使用 `.` 运算符读取值，那是因为 `.` 运算符后面总是字符串，而通过 `Symbol`
> 创建的 `name` 是 `Symbol` 类型，不是字符串

利用 Symbol 这一特性，可以用于创建一些常量

## 2.Symbol 类型属性不可被常规方法遍历

`Symbol` 类型的属性，是不可被 `for...in` 和 `for...of` 遍历的，也不会在 `Object.keys`，`Object.getOwnPropertyNames`, 和 `JSON.stringify` 中返回。

只能通过 `Object.getOwnPropertySymbols` 或者 `Reflec.ownKeys` 获取到 `Symbol` 类型的属性

> 由此，我们可以使用 `Symbol` 给对象创建一些非私有，但又仅内部使用的属性

## 3.Symbol.for()，Symbol.keyFor()

由于 `Symbol` 每次都返回一个新的值，但有时我们希望使用同一个 `Symbol` 值：

```js
let s1 = Symbol.for("foo");
let s2 = Symbol.for("foo");
s1 === s2; // true

Symbol("foo") === Symbol("foo"); // false
```

`Symbol.for()` 和 `Symbol()` 都会返回一个新值，但前者会被登记在全局中，`Symbol.for()` 会先检查给定的
`key` 是否存在，不存在则返回一个新的 `Symbol` 值

**Symbol.keyFor() 只会返回一个已登记的 Symbol 类型值的 key **

```js
Symbol.keyFor("s1"); // foo
let bar = Symbol("bar");
Symbol.keyFor(bar); // undefined
```
