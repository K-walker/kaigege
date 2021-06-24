# canvas 绘制生长的大树

最近看了一些很牛逼的特效，有位大神用 canvas 绘制的 [梦幻大树](http://sc.chinaz.com/jiaoben/170325372120.htm)，深深的震撼了我，超级厉害，于是我也准备尝试着去实现，可能脑子不够用，总是无法实现他那样的梦幻效果，最终只好退而求其次，实现了下面的这种大树，还算满意吧。

效果图

> ![动态效果图](https://img-blog.csdnimg.cn/img_convert/54c65563f90c39abaf73942401243b57.gif)

## HTML 源码

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8" />
    <title>生长的树</title>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #fff;
      }
    </style>
  </head>
  <body>
    <canvas id="myCanvas">此浏览器不支持canvas</canvas>
    <script src="../js/tree.js"></script>
  </body>
</html>
```

## tree.js 源码

```js
/**
 * Created by 004928 on 2017/8/2.
 */
(function (window) {
  var w = window.innerWidth,
    h = window.innerHeight;
  var ctx = null;
  var treeNum = 3;
  var initRadius = 25; // 树干的初始宽度
  var maxGeneration = 5; // 最多分支的次数
  var branchArray = null; // 树干的集合
  var flowers = []; // 花的集合

  window.MyRequestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  window.MyCancelRequestAnimationFrame =
    window.cancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame;

  /**
   * 初始化canvas
   */
  function initCanvas() {
    var canvas = document.getElementById("myCanvas");
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      initTree();
      loop();
    }
  }

  /**
   * 初始化树的数量
   */
  function initTree() {
    branchArray = new BranchArray();
    for (var i = 0; i < treeNum; i++) {
      branchArray.add(new Branch(w / 2, h));
    }
  }

  /**
   * 树干
   * @param x
   * @param y
   * @constructor
   */
  function Branch(x, y) {
    this.x = x;
    this.y = y;
    this.radius = initRadius;
    this.angle = Math.PI / 2; // 树枝的初始角度
    this.speed = 2.35; // 数生长的速度
    this.generation = 1;
  }

  /**
   * 生长
   */
  Branch.prototype.grow = function () {
    this.draw();
    this.update();
  };

  Branch.prototype.draw = function () {
    ctx.fillStyle = "#55220F";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  };

  /**
   * 更改数的高度以及扭曲度
   */
  Branch.prototype.update = function () {
    // 计算树干每次的扭曲角度，因为树一般不是笔直生长的，都会有不规则的扭曲
    this.angle += random(
      (-0.1 * this.generation) / 2,
      (0.1 * this.generation) / 2
    );

    var vx = this.speed * Math.cos(this.angle);
    // 因为初始角度设置为Math.PI , 所以vy要取负数
    var vy = -this.speed * Math.sin(this.angle);

    if (this.radius < 0.99 || this.generation > maxGeneration) {
      branchArray.remove(this);
    }

    this.x += vx;
    this.y += vy;

    this.radius *= 0.99;

    if (this.radius >= 0.9) {
      // 计算当前是第几代分支
      var g =
        ((maxGeneration - 1) * initRadius) / (initRadius - 1) / this.radius +
        (initRadius - maxGeneration) / (initRadius - 1);
      if (g > this.generation + 1) {
        this.generation = Math.floor(g);
        // 随机创建分支
        for (var i = 0; i < random(1, 3); i++) {
          this.clone(this);
        }
      }
    }
  };

  /**
   * 创建分支
   * @param b
   */
  Branch.prototype.clone = function (b) {
    var obj = new Branch(b.x, b.y);
    obj.angle = b.angle;
    obj.radius = b.radius;
    obj.speed = b.speed;
    obj.generation = b.generation;
    branchArray.add(obj);
    // 如果当前分支次数大于3则创建花，这样可以让花在树的顶端显示
    if (b.generation > 3) {
      flowers.push(new Flower(b.x, b.y));
    }
  };

  function BranchArray() {
    this.branchs = [];
  }

  /**
   * 添加树干到集合中
   * @param b
   */
  BranchArray.prototype.add = function (b) {
    this.branchs.push(b);
  };
  /**
   * 从集合中移除树干
   * @param b
   */
  BranchArray.prototype.remove = function (b) {
    if (this.branchs.length > 0) {
      var index = this.branchs.findIndex(function (item) {
        return b === item;
      });
      if (index != -1) {
        this.branchs.splice(index, 1);
      }
    }
  };

  /**
   * 花
   * @param x
   * @param y
   * @constructor
   */
  function Flower(x, y) {
    this.x = x;
    this.y = y;
    this.r = 1; // 花瓣的半径
    this.petals = 5; // 花瓣数量
    this.speed = 1.0235; // 花的绽放速度
    this.maxR = random(3, 7); // 花的大小
  }

  /**
   * 花朵开放（通过改变花的半径实现开放的效果）
   * @param index
   */
  Flower.prototype.update = function (index) {
    if (this.r == this.maxR) {
      flowers.splice(index, 1);
      return;
    }
    this.r *= this.speed;
    if (this.r > this.maxR) this.r = this.maxR;
  };

  /**
   * 绘制花朵
   */
  Flower.prototype.draw = function () {
    ctx.fillStyle = "#F3097B";
    for (var i = 1; i <= this.petals; i++) {
      var x0 =
        this.x + this.r * Math.cos((Math.PI / 180) * (360 / this.petals) * i);
      var y0 =
        this.y + this.r * Math.sin((Math.PI / 180) * (360 / this.petals) * i);
      ctx.beginPath();
      ctx.arc(x0, y0, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.fillStyle = "#F56BC1";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r / 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * 循环遍历所有树干和花，并调用更新和draw方法，实现动画效果
   */
  function loop() {
    for (var i = 0; i < branchArray.branchs.length; i++) {
      var b = branchArray.branchs[i];
      b.grow();
    }
    var len = flowers.length;
    while (len--) {
      flowers[len].draw();
      flowers[len].update();
    }
    MyRequestAnimationFrame(loop);
  }

  window.onload = initCanvas;
})(window);
```

## 原理

- 1.生长: 因为树是越往上树干越细，我们通过绘制圆，通过无数的圆叠加来当做树的躯体，逐渐缩小圆的半径，即可实现树越往上越小的效果
- 2.扭曲: 其次树的生长不是笔直的，是扭曲的，所以通过三角函数随机产生角度值，然后计算 x,y 轴的偏移量，这样就能实现树的扭曲
- 3.分支: 通过双曲线方程 _y=-a/x + b_ 去控制什么树在什么时候去产生分支（待会详解）；
- 4.开花: 因为花一般都是长在末梢，而我则是显示在最后几个分支的结点以及末梢进行展示（这个开花地点随意，不必纠结）

### 生长

> 树的生长变细，主要通过改变树干的半径即可， _this.radius _= 0.99\* 每次递减；

### 扭曲

> 关于树的扭曲，这个是重点，因为树枝延伸和扭曲都是不规则的，在 _Branch.prototype.update_ 中

```js
this.angle += random((-0.1 * this.generation) / 2, (0.1 * this.generation) / 2);
```

> 在区间[-0.1,0.1]中随机产生角度，通过三角函数计算 x,y 轴偏移量

```js
var vx = this.speed * Math.cos(this.angle);
// 因为初始角度设置为Math.PI , 所以vy要取负数
var vy = -this.speed * Math.sin(this.angle);
```

> vx 的正负，决定了树的扭曲，vy 的正负，决定树是向上生长还是向下
> 你可能觉得奇怪树为什么会向下生长，首先要理解我们这里将树抽象成了一个一个的圆
> 无数个圆连接在一起才组成树干，这个要能理解，然后，有些树的枝干有时是会往下生长一段，然后又往上生长的
> 这个生长的方向我们是不能控制的，并不是所有树都一直向上生长的，所以当 vy 为负值时就可以实现树枝
> 向下生长的情况，当然这个也是随机的，也正是我们想要的效果。

### 分支

> 对于在什么时候应该让树去产生分支，我之前的想法是规定一段树干的长度，然后每次计算当前位置
> 距离上一个分支点的距离是否大于我规定的长度，然后产生分支，但是这样就会看到每节分支之间的长度是一样的
> 看起来不美观，比较死板，最终使用双曲线方程 _y=-1/x_ 去控制因为双曲线的走势是先快后慢的，
> 而树的生长也是越往后分支越多,可能你会奇怪曲线是先快后慢，树分叉是先慢后快的，不符合逻辑啊
> 别着急，下看下图:

![曲线图](https://img-blog.csdnimg.cn/img_convert/9d1dc81e9056b28d210b33d55eca6e46.png)

> 从图中可以看见，X 轴表示树干的粗细，Y 轴表示分支的次数，当树干越来越细的时候，X 轴变小
> 是不是 Y 轴就越来越大，且是先慢后快，这样就符合我们的需求了。
> 因此上面计算分支的次数公式就由此而来：

```js
var g =
  ((maxGeneration - 1) * initRadius) / (initRadius - 1) / this.radius +
  (initRadius - maxGeneration) / (initRadius - 1);
```

> 得到分支次数，比较是否大于当前分支，于是便随即产生分支数量，详见 _Branch.prototype.clone_ 也就是创建一个树干添加到 BranchArray 中

### 开花

> 至于开花的逻辑就比较简单，主要记录花朵开放的位置，然后绘制出来便可，至于花朵的形状，详见 _Flower.prototype.draw_ 方法
> 这里我就不做过多介绍了，比较简单，而花朵的开放效果，就是改变花朵的半径

一颗大树从生长到开花所有的逻辑步骤大概这四步，其中最主要的逻辑是扭曲，为了这个扭曲我想了好多天，苦闷死我了。
最后通过循环调用 _loop_ 方法， 遍历所有树干以及花朵，即可实现动态效果。

Github [源码下载](https://github.com/K-walker/production/tree/master/web/effects/growTree)
