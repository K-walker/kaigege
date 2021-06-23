# 定时器

## Timer (setTimeout)

首先思考下面一段代码的执行结果:

```js
setTimeout(() => {
  console.log(2);
}, 2);
setTimeout(() => {
  console.log(1);
}, 1);
setTimeout(() => {
  console.log(0);
}, 0);
```

一般来讲，应该输出 0，1，2 然而根据 HTML 规范提到，setTimeout 的最小延迟为 4ms
所有这 3 个 setTimeout 都会在 4ms 后执行，那应该输出 2，1，0
但是最终执行代码你会发现输出 1,0,2 （chrome 和 node 中得出输出的结果可能有出入）

这是因为当设置 0ms 和 1ms 时，Timer 的底层代码实现取的就是 1ms:

```cpp
static const double oneMillisecond = 0.001; // 此处单位是秒
# 此处代码省略...
double intervalMilliseconds = std::max(oneMillisecond, interval * oneMillisecond);
```

interval 是传入的时间，所以当传入 0 和 1 时，还是取的 1ms，因此输出 1，0，2
但是为何又会有 4ms 之说，HTML 上也说明了，是有条件限制的，具体我没做研究，详见规范 11 条:

> If nesting level is greater than 5, and timeout is less than 4, then set timeout to 4.

## Node 中的 Timer

通过 Git 搜索 Node 中关于 Timer 的源码实现，如下:

```js
// Timer constructor function.
// The entire prototype is defined in lib/timers.js
function Timeout(callback, after, args, isRepeat, isRefed) {
  after *= 1; // Coalesce to number or NaN
  if (!(after >= 1 && after <= TIMEOUT_MAX)) {
    if (after > TIMEOUT_MAX) {
      process.emitWarning(
        `${after} does not fit into` +
          " a 32-bit signed integer." +
          "\nTimeout duration was set to 1.",
        "TimeoutOverflowWarning"
      );
    }
    after = 1; // Schedule on next tick, follows browser behavior
  }
}
```

从上面的代码可以看出，当传入 0 或者大于 TIMEOUT_MAX 的时间时，after 会被重置为 1

## 总结

1. 当 延迟时间 < 2ms 时，按 setTimeout 按选后顺序执行
2. 否则按时间延迟时间长短，先后执行
