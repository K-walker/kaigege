# export 和 import

## export / export default

`export default` 指定模块的默认输出，实际上就是输出一个叫 `default` 的变量或方法，
然后系统允许你为其重新取名

```js
// module.js
function add (x, y) {
  return x+y
}
export default add ;
// 以上代码等同于
export { add as default }

// 导入 default 并重命名为 foo
import {default as foo} from 'module.js'
```

既然 `default` 是一个变量那如下代码怎么解释呢？

```js
let a = 1;
export default a;
// or
export let a = 1;

// 报错
export default let a = 1;
```

`export default a` 的含义是将变量 `a` 赋值给 `default` ,
因此变量 `default` 不能被赋值为 `let a = 1;` 所以报错！
但是可以直接赋值 `export default 1`;

## import

`import(modulePath)` 动态加载模块，返回一个 `Promise`, 因此可以使用 `Promise.all` 加载多个模块

```js
Promise.all([
  import("./module1.js"),
  import("./module2.js"),
  import("./module3.js"),
]).then(([module1, module2, module3]) => {
  // TODO
});
```

## CommonJS 与 ES6 模块的区别

- `CommonJS` 模块输出的是一个值的拷贝，`ES6` 模块是一个值的引用
- `CommonJS` 模块是运行时加载，`ES6` 模块是编译时输出接口
- `CommonJS` 模块的 `require()` 是同步加载模块， `ES6` 模块的 `import` 命令时异步加载，有一个独立的模块依赖的解析阶段
