# 粒子特效

最近闲来无事，便去研究 canvas，因为 canvas 可以实现很多炫丽的动画效果，所以就想研究一番，正好看见网上有哥们实现了一个类似的粒子效果，觉得挺不错的，于是乎自己就动手也写了一个。好了，话不多说，直接看效果吧。

效果图

> ![动态效果图](https://img-blog.csdnimg.cn/img_convert/a90e2027761c09a95bf5954077734b02.gif)

## HTML 源码

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8" />
    <title>粒子特效</title>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;
      }
      #myCanvas {
        background-color: #000;
        cursor: crosshair;
      }
    </style>
  </head>
  <body>
    <canvas id="myCanvas"></canvas>
    <script src="../js/particle.js"></script>
  </body>
</html>
```

## particle.js 源码

```js
/**
 * Created by 004928 on 2017/8/2.
 */
(function (window) {
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  window.cancelRequestAnimationFrame =
    window.cancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame;
  var w, h; // 画布宽高
  var particles = []; // 粒子集合
  var temp = [];
  var points = []; // 每个粒子坐标对象的集合
  var delayTime = 2000; // 位移动画执行的延迟时间
  var maxRadius = 7; // 粒子圆的最大半径
  var animationIncrement = 0.08; // 粒子缩放时的增减量
  var offsetY = 7,
    offsetX = 7; // x , y 轴每隔7个像素点取值
  var speed = 20; // 粒子运动速度

  // 粒子颜色库
  var colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
  ];
  var down = false,
    move = false;

  var requestId, timeId;
  var canvas = null;
  var ctx = null;

  /**
   * 初始化canvas
   */
  function initCanvas() {
    canvas = document.getElementById("myCanvas");
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      bindEvent();
    }
  }

  /**
   * cnavas 绑定事件
   */
  function bindEvent() {
    canvas.addEventListener("mousedown", function (e) {
      down = true;
      stopAnimation();
    });

    canvas.addEventListener("mousemove", function (e) {
      if (down) {
        move = true;
        drawPath({
          x: e.offsetX,
          y: e.offsetY,
        });
      }
    });

    canvas.addEventListener("mouseup", function (e) {
      down = false;
      if (move) {
        throttle(graffiti, window);
      }
      move = false;
    });
  }

  /**
   * 涂鸦
   */
  function graffiti() {
    initParticle();
    randomDraw();
    start();
    points = [];
  }

  /**
   * 节流函数
   */
  function throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function () {
      method.call(context);
    }, delayTime);
  }

  /**
   * 绘制路径
   */
  function drawPath(point) {
    points.push(point);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(
      point.x,
      point.y,
      Math.floor(Math.random() * maxRadius + 1),
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  /**
   * 初始化粒子个数
   */
  function initParticle() {
    particles = [];
    temp = [];
    // 拿到画布的所有像素点信息
    // 每个像素点包含了rgba 四个值，
    // 而这个pxData是一个一维数组,每4位保存一个像素点信息
    var pxData = ctx.getImageData(0, 0, w, h);
    // 将4位表示的像素点信息，转化为1位来表示，
    // 即数组中的每个元素表示一个像素
    var buffer32 = new Uint32Array(pxData.data.buffer);

    // 找到数组中有像素信息的点，并创建粒子
    // 因为数组是一维数组，j * w + i 计算当前遍历的数组下标
    for (var j = 0; j < h; j += offsetY) {
      for (var i = 0; i < w; i += offsetX) {
        if (buffer32[j * w + i]) {
          particles.push(new Particles(i, j, colors[i % colors.length]));
          // 在移动粒子的时候需要用到
          temp.push(new Particles(0, 0, colors[i % colors.length]));
        }
      }
    }
  }

  /**
   * 首先随机绘制在屏幕上
   */
  function randomDraw() {
    ctx.clearRect(0, 0, w, h);
    for (var l = 0; l < temp.length; l++) {
      var p = temp[l];
      setRadius(p);
      if (p.x == 0) p.x = randomInteger(w);
      if (p.y == 0) p.y = randomInteger(h);
      draw(p);
    }
    requestId = requestAnimationFrame(randomDraw);
  }

  /**
   * 随机产生 1 - max 之间的整数
   * @param max
   * @returns {number}
   */
  function randomInteger(max) {
    return Math.floor(Math.random() * max + 1);
  }

  /**
   * 粒子对象
   */
  function Particles(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color; // 粒子颜色
    this.r = Math.floor(Math.random() * maxRadius + 1); // 随机产生粒子的半径 1 - 5
    this.zoom = Math.floor(Math.random() * 2) == 0 ? -1 : 1; // 0 表示缩小，1表示放大
  }

  /**
   * 循环执行动画
   */
  function loop() {
    ctx.clearRect(0, 0, w, h);
    for (var l = 0; l < particles.length; l++) {
      var p = particles[l];
      var t = temp[l];
      calcPosition(p, t);
      setRadius(t);
      draw(t);
    }
    requestId = requestAnimationFrame(loop);
  }

  /**
   * 2s 之后 聚合成要显示的文本样式
   */
  function start() {
    timeId = setTimeout(function () {
      cancelRequestAnimationFrame(requestId);
      loop();
    }, delayTime);
  }

  /**
   * 设置粒子的半径（递增/递减）
   */
  function setRadius(p) {
    if (p.zoom > 0) {
      p.r += animationIncrement;
      if (p.r >= maxRadius) p.zoom = -1;
    } else {
      p.r -= animationIncrement;
      if (p.r <= 1) p.zoom = 1;
    }
  }

  /**
   * 计算粒子的位置
   */
  function calcPosition(p, t) {
    var vx = (p.x - t.x) / speed;
    var vy = (p.y - t.y) / speed;

    t.x += vx;
    t.y += vy;

    if (vx > 0) {
      if (t.x >= p.x) t.x = p.x;
    } else {
      if (t.x <= p.x) t.x = p.x;
    }

    if (vy > 0) {
      if (t.y >= p.y) t.y = p.y;
    } else {
      if (t.y <= p.y) t.y = p.y;
    }
  }

  /**
   * 绘制粒子
   * @param t
   */
  function draw(t) {
    ctx.fillStyle = t.color;
    ctx.beginPath();
    ctx.arc(t.x, t.y, t.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  /**
   * 停止动画
   */
  function stopAnimation() {
    if (requestId || timeId) {
      cancelRequestAnimationFrame(requestId);
      clearTimeout(timeId);
      requestId = timeId = null;
      ctx.clearRect(0, 0, w, h);
    }
  }

  window.onload = initCanvas;
})(window);
```

## 原理

> 其实这个特效主要分为两个部分

- 1.粒子本身的缩放
- 2.粒子位置的移动

### 粒子本身的缩放

> 其实每个粒子本身就是一个圆，只要改变每次改变圆的半径从大到小，再从小到大，就可以实现缩放的效果

### 粒子位置的移动

> 首先记录绘制在界面上粒子的位置，然后再随机显示在界面上，然后再计算此时的粒子距离之前粒子的位置
> 计算之间的距离，然后移动过去即可。

其实原理比较简单，下面来解读下源码！

## 源码解析

> 其实主要的逻辑在 _initParticle_ 方法，通过 _ctx.getImageData_ 拿到画布上所有的像素点信息
> 得到的数据是一个一维数组，且每 4 个数据表示一个像素点信息比如 [0,0,0,1 ,0,2,3,0] ,我们可以看到
> 这个数组中有 8 个值,那么前面 4 个值表示第一个像素点信息，后面 4 个表示第二个像素点信息。
> 且 4 个值分别对应 r , g , b , a 这四个值。
> 然后通过 _Uint32Array_ 方法将 4 位表示一个像素点信息的数据，变成 1 位表示一个像素点的数组
> 因此上面 8 位的数组就变\[001100 , 003300\](数据我是瞎编的，忽略)
> 然后遍历转换后的数组，凡是有值的，就是出现在界面上的点（大家可以在 canvas 上写段文字，然后打印*ctx.getImageData*获取到的数据便知）

```js
for (var j = 0; j < h; j += offsetY) {
  for (var i = 0; i < w; i += offsetX) {
    if (buffer32[j * w + i]) {
      particles.push(new Particles(i, j, colors[i % colors.length]));
      // 在移动粒子的时候需要用到
      temp.push(new Particles(0, 0, colors[i % colors.length]));
    }
  }
}
```

> 如上，即可拿到所有绘制在界面上的粒子，因为数组是一维的，而粒子要绘制在界面上是需要 X,Y 坐标的，
> 所有这里用两层 for 循环，来得到每个粒子的 x,y 坐标

- offsetX，offsetY 横竖每次间隔多少像素才去取数据，这样出来的粒子才会排列不一

> 基本上拿到粒子之后，然后随机绘制在界面上，详见 _randomDraw_ 方法
> 然后循环执行 _loop_ 方法，遍历每个粒子，计算位置，设置半径，即可看到效果。

主要的逻辑都在 particle.js 中，其他方法都比较简单，主要是*initParticle*方法中的逻辑。
另外，js 代码我没有怎去去封装了，勿吐槽。

Github [源码下载](https://github.com/K-walker/production/tree/master/web/effects/particle)
