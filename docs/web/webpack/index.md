# webpack 原理

伪代码

```js
(function (modules) {
  // 缓存已加载的模块
  var installedModules = {};

  // 加载依赖
  function require(moduleId) {
    // 如果当前模块已经加载过，则直接返回 (也避免了模块之间相互引用，重复加载的情况)
    if (installedModules[moduleId]) {
      return installedModules[mudoleId].exports;
    }

    var exports = {};
    // 根据模块的key调用执行模块代码
    modules[moduleId].call(exports);

    return exports;
  }
  // 入口
  return require("./index.js");
})({
  "./index.js": function () {}, // 入口文件
  "./src/minus.js": function (exports) {
    exports.minus = void 0;
    var minus = function () {};
    exports.minus = minus;
  }, // 依赖的模块
  "./src/add.js": function (exports) {
    exports["default"] = add;
    function add() {
      //
    }
  }, // 依赖的模块
});
```

## 打包优化

详细请点击[webpack 配置解析](https://juejin.im/post/6858905382861946894)

webpack 打包默认会将所有模块打到一个 chunk 中，如果代码中有动态导入模块：

```jsx
import("./asyncModule").then((res) => {
  console.log(res);
});
```

则动态导入的代码块会被单独打到一个 chunks 中
